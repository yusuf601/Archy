# Compiler Dark Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Everblush-influenced theme with a semantic Compiler Dark theme while preserving the existing layout and terminal/C++ identity.

**Architecture:** Introduce semantic CSS variables in `src/index.css`, expose them through Tailwind, keep compatibility aliases for existing color-name variables, and migrate active components to semantic tokens. Legacy `everblush-*` classes remain supported through Tailwind compatibility mappings so old components do not render unstyled if reused.

**Tech Stack:** React 19, Vite 7, Tailwind CSS 3, Framer Motion, CSS custom properties.

## Global Constraints

- No full homepage redesign.
- No GSAP or motion system changes.
- No new project content, case studies, screenshots, routing, or pages.
- No security dependency upgrades in this plan.
- Do not remove legacy components.
- Do not reorder Contact CTAs.
- Keep compatibility aliases: `--accent-green`, `--accent-blue`, `--accent-red`, and `--accent-dim`.
- Keep legacy `everblush-*` Tailwind classes mapped to Compiler Dark semantic tokens.
- `npm run build` must pass after each task.

---

## File Structure

- Modify `src/index.css`: Compiler Dark CSS variables, compatibility aliases, restrained ambient background, semantic utility colors, terminal/button CSS.
- Modify `tailwind.config.js`: semantic Tailwind color keys and legacy Everblush compatibility keys.
- Modify `src/App.jsx`: selection color and terminal overlay background token.
- Modify `src/components/Navbar.jsx`: semantic info/success tokens for brand and terminal state.
- Modify `src/pages/Home.jsx`: semantic inline colors for hero, terminal syntax, terminal dots, link hover, scroll indicator.
- Modify `src/pages/About.jsx`: semantic info/success tokens for markers, stats, skills, and dossier status.
- Modify `src/pages/Projects.jsx`: semantic info/success/danger/border tokens for project cards and tags.
- Modify `src/pages/Contact.jsx`: semantic info/success tokens for heading, CTA, keyboard hints, and links.
- Modify `src/components/GitHubStatsStrip.jsx`: semantic success token.
- Modify `src/components/ContributionHeatmap.jsx`: semantic color levels and info token.
- Modify `src/components/CppStatusBar.jsx`: semantic status colors and surface tokens.
- Modify `src/components/TechMarquee.jsx` only if Task 4 reveals it appears in an active mounted path or in manual QA.

---

### Task 1: Add Compiler Dark CSS Tokens

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: Existing CSS custom properties used by React components.
- Produces: Semantic CSS variables `--accent-success`, `--accent-info`, `--accent-warning`, `--accent-danger`, `--bg-terminal`, `--text-muted`, `--border-strong`, plus compatibility aliases.

- [ ] **Step 1: Run baseline token check**

Run:

```bash
rg -n -- "--accent-success|--accent-info|--accent-warning|--accent-danger|--bg-terminal|--text-muted|--border-strong" src/index.css
```

Expected before this task: no matches. If matches already exist, read them and preserve any equivalent values that match this plan.

- [ ] **Step 2: Replace the `:root` token block**

In `src/index.css`, replace the existing `:root` block with:

```css
:root {
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

  --accent-green: var(--accent-success);
  --accent-blue: var(--accent-info);
  --accent-red: var(--accent-danger);
  --accent-dim: rgba(61, 220, 151, 0.35);

  --font-display: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

- [ ] **Step 3: Retune the global background**

In `src/index.css`, keep the dot-grid pattern but change the body background image and root ambient overlay to:

```css
body {
  font-family: 'JetBrains Mono', monospace;
  background-color: var(--bg-body) !important;
  background-image:
    linear-gradient(rgba(230, 237, 243, 0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(230, 237, 243, 0.018) 1px, transparent 1px);
  background-size: 32px 32px;
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root::before {
  content: '';
  pointer-events: none;
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 52% 42% at 18% 24%, rgba(61, 220, 151, 0.04) 0%, transparent 68%),
    radial-gradient(ellipse 46% 36% at 82% 74%, rgba(90, 169, 255, 0.035) 0%, transparent 70%);
  animation: bgOrb 18s ease-in-out infinite alternate;
  z-index: 0;
}
```

- [ ] **Step 4: Retune shared CSS utilities**

In `src/index.css`, update these utilities to semantic tokens:

```css
.syntax-keyword {
  color: var(--accent-danger);
}

.syntax-function {
  color: var(--accent-info);
}

.syntax-string {
  color: var(--accent-success);
}

.syntax-comment {
  color: var(--text-muted);
  font-style: italic;
}

::-webkit-scrollbar-track {
  background: var(--bg-terminal);
}

::-webkit-scrollbar-thumb {
  background: var(--accent-success);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-info);
}

