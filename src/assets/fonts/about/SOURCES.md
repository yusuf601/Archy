# About Caveat font

- Family: Caveat; style: normal; weight: 600 (SemiBold); subset: Latin.
- Local file: `caveat-latin-600.woff2` (51,220 bytes).
- Acquired: 2026-09-06, downloaded unchanged from the official Google Fonts CDN.
- Family page: https://fonts.google.com/specimen/Caveat
- Google Fonts stylesheet: https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap
- Exact WOFF2 URL: https://fonts.gstatic.com/s/caveat/v23/WnznHAc5bAfYB2QRah7pcpNvOx-pjSx6eIWpYQ.woff2
- License source: https://raw.githubusercontent.com/google/fonts/main/ofl/caveat/OFL.txt
- Upstream font repository: https://github.com/googlefonts/caveat
- Copyright: 2014 The Caveat Project Authors.
- License: SIL Open Font License 1.1; the complete original notice and license
  are retained in `OFL.txt`. The font is not relicensed under the application's license.

Google Fonts varies its response by browser capability; the default curl user
agent returned a TrueType URL. The parent implementation agent resolved the
official Latin WOFF2 URL above from the browser-specific stylesheet. Only that
WOFF2 was downloaded; no font conversion, subsetting, or internal renaming was
performed.

Validation: `file` recognizes Web Open Font Format Version 2, TrueType, version
1.0; `fc-scan` decodes it as `Caveat,Caveat SemiBold`, style `SemiBold,Regular`,
Fontconfig weight 180 (demibold). This is an actual font, not an HTML response.

SHA-256:

```text
d51e2283010e661d9f3dafdc9ff4b82b2ebcb2f7aa43ca48a105f5f68d46cc32  caveat-latin-600.woff2
1f9d81d094273d82f3898a1ee8b598a717d050ecbf5ff7bede105b704880157b  OFL.txt
```

Integration is intentionally deferred to the About layout task: register the
CSS family alias `About Caveat`, `font-style: normal`, `font-weight: 600`, and
`font-display: swap` in About-scoped CSS. Use it only for “Favorite films &
series” at 18–20px. This asset task changes no global font settings or CSS.
