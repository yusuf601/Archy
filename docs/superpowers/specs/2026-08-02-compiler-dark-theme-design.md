# Compiler Dark Theme Design

## Objective

Replace the current Everblush-influenced styling with a custom Compiler Dark theme that fits the portfolio's C++, terminal, Arch Linux, and systems programming identity. The change should make the site feel sharper, more technical, and more professional without doing a full layout redesign.

## Current Context

The active app renders `Home`, `About`, `Projects`, `Contact`, `Navbar`, `Terminal`, and `CppStatusBar` from `src/App.jsx`. These active surfaces mostly use CSS variables such as `--bg-body`, `--bg-panel`, `--accent-blue`, and `--accent-green`.

Several older or currently inactive components still contain Tailwind classes named `everblush-*`, including `BentoGrid`, `Hero`, `Blog`, `Sidebar`, `ProjectCard`, `RecentActivity`, `TechStack`, and others. The current `tailwind.config.js` does not define those colors, so any reused legacy component can silently lose styling.

The goal is a theme system refactor, not a content or layout overhaul.

## Visual Direction

Compiler Dark should feel like a refined compiler, editor, and build-system interface:

- Dark charcoal backgrounds instead of soft muted Everblush tones.
- Crisp contrast between page background, panels, terminal surfaces, and borders.
- Green reserved for successful compile states, cursors, command prompts, and primary terminal moments.
- Blue used for navigation, links, section markers, repository tags, and information states.
- Amber used for build flags, warnings, timestamps, and secondary technical metadata.
- Red used only for errors, locked/private states, and destructive/security states.
- Glow effects should be restrained and functional, not decorative.
- The terminal identity should remain, but the portfolio should read as professional engineering work rather than a theme demo.

## Token System

The implementation should introduce semantic tokens in `src/index.css` and expose them through `tailwind.config.js`.

Required CSS variables:

```css
--bg-body: #0F1216;
--bg-navbar: #11151B;
--bg-panel: #171C23;
--bg-panel-hover: #202732;
--bg-terminal: #0B0F14;

--text-primary: #E6EDF3;
--text-secondary: #9AA7B2;
--text-muted: #66717D;

--accent-success: #3DDC97;
--accent-info: #5AA9FF;
--accent-warning: #E6B450;
--accent-danger: #FF6B6B;

--border-light: #27313D;
--border-strong: #354252;
```

Compatibility aliases should remain during the first implementation pass:

```css
--accent-green: var(--accent-success);
--accent-blue: var(--accent-info);
--accent-red: var(--accent-danger);
--accent-dim: rgba(61, 220, 151, 0.35);
```

This keeps active components working while code is gradually migrated from color-name tokens to semantic tokens.

## Tailwind Mapping

`tailwind.config.js` should expose semantic colors:

- `bg-body`
- `bg-navbar`
- `bg-panel`
- `bg-panel-hover`
- `bg-terminal`
- `text-primary`
- `text-secondary`
- `text-muted`
- `accent-success`
- `accent-info`
- `accent-warning`
- `accent-danger`
- `border-light`
- `border-strong`

It should also temporarily map legacy Everblush names to semantic tokens to prevent old components from rendering unstyled if reintroduced:

- `everblush-bg` -> `var(--bg-body)`
- `everblush-bg-light` -> `var(--bg-panel)`
- `everblush-fg` -> `var(--text-primary)`
- `everblush-grey` -> `var(--text-muted)`
- `everblush-green` -> `var(--accent-success)`
- `everblush-blue` -> `var(--accent-info)`
- `everblush-yellow` -> `var(--accent-warning)`
- `everblush-red` -> `var(--accent-danger)`
- `everblush-cyan` -> `var(--accent-info)`
- `everblush-magenta` -> `var(--accent-danger)`

The compatibility mapping is intentionally temporary. Future cleanup can remove or migrate legacy components.

## Component Treatment

### Global Surface

`body` should use `--bg-body` and a subtle technical grid or noise texture. The ambient background should become more restrained. The current green and blue radial wash can remain, but opacity should be low enough that sections feel crisp and not foggy.

### Navbar

The navbar should keep its fixed position and minimal terminal identity. It should use `--bg-navbar`, `--border-light`, `--accent-info` for the brand, and `--accent-success` only when the terminal is open.

### Home

The hero should keep the existing two-column identity plus terminal snippet. The visual refactor should only retune color usage:

- Role and technical labels use `--accent-info`.
- Copy links hover to `--accent-success`.
- Terminal chrome uses `--bg-terminal`, `--bg-panel`, and `--border-light`.
- Terminal syntax colors should align with `accent-info`, `accent-success`, and `accent-warning`.

No hero layout rewrite is included in this spec.

### About

The about section should remain readable and restrained. Stats should use primary text with a success underline. The contribution heatmap should continue using success levels, but inactive cells should be based on `--bg-panel-hover` or `--border-light`.

### Projects

Project cards should become sharper:

- Featured cards use `--border-strong` by default and a subtle `--accent-success` highlight.
- Repository tags use `--accent-info`.
- Private or locked states use `--accent-danger`.
- Hover shadows should be darker and less green-heavy.

The project content model is not changed in this spec.

### Contact

The contact section should keep terminal flavor, but color roles should be semantic:

- Primary terminal trigger uses `--accent-success`.
- Email and LinkedIn links use success and info respectively.
- Keyboard hints use muted text and panel backgrounds.

Changing the CTA hierarchy is out of scope for this spec.

### Terminal and Status Bar

The terminal overlay and compiler status bar should use `--bg-terminal`, `--bg-panel`, `--border-light`, `--accent-success`, `--accent-info`, `--accent-warning`, and `--accent-danger` instead of hard-coded GitHub/Everblush-style colors where practical.

Hard-coded red/yellow/green terminal window dots may remain if they visually match the new palette.

## Out of Scope

This spec does not include:

- Full homepage redesign.
- GSAP or motion system changes.
- New project content, case studies, or screenshots.
- Security dependency upgrades.
- Removing legacy components.
- Changing routing or adding pages.
- Reordering Contact CTAs.

Those are valid future passes, but they should not be mixed into the theme refactor.

## Acceptance Criteria

- `npm run build` completes successfully.
- Active pages no longer visually depend on Everblush colors.
- `src/index.css` defines semantic Compiler Dark tokens.
- `tailwind.config.js` exposes semantic Compiler Dark colors.
- Legacy `everblush-*` Tailwind classes are mapped to semantic tokens so old components do not lose styling.
- Active components use semantic tokens where touched.
- The site keeps its terminal/C++ identity while looking darker, sharper, and more professional.
- No layout-level redesign is introduced.

## Verification Plan

Run:

```bash
npm run build
```

Then inspect the site manually in a browser at:

- Desktop width around 1440px.
- Laptop width around 1280px.
- Mobile width around 390px.

Manual visual checks:

- Navbar remains readable and fixed.
- Hero terminal and identity block have clear contrast.
- Projects cards do not look washed out.
- Contact CTA remains readable.
- Status bar does not visually clash with the new palette.
- No obvious unstyled legacy component appears if a legacy page/component is mounted later.
