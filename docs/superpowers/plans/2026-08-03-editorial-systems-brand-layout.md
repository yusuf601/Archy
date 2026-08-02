# Editorial Systems Brand Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the active portfolio layout into a stronger Compiler Dark Editorial Systems brand centered on Yusuf as a systems builder.

**Architecture:** Keep the existing Vite/React single-page section flow and update only active surfaces imported by `src/App.jsx`. Use the existing Compiler Dark CSS variables and Framer Motion dependency; do not introduce GSAP in this first pass because it is not installed and the spec recommends the conservative path unless GSAP already exists.

**Tech Stack:** React 19, Vite 7, Tailwind CSS 3, Framer Motion 12, existing CSS variables in `src/index.css`.

## Global Constraints

- The active hero is `src/pages/Home.jsx`; do not redesign `src/components/Hero.jsx` in this pass.
- Preserve anchors: `#home`, `#about`, `#projects`, `#contact`.
- Preserve terminal toggle behavior from `Navbar` and `Ctrl` + `` ` ``.
- Preserve the current Compiler Dark token system.
- Do not rework `netlify/functions/github-stats.js`.
- Do not add new pages, routing, CMS, or dynamic content.
- Do not add GSAP unless a separate dependency task is explicitly approved later.
- Green should not return as a broad UI accent; prefer cyan/gold for brand accents.
- No bracketed section dividers such as `[about]`.
- No cheap meta-labels such as `SECTION 01`, `QUESTION 05`, or `ABOUT US`.
- Cards use 8px radius or less, thin borders, and no cards inside cards.
- `npm run build` and `git diff --check` must pass before completion.

---

## File Structure

- Modify `src/components/Navbar.jsx`
  - Owns fixed navigation, brand lockup, section links, and terminal button.
- Modify `src/components/SectionDivider.jsx`
  - Owns editorial chapter transitions between active sections.
- Modify `src/App.jsx`
  - Passes richer divider copy into `SectionDivider` and keeps active section order.
- Modify `src/pages/Home.jsx`
  - Owns the active first viewport, hero statement, CTA actions, artifact panel, and proof strip.
- Modify `src/pages/Projects.jsx`
  - Owns the Build-X-From-Scratch bento grid and project card data.
- Modify `src/pages/About.jsx`
  - Owns manifesto copy, principles, contribution proof, and skills.
- Modify `src/pages/Contact.jsx`
  - Owns final CTA copy and terminal-led action.
- Modify `src/index.css`
  - Adds small reusable visual utilities only if needed: grain overlay, artifact panel surface, marquee animation, and responsive text helpers.

No inactive legacy components should be edited in this pass.

---

### Task 1: Strengthen The Navigation Brand Lockup

**Files:**
- Modify: `src/components/Navbar.jsx`

**Interfaces:**
- Consumes: `onTerminalToggle: () => void`, `terminalOpen: boolean`.
- Produces: Same `Navbar` default export and same section anchors.

- [ ] **Step 1: Inspect the current navbar behavior**

Run:

```bash
sed -n '1,220p' src/components/Navbar.jsx
```

Expected: The file exports `Navbar`, receives `onTerminalToggle` and `terminalOpen`, and contains links for `#home`, `#about`, `#projects`, and `#contact`.

- [ ] **Step 2: Replace the left brand anchor with a two-line lockup**

Inside the existing `<a href="#home">`, replace the `yusuf.cpp` single text node with this structure:

```jsx
<span className="block text-[0.72rem] font-black tracking-[0.2em] text-[var(--text-primary)] leading-none">
    YUSUF
</span>
<span className="hidden sm:block mt-1 text-[0.55rem] tracking-[0.22em] text-[var(--accent-info)] leading-none">
    BUILD-X-FROM-SCRATCH
</span>
```

Set the anchor class to:

```jsx
className="shrink-0 flex flex-col justify-center"
```

- [ ] **Step 3: Make desktop nav more editorial and less default**

Keep the `navLinks` array names unchanged for accessibility, but update desktop link classes to:

```jsx
className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
```

Update the desktop nav wrapper to:

```jsx
className="hidden md:flex items-center gap-7 ml-auto"
```

