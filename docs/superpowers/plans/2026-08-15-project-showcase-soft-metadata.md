# Project Showcase And Soft Metadata Typography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the portfolio flow and Projects section so `SVector` becomes the flagship Build-X-From-Scratch artifact and small metadata typography feels softer across active sections.

**Architecture:** Remove the redundant pre-About chapter divider in `src/App.jsx`, add small reusable style constants for soft metadata treatment, and rebuild `src/pages/Projects.jsx` around a featured artifact plus supporting artifact rail. Keep current React component boundaries, existing Framer Motion helper usage, and project data in local component scope.

**Tech Stack:** React 19, Vite 7, Tailwind CSS 3, Framer Motion 12, existing CSS variables in `src/index.css`, existing `MotionText` helper in `src/components/MotionText.jsx`.

## Global Constraints

- Remove the `SectionDivider` before About.
- Keep About route anchor unchanged.
- Keep Projects and Contact anchors unchanged.
- Do not change terminal toggle behavior.
- Keep the `build artifacts` divider before Projects unless the implementation replaces it with equivalent Projects-local section framing.
- Keep the `interface` divider before Contact, but soften its metadata treatment if global small typography rules apply.
- Rebuild `src/pages/Projects.jsx` around `SVector` as the flagship artifact.
- Present remaining projects as compact supporting artifacts.
- Keep all existing project entries.
- Keep public GitHub links.
- Keep locked state for non-public item.
- Do not add fake metrics.
- Do not add new project data model requirements unless local derived arrays improve clarity.
- Preserve existing typography motion where it still fits.
- Do not increase motion complexity.
- Keep existing `MotionText` helper.
- Do not add new animations to solve hierarchy.
- Do not add new page-level choreography.
- Do not add additional blur outside `MotionText`.
- Do not animate terminal/status surfaces.
- Small editorial labels should feel softer and less terminal-like.
- Use `font-mono` only when the label reads like code, command, build output, status, or low-level artifact metadata.
- Terminal/code/build surfaces still retain monospace where appropriate.
- Project tags are quieter than before.
- Do not make every tag cyan/gold.
- Do not introduce broad green accents.
- Do not add periods back to active page copy.
- Do not add new pages or routes.
- Do not add new image assets.
- Do not install GSAP.
- Do not add ScrollTrigger or pinned sections.
- Do not change terminal commands.
- Do not change status bar behavior.
- Do not edit `netlify/functions/github-stats.js`.
- `npm run build` and `git diff --check` must pass before completion.

---

## File Structure

- Modify `src/App.jsx`
  - Removes the pre-About `SectionDivider`.
  - Preserves anchors and terminal behavior.
- Modify `src/components/SectionDivider.jsx`
  - Softens chapter kicker typography for remaining dividers.
  - Keeps `MotionText` title reveal and no section numbering.
- Modify `src/pages/About.jsx`
  - Softens `Working principles` kicker only.
  - Keeps About content structure and syntax emphasis.
- Modify `src/pages/Contact.jsx`
  - Softens `primary interface` label only.
  - Keeps terminal action and shortcut behavior.
- Modify `src/pages/Home.jsx`
  - Softens the hero kicker if needed while preserving terminal/code artifact mono surfaces.
- Modify `src/pages/Projects.jsx`
  - Owns artifact data, derived `featuredArtifact` and `supportingArtifacts`, flagship layout, supporting rail, and project-specific soft metadata styles.

---

### Task 1: Remove Redundant Pre-About Divider

**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Produces app flow:
  - `Home`
  - `About`
  - `build artifacts` divider
  - `Projects`
  - `interface` divider
  - `Contact`
- Preserves route anchors:
  - `<div id="about"><About /></div>`
  - `<div id="projects"><Projects /></div>`
  - `<div id="contact"><Contact /></div>`

- [ ] **Step 1: Inspect current app flow**

Run:

```bash
sed -n '30,55p' src/App.jsx
```

Expected: `SectionDivider` with `kicker="systems notes"` appears between Home and About.

- [ ] **Step 2: Remove only the pre-About divider**

In `src/App.jsx`, remove this block:

```jsx
<SectionDivider
    kicker="systems notes"
    title="Systems, written close to the metal"
/>
```

Keep this exact About anchor:

```jsx
<div id="about"><About /></div>
```

Do not remove the `build artifacts` or `interface` dividers.

- [ ] **Step 3: Verify app flow**

Run:

```bash
rg -n -- "systems notes|Systems, written close to the metal|build artifacts|interface|id=\"about\"|id=\"projects\"|id=\"contact\"" src/App.jsx
```

Expected:

- No `systems notes` match.
- No `Systems, written close to the metal` match.
- `build artifacts` still exists.
- `interface` still exists.
- About, Projects, and Contact anchors still exist.

- [ ] **Step 4: Build**

Run:

```bash
npm run build
```

Expected: Vite exits 0. If `dist` changes, restore tracked `dist` files and remove generated untracked hashed assets after the build.

- [ ] **Step 5: Diff check**

Run:

```bash
git diff --check
```

Expected: no output and exit 0.

- [ ] **Step 6: Commit**

```bash
git add src/App.jsx
git commit -m "style: remove redundant about divider"
```

---

### Task 2: Soften Shared Editorial Labels

**Files:**
- Modify: `src/components/SectionDivider.jsx`
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Contact.jsx`

**Interfaces:**
- Produces softer editorial label treatment:
  - `font-sans`
  - `text-[0.72rem]` or `text-xs`
  - `tracking-[0.08em]`
  - muted/secondary text by default
- Preserves monospace for command/code/build surfaces:
  - Home artifact panel metadata stays `font-mono`.
  - Contact terminal action stays `font-mono`.

- [ ] **Step 1: Inspect current hard label classes**

Run:

```bash
rg -n -- "tracking-\\[0\\.22em\\]|tracking-\\[0\\.18em\\]|font-mono text-\\[0\\.68rem\\]|primary interface|Working principles|Build-X-From-Scratch|C\\+\\+ systems programmer" src/components/SectionDivider.jsx src/pages/About.jsx src/pages/Home.jsx src/pages/Contact.jsx
```

Expected: matches show the current hard mono/wide-tracked labels.

- [ ] **Step 2: Soften `SectionDivider` kicker**

In `src/components/SectionDivider.jsx`, replace the kicker class:

```jsx
className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--accent-info)]"
```

with:

```jsx
className="mb-3 font-sans text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]"
```

Do not change `MotionText`, `splitTitle`, or title classes.

- [ ] **Step 3: Soften About kicker**

In `src/pages/About.jsx`, replace the `Working principles` kicker class:

```jsx
className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent-info)]"
```

with:

```jsx
className="mb-3 font-sans text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]"
```

Do not change the About title, syntax emphasis, principle cards, or skill chips.

- [ ] **Step 4: Soften Home hero kicker**

In `src/pages/Home.jsx`, replace the hero kicker class:

```jsx
className="mb-5 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent-info)]"
```

with:

```jsx
className="mb-5 font-sans text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]"
```

Do not change Home hero layout, terminal code renderer, artifact panel, CTA text, or GitHub stats strip.

- [ ] **Step 5: Soften Contact `primary interface` label**

In `src/pages/Contact.jsx`, locate the `primary interface` label inside the terminal button and replace its class:

```jsx
className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--accent-info)] opacity-60 mb-1"
```

with:

```jsx
className="mb-1 font-sans text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]"
```

Do not change the button `font-mono`, click handler, shortcut hint, secondary links, or exit line.

- [ ] **Step 6: Verify softened labels and preserved mono surfaces**

Run:

```bash
rg -n -- "Working principles|C\\+\\+ systems programmer|primary interface|font-sans text-xs uppercase tracking-\\[0\\.08em\\]|font-mono" src/components/SectionDivider.jsx src/pages/About.jsx src/pages/Home.jsx src/pages/Contact.jsx
```

Expected:

- Editorial labels use the softer `font-sans text-xs uppercase tracking-[0.08em]` treatment.
- Home artifact/code metadata still has `font-mono`.
- Contact terminal button still has `font-mono`.

- [ ] **Step 7: Build**

Run:

```bash
npm run build
```

Expected: Vite exits 0. Restore `dist` artifacts afterward if they changed.

- [ ] **Step 8: Diff check**

Run:

```bash
git diff --check
```

Expected: no output and exit 0.

- [ ] **Step 9: Commit**

```bash
git add src/components/SectionDivider.jsx src/pages/About.jsx src/pages/Home.jsx src/pages/Contact.jsx
git commit -m "style: soften editorial metadata labels"
```

---

### Task 3: Rebuild Projects Around SVector Flagship

**Files:**
- Modify: `src/pages/Projects.jsx`

**Interfaces:**
- Consumes existing local `artifacts` array.
- Produces local derived values:
  - `featuredArtifact`
  - `supportingArtifacts`
  - `flagshipCues`
- Produces layout:
  - Projects header.
  - SVector flagship block.
  - Supporting artifact rail/list.

- [ ] **Step 1: Inspect Projects current structure**

Run:

```bash
sed -n '1,220p' src/pages/Projects.jsx
```

Expected: Projects maps all `artifacts` into equal bento-style `motion.article` cards.

- [ ] **Step 2: Remove unused bento sizing field from artifact data**

In each artifact object in `src/pages/Projects.jsx`, remove the `className` property:

```jsx
className: 'md:col-span-3 md:row-span-2',
```

or:

```jsx
className: 'md:col-span-2',
```

Keep every other field:

- `name`
- `kind`
- `statement`
- `github`
- `tech`
- `public`

- [ ] **Step 3: Add derived artifact groups and flagship cues**

Below the `artifacts` array and before `return`, add:

```jsx
const featuredArtifact = artifacts.find((artifact) => artifact.name === 'SVector');
const supportingArtifacts = artifacts.filter((artifact) => artifact.name !== 'SVector');
const flagshipCues = ['allocator discipline', 'capacity semantics', 'iterator behavior'];
```

Do not duplicate `SVector` data into a separate object.

- [ ] **Step 4: Replace Projects header copy**

Replace the current `MotionText` segments:

```jsx
segments={['Rebuilding the standard library', 'as a learning system']}
```

with:

```jsx
segments={['One flagship rebuild,', 'followed by supporting artifacts']}
```

Keep the visible copy period-free.

- [ ] **Step 5: Replace equal-grid wrapper with flagship-plus-rail wrapper**

Replace this grid wrapper:

```jsx
<div className="grid auto-rows-[minmax(13rem,auto)] grid-cols-1 gap-3 md:grid-cols-6 md:grid-flow-dense">
    {artifacts.map((artifact, idx) => (
        ...
    ))}
