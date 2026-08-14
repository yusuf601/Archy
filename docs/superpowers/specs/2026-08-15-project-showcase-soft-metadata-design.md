# Project Showcase And Soft Metadata Typography Design

## Objective

Restructure the portfolio flow and Projects section so the site feels more branded, less like a uniform repository grid, and less harsh in its small typography.

This pass combines three related improvements:

- Remove the redundant divider before About.
- Rebuild Projects around a flagship `SVector` showcase and compact artifact rail.
- Soften small labels, metadata, tags, and kickers across active sections.

The goal is not to add more motion or visual decoration. The goal is clearer storytelling: the portfolio should lead with a strong Build-X-From-Scratch identity, then let supporting artifacts scan quietly.

## Current Context

The active app currently flows:

```text
Home
systems notes divider
About
build artifacts divider
Projects
interface divider
Contact
```

The `systems notes` divider currently creates a double-heading problem:

```text
systems notes
Systems, written close to the metal

Working principles
I care about the layer where abstractions become cost
```

This feels redundant because the divider behaves like a full section headline, then About immediately introduces another full editorial headline.

Projects currently renders all artifacts in a bento-style grid where every item is visually close in importance. This makes the section informative, but weakens brand hierarchy. `SVector` should be treated as the flagship Build-X-From-Scratch artifact, while the remaining projects should become a compact supporting artifact rail.

Small text also feels too hard in several places because too many labels use:

- `font-mono`
- uppercase
- wide tracking
- cyan/gold accents

That treatment is appropriate for terminal, command, code, and low-level metadata surfaces, but not for every editorial label.

## Design Direction

Target feel:

- editorial
- systems-focused
- quieter
- more branded
- less terminal-everywhere
- flagship-first
- easier to scan

Avoid:

- another generic bento grid
- making all repositories equal
- oversized marketing cards
- nested cards
- broad green accents
- loud uppercase metadata everywhere
- adding new animations to solve hierarchy
- adding decorative assets

## Scope

### In Scope

- Remove the `SectionDivider` before About.
- Keep the `build artifacts` divider before Projects unless the implementation replaces it with equivalent Projects-local section framing.
- Keep the `interface` divider before Contact, but soften its metadata treatment if global small typography rules apply.
- Rebuild `src/pages/Projects.jsx` around `SVector` as the flagship artifact.
- Present remaining projects as compact supporting artifacts.
- Soften metadata typography across active page surfaces.
- Preserve existing typography motion where it still fits.
- Keep existing project data fields unless a small local derived grouping is needed.

### Out Of Scope

- New pages or routes.
- New image assets.
- GSAP installation.
- New ScrollTrigger or pinned sections.
- Major Home redesign.
- Major About redesign beyond removing the redundant pre-About divider.
- Terminal command changes.
- Status bar changes.
- Editing `netlify/functions/github-stats.js`.
- Replacing the typography system.
- Replacing the typography motion helper.
- Adding periods back to active page copy.

## Flow Changes

### Home To About

Remove the `SectionDivider` that appears between Home and About:

```jsx
<SectionDivider
    kicker="systems notes"
    title="Systems, written close to the metal"
/>
```

After removal, the flow should be:

```text
Home
About
build artifacts divider
Projects
interface divider
Contact
```

Reasoning:

- Home already establishes systems identity.
- About already has a strong opening heading.
- The removed divider competes with the About heading instead of improving navigation.

### Projects Entry

The Projects section should still feel like a major chapter. The `build artifacts` divider may remain before it because it introduces a materially different content area.

The Projects section itself should start with a short editorial header:

```text
Build-X-From-Scratch
One flagship rebuild, followed by the supporting artifacts
```

The exact copy can be refined during implementation, but it must:

- Avoid a period ending.
- Mention Build-X-From-Scratch.
- Make the hierarchy clear: `SVector` is primary, the others support it.

## Projects Layout

### Recommended Structure

Use a flagship-plus-rail layout:

```text
Projects header

[ SVector flagship artifact                          ]
[ large title, statement, metadata, GitHub action    ]
[ source-level notes / tech / build cues             ]

[ supporting artifact rail                           ]
[ forward_list_scratch                               ]
[ Stack / Queue                                      ]
[ Trees / Algorithms                                 ]
[ Research Notes                                     ]
```

Desktop:

- Use a two-column or asymmetric layout.
- Flagship should occupy the stronger visual position.
- Supporting artifacts should be compact and scannable.
- Avoid equal card sizing for all artifacts.

