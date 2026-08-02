# Editorial Systems Brand Layout Design

## Objective

Redesign the active portfolio layout so the site has a stronger, more memorable brand identity: Muh Yusuf as a systems programmer who builds technical work from scratch. The current Compiler Dark theme is a good foundation, but the layout still reads as a polished terminal portfolio rather than a distinct engineering brand.

This spec defines the first layout/branding pass. It should make the first viewport, project section, and section transitions feel more intentional without rebuilding the entire application.

## Current Context

The active app renders these sections from `src/App.jsx`:

- `Navbar`
- `Home`
- `About`
- `Projects`
- `Contact`
- `Terminal`
- `CppStatusBar`
- `SectionDivider`

The active hero is `src/pages/Home.jsx`. `src/components/Hero.jsx` appears to be a legacy or unused hero component because it is not imported by the active app tree. The first redesign pass should therefore target `Home.jsx`, not `components/Hero.jsx`.

The current palette has already moved away from Everblush into Compiler Dark:

- Dark charcoal backgrounds.
- Cyan for info/API syntax.
- Gold for warning/string syntax.
- Red for errors.
- Legacy green class names may still exist, but visible green should not drive the main brand.

The layout still has several branding weaknesses:

- The hero says `YUSUF`, but not clearly what Yusuf owns as a brand.
- The terminal/code card is a nice motif, but it does not yet establish a unique visual system.
- Project cards read like repository rows instead of a branded body of work.
- `SectionDivider` uses literal terminal labels like `[about]`, which feels generic and cheap compared with the desired editorial systems direction.
- About and Contact are readable, but they are not yet strong brand chapters.

## Brand Direction

The target direction is:

**Compiler Dark Editorial Systems Portfolio**

The site should feel like a precise mix of:

- Compiler output.
- Systems engineering notes.
- Source-level C++ work.
- Research notebook.
- Build artifact index.
- Editorial personal brand.

It should not feel like:

- A generic terminal portfolio.
- A cyberpunk dashboard.
- A green hacker theme.
- A card-heavy SaaS landing page.
- A decorative personal homepage with weak technical identity.

## GPT-Taste Preflight

The design direction follows the `$gpt-taste` constraints where they fit an existing portfolio redesign.

```text
python_rng(seed=107)
hero_architecture = "Artistic Asymmetry"
typography_stack = "Geist"
component_architectures = ["Inline Typography Images", "Horizontal Accordions", "Infinite Marquee"]
gsap_paradigms = ["Scrubbing Text Reveals", "Image Scale & Fade Scroll"]
```

AIDA structure:

- Navigation: premium fixed nav with stronger brand lockup.
- Attention: asymmetric hero with a wide two-line brand statement.
- Interest: gapless project bento that makes Build-X-From-Scratch feel like a product line.
- Desire: editorial About/manifesto section with scroll-driven text emphasis.
- Action: refined Contact CTA with terminal as the primary interface.

Hero math:

- H1 should use an ultra-wide container: `max-w-6xl`.
- Target copy should fit in 2-3 lines at desktop and tablet widths.
- No stamp icons, spam tags, or raw stats inside the hero headline.
- Stats can exist below or after the hero, but should not compete with the primary brand statement.

Bento density:

- Projects should use `grid-flow-dense`.
- Desktop grid should use 6 columns.
- First pass target layout:
  - SVector: `col-span-3 row-span-2`
  - forward_list: `col-span-3 row-span-2`
  - Stack/Queue combined card: `col-span-2 row-span-1`
  - Trees/Algorithms combined card: `col-span-2 row-span-1`
  - Research card: `col-span-2 row-span-1`
- Total area: `6 + 6 + 2 + 2 + 2 = 18` cells.
- A 6-column grid with 3 row units has 18 cells, leaving no empty cells.

Label and button check:

- Remove cheap meta-labels such as `[about]`, `// section`, and bracketed section dividers from prominent layout surfaces.
- Command-line labels can remain only when they behave as content, not as section decoration.
- Primary CTA text must have strong contrast on dark backgrounds.
- Secondary CTAs must be visibly secondary without becoming low-contrast.

