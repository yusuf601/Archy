# About poster provenance and inspection

Inspected on 2026-09-06. All six existing files were opened at their original
1200×1800 resolution. Their common **file** ratio of 2:3 is distinct from the
artwork bounds below; it does not establish consistent visible poster size.

Task 2's updated ruling retains all six original assets pending the Task 6
layout inspection. No image was downloaded, regenerated, cropped, stretched,
re-encoded, overwritten, or deleted. Existing static imports remain unchanged.
The paths in this table are relative to `src/assets/images/media/`.

| Title | Original filename | Chosen local filename | Source page | Asset URL | Acquisition date | Dimensions | Margin assessment | Normalization performed | Rights / attribution notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| The Martian (2015) | `the-martian.jpg` | `the-martian.jpg` | source unknown | source unknown | unknown; inspected 2026-09-06 | File 1200×1800; visible artwork approximately 900×1330 at (150,235) | Approximately 150px left/right and 235px top/bottom empty dark surround; visibly undersized in a common frame | None; retained pending Task 6 | Original origin and usage license unknown; credits visibly identify Twentieth Century Fox. No free-use claim. |
| Leave the World Behind (2023) | `leave-the-world-behind.jpg` | `leave-the-world-behind.jpg` | source unknown | source unknown | unknown; inspected 2026-09-06 | File 1200×1800; artwork approximately 1200×1778 at (0,11) | Thin approximately 11px top/bottom dark surround; fills almost the entire frame | None; retained | Original origin and usage license unknown; Netflix branding is visible. No free-use claim. |
| Cars (2006) | `cars.jpg` | `cars.jpg` | source unknown | source unknown | unknown; inspected 2026-09-06 | File 1200×1800; printed artwork approximately 1186×1732 at (9,34) | Photographed/scanned physical poster with visible corner pins and narrow uneven outer border; nearly full-frame | None; retained pending Task 6 | Original origin and usage license unknown; Disney/Pixar copyright appears on the artwork. No free-use claim. |
| Reply 1988 (2015) | `reply-1988.jpg` | `reply-1988.jpg` | source unknown | source unknown | unknown; inspected 2026-09-06 | File 1200×1800; visible artwork approximately 660×950 at (270,425) | Approximately 270px left/right and 425px top/bottom empty dark surround; strongest visible undersizing | None; retained pending Task 6 | Original origin and usage license unknown; Korean title includes 1988 and tvN branding is visible. No free-use claim. |
| FROM (2022) | `from.jpg` | `from.jpg` | source unknown | source unknown | unknown; inspected 2026-09-06 | File/artwork 1200×1800 at (0,0) | No substantial empty surround; artwork runs to file edges | None; retained pending Task 6 | Original origin and usage license unknown; MGM+ and IGN Exclusive branding visible. Poster says “Returns Apr 19”; this is not verified as 2022 launch artwork. Season/date suitability remains unresolved. No free-use claim. |
| The Night Agent (2023) | `the-night-agent.jpg` | `the-night-agent.jpg` | source unknown | source unknown | unknown; inspected 2026-09-06 | File 1200×1800; visible artwork approximately 882×1200 at (159,300) | Approximately 159px side and 300px top/bottom empty dark surround; visible artwork is wider than 2:3 | None; retained pending Task 6 | Original origin and usage license unknown; French-language Netflix poster with March 23 release text. No free-use claim. |

## Measurement notes

Coordinates use the top-left origin, in source pixels. Artwork rectangles above
are visual estimates, not applied crop instructions. JPEG transition pixels can
extend beyond the apparent artwork. ImageMagick's unmodified `%@` trim geometry
returned the following non-background bounds, which include those fringes:

| File | Automated non-background bounds |
| --- | --- |
| `the-martian.jpg` | `912x1336+144+232` |
| `leave-the-world-behind.jpg` | `1200x1792+0+0` |
| `cars.jpg` | `1200x1762+0+15` |
| `reply-1988.jpg` | `672x952+264+424` |
| `from.jpg` | `1200x1800+0+0` |
| `the-night-agent.jpg` | `913x1216+144+288` |

Git records the files' introduction in `5b413ecf886e40b82798944136292e260a018b1b`
(`feat: add About visual assets`, 2026-08-28). That commit provides no original
download URLs or licensing metadata; its date is not an acquisition date.

## Deferred decisions

At the intended roughly 180×270 display frame, the existing Martian artwork
would be only about 135×200, Reply 1988 about 99×143, and Night Agent about
132×180. These estimates explain why a common file ratio and `object-fit:
contain` do not resolve the present embedded margins. Task 6 must assess the
actual page and request individual source replacements if needed; arbitrary
per-title CSS zoom or cropping is not an asset fix.

Initial source discovery found the [20th Century Studios Martian page](https://www.20thcenturystudios.com/movies/the-martian),
[tvN Reply 1988 poster page](https://tvn.cjenm.com/ko/reply1988/photo/),
and [IMP Awards 2023 Night Agent poster entry](https://www.impawards.com/tv/night_agent.html).
These are possible leads only: no candidate images were acquired or accepted,
and none establishes the source or rights of the existing local files.

## Task 6 browser inspection (2026-09-06)

The executable QA pass rendered and decoded all six originals at 1440×900 in
light/dark mode, 1280×800, and 1024×768. Separate Films and Series screenshots
in `/tmp/archy-about-overview-qa/` were visually inspected. The desktop frames
are equally sized at 200×300 CSS pixels, use `object-fit: contain`, and preserve
all source pixels. Titles and years remain readable below the frames.

Visible artwork coverage is **not normalized**: The Martian occupies roughly
150×222 CSS pixels, Reply 1988 roughly 110×158, and The Night Agent roughly
147×200 inside their 200×300 frames. Their baked-in dark margins remain plainly
visible next to Leave the World Behind, Cars, and FROM. Cars retains its scanned
physical-poster presentation; FROM's “Returns Apr 19” / MGM+ / IGN Exclusive
artwork still has unresolved season/date suitability. Origins and rights remain
unknown for all six originals.

The Task 6 takeover ruling stopped further open-ended sourcing and required
retaining originals unless an already-downloaded, verifiable replacement was
available. No such candidate was found in the working tree or inspected temporary
asset files. No poster was downloaded, replaced, normalized, cropped, or altered
in Task 6. Passing browser assertions establish loading, fit, dimensions and
behavior; they do not establish equal visible artwork coverage or source rights.
