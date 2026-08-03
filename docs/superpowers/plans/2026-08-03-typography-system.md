# Typography System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the active portfolio typography so reading copy defaults to sans, display text is consistent, and monospace is reserved for terminal/code/metadata surfaces.

**Architecture:** Introduce a semantic font stack in `src/index.css` and expose it through Tailwind. Remove the global monospace default from `src/App.jsx`, then opt active surfaces into `font-display`, `font-sans`, or `font-mono` according to the typography spec without changing page layout or content models.

**Tech Stack:** React 19, Vite 7, Tailwind CSS 3, Framer Motion 12, CSS variables in `src/index.css`.

## Global Constraints

- `body` defaults to a sans reading font, not global monospace.
- Terminal/code/status surfaces still use `font-mono`.
- Hero H1 keeps its 2-3 line desktop/tablet behavior.
- Body paragraphs in Home, About, Projects, and Contact do not render as monospace.
- Metadata labels are short, small, and intentionally styled.
- Section titles and main page headlines use display typography consistently.
- No negative letter-spacing is introduced.
- No viewport-width font scaling beyond explicit `clamp()` for hero-like display text.
- Do not perform a major layout rewrite.
- Do not add GSAP or new motion work.
- Do not add new visual assets.
- Do not add new routes or pages.
- Do not expand terminal commands.
- Do not edit `netlify/functions/github-stats.js`.
- Do not remove inactive legacy components.
- Do not replace all old `everblush-*` class names.
- Do not change the project data model.
- `npm run build` and `git diff --check` must pass before completion.

---

## File Structure

- Modify `src/index.css`
  - Owns `--font-display`, `--font-sans`, `--font-mono`, and the global body font.
- Modify `tailwind.config.js`
  - Owns Tailwind `fontFamily` mappings to CSS variables.
- Modify `src/App.jsx`
  - Removes root `font-mono` so body sans can govern normal text.
- Modify `src/components/Navbar.jsx`
  - Applies the new font roles to compact brand/nav text.
- Modify `src/components/SectionDivider.jsx`
  - Applies display and metadata font classes explicitly.
- Modify `src/pages/Home.jsx`
  - Applies display/sans/mono roles in the hero and artifact panel.
- Modify `src/pages/About.jsx`
  - Applies sans reading typography to manifesto copy and mono only to metadata index labels.
- Modify `src/pages/Projects.jsx`
  - Applies sans reading typography to artifact statements and mono to tags/states.
- Modify `src/pages/Contact.jsx`
  - Applies sans/display roles while preserving terminal action mono styling.
- Inspect only `src/components/Terminal.jsx` and `src/components/CppStatusBar.jsx`
  - Verify they remain explicitly monospace; modify only if global font removal causes them to inherit sans.

---

### Task 1: Add Font Tokens And Tailwind Font Families

**Files:**
- Modify: `src/index.css`
- Modify: `tailwind.config.js`

**Interfaces:**
- Produces CSS variables:
  - `--font-display: 'Space Grotesk', sans-serif;`
  - `--font-sans: 'Geist', 'Space Grotesk', system-ui, sans-serif;`
  - `--font-mono: 'JetBrains Mono', monospace;`
- Produces Tailwind classes:
  - `font-sans`
  - `font-display`
  - `font-mono`

- [ ] **Step 1: Inspect current font token definitions**

Run:

```bash
rg -n -- "--font-display|--font-sans|--font-mono|font-family" src/index.css tailwind.config.js
```

Expected: `--font-display` and `--font-mono` exist in `src/index.css`; `--font-sans` is not yet defined; Tailwind maps only `mono`.

- [ ] **Step 2: Add `--font-sans` and set body to sans**

In `src/index.css`, replace the current font token block:

```css
  --font-display: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
```

with:

```css
  --font-display: 'Space Grotesk', sans-serif;
  --font-sans: 'Geist', 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
```

Then replace:

```css
body {
  font-family: 'JetBrains Mono', monospace;
```

with:

```css
body {
  font-family: var(--font-sans);
```

- [ ] **Step 3: Map Tailwind font families to CSS variables**

In `tailwind.config.js`, replace:

```js
            fontFamily: {
                mono: ['"JetBrains Mono"', 'monospace'],
            },
```

with:

```js
            fontFamily: {
                sans: ['var(--font-sans)'],
                display: ['var(--font-display)'],
                mono: ['var(--font-mono)'],
            },
```

- [ ] **Step 4: Verify token and Tailwind mapping**

Run:

