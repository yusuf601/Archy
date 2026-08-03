# Typography Motion Design

## Objective

Add restrained, brand-specific typographic motion to the active portfolio after the static typography system is in place. The motion should make headings, metadata, project cards, and manifesto text feel like a compiler/editorial system coming into focus, without becoming a generic animated landing page.

This is a second typography pass. It depends on the Typography System pass establishing stable font roles:

- Display text uses `font-display`.
- Reading copy uses `font-sans`.
- Terminal/code/metadata surfaces use `font-mono`.

## Current Context

The active app uses Framer Motion already:

- `Home.jsx`
- `SectionDivider.jsx`
- `About.jsx`
- `Projects.jsx`
- `Contact.jsx`
- several supporting components

`gsap` is not installed. The first motion pass should therefore use Framer Motion, not GSAP, unless a later plan explicitly adds GSAP.

The current motion style is mostly simple fade/slide reveals:

- `opacity: 0` to `1`
- small `y` shifts
- `whileInView`
- `viewport={{ once: true }}`

That is acceptable but generic. Typography motion should add a more specific language:

- compile/reveal rhythm
- syntax emphasis
- build-log stagger
- subtle hover typography physics

## Motion Direction

Target feel:

- precise
- quiet
- source-level
- editorial
- compiler-like
- readable first, animated second

Avoid:

- glitch spam
- typewriter on every heading
- neon flicker
- scramble text templates
- rotating words
- marquee overload
- scroll behavior that makes text hard to read
- animations that trigger continuously while reading

## Motion Principles

### Readability First

Text must be readable without waiting for animation.

Required:

- Animations should complete quickly.
- No paragraph should remain low-opacity for long.
- No motion should hide important CTA text.
- No animation should depend on horizontal scroll.

### Motion As Emphasis

Motion should support hierarchy:

- Hero line reveal.
- Section title phrase reveal.
- About keyword emphasis.
- Project card title/metadata hover response.

Motion should not be sprinkled evenly on every text node.

### Reduced Motion

Respect `prefers-reduced-motion`.

Implementation should use Framer Motion's `useReducedMotion()` or equivalent CSS media query.

When reduced motion is enabled:

- No staggered word/line transitions.
- No scale/translate text effects.
- Text renders immediately at full opacity.
- Hover effects should reduce to color/border changes only.

## Motion Patterns

### 1. Compiler Reveal

Use for:

- `Home.jsx` hero H1.
- `SectionDivider.jsx` title.
- `Projects.jsx` section title.
- `About.jsx` main title.
- `Contact.jsx` main title.

Behavior:

- Reveal by line or phrase, not character.
- Initial state:
  - `opacity: 0`
  - `y: 18`
  - optional `filter: blur(4px)`
- Final state:
  - `opacity: 1`
  - `y: 0`
  - `filter: blur(0px)`
- Duration: `0.45` to `0.7` seconds.
- Stagger: `0.06` to `0.12` seconds.

Do not use a typewriter effect for these headings.

### 2. Syntax Emphasis

Use for:

- `About.jsx` manifesto paragraph.
- Optional selected supporting copy in `Home.jsx`.

Behavior:

- Wrap only a few key terms in emphasis spans.
- Initial emphasis color can be muted.
- On view, key terms move to cyan/gold with a slight opacity lift.

Candidate emphasized terms:

- `abstractions`
- `memory`
- `systems`
- `research`
- `source-level`
- `implementation`

Color rules:

- Systems/API terms: `var(--accent-info)`.
- Build/value terms: `var(--accent-warning)`.
- Do not reintroduce broad green.

### 3. Build Log Rhythm

Use for:

- `Home.jsx` artifact panel metadata:
  - `target: stl`
  - `mode: scratch`
  - `lang: c++20`
- `Projects.jsx` artifact metadata:
  - `kind`
  - `public` / `locked`
  - tech tags

Behavior:

- Stagger small metadata items by `0.06` to `0.1` seconds.
- Initial:
  - `opacity: 0`
  - `y: 6`
- Final:
  - `opacity: 1`
  - `y: 0`

This should feel like build output stabilizing, not like a loading animation.

### 4. Editorial Line Break Lock

Use for:

- `Home.jsx` hero H1.

Behavior:

- The hero headline should be split into two intentional text lines:

```text
Building systems from scratch,
close to the metal.
```

- Each line reveals separately.
- The line break is part of the design, not accidental wrapping.
- On mobile, lines can wrap naturally if needed, but should not overflow.

This pattern should preserve the existing 2-3 line desktop/tablet acceptance criterion.

### 5. Hover Typography Physics

Use for:

- `Projects.jsx` project cards.

Behavior:

- On hover:
  - card title shifts `x: 2` or `y: -1`
  - metadata/tags increase opacity
  - GitHub action moves `x: 4`