.text-syntax-header {
  color: var(--accent-success);
  font-weight: 700;
}

.text-syntax-content {
  color: var(--text-primary);
  font-weight: 400;
}

.text-syntax-meta {
  color: var(--text-muted);
  font-weight: 300;
}

.terminal-chrome {
  border: 1px solid var(--border-light);
  background: color-mix(in srgb, var(--bg-terminal) 86%, transparent);
}

.terminal-chrome-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--border-light);
  background: color-mix(in srgb, var(--bg-panel) 88%, transparent);
}

.code-block {
  background: color-mix(in srgb, var(--accent-info) 7%, transparent);
  border: 1px solid var(--border-light);
  border-left: 2px solid var(--accent-info);
  padding: 0.75rem 1rem;
}

.left-rule {
  border-left: 2px solid color-mix(in srgb, var(--accent-success) 35%, transparent);
  padding-left: 1.25rem;
  position: relative;
}

.left-rule::before {
  content: '▶';
  position: absolute;
  left: -0.55em;
  top: -0.1em;
  font-size: 0.6rem;
  color: var(--accent-success);
  opacity: 0.5;
}

.terminal-btn-primary {
  border-color: var(--accent-success);
  color: var(--accent-success);
}

.terminal-btn:hover {
  box-shadow: 0 0 16px rgba(61, 220, 151, 0.18);
  border-color: var(--accent-success);
  color: var(--accent-success);
}

.terminal-btn-secondary:hover {
  border-color: var(--accent-info);
  color: var(--accent-info);
  box-shadow: 0 0 16px rgba(90, 169, 255, 0.16);
}
```

- [ ] **Step 5: Verify CSS token presence**

Run:

```bash
rg -n -- "--accent-success|--accent-info|--accent-warning|--accent-danger|--bg-terminal|--text-muted|--border-strong" src/index.css
```

Expected: matches for all seven semantic tokens.

- [ ] **Step 6: Build**

Run:

```bash
npm run build
```

Expected: `✓ built` and exit code 0.

- [ ] **Step 7: Commit**

```bash
git add src/index.css
git commit -m "style: add compiler dark css tokens"
```

---

### Task 2: Add Tailwind Semantic and Legacy Color Mapping

**Files:**
- Modify: `tailwind.config.js`

**Interfaces:**
- Consumes: CSS variables from Task 1.
- Produces: Tailwind color names for semantic tokens and temporary `everblush-*` compatibility classes.

- [ ] **Step 1: Run baseline Tailwind mapping check**

Run:

```bash
rg -n -- "accent-success|accent-info|accent-warning|accent-danger|bg-terminal|text-muted|border-strong|everblush-bg|everblush-green" tailwind.config.js
```

Expected before this task: no matches for the new semantic tokens or `everblush-*` mappings.

- [ ] **Step 2: Replace the `extend.colors` object**

In `tailwind.config.js`, replace the current `colors` object with:

```js
colors: {
    'bg-body': 'var(--bg-body)',
    'bg-navbar': 'var(--bg-navbar)',
    'bg-panel': 'var(--bg-panel)',
    'bg-panel-hover': 'var(--bg-panel-hover)',
    'bg-terminal': 'var(--bg-terminal)',

    'text-primary': 'var(--text-primary)',
    'text-secondary': 'var(--text-secondary)',
    'text-muted': 'var(--text-muted)',

    'accent-success': 'var(--accent-success)',
    'accent-info': 'var(--accent-info)',
    'accent-warning': 'var(--accent-warning)',
    'accent-danger': 'var(--accent-danger)',

    'border-light': 'var(--border-light)',
    'border-strong': 'var(--border-strong)',

    'accent-blue': 'var(--accent-blue)',
    'accent-green': 'var(--accent-green)',

    'everblush-bg': 'var(--bg-body)',
    'everblush-bg-light': 'var(--bg-panel)',
    'everblush-fg': 'var(--text-primary)',
    'everblush-grey': 'var(--text-muted)',
    'everblush-green': 'var(--accent-success)',
    'everblush-blue': 'var(--accent-info)',
    'everblush-yellow': 'var(--accent-warning)',
    'everblush-red': 'var(--accent-danger)',
    'everblush-cyan': 'var(--accent-info)',
    'everblush-magenta': 'var(--accent-danger)',
},
```

- [ ] **Step 3: Verify mappings exist**

Run:

```bash
rg -n -- "accent-success|accent-info|accent-warning|accent-danger|bg-terminal|text-muted|border-strong|everblush-bg|everblush-green" tailwind.config.js
```

Expected: matches for all listed semantic and legacy mappings.

- [ ] **Step 4: Build**

Run:

```bash
npm run build
```

Expected: `✓ built` and exit code 0.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.js
git commit -m "style: map compiler dark tailwind colors"
```

