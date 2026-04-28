// GitHub OAuth — start endpoint for Decap CMS
// Decap will redirect the user here. We bounce them to GitHub's authorize page,
// stamping a CSRF state into a short-lived cookie.

import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new NextResponse("Server misconfigured: GITHUB_CLIENT_ID is missing.", { status: 500 });
  }

  const state = randomBytes(16).toString("hex");
  const origin =
    process.env.DECAP_BASE_URL?.replace(/\/$/, "") ?? req.nextUrl.origin;
  const redirectUri = `${origin}/api/callback`;

  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo,user");
  authorizeUrl.searchParams.set("state", state);
  authorizeUrl.searchParams.set("allow_signup", "false");

  const res = NextResponse.redirect(authorizeUrl.toString(), { status: 302 });
  res.cookies.set("decap_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600, // 10 minutes
  });
  return res;
}
