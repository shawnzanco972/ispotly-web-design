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

  // If we failed to get a token, show an error on the screen.
  if (!token) {
    return new NextResponse(`Authentication failed: ${errorMessage}`, { status: 400 });
  }

  // Build the exact HTML response Decap CMS expects to close the loop securely.
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>iSpotly · OAuth Success</title>
</head>
<body style="font-family:system-ui;background:#07060d;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0">
  <p>Authentication successful. Redirecting...</p>
  <script>
    (function() {
      if (window.opener) {
        // Send the token back to the exact Decap CMS domain format
        window.opener.postMessage(
          'authorization:github:success:{"token":"${token}","provider":"github"}',
          'https://ispotly-web-design.vercel.app'
        );
      }
      // Close the popup window immediately after sending the message
      window.close();
    })();
  </script>
</body>
</html>`;

  const res = new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });

  // Wipe the state cookie for security
  res.cookies.set("decap_oauth_state", "", { httpOnly: true, path: "/", maxAge: 0 });

  return res;
}