---

### Task 3: Migrate Active Components to Semantic Tokens

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Navbar.jsx`
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/Projects.jsx`
- Modify: `src/pages/Contact.jsx`
- Modify: `src/components/GitHubStatsStrip.jsx`
- Modify: `src/components/ContributionHeatmap.jsx`
- Modify: `src/components/CppStatusBar.jsx`

**Interfaces:**
- Consumes: Semantic CSS variables and Tailwind color mappings from Tasks 1 and 2.
- Produces: Active app surfaces that use semantic Compiler Dark tokens instead of Everblush-era color names and hard-coded palette values.

- [ ] **Step 1: Run baseline active-component color scan**

Run:

```bash
rg -n -- "--accent-green|--accent-blue|--accent-red|#43D9AD|#4D5BCE|#e57474|#61AFEF|#ABB2BF|#FEA55F|#E5E9F0" src/App.jsx src/components/Navbar.jsx src/pages/Home.jsx src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx src/components/GitHubStatsStrip.jsx src/components/ContributionHeatmap.jsx src/components/CppStatusBar.jsx
```

Expected before this task: matches in the listed files.

- [ ] **Step 2: Update semantic variable references**

Replace active-component references as follows:

```text
var(--accent-green) -> var(--accent-success)
var(--accent-blue) -> var(--accent-info)
var(--accent-red) -> var(--accent-danger)
text-[var(--accent-green)] -> text-[var(--accent-success)]
text-[var(--accent-blue)] -> text-[var(--accent-info)]
border-[var(--accent-green)] -> border-[var(--accent-success)]
selection:bg-[var(--accent-blue)] -> selection:bg-[var(--accent-info)]
bg-[#0D1117] -> bg-[var(--bg-terminal)]
```

Keep `--accent-green`, `--accent-blue`, and `--accent-red` aliases in `src/index.css`; only active component usage should migrate.

- [ ] **Step 3: Update hard-coded hero terminal colors**

In `src/pages/Home.jsx`, replace hard-coded color values with semantic CSS variable strings:

```js
let colorStyle = { color: 'var(--text-secondary)' };
if (token === 'std::cout' || token === 'std::endl') {
    colorStyle = { color: 'var(--accent-info)' };
}
```

Replace hero/terminal inline colors:

```text
#43D9AD -> var(--accent-success)
#e57474 -> var(--accent-danger)
#e5c07b -> var(--accent-warning)
```

- [ ] **Step 4: Update status bar color constants**

In `src/components/CppStatusBar.jsx`, replace `BUILD_STATUSES` with:

```js
const BUILD_STATUSES = [
    { label: '✓ compiled', color: 'var(--accent-success)' },
    { label: '● linking', color: 'var(--accent-warning)' },
    { label: '✓ compiled', color: 'var(--accent-success)' },
];
```

Then replace hard-coded status bar colors:

```text
#61AFEF -> var(--accent-info)
#E5E9F0 -> var(--text-primary)
#ABB2BF -> var(--text-secondary)
#FEA55F -> var(--accent-warning)
background: 'rgba(30, 34, 40, 0.97)' -> background: 'color-mix(in srgb, var(--bg-panel) 97%, transparent)'
borderTop: '1px solid #2A2D33' -> borderTop: '1px solid var(--border-light)'
```

- [ ] **Step 5: Update contribution heatmap colors**

In `src/components/ContributionHeatmap.jsx`, replace `COLORS` with:

```js
const COLORS = [
    'color-mix(in srgb, var(--bg-panel-hover) 82%, transparent)',
    'color-mix(in srgb, var(--accent-success) 20%, transparent)',
    'color-mix(in srgb, var(--accent-success) 45%, transparent)',
    'color-mix(in srgb, var(--accent-success) 70%, transparent)',
    'var(--accent-success)',
];
```

Replace the section label color from `var(--accent-blue)` to `var(--accent-info)`.

- [ ] **Step 6: Verify active-component migration**

Run:

```bash
rg -n -- "--accent-green|--accent-blue|--accent-red|#43D9AD|#4D5BCE|#e57474|#61AFEF|#ABB2BF|#FEA55F|#E5E9F0" src/App.jsx src/components/Navbar.jsx src/pages/Home.jsx src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx src/components/GitHubStatsStrip.jsx src/components/ContributionHeatmap.jsx src/components/CppStatusBar.jsx
```

Expected after this task: no matches in active files. If a match remains for a terminal window dot and it intentionally matches the new semantic palette, replace it anyway with `var(...)` for consistency.

- [ ] **Step 7: Build**

