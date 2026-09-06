# About poster provenance and inspection

## Current production choices — Task 6 review fix, 2026-09-06

This section supersedes the retained-original decisions in the historical notes
below. Four authentic replacements were downloaded, decoded, inspected at full
resolution, copied unchanged into this directory, and imported by
`src/data/aboutContent.js`. All six pre-existing originals remain byte-for-byte
unchanged at their original `src/assets/images/media/` paths. No image editing,
normalization, regeneration, content cropping, stretching, or re-encoding was
needed. Filenames below are relative to `src/assets/images/media/`.

| Title | Original filename | Chosen local filename | Source page | Asset URL | Acquisition date | Dimensions | Margin assessment | Normalization performed | Rights / attribution notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| The Martian (2015) | `the-martian.jpg` | `about/the-martian-2015.jpg` | [IMP Awards theatrical poster](https://www.impawards.com/2015/martian.html), added June 8, 2015 | https://www.impawards.com/2015/posters/martian_xlg.jpg | 2026-09-06 | 1000×1500 | Full-frame authentic “Bring Him Home” artwork, no embedded surround | None; downloaded bytes unchanged | Twentieth Century Fox artwork and credits retained; IMP identifies it as official theatrical art. Copyright remains with rights holders; no free-use license asserted. |
| Leave the World Behind (2023) | `leave-the-world-behind.jpg` | `leave-the-world-behind.jpg` | source unknown | source unknown | unknown; inspected 2026-09-06 | 1200×1800 | Nearly full frame, thin approximately 11px top/bottom edges; acceptable alongside replacements | None; original retained unchanged | Origin and usage license unknown; Netflix branding retained. |
| Cars (2006) | `cars.jpg` | `cars.jpg` | source unknown | source unknown | unknown; inspected 2026-09-06 | 1200×1800 | Physical-poster scan with narrow uneven edges; actual coverage is visually consistent with the row | None; original retained unchanged | Origin and usage license unknown; Disney/Pixar copyright remains on artwork. |
| Reply 1988 (2015) | `reply-1988.jpg` | `about/reply-1988-2015.jpg` | [Official tvN main poster gallery](https://tvn.cjenm.com/ko/reply1988/photo/), entry “메인 포스터” | https://poc-cf-image.cjenm.com/public/pcms/rep/B120156699/kr/B120156699_rep_1667888595311.jpg?v=1742978883 | 2026-09-06 | 1701×2410 | Full original artwork to edges; its slightly wider ratio leaves about 8.3 CSS px above/below at 200×300 contain fit | None; downloaded bytes unchanged | Direct CJ ENM/tvN asset; copyright retained. Gallery explicitly labels the main poster; Nov 6 premiere copy matches 2015 series. No free-use license asserted. |
| FROM (2022) | `from.jpg` | `about/from-2022.jpg` | [Blazing Minds season-one review, August 3, 2022](https://blazingminds.co.uk/from-tv-show-season-1-review/) | https://blazingminds.co.uk/wp-content/uploads/2022/08/FROM-TV-Show-Poster-EPIX.jpg | 2026-09-06 | 1200×1778 | Full-frame blue EPIX launch-era artwork; no later-season return date or IGN watermark | None; downloaded bytes unchanged | Review labels this image FROM TV Show Poster EPIX and the entry FROM Season 1 (2022); copyright belongs to EPIX/respective holders. Site reserves rights and does not grant reuse permission. |
| The Night Agent (2023) | `the-night-agent.jpg` | `about/the-night-agent-2023.jpg` | [IMP Awards first poster](https://www.impawards.com/tv/night_agent.html), added April 11, 2023 | https://www.impawards.com/tv/posters/night_agent_xlg.jpg | 2026-09-06 | 1013×1500 | Full-frame English Netflix artwork, no embedded surround | None; downloaded bytes unchanged | Authentic Netflix March 23 launch artwork; source page links the correct series IMDb ID tt13918776. Copyright retained; no free-use license asserted. |

The FROM replacement resolves the former season/date mismatch: it is the EPIX
poster shown with a dated 2022 season-one review, with no later-season date.
The catalog continues to identify the series' original year, 2022. The original
MGM+/IGN “Returns Apr 19” image is preserved but no longer imported.

Browser run `92e2b889-cd23-419d-8d95-a5e073064a52` decoded all six chosen images.
Both complete rows were visually inspected in light/dark at 1440×900 and at
1280×800 and 1024×768. At 200×300 frames, the replacement visible artwork is
approximately 200×300 (Martian), 200×283.4 (Reply), 200×296.3 (FROM), and
200×296.2 (Night Agent). Small ratio differences remain honestly visible with
contain fit; the former severe undersizing is gone, and all faces/titles/credits
are preserved. No per-title CSS zoom or crop is used.

SHA-256 of the unchanged downloaded production files:

```text
f94720a832d0183bb9e6ed4fa7e1e439808a3bc30989b8d8d8e9b70bb1e70e85  the-martian-2015.jpg
73be1989b52296ebc5e1a4da79986b1830a3d516c8ac8b8a5084fe6a22877554  reply-1988-2015.jpg
f380ac2eb6ae2acbf1c4a213fcfba01676f4b3eb8a17d0be7b7e7105b056b72e  from-2022.jpg
d3105700223699069e42b91708462954f9f02a8e7b9a1167761ea400d98dc17f  the-night-agent-2023.jpg
```

## Historical inspection before the review fix

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
