// GitHub OAuth — callback endpoint for Decap CMS
// Validates state, swaps the code for an access token, and posts the token
// back to the Decap CMS popup opener via window.postMessage.

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const cookieState = req.cookies.get("decap_oauth_state")?.value;

  if (!code) {
    return new NextResponse("Missing ?code", { status: 400 });
  }
  if (!state || !cookieState || state !== cookieState) {
    return new NextResponse("Invalid OAuth state — try logging in again.", { status: 400 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new NextResponse("Server misconfigured: GITHUB_CLIENT_ID/SECRET missing.", { status: 500 });
  }

  let token: string | undefined;
  let errorMessage: string | undefined;

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "ispotly-decap-oauth",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });
    const json = (await tokenRes.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };
    token = json.access_token;
    if (!token) errorMessage = json.error_description || json.error || "no_token";
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : "fetch_failed";
  }

  // Build the response Decap expects: a tiny page that postMessages the result
  const status = token ? "success" : "error";
  const payload = token
    ? JSON.stringify({ token, provider: "github" })
    : JSON.stringify({ message: errorMessage || "unknown_error" });

  const html = `<!doctype html>
<html><head><meta charset="utf-8" /><title>iSpotly · OAuth</title></head>
<body style="font-family:system-ui;background:#07060d;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0">
  <p>Authentication ${status === "success" ? "successful" : "failed"}. You can close this window.</p>
  <script>
    (function () {
      var msg = 'authorization:github:${status}:' + ${JSON.stringify(payload)};
      function send() {
        if (window.opener) {
          window.opener.postMessage(msg, '*');
        }
      }
      window.addEventListener('message', function (e) {
        if (e.data === 'authorizing:github') send();
      }, false);
      send();
      setTimeout(function () { window.close(); }, 1500);
    })();
  </script>
</body></html>`;

  const res = new NextResponse(html, {
    status: token ? 200 : 400,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
  // wipe the state cookie
  res.cookies.set("decap_oauth_state", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
