# Typography System Design

## Objective

Refine the active portfolio typography so the new Compiler Dark Editorial Systems layout feels deliberate, readable, and brand-specific. The current layout direction is stronger, but the type system still mixes large display text, monospace UI, metadata labels, and body copy without enough formal rules.

This pass should make the site read less like a terminal theme and more like an editorial systems portfolio: technical, precise, high-contrast, and calm.

## Current Context

The active app renders:

- `Navbar`
- `Home`
- `SectionDivider`
- `About`
- `Projects`
- `Contact`
- `Terminal`
- `CppStatusBar`

Recent layout work established:

- Stronger brand nav.
- Editorial hero statement.
- Chapter-style section dividers.
- Build-X-From-Scratch project bento.
- About manifesto.
- Refined contact CTA.

Typography is now the next quality bottleneck.

Current typography traits:

- `body` uses `JetBrains Mono` globally.
- `--font-display` is set to `Space Grotesk`.
- `--font-mono` is set to `JetBrains Mono`.
- Major headings manually set `fontFamily: 'var(--font-display)'`.
- Many labels use tiny uppercase monospace with wide tracking.
- Body paragraphs still inherit the global mono unless overridden.
- `src/App.jsx` applies `font-mono` at the root, making the entire app default to monospace.

The result is consistent with terminal aesthetics, but it reduces editorial polish and reading comfort.

## Typography Direction

The desired system:

- **Display voice:** wide, direct, confident, used for hero and section headlines.
- **Reading voice:** clean sans, used for paragraphs and project descriptions.
- **Code voice:** monospace, used only for terminal, syntax, commands, build metadata, tags, and tiny operational labels.

The site should feel like a technical publication attached to a compiler, not a terminal emulator with paragraphs inside it.

## Font Roles

### Display Font

Use `--font-display` for:

- Hero H1.
- SectionDivider title.
- About title.
- Projects title.
- Contact title.
- Project card names where a more editorial feel is needed.

Display type requirements:

- `font-weight: 800` or `900`.
- `letter-spacing: 0`.
- Tight but readable line-height.
- No negative tracking.
- H1 must stay within 2-3 lines on desktop/tablet.

### Sans / Reading Font

Introduce a reading font variable:

```css
--font-sans: 'Geist', 'Space Grotesk', system-ui, sans-serif;
```

Use `--font-sans` for:

- Body paragraphs.
- Supporting copy.
- Project descriptions.
- About principle body text.
- Contact supporting copy.

Reading text requirements:

- Paragraph line-height should sit around `1.65` to `1.8`.
- Paragraph max width should generally be `max-w-2xl` or `max-w-3xl`.
- Avoid long monospace paragraphs.

### Mono Font

Use `--font-mono` only for:

- Terminal content.
- Code snippets.
- Build artifact metadata.
- Command labels.
- Keyboard hints.
- Tiny uppercase operational labels.
- Status bar content.

Mono should become an accent, not the page default.

## Required Global Changes

### CSS Variables

Update `src/index.css`:

