# kevinmwpi.github.io

Personal site of Kevin Pi: <https://kevinmwpi.github.io/>

Plain HTML and CSS with no build step; GitHub Pages serves the files in this
repository as they are. One small script, `assets/site.js`, adds the scroll
motion, and the page reads the same without it.

## Files

| Path | What it is |
|---|---|
| `index.html` | The whole page. All text lives here. |
| `assets/style.css` | All styling, commented section by section. |
| `assets/site.js` | Scroll motion only: about 170 commented lines, no dependencies. |
| `assets/fonts/` | The two web fonts, with their license and a note on how they were made. |
| `assets/og.png` | The image shown when the link is shared (1200 × 630). |
| `assets/favicon.svg`, `favicon.ico`, `assets/apple-touch-icon.png` | Browser and home-screen icons: the initials KP in black on the orange. |
| `404.html` | Shown for any address that does not exist. |
| `.nojekyll` | Tells GitHub Pages to skip its Jekyll build. |

## Editing

- **Text:** edit `index.html`. Each section is marked with a comment
  (`<!-- Work -->`, `<!-- Projects -->`, and so on).
- **A new project:** copy one `<div class="row is-link">` block inside the
  Projects section and change its text and links.
- **Colors, spacing, type sizes:** the variables at the top of
  `assets/style.css`.
- **The tab icon:** `assets/favicon.svg` is the drawing; `favicon.ico` and
  `assets/apple-touch-icon.png` are pictures of it at 16, 32, 48 and 180
  pixels. After changing any of them, raise the `?v=` number on the icon
  links in `index.html` and `404.html`. Browsers keep icons for a long time,
  and the new number makes them fetch the new file.

## Preview locally

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Publish

Push to `main`. GitHub Pages redeploys in about a minute.

## Layout

A 12-column grid runs through the whole page. On a desktop, text starts on
three lines only: columns 1, 4 and 10. The name at the top is drawn as vector
outlines of the bold typeface, so it scales with the page and lines up with
those columns exactly.

The typeface is a subset of TeX Gyre Heros, a free Helvetica-compatible font.
See `assets/fonts/README.md` for its license.

## Color

Black on off-white, plus one orange (`--accent` at the top of
`assets/style.css`). The orange is too light to read as text on the page, so
it is only ever a field behind black text or a shape: the block beside the
name, the bar that opens each section, the Contact section, the row under the
pointer.

## Motion

All of it lives in the "Motion" and "Pinned bar" blocks of `assets/style.css`
and in `assets/site.js`. Delete those and the page shows the same content in
the same place. Nothing is hidden or delayed for visitors with scripts off or
whose device asks for reduced motion.

- On load, the letters of the name rise into place and the orange block
  wipes in.
- The top of the page holds still while the rest slides up over it, and the
  name turns from black to orange as it is covered.
- Sections and rows that start below the screen settle in as they arrive:
  the rule draws from the left, then the text.
- Once the name is covered, a bar is pinned to the top with the section
  links, a marker on the section being read and a line showing progress
  through the page.