Mobile:

- Stack flagship first.
- Supporting artifacts become a single-column list.
- Keep actions easy to tap.
- Avoid horizontal overflow.

### SVector Flagship

`SVector` should become the hero project inside Projects.

Required content:

- Name: `SVector`
- Kind: `container rebuild`
- Statement:

```text
A source-level rebuild of std::vector with allocator control, capacity rules, iterator behavior, and API-compatible muscle memory
```

- GitHub link:

```text
https://github.com/Build-X-From-Scratch/SVector
```

- Tech:

```text
C++20
Allocator
STL
```

Suggested visual treatment:

- Larger display title.
- One strong statement paragraph.
- Small metadata cluster, but softer than current all-mono labels.
- Primary GitHub action that is visible, not buried in tag rows.
- Optional small source-level cues such as:
  - `allocator discipline`
  - `capacity semantics`
  - `iterator behavior`

These cues must remain textual and should not introduce fake metrics.

### Supporting Artifact Rail

Supporting artifacts:

- `forward_list_scratch`
- `Stack / Queue`
- `Trees / Algorithms`
- `Research Notes`

Required behavior:

- Compact layout.
- Lower visual weight than `SVector`.
- Public projects still link to GitHub.
- Locked/private projects remain visible but visually quieter.
- Artifact names should be easy to scan.
- Statements should remain readable body copy, not uppercase metadata.

Suggested visual treatment:

- Thin separators instead of heavy cards.
- Small status label aligned to the right.
- Tech tags as subdued chips.
- GitHub action as a small text action.

Avoid:

- Giving locked/private projects the same action affordance as public projects.
- Making every artifact the same card size.
- Hiding all project statements behind hover.

## Soft Metadata Typography

### Current Problem

Too many small labels use this feel:

```text
font-mono
uppercase
tracking-[0.18em] to tracking-[0.22em]
cyan/gold
```

This is useful for terminal/code surfaces, but when overused it makes the page feel tense and noisy.

### New Typography Rules

#### Editorial Kicker

Use for section labels that introduce content:

```text
font-sans
text-[0.72rem] or text-xs
uppercase optional
tracking-[0.06em] to tracking-[0.1em]
text-[var(--text-muted)] or text-[var(--text-secondary)]
```

Examples:

- `Working principles`
- `Build-X-From-Scratch`
- `primary interface`

These should feel like editorial labels, not terminal prompts.

#### Technical Metadata

Use `font-mono` only when the label reads like code, command, build output, status, or low-level artifact metadata.

Examples that may stay mono:

- `target: stl`
- `mode: scratch`
- `lang: c++20`
- `public`
- `locked`
- terminal commands
- code snippets

Even when using mono, reduce harshness:

```text
tracking-[0.08em] to tracking-[0.14em]
text-[0.62rem] to text-[0.68rem]
muted by default
accent only for state or emphasis
```

#### Tags

Project tech tags should become quieter.

Preferred treatment:

```text
font-sans or font-mono depending on term
text-[0.68rem]
tracking-[0.04em] to tracking-[0.08em]
normal case or restrained uppercase
muted border
muted text
```

Do not make every tag cyan/gold.

#### Actions

Actions may keep stronger typography than metadata.

Rules:

- Primary action can use `font-mono` if command-like.
- Secondary GitHub actions can use `font-sans` or restrained `font-mono`.
- Avoid wide tracking if the action is already small.
- Keep touch targets usable on mobile.

## Motion Rules

Keep the existing typography motion system, but do not expand it aggressively.

Allowed:

- Existing `MotionText` headline reveals.
- Existing project hover movement if it remains subtle.
- Small opacity changes on metadata.

Avoid:

- New page-level choreography.
- New pinned motion.
- Additional blur outside `MotionText`.
- Additional hover movement on every supporting artifact row.
- Animating terminal/status surfaces.

If Projects layout is rebuilt, motion should serve the hierarchy:

- Flagship appears first.
- Supporting rail follows quietly.
- Hover interactions clarify clickability but do not make the list restless.

Reduced motion behavior must continue to render text immediately and avoid translate/blur/stagger motion where applicable.

## Component-Level Requirements

### `src/App.jsx`

Required:

- Remove the pre-About `SectionDivider`.
- Keep About route anchor unchanged:

```jsx
<div id="about"><About /></div>
```

- Keep Projects and Contact anchors unchanged.
- Do not change terminal toggle behavior.

