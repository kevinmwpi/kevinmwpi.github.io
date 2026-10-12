# kevinpi.dev

Personal site of Kevin Pi: <https://kevinpi.dev/>

Plain HTML and CSS with no build step. Vercel serves the `public/` folder as
it is. One small script, `public/assets/site.js`, adds the scroll motion, and
the page reads the same without it.

## Files

| Path | What it is |
|---|---|
| `public/index.html` | The whole page. All text lives here. |
| `public/assets/style.css` | All styling, commented section by section. |
| `public/assets/site.js` | Scroll motion only: about 170 commented lines, no dependencies. |
| `public/assets/fonts/` | The two web fonts, with their license and a note on how they were made. |
| `public/assets/og.png` | The image shown when the link is shared (1200 × 630). |
| `public/assets/favicon.svg`, `public/favicon.ico`, `public/assets/apple-touch-icon.png` | Browser and home-screen icons: the initials KP in black on the blue. |
| `public/404.html` | Shown for any address that does not exist. |
| `public/robots.txt`, `public/sitemap.xml` | For search engines. |
| `vercel.json` | Vercel settings: serve `public/`, send security headers, cache the fonts for a year. |

## Editing

- **Text:** edit `public/index.html`. Each section is marked with a comment
  (`<!-- Work -->`, `<!-- Projects -->`, and so on).
- **A new project:** copy one `<div class="row is-link">` block inside the
  Projects section and change its text and links.
- **Colors, spacing, type sizes:** the variables at the top of
  `public/assets/style.css`.
- **The tab icon:** `public/assets/favicon.svg` is the drawing;
  `public/favicon.ico` and `public/assets/apple-touch-icon.png` are pictures
  of it at 16, 32, 48 and 180 pixels. After changing any of them, raise the
  `?v=` number on the icon links in `public/index.html` and
  `public/404.html`: browsers keep their own copy of a site's icon.
- **The fonts** are cached for a year. If one ever changes, give it a new
  file name.

## Preview locally

```sh
python3 -m http.server 8000 --directory public
```

Then open <http://localhost:8000>. The security headers in `vercel.json` only
apply on Vercel.

## Publish

- **Push to `main`.** Vercel deploys it to kevinpi.dev in under a minute.
- **Push any other branch, or open a pull request.** Vercel builds a preview
  with its own link, so a change can be checked before it goes live. Preview
  links ask you to sign in to Vercel.

## Hosting

- **Domain:** kevinpi.dev, registered at Cloudflare, with its DNS at
  Cloudflare. Two records point it at Vercel; both are set to "DNS only",
  because Vercel issues the HTTPS certificate itself.
- **www.kevinpi.dev** redirects to kevinpi.dev (set in the Vercel project's
  domain settings).
- **kevinmwpi.github.io**, the old address: GitHub Pages serves the
  `gh-pages` branch of this repository, which only forwards visitors to the
  same page on kevinpi.dev. Leave that branch out of `main`.

## Layout

A 12-column grid runs through the whole page. On a desktop, text starts on
three lines only: columns 1, 4 and 10. The name at the top is drawn as vector
outlines of the bold typeface, so it scales with the page and lines up with
those columns exactly.

The typeface is a subset of TeX Gyre Heros, a free Helvetica-compatible font.
See `public/assets/fonts/README.md` for its license.

## Color

Black on off-white, plus one color: a baby blue (`--accent` at the top of
`public/assets/style.css`). The blue is too light to read as text on the
page, so it is only ever a field behind black text or a shape: the block
beside the name, the bar that opens each section, the Contact section, the
row under the pointer.

The icons and the share image carry the same blue as a fixed value. If
`--accent` changes, they need redrawing too.

## Motion

All of it lives in the "Motion" and "Pinned bar" blocks of
`public/assets/style.css` and in `public/assets/site.js`. Delete those and
the page shows the same content in the same place. Nothing is hidden or
delayed for visitors with scripts off or whose device asks for reduced
motion.

- On load, the letters of the name rise into place and the blue block
  wipes in.
- The top of the page holds still while the rest slides up over it, and the
  name turns from black to blue as it is covered.
- Sections and rows that start below the screen settle in as they arrive:
  the rule draws from the left, then the text.
- Once the name is covered, a bar is pinned to the top with the section
  links, a marker on the section being read and a line showing progress
  through the page.
