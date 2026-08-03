# Typography Motion Design Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add restrained compiler/editorial typographic motion to the active portfolio without making the site feel like a generic animated landing page.

**Architecture:** Create a small reusable Framer Motion text helper for line/phrase reveals and reduced-motion handling, then apply it only to high-value typography surfaces. Keep body copy readable immediately, reserve staggered motion for headings and metadata, and leave terminal/status behavior untouched.

**Tech Stack:** React 19, Vite 7, Tailwind CSS 3, Framer Motion 12, existing CSS variables in `src/index.css`.

## Global Constraints

- Display text uses `font-display`.
- Reading copy uses `font-sans`.
- Terminal/code/metadata surfaces use `font-mono`.
- Use Framer Motion, not GSAP.
- Do not add `gsap` or `ScrollTrigger`.
- Motion must feel precise, quiet, source-level, editorial, compiler-like, readable first, animated second.
- Avoid glitch spam, typewriter on every heading, neon flicker, scramble text templates, rotating words, marquee overload, scroll behavior that makes text hard to read, and animations that trigger continuously while reading.
- Text must be readable without waiting for animation.
- No paragraph should remain low-opacity for long.
- No motion should hide important CTA text.
- No animation should depend on horizontal scroll.
- Motion should support hierarchy and should not be sprinkled evenly on every text node.
- Respect `prefers-reduced-motion`.
- When reduced motion is enabled, no staggered word/line transitions, no scale/translate text effects, text renders immediately at full opacity, and hover effects reduce to color/border changes only.
- Reveal headings by line or phrase, not character.
- Compiler Reveal uses `opacity: 0`, `y: 18`, optional `filter: blur(4px)` to `opacity: 1`, `y: 0`, `filter: blur(0px)`.
- Compiler Reveal duration is `0.45` to `0.7` seconds.
- Compiler Reveal stagger is `0.06` to `0.12` seconds.
- Do not use a typewriter effect for headings.
- Syntax emphasis wraps only a few key terms.
- Systems/API terms use `var(--accent-info)`.
- Build/value terms use `var(--accent-warning)`.
- Do not reintroduce broad green.
- Build Log Rhythm staggers small metadata items by `0.06` to `0.1` seconds.
- Home hero headline is split into `Building systems from scratch,` and `close to the metal`.
- The hero line break is intentional, not accidental wrapping.
- On mobile, hero lines can wrap naturally if needed, but must not overflow.
- Preserve the existing 2-3 line desktop/tablet hero criterion.
- Project card hover may shift card title by `x: 2` or `y: -1`, increase metadata/tag opacity, and move GitHub action by `x: 4`.
- Avoid changing tracking in a way that causes layout shift.
- No text scale that causes reflow.
- Do not add new motion to terminal content or the status bar.
- Do not animate text in a way that prevents selection or copying.
- Do not split words into individual letters.
- Do not use animation-only meaning.
- Do not hide CTAs during page load.
- Use normal DOM text, not canvas text, for headings and paragraphs.
- Do not install GSAP.
- Do not add ScrollTrigger.
- Do not add pinned sections.
- Do not add horizontal scroll.
- Do not add new pages or routes.
- Do not add new image assets.
- Do not change terminal commands.
- Do not redesign the layout.
- Do not change project data.
- Do not edit `netlify/functions/github-stats.js`.
- Do not replace the Typography System spec.
- Do not reintroduce visible period endings in the active page copy that was intentionally removed.
- `npm run build` and `git diff --check` must pass before completion.

---

## File Structure

- Create `src/components/MotionText.jsx`
  - Owns reusable compiler reveal behavior for line/phrase based text.
  - Owns Framer Motion `useReducedMotion()` handling for text reveal.
  - Exports `MotionText`, `compilerContainer`, `compilerItem`, and `metadataItem`.
