# About Yusuf App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current generic About desktop app with a personal, two-section About document containing Yusuf's confirmed profile information, portrait artwork, current learning context, and an interactive Films/Series shelf.

**Architecture:** Keep `/about` and the existing desktop route unchanged. Convert About content into a small curated data module so `me.md` remains a questionnaire and is never parsed as display copy. Render the app as a profile section followed by a personal section; isolate the Films/Series shelf so its toggle state stays local to that component.

**Tech Stack:** React, React Router, existing `DesktopAppFrame`, existing desktop CSS tokens, React Testing Library, Vitest, local imported image assets.

**Spec:** `docs/superpowers/specs/2026-08-28-about-app-profile-design.md`

## Global Constraints

- Only completed and confirmed entries from `me.md` may become display content.
- Do not invent personal claims, biography, links, statistics, or preferences.
- Keep the About app at `/about`; do not change Desktop Shell, dock, Firefox, Projects, Kitty, or Contact behavior.
- Personal content should be dominant; do not render a technical stack dashboard.
- Use the anime portrait as the dominant visual and keep the university logo secondary.
- Use local source imports under `src/assets/`; do not rely on root asset folders or runtime poster hotlinks.
- Keep Films/Series as a local toggle without changing the `/about` route.
- Preserve keyboard access, meaningful image labels, reduced-motion behavior, and narrow-width layout safety.
- Do not modify `.gitignore`, `me.md`, `netlify/functions/github-stats.js`, or unrelated desktop modules.

## File Map

- Modify: `src/desktop/apps/AboutApp.jsx` - compose the two-section About document.
- Modify: `src/desktop/apps/AboutApp.test.jsx` - replace stack-oriented assertions with profile, optional-content, and shelf behavior tests.
- Create: `src/data/aboutContent.js` - curated confirmed profile and personal content model.
- Create: `src/components/about/OnScreenShelf.jsx` - Films/Series toggle and poster shelf.
- Create: `src/components/about/OnScreenShelf.test.jsx` - isolated shelf interaction tests.
- Modify: `src/desktop/desktop.css` - About-specific layout, document surface, profile artwork, section transition, and shelf styles.
- Create: `src/assets/images/about-anime.png` - supplied portrait asset copied from the approved root asset.
- Create: `src/assets/images/halu-oleo-logo.png` - supplied university logo copied from the approved root asset.
- Create: `src/assets/images/media/` - locally stored optimized poster assets selected for the six confirmed titles.

## Task 1: Establish the curated About content contract

**Files:**
- Create: `src/data/aboutContent.js`
- Modify: `src/desktop/apps/AboutApp.test.jsx`

**Interfaces:**
- Produces `aboutProfile`, `aboutSections`, and `onScreenItems`.
- `aboutProfile` contains only confirmed facts and optional values.
- `aboutSections` contains sections only when their copy is approved and non-empty.
- `onScreenItems` uses `{ title, year, type, poster, alt }` records.

- [ ] **Step 1: Replace the old stack assertions with failing content-contract tests.**

  Assert that the rendered About app contains `Muh Yusuf`, `Halu Oleo University`, `5th semester`, `Computer Vision & Computation`, and the three current-learning items. Assert that `Languages`, `Systems`, `Data / ML`, and `Workflow` headings are absent.

- [ ] **Step 2: Add the six confirmed On Screen records to the test expectation.**

  Use the exact titles `The Martian`, `Leave the World Behind`, `Cars`, `Reply 1988`, `FROM`, and `The Night Agent`. Treat `Reply 1988` as the corrected title and `Cars` as the display title.

- [ ] **Step 3: Implement `src/data/aboutContent.js` as curated data, not a parser.**

  Use explicit objects for the confirmed profile facts and current learning. Add only personal sections whose copy is actually confirmed. Do not copy unanswered questions from `me.md` into this module. Keep poster paths as local imports or local asset references.

- [ ] **Step 4: Run the focused test and verify the old implementation fails the new contract.**

  Run: `npm test -- src/desktop/apps/AboutApp.test.jsx`

  Expected: FAIL because the current component still renders the old generic description and stack.