- [ ] **Step 4: Retune the terminal button without making it primary**

Use this class expression:

```jsx
className={`text-[0.68rem] uppercase tracking-[0.14em] px-3 py-1.5 border transition-colors ${terminalOpen
        ? 'border-[var(--accent-info)] text-[var(--accent-info)] bg-[color-mix(in_srgb,var(--accent-info)_8%,transparent)]'
        : 'border-[var(--border-light)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]'
    }`}
```

Button text should remain:

```jsx
&gt;_ terminal
```

- [ ] **Step 5: Verify navigation still targets the same anchors**

Run:

```bash
rg -n -- "#home|#about|#projects|#contact|onTerminalToggle|terminalOpen" src/components/Navbar.jsx
```

Expected: All four anchors exist, `onTerminalToggle` is still called, and `terminalOpen` still controls the button state.

- [ ] **Step 6: Build after navbar change**

Run:

```bash
npm run build
```

Expected: Vite exits 0. If `dist` changes, restore tracked `dist` files and remove new hashed assets after the build.

- [ ] **Step 7: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "style: strengthen portfolio brand nav"
```

---

### Task 2: Replace Terminal Dividers With Editorial Chapter Transitions

**Files:**
- Modify: `src/components/SectionDivider.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `SectionDivider` props from `App.jsx`.
- Produces: `SectionDivider({ title: string, kicker?: string })`.

- [ ] **Step 1: Replace the divider component API**

Replace the existing `SectionDivider` component with:

```jsx
import React from 'react';

const SectionDivider = ({ title, kicker }) => (
    <div className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl border-t border-[var(--border-light)] pt-8 md:pt-10">
            {kicker && (
                <p className="mb-3 text-[0.65rem] uppercase tracking-[0.22em] text-[var(--accent-info)]">
                    {kicker}
                </p>
            )}
            <h2
                className="max-w-4xl text-3xl font-black leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                {title}
            </h2>
        </div>
    </div>
);

export default SectionDivider;
```

- [ ] **Step 2: Update `App.jsx` divider usage**

Replace:

```jsx
<SectionDivider label="about" />
<SectionDivider label="projects" />
<SectionDivider label="contact" />
```

with:

```jsx
<SectionDivider
    kicker="systems notes"
    title="Systems, written close to the metal."
/>
<SectionDivider
    kicker="build artifacts"
    title="Repositories shaped like engineering notebooks."
/>
<SectionDivider
    kicker="interface"
    title="Start a conversation through the terminal."
/>
```

- [ ] **Step 3: Verify no old bracketed divider labels remain**

Run:

```bash
rg -n -- "SectionDivider label|\\[about\\]|\\[projects\\]|\\[contact\\]|// ——" src
```

Expected: No matches for the old `SectionDivider label` API or bracketed divider text.

- [ ] **Step 4: Build after divider change**

Run:

```bash
npm run build
```

Expected: Vite exits 0. Restore `dist` artifacts afterward if they changed.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx src/components/SectionDivider.jsx
git commit -m "style: add editorial section transitions"
```

---

### Task 3: Rebuild The Active Home Hero Around A Brand Statement

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/index.css` only if adding `.artifact-panel` or `.artifact-grid` utilities.

**Interfaces:**
- Consumes: existing `GitHubStatsStrip` and `motion` from Framer Motion.
- Produces: active `Home` section with `id="home"` still provided by `App.jsx`.

- [ ] **Step 1: Keep the existing rotating code renderer but demote it**

Do not delete the current `messages`, `renderCode`, typing state, or `handleCopy`. They will be reused inside the right-side artifact panel.

Confirm the syntax tokenizer still exists:

```bash
rg -n -- "renderCode|messages|handleCopy|std|cout|endl|syntax-string" src/pages/Home.jsx
```

Expected: All current code-snippet behavior remains available.

- [ ] **Step 2: Replace the hero outer layout**

Change the returned section wrapper to:

```jsx
<section className="relative min-h-screen overflow-hidden px-6 pt-28 pb-20 md:pt-36 md:pb-28">
    <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        {/* left brand column */}
        {/* right artifact panel */}
    </div>
</section>
```