- Modify `src/pages/Home.jsx`
  - Splits the hero H1 into intentional reveal lines.
  - Applies Build Log Rhythm to artifact metadata.
  - Keeps CTAs readable immediately.
- Modify `src/components/SectionDivider.jsx`
  - Converts the chapter divider into a reusable animated chapter title surface.
  - Keeps title text normal DOM content.
- Modify `src/pages/About.jsx`
  - Applies Compiler Reveal to the title.
  - Adds syntax-style emphasis to selected intro terms.
  - Keeps principle cards restrained.
- Modify `src/pages/Projects.jsx`
  - Applies Compiler Reveal to the title.
  - Applies Build Log Rhythm to artifact metadata/tags.
  - Adds subtle hover typography physics.
- Modify `src/pages/Contact.jsx`
  - Applies restrained Compiler Reveal to the headline.
  - Keeps the terminal action readable and immediately clickable.
- Inspect only `src/components/Terminal.jsx` and `src/components/CppStatusBar.jsx`
  - Verify no typography motion was added to terminal or status surfaces.

---

### Task 1: Add Reduced-Motion Compiler Reveal Helper

**Files:**
- Create: `src/components/MotionText.jsx`

**Interfaces:**
- Produces named exports:
  - `compilerContainer`
  - `compilerItem`
  - `metadataItem`
  - `MotionText({ as, segments, className, itemClassName, delay, stagger, amount })`
- `segments` is an array of strings.
- `as` defaults to `'span'`.
- `delay` defaults to `0`.
- `stagger` defaults to `0.08`.
- `amount` defaults to `0.3`.
- When reduced motion is enabled, `MotionText` renders immediately with no translate, blur, or stagger.

- [ ] **Step 1: Inspect current motion imports**

Run:

```bash
rg -n -- "useReducedMotion|from 'framer-motion'|from \"framer-motion\"" src
```

Expected: existing files import `motion` from Framer Motion; `useReducedMotion` is not yet used for typography reveal.

- [ ] **Step 2: Create `MotionText.jsx`**

Create `src/components/MotionText.jsx` with exactly this implementation:

```jsx
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const compilerContainer = {
    hidden: {},
    visible: (config = {}) => ({
        transition: {
            delayChildren: config.delay ?? 0,
            staggerChildren: config.stagger ?? 0.08,
        },
    }),
};

export const compilerItem = {
    hidden: {
        opacity: 0,
        y: 18,
        filter: 'blur(4px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export const metadataItem = {
    hidden: {
        opacity: 0,
        y: 6,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.38,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const motionTags = {
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    h4: motion.h4,
    p: motion.p,
    div: motion.div,
    span: motion.span,
};

const MotionText = ({
    as = 'span',
    segments,
    className = '',
    itemClassName = 'block',
    delay = 0,
    stagger = 0.08,
    amount = 0.3,
}) => {
    const shouldReduceMotion = useReducedMotion();
    const Tag = motionTags[as] ?? motion.span;

    if (shouldReduceMotion) {
        return (
            <Tag className={className}>
                {segments.map((segment, index) => (
                    <span key={`${segment}-${index}`} className={itemClassName}>
                        {segment}
                    </span>
                ))}
            </Tag>
        );
    }

    return (
        <Tag
            variants={compilerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount }}
            custom={{ delay, stagger }}
            className={className}
        >
            {segments.map((segment, index) => (
                <motion.span
                    key={`${segment}-${index}`}
                    variants={compilerItem}
                    className={itemClassName}
                >
                    {segment}
                </motion.span>
            ))}
        </Tag>
    );
};

export default MotionText;
```

- [ ] **Step 3: Verify helper exports and reduced motion**

Run:

```bash
rg -n -- "useReducedMotion|compilerContainer|compilerItem|metadataItem|export default MotionText" src/components/MotionText.jsx
```

Expected:

- `useReducedMotion` is imported and used.
- `compilerContainer`, `compilerItem`, and `metadataItem` are exported.
- `MotionText` is the default export.