- [ ] **Step 5: Commit the content contract and failing test.**

  ```bash
  git add src/data/aboutContent.js src/desktop/apps/AboutApp.test.jsx
  git commit -m "test: define About profile content contract"
  ```

## Task 2: Add and verify local visual assets

**Files:**
- Create: `src/assets/images/about-anime.png`
- Create: `src/assets/images/halu-oleo-logo.png`
- Create: `src/assets/images/media/the-martian.jpg`
- Create: `src/assets/images/media/leave-the-world-behind.jpg`
- Create: `src/assets/images/media/cars.jpg`
- Create: `src/assets/images/media/reply-1988.jpg`
- Create: `src/assets/images/media/from.jpg`
- Create: `src/assets/images/media/the-night-agent.jpg`
- Modify: `src/data/aboutContent.js`

**Interfaces:**
- Produces stable local imports for the About portrait, university logo, and six poster records.

- [ ] **Step 1: Copy the supplied portrait and university logo into source assets.**

  Use the approved root files `anime.png` and `Universitas-Halu-Oleo-Logo-768x768.png` as the source. Do not edit `.gitignore` and do not delete the originals.

- [ ] **Step 2: Add one locally stored poster per confirmed title.**

  Use the selected poster candidates from the research pass. Normalize each file to a consistent portrait presentation; preserve the original artwork inside the 2:3 box rather than forcing a destructive crop.

- [ ] **Step 3: Update the data module to import the local assets.**

  `aboutContent.js` must not contain remote image URLs. Every poster record must include a meaningful `alt` value and a year: `2015`, `2023`, `2006`, `2015`, `2022`, and `2023` respectively.

- [ ] **Step 4: Verify imports and image dimensions before UI work.**

  Run: `npm run build`

  Expected: the Vite build resolves every local import without fetching an external image at runtime.

- [ ] **Step 5: Commit the source assets and data references.**

  ```bash
  git add src/assets/images src/data/aboutContent.js
  git commit -m "feat: add About visual assets"
  ```

## Task 3: Implement the profile and personal About document

**Files:**
- Modify: `src/desktop/apps/AboutApp.jsx`
- Modify: `src/desktop/apps/AboutApp.test.jsx`

**Interfaces:**
- Consumes: `aboutProfile`, `aboutSections`, and `onScreenItems` from `src/data/aboutContent.js`.
- Produces: one `DesktopAppFrame` containing `.about-app-content`, `.about-profile-section`, and `.about-personal-section`.

- [ ] **Step 1: Add a failing test for the two-section structure and asset semantics.**

  Assert that the app exposes headings for `Profile`, `Currently learning`, and `On Screen`; the anime image has a meaningful accessible label; the university logo is present as a secondary identity image; and no `Builds with` or categorized stack content is rendered.

- [ ] **Step 2: Replace the generic About JSX with the profile structure.**

  Keep `DesktopAppFrame` and `DESKTOP_APPS.about`. Render the left profile column with confirmed identity and education facts. Render the right column with the large portrait and optional university mark. Do not place dense labels over the portrait.

- [ ] **Step 3: Add the second personal section after the profile section.**

  Render approved `Currently`, `Outside the Stack`, and `Small Things` content conditionally from `aboutSections`. A section with no approved copy must not render its heading or wrapper.

- [ ] **Step 4: Add `OnScreenShelf` below the approved personal content.**

  Pass `onScreenItems` into the component. Keep its selected type in `useState('film')`, render only matching records, and use real `<button>` controls for `Films` and `Series` with `aria-pressed`. Do not navigate or mutate the browser URL.

- [ ] **Step 5: Run the focused About tests.**

  Run: `npm test -- src/desktop/apps/AboutApp.test.jsx src/components/about/OnScreenShelf.test.jsx`

  Expected: PASS for the profile content, stack removal, local image semantics, conditional sections, and route-preserving shelf behavior.