The `max-w-6xl` is required by the spec to keep the H1 at 2-3 lines.

- [ ] **Step 3: Add the left brand column**

Use this content in the left column:

```jsx
<div className="relative z-10">
    <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-5 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent-info)]"
    >
        C++ systems programmer / research-minded builder
    </motion.p>

    <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="max-w-5xl text-[clamp(3.2rem,7vw,6.8rem)] font-black leading-[0.92] tracking-tight text-[var(--text-primary)]"
        style={{ fontFamily: 'var(--font-display)' }}
    >
        Building systems from scratch, close to the metal.
    </motion.h1>

    <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.18 }}
        className="mt-7 max-w-2xl text-base leading-8 text-[var(--text-secondary)] md:text-lg"
    >
        I rebuild core abstractions in C++, study computational systems, and turn low-level details into working artifacts.
    </motion.p>
</div>
```

- [ ] **Step 4: Add exactly two hero CTAs**

Place this below the hero paragraph:

```jsx
<motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay: 0.26 }}
    className="mt-9 flex flex-col gap-3 sm:flex-row"
>
    <a
        href="#projects"
        className="inline-flex items-center justify-center border border-[var(--accent-info)] bg-[var(--accent-info)] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[var(--bg-terminal)] transition-transform duration-200 hover:-translate-y-0.5"
    >
        View build artifacts
    </a>
    <button
        type="button"
        onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: '`', ctrlKey: true }))}
        className="inline-flex items-center justify-center border border-[var(--border-strong)] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--accent-warning)] hover:text-[var(--accent-warning)]"
    >
        Open terminal
    </button>
</motion.div>
```

This preserves terminal behavior through the existing global keyboard listener.

- [ ] **Step 5: Move `GitHubStatsStrip` below the CTAs**

Render the existing component as proof, not as headline interruption:

```jsx
<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.45, delay: 0.34 }}
    className="mt-8"
>
    <GitHubStatsStrip />
</motion.div>
```

- [ ] **Step 6: Build the right artifact panel using existing `renderCode()`**

Replace the current terminal card with this panel:

```jsx
<motion.div
    initial={{ opacity: 0, y: 24, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.55, delay: 0.18 }}
    className="group relative z-10 border border-[var(--border-strong)] bg-[var(--bg-terminal)] shadow-[0_24px_80px_rgba(0,0,0,0.42)]"
    onClick={handleCopy}
    title="Click to copy"
>
    <div className="flex items-center border-b border-[var(--border-light)] px-4 py-3">
        <span className="text-[0.64rem] uppercase tracking-[0.18em] text-[var(--accent-warning)]">
            build artifact
        </span>
        <span className="ml-auto text-[0.62rem] text-[var(--text-muted)]">
            {copied ? 'copied' : 'click to copy'}
        </span>
    </div>

    <div className="space-y-5 p-5">
        <div className="grid grid-cols-3 gap-3 text-[0.62rem] uppercase tracking-[0.14em] text-[var(--text-muted)]">
            <span>target: stl</span>
            <span>mode: scratch</span>
            <span>lang: c++20</span>
        </div>

        <div className="min-h-[7rem] border border-[var(--border-light)] bg-[rgba(0,0,0,0.22)] p-4 font-mono text-sm">
            <div className={`transition-opacity duration-500 ${phase === 'fading_out' ? 'opacity-0' : 'opacity-100'}`}>
                {renderCode()}
            </div>
        </div>

        <div className="grid gap-2 text-xs text-[var(--text-secondary)]">
            <div className="flex justify-between border-t border-[var(--border-light)] pt-3">
                <span>allocator discipline</span>
                <span className="text-[var(--accent-info)]">manual</span>
            </div>
            <div className="flex justify-between">
                <span>abstraction depth</span>
                <span className="text-[var(--accent-warning)]">source-level</span>
            </div>
        </div>
    </div>
