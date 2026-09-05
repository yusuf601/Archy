# About Yusuf: Personal Overview Design Specification

Date: 2026-09-06  
Target branch: `desktop-workspace-phase1`  
Target worktree: `/home/kali/Archy/.worktrees/desktop-workspace-phase1`  
Status: Written from the agreed brainstorming decisions; implementation has not started.

## 1. Purpose

Make the interior of About Yusuf a calm, personal, macOS-like profile application. Improve the organization and presentation of existing information. Do not invent a biography or ask the user to supply more personal information to complete this layout.

The hierarchy is identity, education, interests and learning, then favorite films and series. A longer page is explicitly acceptable: enjoyable browsing takes priority over fitting the whole application into one screen.

The earlier desk/notebook implementation is the starting code, not the target design.

## 2. Global constraints

- Scope is the interior of the About Yusuf app at `/about`.
- Do not modify the top bar, dock, terminal, other app interiors, routing, or mobile portfolio.
- Do not modify the shared `DesktopAppFrame` component or global font configuration.
- Use neutral light and dark surfaces; no green application backgrounds.
- Do not render selected work, project links, Arch Linux, daily-driver information, or system widgets in About.
- Render Films above Series, with both groups present together and no tabs or category-toggle buttons.
- Use Caveat only for short supporting copy; use a clean system sans-serif for primary content.
- Preserve the six approved media titles, their years, their types, and their order within each group.
- Preserve original image files; do not stretch artwork or crop artwork, faces, titles, or credits.
- Preserve existing unrelated worktree changes; never stage the entire dirty worktree.
- This documentation request authorizes spec and plan files only, not implementation, asset downloads, or deployment.

These constraints are copied into the implementation plan.

## 3. Approved content

### Identity and education

| Field | Visible value |
| --- | --- |
| Name | Muh Yusuf |
| Role | Informatics student |
| University | Halu Oleo University |
| Program | Informatics Engineering |
| Semester | 5th semester |

Use the existing pixel-art avatar at `public/avatar.png` and the existing university logo. The avatar appears once, in the main profile area. It does not repeat in the sidebar. The university logo supports the education text and remains visually subordinate to the avatar and name.

Do not add the previous generic introductory sentence, greeting, or slogan. Do not infer a different semester from the date.

### Interests and learning

| Interests | Currently Learning |
| --- | --- |
| Computer Vision | Data Science |
| Computation | Low-level programming |
| Systems | Machine Learning |

These are interests and learning topics, not claims of mastery. No ratings, skill bars, years of experience, status dots, or badges.

### Personal collection

Section heading: **On Screen**  
Supporting copy: **Favorite films & series**

| Group | Title | Year |
| --- | --- | --- |
| Films | The Martian | 2015 |
| Films | Leave the World Behind | 2023 |
| Films | Cars | 2006 |
| Series | Reply 1988 | 2015 |
| Series | FROM | 2022 |
| Series | The Night Agent | 2023 |

No invented ratings, reviews, viewing dates, or reasons for liking a title.

## 4. Composition

The app interior uses a narrow navigation sidebar and a single reading pane. The pane is a continuous document; navigation does not swap pages or hide content.

~~~
Sidebar          Main reading pane

Overview         Avatar     Muh Yusuf
On Screen                   Informatics student

                            University logo + Halu Oleo University
                            Informatics Engineering
                            5th semester

                 ------------------------------------------------

                 Interests                 Currently Learning
                 Computer Vision           Data Science
                 Computation               Low-level programming
                 Systems                   Machine Learning

                 ------------------------------------------------

                 On Screen
                 Favorite films & series     [Caveat]

                 Films
                 Poster        Poster        Poster
                 Title         Title         Title
                 Year          Year          Year

                 Series
                 Poster        Poster        Poster
                 Title         Title         Title
                 Year          Year          Year
~~~

### Sidebar

- Only Overview and On Screen, optionally with existing Feather-family icons.
- No owner block, duplicate avatar, learning destination, project destination, or system information.
- Starting desktop width: 168px; 152px at compact desktop widths.
- Navigation remains visible while the reading pane scrolls.
- An understated background marks the section being read; use `aria-current="location"`.
- Selecting Overview returns to the top of the profile. Selecting On Screen moves the reading pane to its heading.
- Keep `/about` as the route. Preserve useful existing heading anchors `about-profile-heading` and `on-screen-heading`.
- The active state follows manual scrolling as well as navigation clicks. It must not only track the last clicked item.

