# About Yusuf App Design Specification

Status: approved direction for the About app only. This document intentionally excludes the Desktop Shell, dock, Projects, Firefox, Kitty, and Contact app.

## Objective

Create a dedicated About app that presents Yusuf as a person first and a programmer second. The app opens from the desktop dock as a full-page desktop document surface and contains two scrollable sections:

1. A profile page with identity, education, current focus, portrait artwork, and a short personal description.
2. An About page with mostly personal interests and a smaller amount of technical context.

The result should feel like a personal archive or profile document, not a resume, skills dashboard, or generic developer portfolio section.

## Content Direction

The content balance is approximately:

- 60% out-of-the-office / personal context
- 40% technical and study context

Technical information must remain useful but restrained. Do not turn the page into a logo wall, technology stack grid, or list of tools.

The content planning source is:

```text
me.md
```

`me.md` is a questionnaire owned by Yusuf, not a finished copy document. Only answers that Yusuf has explicitly filled in or marked as confirmed may be used in the interface. Questions, suggested prompts, empty fields, examples, and unfinished notes must never be rendered as user content. The implementation must not infer or invent personal facts when an answer is missing. Missing optional answers should remove that subsection cleanly rather than displaying placeholder copy.

Confirmed profile facts:

- Name: Muh Yusuf
- University: Halu Oleo University
- Major: Informatics Engineering
- Current semester: 5th semester
- Specialization: Computer Vision & Computation
- Current learning: data science, low-level programming, and machine learning
- Operating system context: Arch Linux

## Application Presentation

The About app is opened through the desktop route:

```text
/about
```

It uses the desktop shell's document-app presentation and occupies the main content area as a full-page app. It must not open as a small floating modal and must not create a second browser window.

The app owns its internal scroll position, but it does not introduce a second router hierarchy. The page is one About document with two major sections.

## Page One: Profile

The first viewport is a two-column profile composition on desktop.

### Left column

The left column contains:

- A clear `About` or `Profile` section heading
- `Muh Yusuf` as the primary identity
- Informatics Engineering, Halu Oleo University
- Fifth-semester status
- Computer Vision & Computation specialization
- A concise personal description sourced only from completed and confirmed answers in `me.md`
- A `Currently learning` block containing:
  - Data science
  - Low-level programming
  - Machine learning
- Optional external links only when their values exist in `me.md`

The copy should use short paragraphs and a calm editorial rhythm. Avoid resume language such as `expert`, `proficient`, `passionate developer`, or unverified claims.

### Right column

The right column contains the supplied anime artwork as the dominant visual.

Requirements:

- Use the portrait image as a large visual, not a small circular avatar
- Preserve the original artwork and transparent/white background behavior
- Keep the character readable at desktop widths
- Do not place dense technical labels over the artwork
- Do not crop the face or the main silhouette at common desktop viewport sizes

The supplied university logo may appear as a small supporting identity mark near the education information or beside the university name. It must not compete with the anime artwork and may be omitted if the composition becomes visually noisy.

## Page Two: Personal About

The second section begins after a deliberate vertical transition from the profile section. It should feel like the reader is moving from identity into personal context.

Recommended content order, populated only when Yusuf has supplied the corresponding answers in `me.md`:

1. `Currently` - a plain-language explanation of what Yusuf is learning and paying attention to now.
2. `On Screen` - favorite films and series.
3. `Outside the Stack` - non-technical interests, routines, preferences, or habits from `me.md`.
4. `Small Things` - short curiosities, recurring preferences, or personal details that make the page specific.

Sections should be rendered only when they have approved content. The page must not show empty headings, questionnaire prompts, fake statistics, inferred preferences, or generic filler paragraphs.

## On Screen Section

Films and series are grouped into one section rather than separate large pages. The section uses a compact view toggle:

```text
Films | Series
```

Initial content:

### Films

- The Martian
- Leave the World Behind
- Cars

### Series

- Reply 1988
- FROM
- The Night Agent

The poster shelf requirements are:

- Use portrait posters with a consistent 2:3 presentation ratio
- Show three to six titles in the initial content set
- Use a horizontal shelf with controlled overflow rather than a dense masonry grid
- Keep title and year metadata below each poster
- Use hover/focus emphasis without autoplay or aggressive scale animations
- Keep the selected toggle state obvious and keyboard accessible
- Do not require external network access for the layout to remain usable

Posters are visual references, not the primary content of the app. The implementation should use optimized local assets under `src/assets/images/` once the final files are selected. Do not place remote image URLs directly in the component as the only source.

## Visual Direction

The About app is a document surface that contrasts gently with the dark desktop wallpaper while remaining part of the same system.

- Use the existing desktop design tokens where possible
- Prefer soft light or lightly tinted document surfaces over a black technical panel
- Keep contrast high enough for body text and metadata
- Use Caveat only for small section-label accents such as `About`, `Currently`, or `On Screen`
- Use the established readable body and display typography for all substantive copy
- Do not use Caveat for paragraphs, metadata, buttons, or navigation
- Avoid excessive rounded cards, stacked cards, gradients, glass blur, and decorative tech motifs
- Let the anime artwork and personal writing provide the character
- Keep spacing generous enough that the page reads as one composition rather than a dashboard

The layout should prioritize a strong first viewport and then reward scrolling. The profile content and artwork must be visible together on a typical desktop viewport without requiring the user to hunt for the identity.

## Responsive Behavior

Desktop is the primary target, but the app must remain readable at narrower widths.

At desktop widths:

- Maintain the two-column profile composition
- Keep the artwork visually dominant
- Preserve a readable text measure instead of stretching paragraphs across the screen

At narrow widths:

- Collapse to one column
- Place identity and description before the artwork
- Keep the artwork contained without horizontal overflow
- Convert the poster shelf into a horizontally scrollable region
- Preserve the section toggle and keyboard focus order

This specification does not redesign the mobile portfolio shell. It only defines how About content behaves when the About app is rendered in a constrained viewport.

## Interaction Requirements

- Dock activation opens `/about`
- Refreshing `/about` keeps the About app selected
- Browser back/forward behavior remains owned by the existing application routing
- All external links use real destinations from completed and confirmed entries in `me.md`
- Poster toggle changes visible content without navigating away from `/about`
- Poster cards are non-interactive unless a real detail or external destination is provided
- Images have meaningful accessible labels
- Decorative artwork is marked decorative when it does not convey additional information

## Asset Requirements

Implementation should move or copy the supplied assets into source-controlled application assets without modifying `.gitignore`:

- Anime portrait: `src/assets/images/about-anime.png`
- University logo: `src/assets/images/halu-oleo-logo.png`
- Media posters: `src/assets/images/media/`

The implementation must verify that imports resolve from source and that the app does not depend on the root-level asset drop folder at runtime.

## Out Of Scope

- Projects layout or project screenshot browser
- Firefox Blog app and MDX/LaTeX rendering
- Kitty terminal behavior
- Dock ordering, dock magnification, or top-panel widgets
- Contact/Mail app
- Authentication, CMS, database, or admin editing
- User accounts, likes, comments, or media search
- A technical stack inventory unless a future content review explicitly restores it
- Automatic poster fetching at runtime

## Acceptance Criteria

1. Opening `/about` presents a dedicated full-page About app rather than the old generic About section.
2. The first viewport clearly shows Yusuf's identity, education, current study focus, and the large anime artwork together on desktop.
3. The university logo is secondary and does not overpower the portrait or text.
4. The page contains a second personal section with an intentional scroll transition.
5. Personal content is visibly dominant; technical content is supportive and not presented as a stack dashboard.
6. `On Screen` contains the three listed films and three listed series with a working Films/Series toggle.
7. Poster presentation is consistent, horizontally organized, and usable with keyboard focus.
8. Content is sourced from completed and confirmed entries in `me.md` or confirmed facts in this specification; unanswered questions and unfinished notes never appear.
9. Missing optional content produces no empty section or placeholder text.
10. Local asset imports work without root asset-folder access or runtime hotlinks.
11. Desktop and narrow-width layouts have no horizontal overflow or overlapping text.
12. Focused component and route tests cover profile rendering, optional content omission, toggle behavior, and `/about` routing.