</motion.div>
```

- [ ] **Step 7: Remove hero spam elements**

Ensure the active hero no longer contains:

```text
$ whoami
Systems Programmer | Kendari
scroll ▼
```

Run:

```bash
rg -n -- "\\$ whoami|scroll|Systems Programmer\\</span>|Kendari" src/pages/Home.jsx
```

Expected: No matches for old hero-specific copy.

- [ ] **Step 8: Build after hero change**

Run:

```bash
npm run build
```

Expected: Vite exits 0. Restore `dist` artifacts afterward if they changed.

- [ ] **Step 9: Commit**

```bash
git add src/pages/Home.jsx src/index.css
git commit -m "style: rebuild home hero as systems brand"
```

---

### Task 4: Convert Projects Into A Gapless Build Artifact Bento

**Files:**
- Modify: `src/pages/Projects.jsx`

**Interfaces:**
- Consumes: local static project data.
- Produces: `Projects` default export with a `grid-flow-dense` bento layout.

- [ ] **Step 1: Replace project data with bento-oriented data**

Use this array inside `Projects`:

```jsx
const artifacts = [
    {
        name: 'SVector',
        kind: 'container rebuild',
        statement: 'A source-level rebuild of std::vector with allocator control, capacity rules, iterator behavior, and API-compatible muscle memory.',
        github: 'https://github.com/Build-X-From-Scratch/SVector',
        tech: ['C++20', 'Allocator', 'STL'],
        className: 'md:col-span-3 md:row-span-2',
        public: true,
    },
    {
        name: 'forward_list_scratch',
        kind: 'linked primitive',
        statement: 'A forward-list implementation focused on splice, merge, sort, node ownership, and the real cost of pointer-shaped abstractions.',
        github: 'https://github.com/Build-X-From-Scratch/forward_list_sratch',
        tech: ['C++20', 'Nodes', 'Algorithms'],
        className: 'md:col-span-3 md:row-span-2',
        public: true,
    },
    {
        name: 'Stack / Queue',
        kind: 'linear adapters',
        statement: 'Small primitives rebuilt to expose the tradeoffs behind interface simplicity.',
        github: 'https://github.com/Build-X-From-Scratch/Stack_Scratch',
        tech: ['Adapters', 'Buffer'],
        className: 'md:col-span-2',
        public: true,
    },
    {
        name: 'Trees / Algorithms',
        kind: 'algorithmic internals',
        statement: 'Traversal, insertion, sorting, search, and the pieces hidden behind standard headers.',
        github: '#',
        tech: ['Trees', 'Sort', 'Search'],
        className: 'md:col-span-2',
        public: false,
    },
    {
        name: 'Research Notes',
        kind: 'systems to ML',
        statement: 'Academic and experimental notes connecting implementation details to computational models.',
        github: 'https://github.com/yusuf601/my-paper',
        tech: ['Research', 'ML'],
        className: 'md:col-span-2',
        public: true,
    },
];
```

- [ ] **Step 2: Replace the old featured/secondary split**

Remove:

```jsx
const featured = projects.filter(p => p.featured);
const secondary = projects.filter(p => !p.featured);
```

The new layout should map only over `artifacts`.

- [ ] **Step 3: Add the project section header**

Use:

```jsx
<div className="mb-10 max-w-3xl">
    <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="mb-3 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent-info)]"
    >
        Build-X-From-Scratch
    </motion.p>
    <motion.h3
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-4xl font-black leading-tight tracking-tight text-[var(--text-primary)] md:text-6xl"
        style={{ fontFamily: 'var(--font-display)' }}
    >
        Rebuilding the standard library as a learning system.
    </motion.h3>
