import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');
  const cookieState = req.cookies.get('decap_oauth_state')?.value;

  if (!code) return new NextResponse('Missing ?code', { status: 400 });
  if (!state || !cookieState || state !== cookieState) {
    return new NextResponse('Invalid OAuth state.', { status: 400 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) return new NextResponse('Server config missing', { status: 500 });

  let token: string | undefined;
  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const json = await tokenRes.json();
    token = json.access_token;
  } catch (err) { }

  if (!token) return new NextResponse('Authentication failed.', { status: 400 });

  const payloadString = JSON.stringify({ token: token, provider: 'github' });

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8" /><title>OAuth Success</title></head>
<body style="font-family:system-ui;background:#07060d;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0">
  <p>Authentication successful. Closing...</p>
  <script>
    (function() {
      // Safely inject the JSON string without template literal escaping bugs
      var msg = 'authorization:github:success:' + '${payloadString}';
      var targetOrigin = 'https://ispotly-web-design.vercel.app';

      function sendToken() {
        if (window.opener) {
          window.opener.postMessage(msg, targetOrigin);
        }
      }

      window.addEventListener('message', function(e) {
        if (typeof e.data === 'string' && e.data.indexOf('authorizing:github') === 0) {
          sendToken();
        }
      });

      sendToken();
      var tries = 0;
      var interval = setInterval(function() {
        sendToken();
        if (++tries > 20) clearInterval(interval);
      }, 250);

      setTimeout(function() { window.close(); }, 3000);
    })();
  </script>
</body>
</html>`;

  const res = new NextResponse(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  res.cookies.set('decap_oauth_state', '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}