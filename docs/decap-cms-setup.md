# Decap CMS — Setup guide (iSpotly)

This site uses [Decap CMS](https://decapcms.org) (formerly Netlify CMS) with a custom GitHub OAuth proxy running on Vercel. Your client opens `https://YOUR_DOMAIN/admin/`, signs in with GitHub, edits content, and Decap commits straight to this repo.

---

## 1. What's already in the repo

| Path | Purpose |
| ---- | ------- |
| `public/admin/index.html` | Loads the Decap CMS bundle from a CDN. |
| `public/admin/config.yml` | Collections (Blog Posts, Video Feed, Main Pages) + SEO fields. |
| `src/app/api/auth/route.ts` | Vercel serverless function — starts the GitHub OAuth flow. |
| `src/app/api/callback/route.ts` | Vercel serverless function — exchanges `code` for `access_token` and `postMessage`s it back to the Decap popup. |
| `content/` | Where your client's content lives once it gets committed. |

---

## 2. One-time GitHub OAuth app

1. Go to **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Fill in:
   - **Application name**: `iSpotly CMS`
   - **Homepage URL**: `https://YOUR_DOMAIN`
   - **Authorization callback URL**: `https://YOUR_DOMAIN/api/callback`
3. Hit *Register application*.
4. Click *Generate a new client secret*.
5. Copy the **Client ID** and **Client Secret**.

> If you have a staging deploy on a different URL, register a second OAuth app for it (the callback URL must match exactly).

---

## 3. Vercel environment variables

In Vercel → Project → Settings → Environment Variables, add:

| Name | Value | Environments |
| ---- | ----- | ------------ |
| `GITHUB_CLIENT_ID` | OAuth app client id from step 2 | Production + Preview |
| `GITHUB_CLIENT_SECRET` | OAuth app client secret | Production + Preview |
| `DECAP_BASE_URL` *(optional)* | `https://YOUR_DOMAIN` — only set this if Vercel preview URLs are not what you want the redirect to use | Production |

Redeploy after adding the secrets so the route handlers can read them.

---

## 4. Update `public/admin/config.yml`

Open `public/admin/config.yml` and edit two lines:

```yaml
backend:
  name: github
  repo: shawnzanco972/ispotly-web-design   # ← already pointing at this repo
  branch: main
  base_url: https://YOUR_DOMAIN              # ← change to the live domain
  auth_endpoint: api/auth
```

`base_url` must be the public origin of the deployed site (no trailing slash). It's where Decap will send the user when they click *Login with GitHub*.

---

## 5. How the auth flow works

```
Client clicks "Login with GitHub" in /admin
  → window.open( base_url + "/" + auth_endpoint )    (= /api/auth)
  → /api/auth sets a CSRF cookie and 302s to github.com/login/oauth/authorize
  → user approves on github.com
  → GitHub redirects to /api/callback?code=...&state=...
  → /api/callback validates state, swaps code for access_token
  → /api/callback returns a small HTML page that does
       window.opener.postMessage('authorization:github:success:{"token":...}', '*')
  → Decap CMS picks up the token, talks to GitHub directly from the browser
```

No database, no session store. The token lives only in the browser.

---

## 6. Local preview without OAuth

`config.yml` has `local_backend: true`, so you can run the CMS against a local file proxy:

```bash
# in one terminal
npx decap-server

# in another terminal
npm run dev
```

Then open `http://localhost:3000/admin/` and Decap will read/write the `content/` folder directly — no OAuth round-trip.

---

## 7. Collections at a glance

- **Blog Posts** — `content/blog/*.md`. Markdown body + a per-post `seo` block (Meta Title, Meta Description, OG Image, raw JSON-LD).
- **Video Feed** — `content/feed/*.md`. One file per TikTok/Instagram clip. Choose platform, paste video id / shortcode, set display order. Pinned items can float to the top.
- **Main Pages** — `content/pages/{home,blog-index,faq}.md`. Edit headline, subtitle, CTA labels, FAQ items, plus the same SEO block.

The SEO block is repeated in every entry by design — the client can override per-page metadata and the JSON-LD field accepts any valid Schema.org snippet (Article, FAQPage, SoftwareApplication, etc.).

---

## 8. Wiring SEO + JSON-LD into the rendered pages

The CMS only stores values; the Next.js pages need to read them. Suggested pattern (already supported by the post layout — extend the same way for pages):

```tsx
// src/app/blog/[slug]/page.tsx
const post = getPost(slug);

export async function generateMetadata({ params }) {
  return {
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.description,
    openGraph: {
      images: post.seo?.ogImage ? [post.seo.ogImage] : post.cover ? [post.cover] : [],
    },
  };
}

// In the component:
{post.seo?.schemaJsonLd && (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: post.seo.schemaJsonLd }}
  />
)}
```

The current `posts.ts` is hard-coded for the launch. To switch to CMS-managed posts, replace it with a small loader that reads the markdown files in `content/blog/` (using `gray-matter` + `remark` or any MDX pipeline).

---

## 9. Inviting the client

1. Make sure they have a GitHub account with **write access to this repo** (Settings → Collaborators → invite).
2. Send them `https://YOUR_DOMAIN/admin/`.
3. They click *Login with GitHub*, authorize the OAuth app, and start editing.

That's it — no separate CMS user accounts to manage.

---

## 10. Troubleshooting checklist

- **`Invalid OAuth state` after login** → cookie was dropped. Make sure the admin and the auth endpoints live on the **same origin**.
- **Login popup closes silently** → check the GitHub OAuth app callback URL and the `base_url` in `config.yml` match the deployed origin exactly.
- **`401` on commits** → the signed-in user does not have repo write access. Add them as a collaborator.
- **Editor saves but nothing deploys** → check Vercel's build logs; Decap commits to `main`, Vercel auto-deploys, but a failing build won't surface inside the CMS.
- **Editorial Workflow not wanted** → remove `publish_mode: editorial_workflow` from `config.yml` to publish on save instead of going through draft → review.