### `src/components/SectionDivider.jsx`

Required:

- Keep component available for remaining chapter dividers.
- Soften kicker typography if this component still controls chapter labels.
- Keep title readable and display-led.
- Do not add section numbering.

Suggested:

- Kicker can move from hard mono to softer sans.
- Title can keep `font-display`.
- Existing `MotionText` reveal can remain.

### `src/pages/About.jsx`

Required:

- Keep About content structure.
- Keep `MotionText` title.
- Keep syntax emphasis restrained.
- Soften `Working principles` kicker if it still feels too terminal-like.
- Do not add the removed divider copy into About.

### `src/pages/Projects.jsx`

Required:

- Rebuild layout around `SVector` flagship.
- Present other artifacts as supporting rail/list.
- Keep all existing project entries.
- Keep public GitHub links.
- Keep locked state for non-public item.
- Preserve no-period copy style.
- Preserve Framer Motion usage, but do not increase motion complexity.
- Do not add fake metrics.
- Do not add new project data model requirements unless local derived arrays improve clarity.

Preferred data organization:

```jsx
const featuredArtifact = artifacts.find((artifact) => artifact.name === 'SVector');
const supportingArtifacts = artifacts.filter((artifact) => artifact.name !== 'SVector');
```

This avoids duplicating project data.

### `src/pages/Home.jsx`

Required:

- Keep current hero layout.
- Do not redesign Home in this pass.
- Review small metadata/kicker typography only if it violates the new soft metadata rules.
- Keep terminal/code artifact panel mono.

### `src/pages/Contact.jsx`

Required:

- Keep terminal action behavior.
- Review `primary interface` label for softer typography if needed.
- Do not change links or terminal shortcut behavior.

## Acceptance Criteria

- The redundant `systems notes` divider no longer appears before About.
- About starts directly after Home.
- Projects clearly presents `SVector` as the flagship artifact.
- Supporting projects are visually subordinate and easier to scan.
- Small editorial labels feel softer and less terminal-like.
- Terminal/code/build surfaces still retain monospace where appropriate.
- Project tags are quieter than before.
- No broad green accents are introduced.
- No visible period endings are reintroduced in active page copy.
- No new routes, pages, assets, GSAP, ScrollTrigger, terminal commands, or project data are added.
- `netlify/functions/github-stats.js` is not edited.
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
rg -n -- "systems notes|Systems, written close to the metal" src/App.jsx src/pages
rg -n -- "SVector|featuredArtifact|supportingArtifacts|forward_list_scratch|Stack / Queue|Trees / Algorithms|Research Notes" src/pages/Projects.jsx
rg -n -- "font-mono.*tracking-\\[0\\.2|tracking-\\[0\\.22em\\]|tracking-\\[0\\.18em\\]" src/components src/pages
rg -n -- "accent-success|accent-green|text-\\[var\\(--accent-green\\)\\]" src/components src/pages
rg -n -- "metal\\.|artifacts\\.|cost\\.|intent\\.|system\\.|brief\\.|terminal\\.|notebooks\\." src/App.jsx src/pages/Home.jsx src/pages/About.jsx src/pages/Projects.jsx src/pages/Contact.jsx
```

Expected:

- Removed About divider copy does not appear in active render path.
- Projects contains `SVector` and supporting artifacts.
- Wide-tracked mono usage is reduced or justified only for true terminal/code/build surfaces.
- No broad green accents.
- No visible period endings in active page copy.

Manual checks:

- Desktop around 1440px:
  - Projects has a clear flagship-first hierarchy.
  - Supporting artifacts scan quickly.
  - Small labels are calmer than before.
- Laptop around 1280px:
  - `SVector` flagship does not crowd the supporting rail.
  - Project actions remain visible.
- Mobile around 390px:
  - Flagship appears first.
  - Supporting rail stacks cleanly.
  - No text overflows.
  - Touch targets remain usable.

Interaction checks:

- Hover flagship project.
- Hover supporting artifacts.
- Open public GitHub links.
- Confirm locked artifact does not look clickable as a public GitHub target.
- Open terminal with `Ctrl+J`.
- Use terminal `exit`.

## Non-Goals

This spec does not attempt to solve every typography issue in the site. It targets the small text and Projects hierarchy that currently hurt the brand most.

Future passes can still address:

- Full global label token extraction.
- More detailed project case study pages.
- Visual assets or diagrams for flagship projects.
- Deeper brand system documentation.