</div>
```

- [ ] **Step 4: Add the gapless bento grid**

Use this grid wrapper:

```jsx
<div className="grid auto-rows-[minmax(13rem,auto)] grid-cols-1 gap-3 md:grid-cols-6 md:grid-flow-dense">
    {artifacts.map((artifact, idx) => (
        <motion.article
            key={artifact.name}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className={`${artifact.className} group flex min-h-[13rem] flex-col justify-between overflow-hidden border border-[var(--border-light)] bg-[var(--bg-panel)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-info)] hover:bg-[var(--bg-panel-hover)]`}
        >
            <div>
                <div className="mb-5 flex items-start justify-between gap-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[var(--accent-warning)]">
                        {artifact.kind}
                    </p>
                    <span className={`text-[0.6rem] uppercase tracking-[0.16em] ${artifact.public ? 'text-[var(--accent-info)]' : 'text-[var(--accent-danger)]'}`}>
                        {artifact.public ? 'public' : 'locked'}
                    </span>
                </div>
                <h4 className="mb-4 text-2xl font-black tracking-tight text-[var(--text-primary)]">
                    {artifact.name}
                </h4>
                <p className="max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
                    {artifact.statement}
                </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-2">
                {artifact.tech.map((tech) => (
                    <span key={tech} className="border border-[var(--border-light)] px-2 py-1 text-[0.64rem] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                        {tech}
                    </span>
                ))}
                {artifact.public && (
                    <a
                        href={artifact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent-info)]"
                    >
                        GitHub
                    </a>
                )}
            </div>
        </motion.article>
    ))}
</div>
```

- [ ] **Step 5: Verify bento density math in code**

Run:

```bash
rg -n -- "md:grid-cols-6|md:grid-flow-dense|md:col-span-3 md:row-span-2|md:col-span-2" src/pages/Projects.jsx
```

Expected: The grid uses 6 columns and dense flow, two major cards span 6 cells each, and three cards span 2 cells each.

- [ ] **Step 6: Remove repository-list copy**

Run:

```bash
rg -n -- "≥ featured|Featured tier|Secondary tier|// Build-X-From-Scratch" src/pages/Projects.jsx
```

Expected: No matches.

- [ ] **Step 7: Build after projects change**

Run:

```bash
npm run build
```

Expected: Vite exits 0. Restore `dist` artifacts afterward if they changed.

- [ ] **Step 8: Commit**

```bash
git add src/pages/Projects.jsx
git commit -m "style: present projects as build artifact bento"
```

---

### Task 5: Rewrite About Into A Systems Manifesto

**Files:**
- Modify: `src/pages/About.jsx`

**Interfaces:**
- Consumes: `ContributionHeatmap`.
- Produces: same `About` default export.

- [ ] **Step 1: Replace biography-first content with manifesto data**

Inside `About`, define:

```jsx
const principles = [
    {
        title: 'Rebuild the abstraction',
        body: 'I learn systems by recreating the pieces most people only import: containers, algorithms, memory behavior, and the tradeoffs behind clean APIs.',
    },
    {
        title: 'Measure before decorating',
        body: 'The work starts with constraints: runtime, memory, data layout, build behavior, and the shape of the problem before the interface gets polished.',
    },
    {
        title: 'Keep research close to implementation',
        body: 'Machine learning and computational ideas stay grounded when they meet real code, real data structures, and real failure modes.',
    },
];
```

Keep:

```jsx
const skills = ['C++', 'Python', 'Linux', 'Julia', 'Haskell', 'ML'];
```

- [ ] **Step 2: Replace the heading and intro**

Use:

```jsx
<div className="mb-12 max-w-4xl">
    <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="mb-3 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent-info)]"
    >
        Working principles
    </motion.p>
    <motion.h3
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-4xl font-black leading-tight tracking-tight text-[var(--text-primary)] md:text-6xl"
        style={{ fontFamily: 'var(--font-display)' }}
    >
        I care about the layer where abstractions become cost.
    </motion.h3>
    <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-6 max-w-3xl text-base leading-8 text-[var(--text-secondary)]"
    >
        My work sits between low-level C++ systems, Linux-first workflows, and computational research. The common thread is simple: understand the machinery deeply enough to build with intent.
    </motion.p>
</div>
```

- [ ] **Step 3: Render the principles as a 3-column editorial grid**

Use:

```jsx
<motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.4, delay: 0.16 }}
    className="grid gap-3 md:grid-cols-3"
>
    {principles.map((principle, index) => (
        <article
            key={principle.title}
            className="border border-[var(--border-light)] bg-[var(--bg-panel)] p-5"
        >
            <p className="mb-5 text-[0.62rem] uppercase tracking-[0.18em] text-[var(--accent-warning)]">
                0{index + 1}
            </p>
            <h4 className="mb-3 text-xl font-black tracking-tight text-[var(--text-primary)]">
                {principle.title}
            </h4>
            <p className="text-sm leading-7 text-[var(--text-secondary)]">
                {principle.body}
            </p>
        </article>
    ))}