- Avoid changing tracking in a way that causes layout shift.
- No scale on text that causes reflow.

The hover should feel responsive, not decorative.

## Component Treatment

### Home

Home should receive the strongest type motion.

Required:

- Hero H1 split into intentional line groups.
- Each line uses Compiler Reveal.
- Supporting paragraph remains stable and readable.
- Artifact metadata uses Build Log Rhythm.
- Open terminal and project CTA text remain readable immediately.

Out of scope:

- Rebuilding the hero layout.
- Adding image assets.
- Changing hero copy.

### SectionDivider

SectionDivider should become the chapter motion primitive.

Required:

- Kicker appears first with subtle metadata reveal.
- Title reveals by phrase or line.
- Reduced motion renders title immediately.

SectionDivider should not add cheap section numbering.

### About

About should use Syntax Emphasis.

Required:

- Main title uses Compiler Reveal.
- Intro paragraph can emphasize 3-5 terms.
- Principle cards should not over-animate; fade/stagger is enough.
- Reduced motion disables emphasis animation but keeps final colors readable.

### Projects

Projects should use Build Log Rhythm and Hover Typography Physics.

Required:

- Main title uses Compiler Reveal.
- Artifact metadata and tags stagger in.
- Card hover should animate title/action subtly.
- No card should shift enough to disturb the bento grid.

### Contact

Contact should use a restrained final reveal.

Required:

- Headline uses Compiler Reveal.
- Supporting copy uses simple fade.
- Primary terminal action remains readable and clickable immediately.

### Terminal And Status Bar

Do not add new motion to terminal content or the status bar in this pass.

The terminal already has functional animation via overlay movement and command output. Extra typography motion inside terminal would compete with usability.

## Implementation Direction

Prefer a small reusable helper rather than repeated ad hoc motion config.

Possible helper:

```jsx
const reveal = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};
```

Possible reduced-motion handling:

```jsx
const shouldReduceMotion = useReducedMotion();
```

When reduced motion is true:

- initial state should be `false` or equivalent.
- animation should not translate/blur text.
- transition durations should be `0`.

If a helper component is introduced, it should be small and local to active typography surfaces, for example:

- `src/components/MotionText.jsx`

Only create a helper if it reduces real duplication across at least three active files.

## Accessibility Requirements

- Respect `prefers-reduced-motion`.
- Do not animate text in a way that prevents selection or copying.
- Do not split words into individual letters.
- Do not use animation-only meaning.
- Do not hide CTAs during page load.
- Use normal DOM text, not canvas text, for headings and paragraphs.

## Out Of Scope

This spec does not include:

- GSAP installation.
- ScrollTrigger.
- Pinned sections.
- Horizontal scroll.
- New pages or routes.
- New image assets.
- Terminal command changes.
- Redesigning the layout.
- Changing project data.
- Editing `netlify/functions/github-stats.js`.
- Replacing the Typography System spec.

## Acceptance Criteria

- Typography System pass is implemented or this pass explicitly includes its prerequisite font roles.
- Hero H1 uses intentional line-based reveal and remains readable immediately under reduced motion.
- SectionDivider titles use reusable reveal behavior.
- About manifesto includes syntax-style emphasis for selected terms.
- Project cards use subtle hover typography physics without disrupting the bento layout.
- Artifact/project metadata uses short staggered build-log rhythm.
- No GSAP dependency is added.
- No broad green accent returns.
- Reduced motion disables translate/blur/stagger motion.
- `npm run build` passes.
- `git diff --check` passes.

## Verification Plan

Run:

```bash
npm run build
git diff --check
```

Source checks:

```bash
rg -n -- "gsap|ScrollTrigger" package.json src
rg -n -- "useReducedMotion|prefers-reduced-motion" src
rg -n -- "filter: 'blur|blur\\(" src
```

Expected:

- No `gsap` or `ScrollTrigger` usage.
- Reduced motion handling exists anywhere text translate/blur/stagger motion is introduced.
- Blur is limited to short reveal states and disabled under reduced motion.

Manual visual checks:

- Desktop around 1440px:
  - Hero reveal feels line-based, not typewriter-like.
  - Hero headline remains 2-3 lines.
  - Project card hover does not shift the bento grid.
- Laptop around 1280px:
  - Section title reveal does not wrap awkwardly.
  - Metadata rhythm is visible but subtle.
- Mobile around 390px:
  - Text remains readable immediately.
  - No horizontal overflow from animated text.
  - Reduced motion mode renders without translate/blur/stagger effects.

Manual interaction checks:

- Hover project cards.
- Open terminal with `Ctrl+J`.
- Use terminal `exit`.
- Confirm typography motion does not interfere with terminal controls.