## Scope

### In Scope

- Redesign active `Home.jsx` hero layout and copy hierarchy.
- Strengthen `Navbar.jsx` brand lockup.
- Replace `SectionDivider.jsx` with editorial chapter transitions.
- Redesign `Projects.jsx` into a compact, gapless, branded bento system.
- Lightly adapt `About.jsx` into a more brand-defining manifesto.
- Lightly adapt `Contact.jsx` to match the new brand language.
- Add minimal CSS utilities in `src/index.css` only if needed for layout, grain, or text reveal effects.
- Preserve existing anchors: `#home`, `#about`, `#projects`, `#contact`.
- Preserve terminal toggle behavior.
- Preserve the current Compiler Dark token system.

### Out of Scope

- Adding new pages.
- Replacing the terminal overlay.
- Rewriting routing.
- Adding CMS or dynamic content.
- Dependency upgrades unless required by an already-installed animation library.
- Reworking `netlify/functions/github-stats.js`.
- Updating inactive legacy components unless they become part of the active layout.
- Pushing commits automatically.

## Layout Design

### Navigation

The navbar should become a stronger brand surface.

Current:

- `yusuf.cpp` on the far left.
- Simple text links on the right.
- Terminal button.

Target:

- Left brand lockup:
  - Primary: `YUSUF`
  - Secondary: `BUILD-X-FROM-SCRATCH`
- Right nav remains compact.
- Terminal button becomes a command-style action, but not visually dominant.
- Navbar should remain fixed, quiet, and readable.

The nav should signal the brand immediately without becoming a large header.

### Home / Attention

The active hero should shift from identity card to brand statement.

Recommended headline:

```text
Building systems from scratch, close to the metal.
```

Alternative:

```text
I rebuild systems to understand how they really work.
```

The hero should use an asymmetric layout:

- Left side:
  - Wide editorial H1.
  - Short supporting copy about C++, systems programming, and research.
  - Exactly two primary actions:
    - `View build artifacts`
    - `Open terminal`
- Right side:
  - A compiler/build artifact panel, not a generic terminal card.
  - The panel can show a short pseudo build output, C++ snippet, or repository artifact preview.

The existing rotating `std::cout` snippet can remain as an interaction detail, but it should not be the only brand carrier. The hero needs a stronger message before the code motif.

The existing GitHub stats strip should move below the hero statement or become part of a secondary proof strip. It should not interrupt the headline.

### Section Transitions

`SectionDivider` should stop rendering:

```text
// —— [about] ——
```

Target treatment:

- Full-width editorial transition.
- Large chapter phrase.
- Optional small supporting line.
- No bracketed labels.

Examples:

- Before About: `Systems, written close to the metal.`
- Before Projects: `Build artifacts, not portfolio cards.`
- Before Contact: `Start a conversation through the terminal.`

The transition should feel like a chapter break, not a decorative separator.

### Projects / Interest

Projects should become the main branding proof.

Current:

- Featured list followed by secondary grid.
- Good content, but mostly reads as repository listing.

Target:

- One gapless bento grid.
- Build-X-From-Scratch presented as a coherent technical initiative.
- Fewer, stronger visual blocks.
- Project cards should feel like artifacts from a source/build system.

Card structure:

- `SVector`: major card.
  - Emphasize allocator, capacity, iterators, STL compatibility.
- `forward_list_scratch`: major card.
  - Emphasize linked structure, splice, merge, sort.
- `Stack / Queue`: combined systems primitives card.
- `Trees / Algorithms`: combined algorithmic internals card.
- `Research`: bridge from systems to ML/research.

Every card should include:

- Project name.
- One sharp technical statement.
- 2-3 tech tags max.
- GitHub action if public.
- Locked state only where needed.

Avoid long paragraphs in cards. Use denser, more scannable copy.

### About / Desire

About should become a manifesto rather than a biography.

Target content model:

- A short intro paragraph.
- Three principles:
  - `Rebuild the abstraction`
  - `Measure before decorating`
  - `Keep research close to implementation`
