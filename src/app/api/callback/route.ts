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

  // Build the response Decap expects: a tiny page that postMessages the result.
  // Decap parses messages of the shape `authorization:github:<status>:<jsonObject>`
  // — the trailing part must be a JSON object literal, not a JSON-encoded string.
  const status = token ? "success" : "error";
  const payloadObj = token
    ? { token, provider: "github" }
    : { message: errorMessage || "unknown_error" };
  const message = `authorization:github:${status}:${JSON.stringify(payloadObj)}`;

  const html = `<!doctype html>
<html><head><meta charset="utf-8" /><title>iSpotly · OAuth</title></head>
<body style="font-family:system-ui;background:#07060d;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0">
  <p>Authentication ${status === "success" ? "successful" : "failed"}. You can close this window.</p>
  <script>
    (function () {
      var msg = ${JSON.stringify(message)};
      function send() {
        if (window.opener) {
          window.opener.postMessage(msg, window.location.origin);
          window.opener.postMessage(msg, '*');
        }
      }
      window.addEventListener('message', function (e) {
        if (typeof e.data === 'string' && e.data.indexOf('authorizing:github') === 0) send();
      }, false);
      // Decap listens for the page handshake; reply on every tick until it picks it up.
      send();
      var tries = 0;
      var iv = setInterval(function () {
        send();
        if (++tries > 20) clearInterval(iv);
      }, 250);
      setTimeout(function () { try { window.close(); } catch (e) {} }, 6000);
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
