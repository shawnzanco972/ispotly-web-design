// GitHub OAuth — callback endpoint for Decap CMS.
//
// Decap's GitHub backend (decap-cms-lib-auth) uses a 3-step popup handshake:
//
//   1. Parent (/admin) opens this callback in a popup and immediately attaches
//      a `message` listener that ONLY accepts `authorizing:github`.
//   2. Popup, once it has the access token, sends `authorizing:github` to its
//      opener. The parent echoes the same message back to confirm it's ready.
//   3. Popup receives the echo, captures `e.origin`, and replies with
//      `authorization:github:success:<json>` to that exact origin.
//
// Skipping step 2 (popup just blasting success messages) is the silent-failure
// trap — the parent's listener for `authorization:github:success:` is only
// attached AFTER the handshake completes, so any earlier success messages are
// dropped on the floor without a console error.

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const cookieState = req.cookies.get("decap_oauth_state")?.value;

  if (!code) return popupError("Missing ?code on callback URL.");
  if (!state || !cookieState || state !== cookieState) {
    return popupError("OAuth state mismatch — please try logging in again.");
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return popupError("Server misconfigured: GITHUB_CLIENT_ID/SECRET missing.");
  }

  let token: string | undefined;
  let failureReason: string | undefined;

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
      scope?: string;
    };
    token = json.access_token;
    if (!token) failureReason = json.error_description || json.error || "no_token";
  } catch (err) {
    failureReason = err instanceof Error ? err.message : "token_exchange_failed";
  }

  if (!token) return popupError(failureReason || "GitHub did not return a token.");

  const successHtml = buildPopupHtml({
    status: "success",
    payload: { token, provider: "github" },
  });

  const res = new NextResponse(successHtml, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
  res.cookies.set("decap_oauth_state", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}

function popupError(message: string) {
  const html = buildPopupHtml({
    status: "error",
    payload: { message },
  });
  return new NextResponse(html, {
    status: 200, // 200 so the popup can still run JS and notify the parent
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}

/**
 * Builds the popup HTML that performs the Decap handshake.
 *
 * IMPORTANT — payload is passed as a *JS literal*, not template-interpolated
 * into a string. That avoids the classic `'${"})}'` escaping bug where the
 * token contained a quote and broke parsing.
 */
function buildPopupHtml(opts: {
  status: "success" | "error";
  payload: Record<string, string>;
}) {
  const { status, payload } = opts;
  // Double JSON-stringify: outer = JS literal, inner = the actual JSON Decap parses.
  const payloadLiteral = JSON.stringify(JSON.stringify(payload));
  const statusLabel = status === "success" ? "Authentication successful" : "Authentication failed";
  const subline =
    status === "success"
      ? "Closing window…"
      : `Reason: ${payload.message ?? "unknown"}`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>iSpotly · OAuth</title>
  <meta name="robots" content="noindex" />
  <style>
    html, body { margin: 0; height: 100%; }
    body {
      font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
      background: #07060d; color: #fff;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      text-align: center; padding: 24px;
    }
    h1 { margin: 0 0 8px; font-size: 18px; font-weight: 700; }
    p  { margin: 0; font-size: 13px; opacity: 0.65; max-width: 360px; }
  </style>
</head>
<body>
  <h1>${statusLabel}</h1>
  <p>${escapeHtml(subline)}</p>
  <script>
    (function () {
      var status = ${JSON.stringify(status)};
      var payload = ${payloadLiteral}; // already a JSON string
      var message = "authorization:github:" + status + ":" + payload;

      function receiveMessage(e) {
        if (typeof e.data !== "string") return;
        if (e.data.indexOf("authorizing:github") !== 0) return;

        // Reply to the exact origin the parent told us about — never '*' for
        // the token-bearing message.
        try {
          e.source.postMessage(message, e.origin);
        } catch (err) {
          if (window.opener) {
            window.opener.postMessage(message, e.origin);
          }
        }
      }

      window.addEventListener("message", receiveMessage, false);

      // Step 1 of the handshake: announce ourselves to the opener.
      // Decap's parent listener is attached the moment the popup is opened,
      // but we still retry briefly in case of slow JS init.
      function announce() {
        if (!window.opener) return;
        try { window.opener.postMessage("authorizing:github", "*"); } catch (err) {}
      }

      announce();

      var tries = 0;
      var iv = setInterval(function () {
        announce();
        if (++tries >= 25) clearInterval(iv);
      }, 200);

      // Auto-close after the handshake has had plenty of time.
      setTimeout(function () {
        try { window.close(); } catch (e) {}
      }, status === "success" ? 4000 : 10000);
    })();
  </script>
</body>
</html>`;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      case "'": return "&#39;";
      default: return c;
    }
  });
}