- [ ] **Step 4: Build**

Run:

```bash
npm run build
```

Expected: Vite exits 0. If `dist` changes, restore tracked `dist` files and remove generated untracked hashed assets after the build.

- [ ] **Step 5: Commit**

```bash
git add src/components/MotionText.jsx
git commit -m "feat: add typography motion helper"
```

---

### Task 2: Apply Hero Compiler Reveal And Build Log Rhythm

**Files:**
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes from Task 1:
  - `MotionText`
  - `compilerContainer`
  - `metadataItem`
- Produces Home hero with intentional line-based reveal:
  - `Building systems from scratch,`
  - `close to the metal`

- [ ] **Step 1: Import helper exports**

In `src/pages/Home.jsx`, replace:

```jsx
import { motion } from 'framer-motion';
```

with:

```jsx
import { motion } from 'framer-motion';
import MotionText, { compilerContainer, metadataItem } from '../components/MotionText';
```

- [ ] **Step 2: Replace hero H1 with `MotionText`**

Replace the current `motion.h1` hero block with:

```jsx
<MotionText
    as="h1"
    segments={['Building systems from scratch,', 'close to the metal']}
    delay={0.08}
    stagger={0.08}
    className="font-display max-w-6xl text-[clamp(3rem,6vw,5.8rem)] font-black leading-[0.92] tracking-tight text-[var(--text-primary)]"
    itemClassName="block"
/>
```

This must preserve the current no-period ending in visible copy.

- [ ] **Step 3: Keep supporting copy stable**

Leave the supporting paragraph as a simple `motion.p` with its current visible text:

```text
I rebuild core abstractions in C++, study computational systems, and turn low-level details into working artifacts
```

Do not add word-level or phrase-level motion to this paragraph in this task.

- [ ] **Step 4: Apply Build Log Rhythm to artifact metadata**

Replace the artifact metadata row:

```jsx
<div className="grid grid-cols-3 gap-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--text-muted)]">
    <span>target: stl</span>
    <span>mode: scratch</span>
    <span>lang: c++20</span>
</div>
```

with:

```jsx
<motion.div
    variants={compilerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.4 }}
    custom={{ delay: 0.04, stagger: 0.08 }}
    className="grid grid-cols-3 gap-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--text-muted)]"
>
    {['target: stl', 'mode: scratch', 'lang: c++20'].map((item) => (
        <motion.span key={item} variants={metadataItem}>
            {item}
        </motion.span>
    ))}
</motion.div>
```

- [ ] **Step 5: Verify Home motion scope**

Run:

```bash
rg -n -- "MotionText|compilerContainer|metadataItem|Building systems from scratch|close to the metal|target: stl|mode: scratch|lang: c\\+\\+20" src/pages/Home.jsx
```

Expected:

- `MotionText` is used for the H1.
- The H1 segments are `Building systems from scratch,` and `close to the metal`.
- Build metadata uses `compilerContainer` and `metadataItem`.
- No visible period is reintroduced to the H1 or supporting paragraph.

- [ ] **Step 6: Build**

Run:

```bash
npm run build
```

Expected: Vite exits 0. Restore `dist` artifacts afterward if they changed.

- [ ] **Step 7: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: add hero typography motion"
```

---

### Task 3: Convert SectionDivider To Chapter Motion Primitive

**Files:**
- Modify: `src/components/SectionDivider.jsx`

**Interfaces:**
- Consumes from Task 1:
  - `MotionText`
  - `compilerContainer`
  - `metadataItem`
- Produces animated chapter divider where kicker appears first and title reveals by phrase.

- [ ] **Step 1: Add Framer Motion and helper imports**

Replace:

```jsx
import React from 'react';
```

with:

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import MotionText, { compilerContainer, metadataItem } from './MotionText';
```

- [ ] **Step 2: Add a title phrase helper**

Above `const SectionDivider`, add:

```jsx
const splitTitle = (title) => {
    if (title.includes(',')) {
        const [first, ...rest] = title.split(',');
        return [`${first},`, rest.join(',').trim()].filter(Boolean);
    }

    return [title];
};
```

- [ ] **Step 3: Animate kicker and title**

Replace the current `SectionDivider` implementation with:

```jsx
const SectionDivider = ({ title, kicker }) => (
    <div className="px-6 py-20 md:py-28">
        <motion.div
            variants={compilerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            custom={{ delay: 0, stagger: 0.08 }}
            className="mx-auto max-w-6xl border-t border-[var(--border-light)] pt-8 md:pt-10"
        >
            {kicker && (
                <motion.p
                    variants={metadataItem}
                    className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--accent-info)]"
                >
                    {kicker}
                </motion.p>
            )}
            <MotionText
                as="h2"
                segments={splitTitle(title)}
                delay={0.04}
                stagger={0.08}
                amount={0.35}
                className="font-display max-w-4xl text-3xl font-black leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl"
                itemClassName="block"
            />
        </motion.div>
    </div>
);
```

- [ ] **Step 4: Verify SectionDivider motion**

Run:

```bash
rg -n -- "splitTitle|MotionText|compilerContainer|metadataItem|motion\\.p|font-display" src/components/SectionDivider.jsx
```

Expected:

- `splitTitle` exists.
- Kicker uses `motion.p` and `metadataItem`.
- Title uses `MotionText`.
- No section numbering is added.

- [ ] **Step 5: Build**

Run:

```bash
npm run build
```

Expected: Vite exits 0. Restore `dist` artifacts afterward if they changed.

- [ ] **Step 6: Commit**

```bash
git add src/components/SectionDivider.jsx
git commit -m "feat: add chapter typography motion"
```

---

### Task 4: Add About Compiler Reveal And Syntax Emphasis

**Files:**
- Modify: `src/pages/About.jsx`

**Interfaces:**
- Consumes from Task 1:
  - `MotionText`
- Produces About intro with 3-5 syntax-emphasized terms.

- [ ] **Step 1: Import helper**

In `src/pages/About.jsx`, add:

```jsx
import MotionText from '../components/MotionText';
```

below the existing Framer Motion import.

- [ ] **Step 2: Add emphasis token component**

Above `const About`, add:

```jsx
const SyntaxTerm = ({ tone = 'info', children }) => (
    <motion.span
        initial={{ opacity: 0.72 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.35 }}
        className={tone === 'warning' ? 'text-[var(--accent-warning)]' : 'text-[var(--accent-info)]'}
    >
        {children}
    </motion.span>
);
```

- [ ] **Step 3: Replace About title with Compiler Reveal**

Replace the current `motion.h3` main title block with:

```jsx
<MotionText
    as="h3"
    segments={['I care about the layer where', 'abstractions become cost']}
    delay={0.05}
    stagger={0.08}
    className="font-display text-4xl font-black leading-tight tracking-tight text-[var(--text-primary)] md:text-6xl"
    itemClassName="block"
/>
```

- [ ] **Step 4: Add syntax emphasis to intro paragraph**

Replace the intro paragraph text with JSX that emphasizes exactly these terms:

```jsx
My work sits between low-level C++ <SyntaxTerm tone="info">systems</SyntaxTerm>, Linux-first workflows, and computational <SyntaxTerm tone="warning">research</SyntaxTerm>; the common thread is simple: understand the machinery deeply enough to build with <SyntaxTerm tone="warning">intent</SyntaxTerm>
```

Keep the existing paragraph wrapper and `font-sans` class.

- [ ] **Step 5: Keep principle cards restrained**

Inspect the principle cards and keep their existing fade/stagger behavior. Do not add hover motion or word-level animation to the principle cards in this task.

- [ ] **Step 6: Verify About motion and color rules**

Run:

```bash
rg -n -- "MotionText|SyntaxTerm|accent-info|accent-warning|abstractions become cost|text-\\[var\\(--accent-green\\)\\]|accent-success" src/pages/About.jsx
```

Expected:

- `MotionText` is used for the About title.
- `SyntaxTerm` exists.
- Emphasis uses `accent-info` and `accent-warning`.
- No broad green emphasis is introduced.
- No visible period is reintroduced to About copy.

- [ ] **Step 7: Build**

Run:

```bash
npm run build
```

Expected: Vite exits 0. Restore `dist` artifacts afterward if they changed.

- [ ] **Step 8: Commit**

```bash
git add src/pages/About.jsx
git commit -m "feat: add about typography emphasis"
```

---

### Task 5: Add Project Title, Metadata, And Hover Typography Motion

**Files:**
- Modify: `src/pages/Projects.jsx`

**Interfaces:**
- Consumes from Task 1:
  - `MotionText`
  - `compilerContainer`
  - `metadataItem`
- Produces Project cards with metadata rhythm and subtle hover typography physics.

- [ ] **Step 1: Import helper exports**

In `src/pages/Projects.jsx`, add:

```jsx
import MotionText, { compilerContainer, metadataItem } from '../components/MotionText';
```

below the existing Framer Motion import.

- [ ] **Step 2: Replace Projects title with Compiler Reveal**

Replace the current `motion.h3` title block with:

```jsx
<MotionText
    as="h3"
    segments={['Rebuilding the standard library', 'as a learning system']}
    delay={0.05}
    stagger={0.08}
    className="font-display text-4xl font-black leading-tight tracking-tight text-[var(--text-primary)] md:text-6xl"
    itemClassName="block"
/>
```

- [ ] **Step 3: Apply Build Log Rhythm to card metadata**

Inside each project card, replace the metadata row wrapper:

```jsx
<div className="mb-5 flex items-start justify-between gap-4">
```

with:

```jsx
<motion.div
    variants={compilerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.4 }}
    custom={{ delay: 0.03, stagger: 0.07 }}
    className="mb-5 flex items-start justify-between gap-4"
>
```

Then replace its closing `</div>` with `</motion.div>`.

Add `variants={metadataItem}` to the `kind` paragraph and the public/locked `span`.

- [ ] **Step 4: Add hover typography physics to title and GitHub action**

Replace the project title:

```jsx
<h4 className="mb-4 font-display text-2xl font-black tracking-tight text-[var(--text-primary)]">
    {artifact.name}
</h4>
```

with:

```jsx
<motion.h4
    whileHover={{ x: 2 }}
    transition={{ duration: 0.18 }}
    className="mb-4 font-display text-2xl font-black tracking-tight text-[var(--text-primary)]"
>
    {artifact.name}
</motion.h4>
```

Replace the GitHub action `className` on its `a` tag with:

```jsx
className="ml-auto font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent-info)] transition-opacity duration-200 group-hover:opacity-100"
```

Then wrap the visible `GitHub` label with:

```jsx
<motion.span whileHover={{ x: 4 }} transition={{ duration: 0.18 }} className="inline-block">
    GitHub
</motion.span>
```

- [ ] **Step 5: Apply Build Log Rhythm to tech tags**

Replace the tech tag map item:

```jsx
<span key={tech} className="border border-[var(--border-light)] px-2 py-1 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-[var(--text-muted)]">
    {tech}
</span>
```

with:

```jsx
<motion.span
    key={tech}
    variants={metadataItem}
    className="border border-[var(--border-light)] px-2 py-1 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-[var(--text-muted)] transition-opacity duration-200 group-hover:opacity-90"
>
    {tech}
</motion.span>
```

- [ ] **Step 6: Verify Projects motion scope**

Run:

```bash
rg -n -- "MotionText|compilerContainer|metadataItem|motion\\.h4|whileHover|group-hover:opacity|Rebuilding the standard library|as a learning system|text-\\[var\\(--accent-green\\)\\]|accent-success" src/pages/Projects.jsx
```