</motion.div>
```

Number labels like `01` are allowed here because they are principle ordering content, not section labels like `SECTION 01`.

- [ ] **Step 4: Keep contribution heatmap and skills below manifesto**

Render `ContributionHeatmap` below the principles:

```jsx
<div className="mt-12">
    <ContributionHeatmap />
</div>
```

Render skills below the heatmap using the existing `skills.map`, but use this wrapper:

```jsx
<div className="mt-10 flex flex-wrap gap-2">
    {skills.map((skill) => (
        <span
            key={skill}
            className="border border-[var(--border-light)] px-3 py-1.5 text-sm text-[var(--text-primary)]"
        >
            {skill}
        </span>
    ))}
</div>
```

- [ ] **Step 5: Remove old biodata/dossier copy**

Run:

```bash
rg -n -- "Arch Linux|Role|Focus|Loc|Study|Years C\\+\\+|Memory bugs fixed|// core_technologies|// sys_info|./about-me" src/pages/About.jsx
```

Expected: No matches.

- [ ] **Step 6: Build after about change**

Run:

```bash
npm run build
```

Expected: Vite exits 0. Restore `dist` artifacts afterward if they changed.

- [ ] **Step 7: Commit**

```bash
git add src/pages/About.jsx
git commit -m "style: rewrite about as systems manifesto"
```

---

### Task 6: Refine Contact Into A Brand-Aligned Action Section

**Files:**
- Modify: `src/pages/Contact.jsx`

**Interfaces:**
- Consumes: existing `triggerTerminal`.
- Produces: same `Contact` default export and same terminal behavior.

- [ ] **Step 1: Replace the contact headline**

Replace:

```jsx
Ping me.<br />
<span style={{ color: 'var(--accent-success)' }}>I compile fast.</span>
```

with:

```jsx
Ship low-level work with me.
```

Use this class:

```jsx
className="mx-auto max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl"
```

Keep `fontFamily: 'var(--font-display)'`.

- [ ] **Step 2: Replace supporting copy**

Use:

```jsx
Systems architecture questions, C++ collaboration, algorithm deep-dives, or research-heavy implementation work. Send the hard problem, not the polished brief.
```

Use:

```jsx
className="mx-auto mb-10 max-w-2xl text-base leading-8 text-[var(--text-secondary)]"
```

- [ ] **Step 3: Retune the primary terminal button copy**

Inside the terminal trigger button, replace the small label with:

```jsx
primary interface
```

Replace command text with:

```jsx
open terminal session
```

Use cyan/gold accents instead of broad success green:

```jsx
className="group w-full border border-[var(--accent-info)] px-8 py-5 text-left font-mono transition-all duration-200 hover:bg-[color-mix(in_srgb,var(--accent-info)_6%,transparent)] sm:w-auto"
```

- [ ] **Step 4: Add GitHub as a secondary action**

Add a third secondary link:

```jsx
<a
    href="https://github.com/yusuf601"
    target="_blank"
    rel="noopener noreferrer"
    className="terminal-btn terminal-btn-secondary w-full justify-center sm:w-auto"
>
    <span style={{ color: 'var(--accent-info)' }}>→</span> inspect --github