- Existing contribution heatmap can remain below, but it should feel like proof, not filler.

Motion direction:

- If GSAP is added, use scrubbing text reveal for the manifesto paragraph.
- If staying with Framer Motion for the first pass, keep it simple and avoid adding half-finished scroll effects.

### Contact / Action

Contact should stay terminal-led, but the copy should become less playful and more brand-aligned.

Current:

```text
Ping me.
I compile fast.
```

Target:

```text
Ship low-level work with me.
```

or:

```text
Bring a hard systems problem.
```

Primary action:

- `Open terminal`

Secondary actions:

- Email.
- LinkedIn.
- GitHub.

Contact should feel like an intentional close, not a novelty terminal gag.

## Motion Design

The first implementation can choose one of two paths:

### Conservative Path

Use existing Framer Motion patterns.

- Lower risk.
- Faster implementation.
- Keeps dependency surface stable.
- Best if the goal is to ship the layout first.

### GPT-Taste Path

Use GSAP with ScrollTrigger.

- Stronger editorial motion.
- Better for scroll-scrub text and image scale/fade effects.
- Higher implementation and QA cost.
- Requires checking installed dependencies first.

Recommendation:

Start with the conservative path for the first pass unless GSAP is already installed. Then add GSAP in a second pass for the About manifesto and project image reveal.

## Visual System

Use the existing Compiler Dark palette:

- Background: charcoal/near-black.
- Text: primary off-white, secondary gray.
- Cyan: APIs, links, stream identifiers, active technical affordances.
- Gold: string literals, build warnings, artifact metadata.
- Red: errors, locked/private states.

Green should not return as a broad UI accent. If green appears, it should be limited to literal success states or deliberately scoped code syntax. The current direction prefers cyan/gold for brand accents.

Cards should use:

- 8px radius or less.
- Thin borders.
- Low-glow or no-glow default state.
- Stronger hover through border, background, and slight transform.
- No cards inside cards.

## Acceptance Criteria

- The first viewport clearly communicates Yusuf's brand as a systems builder, not just a terminal user.
- H1 fits within 2-3 lines on desktop and tablet widths.
- The active hero is implemented in `src/pages/Home.jsx`.
- `src/components/Hero.jsx` is not touched unless it is intentionally reintroduced or removed in a separate cleanup.
- Navbar brand lockup is stronger than `yusuf.cpp` alone.
- Section dividers no longer use bracketed terminal labels.
- Projects render as a gapless bento grid with `grid-flow-dense`.
- Project cards feel like a coherent Build-X-From-Scratch system.
- Contact CTA copy is more brand-aligned and less gimmicky.
- Existing terminal overlay still opens with the navbar button and keyboard shortcut.
- Existing anchors continue to work.
- `npm run build` passes.
- `git diff --check` passes.

## Verification Plan

Run:

```bash
npm run build
git diff --check
```

Manual checks:

- Desktop around 1440px:
  - Hero headline is 2-3 lines.
  - Right-side artifact panel does not overpower the headline.
  - Project bento has no empty cells.
- Laptop around 1280px:
  - Navbar remains readable.
  - Hero CTAs do not wrap awkwardly.
  - Projects remain scan-friendly.
- Mobile around 390px:
  - H1 does not overflow.
  - CTA buttons fit and remain legible.
  - Bento cards stack cleanly.
  - Terminal overlay remains usable.

## Implementation Notes

- Keep changes scoped to active files first:
  - `src/pages/Home.jsx`
  - `src/pages/Projects.jsx`
  - `src/components/Navbar.jsx`
  - `src/components/SectionDivider.jsx`
  - `src/pages/About.jsx`
  - `src/pages/Contact.jsx`
  - `src/index.css`
- Do not include `netlify/functions/github-stats.js` in this work.
- Avoid introducing new assets unless they directly support the artifact/build-system identity.
- If external image URLs are used, prefer subtle filtered backgrounds and ensure the page still works if the image fails.
- If GSAP is added, verify mobile behavior and avoid horizontal scroll by wrapping the active page surface with `overflow-x-hidden w-full max-w-full`.