Expected:

- Projects title uses `MotionText`.
- Metadata and tags use `metadataItem`.
- Project title hover shifts by `x: 2`.
- GitHub label hover shifts by `x: 4`.
- No broad green emphasis is introduced.
- No visible period is reintroduced to project copy.

- [ ] **Step 7: Build**

Run:

```bash
npm run build
```

Expected: Vite exits 0. Restore `dist` artifacts afterward if they changed.

- [ ] **Step 8: Commit**

```bash
git add src/pages/Projects.jsx
git commit -m "feat: add project typography motion"
```

---

### Task 6: Add Restrained Contact Typography Motion

**Files:**
- Modify: `src/pages/Contact.jsx`

**Interfaces:**
- Consumes from Task 1:
  - `MotionText`
- Produces restrained final reveal for Contact headline while keeping terminal action immediately readable.

- [ ] **Step 1: Import helper**

In `src/pages/Contact.jsx`, add:

```jsx
import MotionText from '../components/MotionText';
```

below the existing Framer Motion import.

- [ ] **Step 2: Replace Contact headline with Compiler Reveal**

Replace the current `motion.h4` headline block with:

```jsx
<MotionText
    as="h4"
    segments={['Ship low-level work', 'with me']}
    delay={0.08}
    stagger={0.08}
    className="font-display mx-auto max-w-3xl text-4xl font-black leading-tight tracking-tight text-[var(--text-primary)] md:text-6xl"
    itemClassName="block"
/>
```

- [ ] **Step 3: Keep terminal action readable**

Inspect the primary terminal button. Do not add initial opacity, translate, blur, scale, or stagger to the button content. The `$ open terminal session _` line must remain immediately readable and clickable.

- [ ] **Step 4: Verify Contact motion scope**

Run:

```bash
rg -n -- "MotionText|Ship low-level work|with me|open terminal session|initial=\\{\\{ opacity: 0|filter: 'blur|blur\\(" src/pages/Contact.jsx
```

Expected:

- Contact headline uses `MotionText`.
- Primary terminal action text remains present.
- No new blur or hidden initial state is added to the terminal action content.
- No visible period is reintroduced to Contact copy.

- [ ] **Step 5: Build**

Run:

```bash
npm run build
```