</a>
```

- [ ] **Step 5: Remove old playful phrases**

Run:

```bash
rg -n -- "Ping me|I compile fast|all packets accepted|init_connection" src/pages/Contact.jsx
```

Expected: No matches.

- [ ] **Step 6: Build after contact change**

Run:

```bash
npm run build
```

Expected: Vite exits 0. Restore `dist` artifacts afterward if they changed.

- [ ] **Step 7: Commit**

```bash
git add src/pages/Contact.jsx
git commit -m "style: refine contact action copy"
```

---

### Task 7: Final Visual QA And Source Cleanup

**Files:**
- Modify: `src/index.css` only if earlier tasks added unused utilities or need small responsive fixes.
- Do not modify: `netlify/functions/github-stats.js`.

**Interfaces:**
- Produces: verified build-ready source.

- [ ] **Step 1: Confirm inactive legacy hero was not edited**

Run:

```bash
git diff --name-only HEAD~6..HEAD | rg "src/components/Hero.jsx"
```

Expected: No output. If there is output, inspect why `src/components/Hero.jsx` changed and revert only that task's accidental changes.

- [ ] **Step 2: Confirm no bracketed dividers or old meta labels remain**

Run:

```bash
rg -n -- "\\[(about|projects|contact)\\]|SECTION 0|QUESTION 0|ABOUT US|// ——" src
```

Expected: No matches.

- [ ] **Step 3: Confirm no broad green literals returned**

Run:

```bash
rg -n -- "3DDC97|8ccf7e|140, ?207, ?126|28c840|43D9AD|67, ?217, ?173" src tailwind.config.js
```

Expected: No matches. Compatibility class names like `everblush-green` may still exist only if they map to cyan tokens, but no old green literals should return.

- [ ] **Step 4: Check horizontal overflow risk**

Run:

```bash
rg -n -- "overflow-x-hidden|max-w-full|min-w-screen|translate-x-\\[" src
```

Expected: `overflow-x-hidden` should exist on any page-level wrapper if off-screen animation is introduced. If no off-screen animation was introduced, no extra wrapper is required.

- [ ] **Step 5: Run production build**

Run:

```bash
npm run build
```

Expected: Vite exits 0.

- [ ] **Step 6: Restore build artifacts if Vite rewrote `dist`**

Run:

```bash
git status --short
```

If `dist/index.html` or old tracked assets are modified/deleted, restore them:

```bash
git restore dist/index.html dist/assets/index-BfXsoJFn.css dist/assets/index-DMQqljCi.js
```

If new hashed assets appear under `dist/assets`, copy the exact filenames from `git status --short` and remove only those untracked files. Example for a status output containing `?? dist/assets/index-AbCdEf.css` and `?? dist/assets/index-XyZ123.js`:

```bash
rm -f dist/assets/index-AbCdEf.css dist/assets/index-XyZ123.js
```

- [ ] **Step 7: Run whitespace diff check**

Run:

```bash
git diff --check
```

Expected: No output and exit 0.

- [ ] **Step 8: Inspect final status**

Run:

```bash
git status --short
```

Expected: only intended source files are clean after commits, plus the pre-existing unstaged `netlify/functions/github-stats.js` if it still exists.

- [ ] **Step 9: Final commit if any cleanup source changes remain**

Only if Step 8 shows intended unstaged cleanup changes:

```bash
git add src/index.css src/App.jsx src/components/Navbar.jsx src/components/SectionDivider.jsx src/pages/Home.jsx src/pages/Projects.jsx src/pages/About.jsx src/pages/Contact.jsx
git commit -m "style: finish editorial systems layout"
```

Do not add `netlify/functions/github-stats.js`.

---

## Self-Review

Spec coverage:

- Active Home redesign: Task 3.
- Navbar brand lockup: Task 1.
- Editorial section transitions: Task 2.
- Gapless projects bento with `grid-flow-dense`: Task 4.
- About manifesto: Task 5.
- Contact action copy: Task 6.
- No GSAP in first pass because dependency is absent and spec recommends conservative path unless GSAP is already installed: covered in Global Constraints and Architecture.
- Verification with `npm run build` and `git diff --check`: Task 7.
- Do not include `netlify/functions/github-stats.js`: Global Constraints and Task 7.

Placeholder scan:

- The plan contains no unresolved markers, deferred implementation notes, or unspecified test steps.
- Vite hash cleanup uses a concrete example command and instructs implementers to copy exact filenames from `git status --short`.

Type and prop consistency:

- `SectionDivider` changes from `{ label }` to `{ title, kicker }`, and `App.jsx` is updated in the same task.
- `Navbar` keeps `onTerminalToggle` and `terminalOpen`.
- `Home`, `About`, `Projects`, and `Contact` keep default exports and existing active section mounting.