```bash
rg -n -- "--font-sans|font-family: var\\(--font-sans\\)|fontFamily|font-display|font-mono" src/index.css tailwind.config.js
```

Expected:

- `src/index.css` defines `--font-sans`.
- `body` uses `font-family: var(--font-sans);`.
- `tailwind.config.js` maps `sans`, `display`, and `mono`.

- [ ] **Step 5: Build**

Run:

```bash
npm run build
```

Expected: Vite exits 0. If `dist` changes, restore tracked `dist` files and remove generated untracked hashed assets after the build.

- [ ] **Step 6: Commit**

```bash
git add src/index.css tailwind.config.js
git commit -m "style: add typography font tokens"
```

---

### Task 2: Remove Global Mono And Apply Core Page Font Roles

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/SectionDivider.jsx`
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes Tailwind classes from Task 1: `font-sans`, `font-display`, `font-mono`.
- Produces active app shell where ordinary page text defaults to sans and explicit mono remains for command/code surfaces.

- [ ] **Step 1: Remove root `font-mono`**

In `src/App.jsx`, replace:

```jsx
<div className="min-h-screen bg-[var(--bg-body)] text-[var(--text-primary)] font-mono selection:bg-[var(--accent-info)] selection:text-white">
```

with:

```jsx
<div className="min-h-screen bg-[var(--bg-body)] text-[var(--text-primary)] selection:bg-[var(--accent-info)] selection:text-white">
```

- [ ] **Step 2: Update navbar font roles**

In `src/components/Navbar.jsx`:

- Add `font-display` to the `YUSUF` span.
- Add `font-mono` to the `BUILD-X-FROM-SCRATCH` span.
- Use `font-sans` for desktop nav links.
- Keep the terminal button `font-mono`.

Expected class patterns:

```jsx
<span className="block font-display text-[0.72rem] font-black tracking-[0.2em] text-[var(--text-primary)] leading-none">
```

```jsx
<span className="hidden sm:block mt-1 font-mono text-[0.55rem] tracking-[0.22em] text-[var(--accent-info)] leading-none">
```

```jsx
className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
```

```jsx
className={`font-mono text-[0.68rem] uppercase tracking-[0.14em] px-3 py-1.5 border transition-colors ${terminalOpen
```

- [ ] **Step 3: Update SectionDivider font roles**

In `src/components/SectionDivider.jsx`:

- Add `font-mono` to the kicker.
- Replace inline `style={{ fontFamily: 'var(--font-display)' }}` on the title with `font-display`.

Expected title class:

```jsx
className="font-display max-w-4xl text-3xl font-black leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl"
```

- [ ] **Step 4: Update Home font roles**

In `src/pages/Home.jsx`:

- Add `font-mono` to the kicker `C++ systems programmer / research-minded builder`.
- Replace inline `style={{ fontFamily: 'var(--font-display)' }}` on the H1 with `font-display`.
- Add `font-sans` to the supporting paragraph.
- Keep the code panel body `font-mono`.
- Add `font-mono` to artifact metadata rows and CTA labels only if they behave like command/build UI.

Expected H1 class:

```jsx
className="font-display max-w-6xl text-[clamp(3rem,6vw,5.8rem)] font-black leading-[0.92] tracking-tight text-[var(--text-primary)]"
```

Expected paragraph class:

```jsx
className="mt-7 max-w-2xl font-sans text-base leading-8 text-[var(--text-secondary)] md:text-lg"
```

- [ ] **Step 5: Verify focused font-mono usage in core files**

Run:

```bash
rg -n -- "font-mono|font-display|font-sans|fontFamily" src/App.jsx src/components/Navbar.jsx src/components/SectionDivider.jsx src/pages/Home.jsx
```

Expected:

- `src/App.jsx` has no `font-mono` on the root wrapper.
- `Home.jsx` H1 uses `font-display`.
- `Home.jsx` supporting paragraph uses `font-sans`.
- `Home.jsx` artifact/code surfaces retain `font-mono`.

- [ ] **Step 6: Build**

Run:

```bash
npm run build
```

Expected: Vite exits 0. Restore `dist` artifacts afterward if they changed.

- [ ] **Step 7: Commit**

```bash
git add src/App.jsx src/components/Navbar.jsx src/components/SectionDivider.jsx src/pages/Home.jsx
git commit -m "style: apply core typography roles"
```

---

### Task 3: Apply Typography Roles To About, Projects, And Contact

**Files:**
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/Projects.jsx`
- Modify: `src/pages/Contact.jsx`

**Interfaces:**
- Consumes Tailwind classes from Task 1.
- Produces active content sections where display titles, sans body copy, and mono metadata are explicit.

- [ ] **Step 1: Update About typography roles**

In `src/pages/About.jsx`:

- Kicker `Working principles`: add `font-mono`.
- Main title: replace inline `style={{ fontFamily: 'var(--font-display)' }}` with `font-display`.
- Intro paragraph: add `font-sans`.
- Principle index labels: add `font-mono`.
- Principle titles: add `font-display` or `font-sans`; use `font-display` for consistency.
- Principle body paragraphs: add `font-sans`.
- Skill chips can remain sans by default unless they read as code tags; if using code-tag treatment, add `font-mono`.

Expected main title class:

```jsx
className="font-display text-4xl font-black leading-tight tracking-tight text-[var(--text-primary)] md:text-6xl"
```

Expected intro paragraph class:

```jsx
className="mt-6 max-w-3xl font-sans text-base leading-8 text-[var(--text-secondary)]"
```

- [ ] **Step 2: Update Projects typography roles**

In `src/pages/Projects.jsx`:

- Kicker `Build-X-From-Scratch`: add `font-mono`.
- Main title: replace inline `style={{ fontFamily: 'var(--font-display)' }}` with `font-display`.
- Artifact `kind`: add `font-mono`.
- Public/locked state: add `font-mono`.
- Artifact name: add `font-display`.
- Artifact statement: add `font-sans`.
- Tech tags: add `font-mono`.
- GitHub action: add `font-mono`.

Expected artifact statement class:

```jsx
className="max-w-xl font-sans text-sm leading-7 text-[var(--text-secondary)]"
```

- [ ] **Step 3: Update Contact typography roles**

In `src/pages/Contact.jsx`:

- Top command-like label can remain metadata and should add `font-mono`.
- Main title: replace inline display style with `font-display`; keep color through class or style.
- Supporting copy: add `font-sans`.
- Primary terminal button should keep `font-mono`.
- Exit line should remain `font-mono`.

Expected title class:

```jsx
className="font-display mx-auto max-w-3xl text-4xl font-black leading-tight tracking-tight text-[var(--text-primary)] md:text-6xl"
```

Expected supporting copy class:

```jsx
className="mx-auto mb-10 max-w-2xl font-sans text-base leading-8 text-[var(--text-secondary)]"
```

- [ ] **Step 4: Verify page font role usage**

Run:

```bash
rg -n -- "font-mono|font-display|font-sans|fontFamily" src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx
```

Expected:

- Major titles use `font-display`.
- Paragraphs/descriptions use `font-sans`.
- Tags, states, command labels, and terminal-like text use `font-mono`.
- Inline `fontFamily: 'var(--font-display)'` is removed from these three files.

- [ ] **Step 5: Build**

Run:

```bash
npm run build
```

Expected: Vite exits 0. Restore `dist` artifacts afterward if they changed.

- [ ] **Step 6: Commit**

```bash
git add src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx
git commit -m "style: apply typography roles to content sections"
```

---

### Task 4: Verify Terminal And Status Surfaces Stay Monospace

**Files:**
- Inspect: `src/components/Terminal.jsx`
- Inspect: `src/components/CppStatusBar.jsx`
- Modify only if needed: `src/components/Terminal.jsx`
- Modify only if needed: `src/components/CppStatusBar.jsx`

**Interfaces:**
- Consumes global sans body from Task 1 and root font removal from Task 2.
- Produces terminal/status surfaces that explicitly retain monospace.

- [ ] **Step 1: Inspect Terminal root class**

Run:

```bash
rg -n -- "font-mono|bg-\\[var\\(--bg-terminal\\)\\]|terminal-focus-shadow" src/components/Terminal.jsx
```

Expected: The primary terminal container includes `font-mono`. If it does not, add `font-mono` to the top-level terminal surface that wraps history and input.

- [ ] **Step 2: Inspect CppStatusBar root class**

Run:

```bash
rg -n -- "font-mono|CppStatusBar|return \\(" src/components/CppStatusBar.jsx
```

Expected: The status bar container or its main text wrapper includes `font-mono`. If it does not, add `font-mono` to the fixed status bar root.

- [ ] **Step 3: If modifications were needed, build and commit**

If either file changed, run:

```bash
npm run build
git diff --check
git add src/components/Terminal.jsx src/components/CppStatusBar.jsx
git commit -m "style: preserve mono terminal surfaces"
```

Expected: Build exits 0 and diff check exits 0. Restore `dist` artifacts afterward if they changed.

- [ ] **Step 4: If no modifications were needed, record verification in implementation report**

Run:

```bash
git status --short
```

Expected: no changes from this task, except pre-existing unrelated `netlify/functions/github-stats.js` in the main worktree if executing outside a clean worktree.

---

### Task 5: Final Typography Verification

**Files:**
- Modify only if needed: active typography files touched in Tasks 1-4.
- Do not modify: `netlify/functions/github-stats.js`.

**Interfaces:**
- Produces verified typography-system implementation.

- [ ] **Step 1: Run focused mono usage check**

Run:

```bash
rg -n -- "font-mono" src/App.jsx src/pages/Home.jsx src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx
```

Expected:

- `src/App.jsx` has no `font-mono`.
- `Home.jsx` uses `font-mono` only for metadata, CTA command styling if retained, and artifact/code panel.
- `About.jsx` uses `font-mono` only for metadata/index/chip treatment.
- `Projects.jsx` uses `font-mono` only for kind labels, public/locked states, tags, and GitHub action.
- `Contact.jsx` uses `font-mono` only for command-like label, terminal action, secondary terminal buttons, keyboard hint, or exit line.

- [ ] **Step 2: Run display/sans mapping check**

Run:

```bash
rg -n -- "--font-sans|font-family: var\\(--font-sans\\)|fontFamily|font-display|font-sans|font-mono" src/index.css tailwind.config.js src/App.jsx src/components/Navbar.jsx src/components/SectionDivider.jsx src/pages/Home.jsx src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx
```

Expected:

- `src/index.css` defines `--font-sans`.
- `body` uses `var(--font-sans)`.
- `tailwind.config.js` maps `fontFamily.sans`, `fontFamily.display`, and `fontFamily.mono`.
- Active page titles use `font-display`.
- Body copy uses `font-sans`.

- [ ] **Step 3: Check for forbidden typography patterns**

Run:

```bash
rg -n -- "tracking-\\[-|text-\\[clamp" src/App.jsx src/components/Navbar.jsx src/components/SectionDivider.jsx src/pages/Home.jsx src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx
```

Expected:

- No `tracking-[-...]` matches.
- `text-[clamp(...)]` appears only for hero-like display text in `src/pages/Home.jsx`.

- [ ] **Step 4: Run production build**

Run:

```bash
npm run build
```

Expected: Vite exits 0.

- [ ] **Step 5: Restore build artifacts if Vite rewrote `dist`**

Run:

```bash
git status --short
```

If `dist/index.html` or old tracked assets are modified/deleted, restore them:

```bash
git restore dist/index.html dist/assets/index-BfXsoJFn.css dist/assets/index-DMQqljCi.js
```

If new hashed assets appear under `dist/assets`, copy exact filenames from `git status --short` and remove only those untracked files. Example:

```bash
rm -f dist/assets/index-AbCdEf.css dist/assets/index-XyZ123.js
```

- [ ] **Step 6: Run whitespace diff check**

Run:

```bash
git diff --check
```

Expected: no output and exit 0.

- [ ] **Step 7: Inspect final status**

Run:

```bash
git status --short
```

Expected: intended source files are committed. If running in the main worktree, the pre-existing unstaged `netlify/functions/github-stats.js` may still be present and must not be added.

- [ ] **Step 8: Final cleanup commit if needed**

Only if Step 7 shows intended unstaged typography cleanup:

```bash
git add src/index.css tailwind.config.js src/App.jsx src/components/Navbar.jsx src/components/SectionDivider.jsx src/pages/Home.jsx src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx src/components/Terminal.jsx src/components/CppStatusBar.jsx
git commit -m "style: finish typography system pass"
```

Do not add `netlify/functions/github-stats.js`.

---

## Self-Review

Spec coverage:

- Global sans body and font variables: Task 1.
- Tailwind font family mapping: Task 1.
- Root `font-mono` removal: Task 2.
- Navbar, Home, and SectionDivider typography roles: Task 2.
- About, Projects, and Contact typography roles: Task 3.
- Terminal and CppStatusBar monospace preservation: Task 4.
- Negative tracking and `clamp()` restrictions: Task 5.
- Build and diff-check verification: Tasks 1-5.
- Excluding `netlify/functions/github-stats.js`: Global Constraints and Task 5.

Placeholder scan:

- This plan contains no unresolved markers, deferred implementation notes, or unspecified test steps.
- Vite hash cleanup uses a concrete example and instructs implementers to copy exact filenames from `git status --short`.

Type and class consistency:

- `font-sans`, `font-display`, and `font-mono` are produced by Task 1 before use in later tasks.
- No component public API changes are introduced.
- No route or section anchor changes are introduced.