```css
--font-display: 'Space Grotesk', sans-serif;
--font-sans: 'Geist', 'Space Grotesk', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

Set `body` to:

```css
font-family: var(--font-sans);
```

This makes the reading voice the default.

### Tailwind Mapping

Extend `tailwind.config.js`:

```js
fontFamily: {
  sans: ['var(--font-sans)'],
  display: ['var(--font-display)'],
  mono: ['var(--font-mono)'],
}
```

Keep existing `font-mono` behavior, but map it through the variable.

### Root App Class

Remove `font-mono` from the root wrapper in `src/App.jsx`.

Current:

```jsx
className="min-h-screen ... font-mono ..."
```

Target:

```jsx
className="min-h-screen ..."
```

The body/default sans font should govern normal text. Individual terminal/code surfaces should opt into `font-mono`.

## Scale System

The implementation should standardize around these semantic tiers, even if done with Tailwind utility classes:

### Hero Display

Used in `Home.jsx`.

```text
text-[clamp(3rem,6vw,5.8rem)]
leading-[0.92]
max-w-6xl
```

Keep this line behavior unless visual QA proves a small adjustment is needed.

### Section Display

Used in `SectionDivider`, About, Projects, Contact.

```text
text-4xl md:text-6xl
leading-tight
font-black
```

`SectionDivider` may use `text-3xl md:text-5xl` if the phrase is long.

### Card Title

Used in project cards and principle cards.

```text
text-xl md:text-2xl
font-black
leading-tight
```

### Body Copy

Used in paragraphs and descriptions.

```text
text-sm md:text-base
leading-7 md:leading-8
font-sans
```

Project cards can stay `text-sm leading-7`.

### Metadata

Used for operational labels, tags, build states.

```text
text-[0.62rem] to text-[0.72rem]
uppercase
tracking-[0.14em] to tracking-[0.22em]
font-mono
```

Metadata must be short. Do not use wide-tracked uppercase for full sentences.

## Component Treatment

### Navbar

The brand lockup can remain compact, but it should use a clearer split:

- `YUSUF`: display or sans, heavy, no extra mono effect.
- `BUILD-X-FROM-SCRATCH`: mono or small sans metadata.
- Nav links: small uppercase sans or mono, but not overly letter-spaced.

Navbar should not feel like a raw terminal toolbar.

### Home

Keep the hero H1 as the strongest typographic element.

Required:

- H1 uses `font-display`.
- Supporting paragraph uses `font-sans`.
- CTAs can remain uppercase but should not overuse mono unless they behave like commands.
- Artifact panel remains `font-mono` where code/build metadata appears.

Avoid:

- Making all hero text monospace.
- Shrinking H1 to fit the artifact panel.
- Letting supporting copy compete with H1.

### SectionDivider

Use it as a typographic chapter break.

Required:

- Kicker uses small metadata treatment.
- Title uses display font.
- Title max-width keeps line breaks intentional.
- No bracketed labels.

### About

About should read like a manifesto.

Required:

- Main title uses display font.
- Intro paragraph and principle body text use sans.
- Principle title can use display or sans heavy.
- Principle index `01`, `02`, `03` can stay metadata style, but should not look like generic section numbering.

### Projects

Projects should feel like a technical index with editorial hierarchy.

Required:

- Section title uses display.
- Project names use display or heavy sans.
- Project descriptions use sans, not mono.
- Tags and public/locked states use mono metadata.
- Do not make every line uppercase.

### Contact

Contact should feel like a final editorial CTA.

Required:

- Main headline uses display.
- Supporting copy uses sans.
- Terminal action content can use mono.
- Secondary links can remain terminal-button style but should stay readable.

### Terminal

Terminal should remain mono. Do not change terminal content typography except for small shortcut/help text if needed.

### CppStatusBar

Status bar should remain mono.

## Copy And Rhythm Rules

- Do not use visible in-app text to explain typography choices.
- Do not add feature descriptions or usage instructions beyond existing functional UI copy.
- Keep body copy concise and technical.
- Avoid novelty phrases unless they support the brand.
- Avoid headings that wrap into 5-6 lines on desktop.
- Avoid metadata labels that read like cheap section numbering.

## Out Of Scope

This spec does not include:

- Major layout rewrite.
- GSAP or new motion work.
- New visual assets.
- New routes or pages.
- Terminal command expansion.
- Editing `netlify/functions/github-stats.js`.
- Removing inactive legacy components.
- Replacing all old `everblush-*` class names.
- Changing the project data model.

## Acceptance Criteria

- `body` defaults to a sans reading font, not global monospace.
- Terminal/code/status surfaces still use `font-mono`.
- Hero H1 keeps its 2-3 line desktop/tablet behavior.
- Body paragraphs in Home, About, Projects, and Contact do not render as monospace.
- Metadata labels are short, small, and intentionally styled.
- Section titles and main page headlines use display typography consistently.
- No negative letter-spacing is introduced.
- No viewport-width font scaling beyond explicit `clamp()` for hero-like display text.
- `npm run build` passes.
- `git diff --check` passes.

## Verification Plan

Run:

```bash
npm run build
git diff --check
```

Manual visual checks:

- Desktop around 1440px:
  - Hero headline remains 2-3 lines.
  - Paragraphs feel easier to read than monospace.
  - Project card hierarchy is scannable.
- Laptop around 1280px:
  - Section titles do not wrap awkwardly.
  - CTAs remain readable.
- Mobile around 390px:
  - Long words do not overflow.
  - Metadata does not crowd card content.
  - Terminal and status bar still feel intentionally monospace.

Focused source checks:

```bash
rg -n -- "font-mono" src/App.jsx src/pages/Home.jsx src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx
rg -n -- "--font-sans|fontFamily|font-display|font-sans|font-mono" src/index.css tailwind.config.js src
```

The first check should show `font-mono` only where text is genuinely code, command, metadata, terminal, or status UI.