Run:

```bash
npm run build
```

Expected: `✓ built` and exit code 0.

- [ ] **Step 8: Commit**

```bash
git add src/App.jsx src/components/Navbar.jsx src/pages/Home.jsx src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx src/components/GitHubStatsStrip.jsx src/components/ContributionHeatmap.jsx src/components/CppStatusBar.jsx
git commit -m "style: migrate active UI to semantic theme tokens"
```

---

### Task 4: Verify Legacy Compatibility and Final Theme Health

**Files:**
- Modify: `src/components/TechMarquee.jsx` only if it is mounted during implementation and still uses old accent aliases.
- No required file modifications if Tasks 1-3 pass.

**Interfaces:**
- Consumes: Compiler Dark CSS variables, Tailwind semantic mappings, and legacy Everblush compatibility mappings.
- Produces: Verified build output and documented confidence that legacy classes compile.

- [ ] **Step 1: Confirm active files no longer use old token names**

Run:

```bash
rg -n -- "--accent-green|--accent-blue|--accent-red|#43D9AD|#4D5BCE|#e57474|#61AFEF|#ABB2BF|#FEA55F|#E5E9F0" src/App.jsx src/components/Navbar.jsx src/pages/Home.jsx src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx src/components/GitHubStatsStrip.jsx src/components/ContributionHeatmap.jsx src/components/CppStatusBar.jsx
```

Expected: no matches.

- [ ] **Step 2: Confirm legacy Everblush classes are still supported**

Run:

```bash
rg -n -- "everblush-bg|everblush-bg-light|everblush-fg|everblush-grey|everblush-green|everblush-blue|everblush-yellow|everblush-red|everblush-cyan|everblush-magenta" tailwind.config.js
```

Expected: matches for all ten legacy keys.

- [ ] **Step 3: Confirm legacy classes still exist only as compatibility usage**

Run:

```bash
rg -n -- "everblush" src
```

Expected: matches may remain in legacy or currently inactive components. Do not remove them in this plan. If `src/App.jsx`, `src/pages/Home.jsx`, `src/pages/About.jsx`, `src/pages/Projects.jsx`, `src/pages/Contact.jsx`, `src/components/Navbar.jsx`, `src/components/GitHubStatsStrip.jsx`, `src/components/ContributionHeatmap.jsx`, or `src/components/CppStatusBar.jsx` appear in this output, migrate those matches to semantic tokens before continuing.

- [ ] **Step 4: Build final bundle**

Run:

```bash
npm run build
```

Expected: `✓ built` and exit code 0.

- [ ] **Step 5: Manual visual QA**

Start the dev server:

```bash
npm run dev -- --host 127.0.0.1
```

Open `http://127.0.0.1:5173/` and inspect:

```text
Desktop 1440px: navbar, hero, projects, contact, status bar.
Laptop 1280px: hero balance and terminal snippet contrast.
Mobile 390px: nav drawer, hero stacking, contact CTA, bottom status bar.
```

Expected visual result:

```text
Background is charcoal and crisp.
Panels are visibly separated from the page surface.
Green appears only for compile/success/prompt moments.
Blue appears for navigation, section labels, links, and repo tags.
Amber appears for build flags and linking/warning metadata.
Red appears only for locked/private/error states.
No active section looks washed out or Everblush-soft.
```

- [ ] **Step 6: Commit final verification adjustment if needed**

If Task 4 required modifying `src/components/TechMarquee.jsx` or any active file, commit those changes:

```bash
git add src/components/TechMarquee.jsx src/App.jsx src/components/Navbar.jsx src/pages/Home.jsx src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx src/components/GitHubStatsStrip.jsx src/components/ContributionHeatmap.jsx src/components/CppStatusBar.jsx
git commit -m "style: finalize compiler dark theme cleanup"
```

If no files changed in Task 4, skip the commit and record in the execution notes that final verification passed without code changes.

---

## Self-Review

Spec coverage:

- Semantic CSS variables: Task 1.
- Tailwind semantic colors: Task 2.
- Legacy `everblush-*` compatibility: Task 2 and Task 4.
- Active component semantic migration: Task 3.
- Terminal/status bar retuning: Task 3.
- Build verification: Tasks 1, 2, 3, and 4.
- Manual viewport QA: Task 4.

Placeholder scan:

- The placeholder scan command completed with no actionable matches after this self-review edit.

Type and token consistency:

- CSS variables use `--accent-success`, `--accent-info`, `--accent-warning`, `--accent-danger`, `--bg-terminal`, `--text-muted`, and `--border-strong`.
- Tailwind keys mirror the semantic token names without the leading `--`.
- Compatibility aliases keep old active variable names available while active components migrate away from them.
