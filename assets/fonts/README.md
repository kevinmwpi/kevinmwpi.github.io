# Fonts

`heros-subset-regular.woff2` and `heros-subset-bold.woff2` are modified versions
of **TeX Gyre Heros** 2.004 (Regular and Bold) by Bogusław Jackowski and
Janusz M. Nowacki, a free Helvetica-compatible typeface based on URW Nimbus
Sans L.

The original is released under the GUST Font License (`GUST-FONT-LICENSE.txt`
in this folder), an instance of the LaTeX Project Public License. The complete,
unmodified fonts are available from
<https://www.gust.org.pl/projects/e-foundry/tex-gyre/heros>.

## Changes from the original

- Subset to Basic Latin, Latin-1 Supplement and a few punctuation marks
  (221 glyphs of 1,090).
- OpenType features reduced to `kern`, `liga`, `tnum`, `pnum`, `lnum`, `cpsp`.
- Vertical metrics set to ascent 1080 / descent 351 in both weights, so that
  capitals sit centred in the line box and both weights share one baseline.
- Renamed to "Heros Subset", as the license requests for modified versions.
- Converted from OpenType (CFF) to WOFF2.

These files are not supported by the original authors.