### Identity

- Starting desktop avatar size: 112px square, with the whole image visible and no rotation.
- Align the avatar beside the identity text, with a 24px gap.
- Name: approximately 36px, semibold; role: 16px, regular.
- Education follows the identity in the same text column. It is a single grouped composition, not a separate card.
- University name has more weight than program and semester. Logo is approximately 32–40px, fitted with its intrinsic ratio.
- Reserve image dimensions to prevent layout movement.

### Interests and learning

- Two aligned text columns below the identity, separated from it with whitespace and one subtle horizontal divider.
- Section labels use sans-serif, approximately 15–16px semibold.
- List text uses approximately 15–16px with comfortable line spacing.
- No containers, filled tiles, per-row icons, or vertical borders.
- On narrower available widths, stack Interests above Currently Learning.

### On Screen

- Keep this section in the main document, following the profile information.
- Films is the first subgroup; Series is the second. Both always render.
- Each subgroup uses three poster columns on normal desktop widths.
- Use a common poster presentation area with a 2:3 ratio, approximately 180px wide at a typical desktop size, capped near 200px on wider layouts.
- Titles and years are below posters, left-aligned. Titles wrap naturally; do not ellipsize the approved long film title.
- Use the same column geometry for Films and Series. Do not space short-title posters differently.
- Leave approximately 40px between subgroups and 16–24px between posters.
- No category switches, carousels, hidden groups, modal previews, or poster click actions are required.
- A slight hover lift is optional; it must not imply a click action and must disappear under reduced motion. A static treatment is acceptable.

## 5. Typography and color

Use an About-scoped system sans stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Do not change typography elsewhere.

Use **Caveat**, preferably weight 600, at 18–20px for **Favorite films & series**. Use a local, licensed font asset with `font-display: swap`, and name the family `About Caveat` to avoid changing existing font behavior. Do not apply Caveat to sidebar labels, names, education, Films/Series subheadings, poster titles, or years. Do not invent helper text just to use the font more often.

Suggested initial tokens, to be checked visually:

| Token | Light | Dark |
| --- | --- | --- |
| Main surface | #f7f7f9 | #202023 |
| Sidebar | #ededf0 | #252528 |
| Primary text | #242426 | #ededf0 |
| Secondary text | #626268 | #b7b7bf |
| Separator | #d6d6dc | #47474e |
| Accent/focus | #1767c9 | #94bfff |
| Selection surface | #e0e8f4 | #333e50 |

Respect system color preference. The green tones inside the existing avatar or authentic posters are image content, not application surface colors.

Do not use glass panels, tinted paper cards, handwritten headings, tilted blocks, neon decoration, terminal styling, or dashboard statistics. Use alignment and spacing as the main grouping tools.

## 6. Scrolling, sizing, and accessibility

- Keep the existing desktop/mobile switch: the desktop shell currently starts at 1024px viewport width. Do not redirect smaller devices into this app or redesign the separate mobile portfolio.
- The About wrapper fills the available app content area. Its sidebar does not scroll with the reading pane.
- Use one intentional vertical scroll container for About content, with no horizontal page overflow.
- At 1440×900, identity and learning should be easily visible, with On Screen beginning nearby. This is an initial composition goal, not a requirement to shrink all six posters into the first viewport.
- At 1024×768 and 1280×800, all content must remain comfortably readable and reachable by vertical scrolling.
- At 200% browser zoom, allow the existing mobile fallback to operate; do not change the global media query. Also test the About component in an isolated narrow fixture for sensible stacking.
- If the available reading pane is below approximately 560px, stack learning columns and reduce media columns to two, then one where needed.
- Use semantic sections and heading hierarchy: shared app title remains h1, profile and On Screen use h2, learning groups and Films/Series use h3, poster titles use h4.
- Make navigation keyboard-operable, preserve visible focus, and honor reduced motion for scrolling and transitions.
- Image alt text describes identity or the exact media title. Decorative icons are hidden from assistive technology.
- Broken media images retain reserved space and a readable title/year; use a small noninteractive “Poster unavailable” fallback rather than a broken-image glyph.
- If an optional media group is empty, keep its heading with “No films listed.” or “No series listed.” Neither is expected with the approved catalog.