- [ ] **Step 6: Commit the component implementation.**

  ```bash
  git add src/desktop/apps/AboutApp.jsx src/desktop/apps/AboutApp.test.jsx src/components/about/OnScreenShelf.jsx src/components/about/OnScreenShelf.test.jsx
  git commit -m "feat: redesign About Yusuf app"
  ```

## Task 4: Implement responsive document styling

**Files:**
- Modify: `src/desktop/desktop.css`

**Interfaces:**
- Consumes: the class names emitted by `AboutApp` and `OnScreenShelf`.
- Produces: desktop two-column profile layout, scrollable personal document, consistent poster shelf, and narrow-width fallback.

- [ ] **Step 1: Add the About document surface and section layout.**

  Use the existing light editorial app surface. Define stable spacing and readable text measures. Make the profile section large enough for the identity and portrait to appear in the first desktop viewport together.

- [ ] **Step 2: Style the portrait as the dominant visual.**

  Use `object-fit: contain`, a stable visual region, and no circular avatar treatment. Keep the university logo visibly secondary.

- [ ] **Step 3: Style the personal section transition and Caveat labels.**

  Use Caveat only for small labels such as `About`, `Currently`, and `On Screen`. Keep body copy in the existing readable font. Avoid gradients, excessive cards, heavy blur, and technical dashboard styling.

- [ ] **Step 4: Style the shelf and accessible toggle states.**

  Use a horizontal poster row with 2:3 poster boxes, title/year metadata, visible focus states, and a clear selected toggle. Keep overflow controlled without forcing page-wide horizontal scrolling.

- [ ] **Step 5: Add the narrow-width layout.**

  Collapse the profile to one column with identity before artwork. Keep the shelf horizontally scrollable within its own region and prevent text overlap or page-level horizontal overflow.

- [ ] **Step 6: Run static checks.**

  Run:

  ```bash
  npm run build
  npm test
  git diff --check
  ```

  Expected: build succeeds, all existing tests pass, and no whitespace errors are reported.

- [ ] **Step 7: Commit the styling.**

  ```bash
  git add src/desktop/desktop.css
  git commit -m "style: refine About document layout"
  ```

## Task 5: Verify the About route and visual behavior

**Files:**
- Modify: `src/desktop/DesktopRoutes.test.jsx` only if the existing route coverage does not assert `/about`.
- Create or use: existing Playwright/browser verification setup for the desktop branch.

- [ ] **Step 1: Confirm route behavior.**

  Verify `/about` resolves to the About app, refresh keeps the app selected, and no changes occur to other desktop route mappings.

- [ ] **Step 2: Verify desktop at `1280x1200`.**

  Confirm the first viewport shows identity, education, current learning, and the large anime artwork together. Confirm the About surface is not a small floating card.

- [ ] **Step 3: Verify narrow layout at `390x844`.**

  Confirm the profile stacks vertically, the portrait remains contained, the shelf scrolls within its region, and no text overlaps or page-level horizontal overflow occurs.

- [ ] **Step 4: Verify shelf interaction.**

  Click or keyboard-focus `Series`, confirm the three series replace the three films, confirm `aria-pressed` updates, and confirm the URL remains `/about`.

- [ ] **Step 5: Verify reduced motion.**

  With `prefers-reduced-motion: reduce`, confirm the About app remains readable and does not rely on animation to reveal content.

- [ ] **Step 6: Run the final verification suite.**

  Run:

  ```bash
  npm test
  npm run build
  git diff --check
  git status --short
  ```

  Expected: all tests pass, the production build succeeds, the diff is clean, and only intended About files are changed.

## Self-Review Checklist

- The plan uses a curated content module and never treats all of `me.md` as final copy.
- The old technical stack is explicitly removed from the About UI.
- The university logo is optional and secondary to the anime portrait.
- The six confirmed titles are local poster records with consistent metadata.
- The Films/Series toggle is local state and does not conflict with router state.
- No task changes unrelated Desktop Shell modules.
- Every task has a concrete test or verification command.