</div>
```

with this high-level layout:

```jsx
<div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:items-start">
    {featuredArtifact && (
        <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="group min-h-[24rem] border border-[var(--border-strong)] bg-[var(--bg-panel)] p-6 transition-colors duration-300 hover:border-[var(--accent-info)] hover:bg-[var(--bg-panel-hover)] md:p-8"
        >
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                <motion.p variants={metadataHoverItem} className="font-sans text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">
                    {featuredArtifact.kind}
                </motion.p>
                <motion.span variants={metadataHoverItem} className="font-mono text-[0.64rem] uppercase tracking-[0.1em] text-[var(--accent-info)]">
                    public
                </motion.span>
            </div>

            <motion.h4
                whileHover={{ x: 2 }}
                transition={{ duration: 0.18 }}
                className="font-display text-4xl font-black leading-none tracking-tight text-[var(--text-primary)] md:text-6xl"
            >
                {featuredArtifact.name}
            </motion.h4>

            <p className="mt-6 max-w-2xl font-sans text-base leading-8 text-[var(--text-secondary)]">
                {featuredArtifact.statement}
            </p>

            <div className="mt-8 grid gap-2 sm:grid-cols-3">
                {flagshipCues.map((cue) => (
                    <motion.span
                        key={cue}
                        variants={metadataHoverItem}
                        className="border border-[var(--border-light)] px-3 py-2 font-sans text-xs text-[var(--text-secondary)]"
                    >
                        {cue}
                    </motion.span>
                ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-2">
                {featuredArtifact.tech.map((tech) => (
                    <motion.span
                        key={tech}
                        variants={metadataHoverItem}
                        className="border border-[var(--border-light)] px-2.5 py-1.5 font-mono text-[0.64rem] tracking-[0.06em] text-[var(--text-muted)]"
                    >
                        {tech}
                    </motion.span>
                ))}
                <a
                    href={featuredArtifact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex min-h-10 items-center border border-[var(--accent-info)] px-4 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[var(--accent-info)] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--accent-info)_8%,transparent)]"
                >
                    inspect source
                </a>
            </div>
        </motion.article>
    )}

    <div className="border border-[var(--border-light)] bg-[var(--bg-panel)]">
        {supportingArtifacts.map((artifact, idx) => (
            <motion.article
                key={artifact.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="group border-b border-[var(--border-light)] p-5 last:border-b-0 hover:bg-[var(--bg-panel-hover)]"
            >
                <div className="mb-3 flex items-start justify-between gap-4">
                    <p className="font-sans text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">
                        {artifact.kind}
                    </p>
                    <span className={`font-mono text-[0.62rem] uppercase tracking-[0.1em] ${artifact.public ? 'text-[var(--accent-info)]' : 'text-[var(--text-muted)]'}`}>
                        {artifact.public ? 'public' : 'locked'}
                    </span>
                </div>

                <h4 className="font-display text-xl font-black tracking-tight text-[var(--text-primary)]">
                    {artifact.name}
                </h4>

                <p className="mt-3 font-sans text-sm leading-7 text-[var(--text-secondary)]">
                    {artifact.statement}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                    {artifact.tech.map((tech) => (
                        <span
                            key={tech}
                            className="border border-[var(--border-light)] px-2 py-1 font-sans text-[0.68rem] tracking-[0.04em] text-[var(--text-muted)]"
                        >
                            {tech}
                        </span>
                    ))}
                    {artifact.public && (
                        <a
                            href={artifact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent-info)]"
                        >
                            GitHub
                        </a>
                    )}
                </div>
            </motion.article>
        ))}
    </div>
</div>
```

- [ ] **Step 6: Remove imports no longer used by Projects**

After the rewrite, check whether these imports are still needed:

```jsx
import MotionText, { compilerContainer, metadataItem } from '../components/MotionText';
```

Expected:

- `MotionText` remains used for the Projects title.
- `metadataItem` remains used through `metadataHoverItem`.
- `compilerContainer` may no longer be used. If unused, remove it from the import.

The import should become either:

```jsx
import MotionText, { metadataItem } from '../components/MotionText';
```

or stay unchanged only if `compilerContainer` remains used.

- [ ] **Step 7: Verify Projects flagship and rail**

Run:

```bash
rg -n -- "featuredArtifact|supportingArtifacts|flagshipCues|SVector|inspect source|forward_list_scratch|Stack / Queue|Trees / Algorithms|Research Notes|md:grid-flow-dense|auto-rows" src/pages/Projects.jsx
```

Expected:

- `featuredArtifact`, `supportingArtifacts`, and `flagshipCues` exist.
- `SVector` exists as the source artifact data.
- `inspect source` exists as flagship action.
- Supporting artifacts exist.
- No `md:grid-flow-dense` match.
- No `auto-rows` match.

- [ ] **Step 8: Verify no fake metrics and no green accents**

Run:

```bash
rg -n -- "coverage|stars|commits|downloads|accent-success|accent-green|text-\\[var\\(--accent-green\\)\\]" src/pages/Projects.jsx
```

Expected: no matches.

- [ ] **Step 9: Build**

Run:

```bash
npm run build
```

Expected: Vite exits 0. Restore `dist` artifacts afterward if they changed.

- [ ] **Step 10: Diff check**

Run:

```bash
git diff --check
```

Expected: no output and exit 0.

- [ ] **Step 11: Commit**

```bash
git add src/pages/Projects.jsx
git commit -m "style: rebuild projects as flagship showcase"
```

---

### Task 4: Final Soft Metadata Verification

**Files:**
- Inspect: `src/App.jsx`
- Inspect: `src/components/SectionDivider.jsx`
- Inspect: `src/pages/About.jsx`
- Inspect: `src/pages/Home.jsx`
- Inspect: `src/pages/Projects.jsx`
- Inspect: `src/pages/Contact.jsx`
- Modify only if needed: active files touched in Tasks 1-3
- Do not modify: `netlify/functions/github-stats.js`

**Interfaces:**
- Produces verified project showcase and soft metadata implementation.

- [ ] **Step 1: Check removed About divider copy**

Run:

```bash
rg -n -- "systems notes|Systems, written close to the metal" src/App.jsx src/pages
```

Expected: no matches.

- [ ] **Step 2: Check Projects flagship structure**

Run:

```bash
rg -n -- "SVector|featuredArtifact|supportingArtifacts|forward_list_scratch|Stack / Queue|Trees / Algorithms|Research Notes|inspect source" src/pages/Projects.jsx
```

Expected:

- All listed artifact names exist.
- `featuredArtifact` and `supportingArtifacts` exist.
- `inspect source` exists.

- [ ] **Step 3: Check wide-tracked mono reduction**

Run:

```bash
rg -n -- "font-mono.*tracking-\\[0\\.2|tracking-\\[0\\.22em\\]|tracking-\\[0\\.18em\\]" src/components src/pages
```

Expected:

- No matches in `SectionDivider`, `About`, `Projects`, or Contact `primary interface`.
- Matches are allowed only if they are in true terminal/code/build surfaces. Any remaining match must be listed in the implementation report with a one-line justification.

- [ ] **Step 4: Check green accents**

Run:

```bash
rg -n -- "accent-success|accent-green|text-\\[var\\(--accent-green\\)\\]" src/components src/pages
```

Expected:

- No new broad green usage in touched page surfaces.
- Pre-existing terminal/contact command icon usage may remain only if outside this pass; record any matches and do not edit unrelated terminal code.

- [ ] **Step 5: Check no visible period endings returned**

Run:

```bash
rg -n -- "metal\\.|artifacts\\.|cost\\.|intent\\.|system\\.|brief\\.|terminal\\.|notebooks\\." src/App.jsx src/pages/Home.jsx src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx
```

Expected: no matches in visible copy. JavaScript identifiers such as `artifacts` without visible punctuation are not failures.

- [ ] **Step 6: Check typography roles**

Run:

```bash
rg -n -- "font-display|font-sans|font-mono" src/components/SectionDivider.jsx src/pages/About.jsx src/pages/Home.jsx src/pages/Projects.jsx src/pages/Contact.jsx
```

Expected:

- Display headlines still use `font-display`.
- Body copy still uses `font-sans`.
- Terminal/code/build surfaces still use `font-mono`.
- Editorial labels use softer sans treatment.

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

Only if Step 10 shows intended unstaged project showcase or metadata cleanup:

```bash
git add src/App.jsx src/components/SectionDivider.jsx src/pages/About.jsx src/pages/Home.jsx src/pages/Projects.jsx src/pages/Contact.jsx
git commit -m "style: finish project showcase metadata pass"
```

Do not add `netlify/functions/github-stats.js`.

---

## Self-Review

Spec coverage:

- Remove redundant About divider: Task 1.
- Keep anchors and terminal behavior: Task 1 and Task 4.
- Soften small editorial labels: Task 2.
- Preserve terminal/code/build monospace: Task 2 and Task 4.
- Rebuild Projects around `SVector`: Task 3.
- Supporting artifact rail/list: Task 3.
- Keep project entries, public links, locked state: Task 3 and Task 4.
- No fake metrics: Task 3 and Task 4.
- Preserve no-period copy: Global Constraints and Task 4.
- Exclude `netlify/functions/github-stats.js`: Global Constraints and Task 4.
- Build and diff-check verification: Tasks 1-4.

Placeholder scan:

- This plan contains no unresolved markers, deferred implementation notes, or unspecified test steps.
- Every task has exact files, exact commands, expected outcomes, and commit messages.

Interface consistency:

- `featuredArtifact`, `supportingArtifacts`, and `flagshipCues` are introduced in Task 3 before use.
- No new component public APIs are introduced.
- Existing anchors and terminal interfaces remain unchanged.
- Existing `MotionText` helper remains the only typography reveal helper.