## 7. Asset preparation

The user delegated asset sourcing and fit checking to the assistant. They do not need to download or resize anything manually. This work occurs during implementation, not during document creation.

For each of the six titles:

1. Inspect the current full-resolution file, its dimensions, and the actual artwork bounds. A common frame or `object-fit: contain` alone does not resolve embedded margins.
2. Prefer an authentic vertical poster with approximately 2:3 artwork coverage, at least 600×900 where available. Do not replace a series with a different title or an unintended season-specific image.
3. Keep a suitable existing asset. Source an individual replacement only when quality, baked-in borders, or proportions make it unsuitable.
4. Prefer studio/distributor press assets or an established media catalog with identifiable provenance. Record the exact source and any usage terms; do not assume an image is freely licensed.
5. Avoid regenerating posters or altering their artwork. Prefer a better source over an aggressive crop. If margin-only normalization is needed, retain the original and document exactly which empty margins were removed using an appropriate image-editing workflow.
6. Save new derivatives/replacements in `src/assets/images/media/about/`; do not overwrite or delete the existing six image files.
7. Verify the title/year/type against the existing data and assess all six together at their intended display size.

Create `src/assets/images/media/about/SOURCES.md` during implementation. Each row records title, original filename, chosen local filename, source page, asset URL when applicable, acquisition date, dimensions, margin assessment, normalization performed, and applicable rights/attribution notes. Existing assets with unknown sources must be labeled honestly.

Do not silently accept a visibly undersized poster to claim completion. If suitable source material cannot be obtained, identify that title and the exact remaining limitation.

The avatar stays at `public/avatar.png`; the cropped anime asset is not used. The university logo stays unchanged.

## 8. Implementation boundaries

Current files:

- `src/desktop/apps/AboutApp.jsx`: composition currently includes sidebar identity, projects, and Arch Linux. Replace only its About interior.
- `src/components/about/OnScreenShelf.jsx`: currently filters one type using local state. Change to two visible groups.
- `src/data/aboutContent.js`: keep catalog interface; add explicit role and interests, standardize approved visible capitalization. Legacy unused exports may remain for compatibility but must not render.
- `src/desktop/desktop.css`: contains existing About styles among unrelated local modifications. Remove obsolete About content selectors only. Retain About-specific frame/titlebar rules and the old tokens they consume so app chrome does not change.

Recommended new files:

- `src/components/about/AboutSectionNav.jsx`: narrow navigation and section-following behavior.
- `src/desktop/apps/AboutApp.css`: fully scoped layout, typography, theme, and media presentation.
- `src/assets/fonts/about/`: local Caveat font and its license/provenance.
- `src/assets/images/media/about/`: only needed poster replacements/derivatives and provenance.

Keep `OnScreenShelf({ items })` as the public collection interface. No new UI framework, routing layer, global theme controller, or application state store is needed.

## 9. Acceptance criteria

- The profile contains the approved identity and education values with one avatar and one university logo.
- Interests and Currently Learning are separate, correctly ordered groups.
- No project promotion, Arch Linux, daily-driver copy, desk-owner block, or unsupported personal prose remains.
- Sidebar contains exactly Overview and On Screen, stays available during scrolling, and follows the section in view.
- All six posters are in the document together, with Films before Series and no toggle controls.
- Poster artwork appears consistently sized; each title and year is readable below it.
- “Favorite films & series” visibly uses Caveat and remains legible at 18–20px.
- Light and dark modes have neutral surfaces; normal text meets 4.5:1 contrast.
- Existing About close behavior works; top bar, dock, terminal, other applications, and mobile portfolio have no implementation changes.
- Targeted behavioral tests and the full existing test suite pass; the production build succeeds.
- Browser inspection covers light/dark desktop, compact desktop, scrolling, keyboard navigation, reduced motion, image failure, font loading, and both film and series rows.

## 10. Approval boundary

The user approved the direction and content through brainstorming and requested this specification plus a plan. Producing these documents is the current deliverable. Do not execute the plan or download assets until the user asks to implement.