Expected: Vite exits 0. Restore `dist` artifacts afterward if they changed.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Contact.jsx
git commit -m "feat: add contact typography motion"
```

---

### Task 7: Final Typography Motion Verification

**Files:**
- Inspect: `src/components/MotionText.jsx`
- Inspect: `src/pages/Home.jsx`
- Inspect: `src/components/SectionDivider.jsx`
- Inspect: `src/pages/About.jsx`
- Inspect: `src/pages/Projects.jsx`
- Inspect: `src/pages/Contact.jsx`
- Inspect only: `src/components/Terminal.jsx`
- Inspect only: `src/components/CppStatusBar.jsx`
- Modify only if needed: active files touched in Tasks 1-6
- Do not modify: `netlify/functions/github-stats.js`

**Interfaces:**
- Produces verified typography motion implementation ready for final review.

- [ ] **Step 1: Check no GSAP dependency or usage**

Run:

```bash
rg -n -- "gsap|ScrollTrigger" package.json src
```

Expected: no matches.

- [ ] **Step 2: Check reduced motion handling**

Run:

```bash
rg -n -- "useReducedMotion|prefers-reduced-motion" src/components/MotionText.jsx src/pages/Home.jsx src/components/SectionDivider.jsx src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx
```

Expected: `src/components/MotionText.jsx` contains `useReducedMotion`.

- [ ] **Step 3: Check blur usage is centralized**

Run:

```bash
rg -n -- "filter: 'blur|blur\\(" src
```

Expected: blur for typography reveal appears only in `src/components/MotionText.jsx`, or an implementer explains and fixes any additional text blur.

- [ ] **Step 4: Check terminal and status surfaces were not animated**

Run:

```bash
rg -n -- "motion\\.|MotionText|compilerContainer|metadataItem|useReducedMotion" src/components/Terminal.jsx src/components/CppStatusBar.jsx
```

Expected: no matches for added typography motion helpers in Terminal or CppStatusBar. Existing non-typography terminal behavior may remain if already present before this plan; if this check finds only pre-existing code, record the exact lines in the report.

- [ ] **Step 5: Check active copy keeps no-period endings**

Run:

```bash
rg -n -- "metal\\.|artifacts\\.|cost\\.|intent\\.|system\\.|brief\\.|terminal\\.|notebooks\\." src/App.jsx src/pages/Home.jsx src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx
```

Expected: no matches in visible copy. Technical punctuation such as `./contact.sh`, URLs, `std::`, `main.cpp`, and terminal command output are allowed outside this check.

- [ ] **Step 6: Check typography role preservation**

Run:

```bash
rg -n -- "font-display|font-sans|font-mono" src/pages/Home.jsx src/components/SectionDivider.jsx src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx
```

Expected:

- Display headlines still use `font-display`.
- Body copy still uses `font-sans`.
- Metadata and command surfaces still use `font-mono`.

- [ ] **Step 7: Run production build**

Run:

```bash
npm run build
```

Expected: Vite exits 0.

- [ ] **Step 8: Restore build artifacts if Vite rewrote `dist`**

Run:

```bash
git status --short
```

If `dist/index.html` or old tracked assets are modified/deleted, restore tracked `dist` files:

```bash
git restore dist/index.html dist/assets/index-BfXsoJFn.css dist/assets/index-DMQqljCi.js
```

If new hashed assets appear under `dist/assets`, copy exact filenames from `git status --short` and remove only those untracked files. Example:

```bash
rm -f dist/assets/index-AbCdEf.css dist/assets/index-XyZ123.js
```

- [ ] **Step 9: Run whitespace diff check**

Run:

```bash
git diff --check
```

Expected: no output and exit 0.

- [ ] **Step 10: Inspect final status**

Run:

```bash
git status --short
```

Expected: intended source files are committed. If running in the main worktree, the pre-existing unstaged `netlify/functions/github-stats.js` may still be present and must not be added.

- [ ] **Step 11: Final cleanup commit if needed**

Only if Step 10 shows intended unstaged typography-motion cleanup:

```bash
git add src/components/MotionText.jsx src/pages/Home.jsx src/components/SectionDivider.jsx src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx
git commit -m "feat: finish typography motion pass"
```

Do not add `netlify/functions/github-stats.js`.

---

## Self-Review

Spec coverage:

- Compiler Reveal helper and reduced motion handling: Task 1.
- Home hero intentional line break and Build Log Rhythm: Task 2.
- SectionDivider chapter motion primitive: Task 3.
- About Syntax Emphasis: Task 4.
- Projects Build Log Rhythm and Hover Typography Physics: Task 5.
- Contact restrained final reveal: Task 6.
- Terminal and status bar exclusion: Task 7.
- No GSAP, no ScrollTrigger, no broad green, no visible period endings: Global Constraints and Task 7.
- Build and diff-check verification: Tasks 1-7.
- Excluding `netlify/functions/github-stats.js`: Global Constraints and Task 7.

Placeholder scan:

- This plan contains no unresolved markers, deferred implementation notes, or unspecified test steps.
- Every task has exact files, exact commands, expected outcomes, and commit messages.

Interface consistency:

- `MotionText`, `compilerContainer`, `compilerItem`, and `metadataItem` are defined in Task 1 before later tasks consume them.
- Later tasks import only the helper exports created in Task 1.
- No component public API changes are introduced except internal SectionDivider title splitting.
- No route, project data, terminal command, or asset changes are introduced.
