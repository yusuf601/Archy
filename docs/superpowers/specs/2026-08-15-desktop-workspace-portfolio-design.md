# Desktop Workspace Portfolio Design

Status: working design spec, not a final locked product direction. Decisions may be revised after Phase 1 visual review and before later implementation phases.

Current content direction: the blog document app is named `Firefox`. It is a focused personal reading browser, not a literal Notes app or a general-purpose web browser.

## Objective

Redesign the desktop portfolio as a personal workstation that combines a macOS-like application shell with Linux-oriented tools and telemetry

The first desktop viewport should be a clean wallpaper, contextual top menu bar, and app dock rather than a vertically scrolling landing page. Content should open through app metaphors that suit its function, while avoiding a draggable or overlapping window manager

The redesign must make future Blog additions easier, preserve the current interactive terminal session, and keep the current mobile portfolio experience available without forcing the desktop metaphor onto small screens

## Design Principles

- Personal workstation, not an operating-system simulation
- Familiar macOS structure with Linux character
- Clean desktop before content is opened
- App presentation follows content needs
- One document app at a time
- Kitty is the only utility overlay
- Personal taste can carry the desktop; programmer branding does not need to be written everywhere
- Document apps move outside the current dark-mode comfort zone
- Every visible control must perform a real action

## Current Context

The active application is a React and Vite portfolio with:

- A vertically scrolling `Home`, `About`, `Projects`, and `Contact` composition
- A fixed top navbar
- A bottom compiler status bar
- A half-height terminal overlay controlled by `Ctrl+J`
- Existing Compiler Dark tokens in `src/index.css`
- Framer Motion for current typography and reveal effects
- React Router already installed but not used by the active application tree
- A legacy `src/pages/Blog.jsx` with hardcoded post data and old Everblush class references

The existing mobile composition is usable and should remain the mobile fallback during this desktop redesign

## Scope

### In Scope

- A desktop-only workstation shell
- A clean wallpaper initial state
- A contextual macOS-like top menu bar
- Linux-style telemetry widgets in the top panel
- A centered application dock
- Router-backed app navigation and browser history
- App-specific presentation modes
- A persistent singleton Kitty terminal
- A Files-style Projects application
- A Markdown-backed Firefox reading application
- A planned internal Code app for GitHub activity and source identity
- A focused Mail or Contact application
- An About Yusuf profile surface opened from the system menu
- A responsive switch that preserves the current mobile portfolio
- Focused accessibility, keyboard, routing, state, and visual verification

### Out Of Scope

- Draggable or user-resizable windows
- Multiple document windows or overlapping document apps
- A full virtual window manager
- A new mobile shell
- A CMS, database, authentication, comments, or search service
- A contact form backend
- Fake access to private device hardware or filesystem data
- GSAP or ScrollTrigger
- New large decorative animation systems
- Editing `netlify/functions/github-stats.js`
- Rewriting unrelated inactive components
- Automatically pushing commits

## Responsive Architecture

### Desktop

At desktop width, `App` renders a persistent `DesktopShell`

The desktop shell owns:

- `DesktopMenuBar`
- `DesktopWallpaper`
- `DesktopDock`
- Router outlet for the active document app
- Persistent `KittyWindow`
- Global system menus and telemetry state

The desktop shell activates at `1024px`. Between `1024px` and `1279px`, CPU, RAM, and Storage condense into one system status popover while all other required status items remain accessible

### Mobile And Narrow Screens

Below the desktop breakpoint, the current vertical portfolio remains the primary experience

- `/` renders the current Home, About, Projects, and Contact flow
- `/projects`, `/about`, and `/contact` open or scroll to the corresponding mobile section
- `/blog` and `/blog/:slug` render a mobile Blog list or article view
- The desktop menu bar, dock, wallpaper, and desktop app frames are not squeezed into mobile

Crossing the desktop breakpoint may remount the presentation shell. This is acceptable for the first pass because the primary requirement is session persistence while operating within the desktop shell, not while resizing between device classes

## Router-Backed Application Model

Routes are the source of truth for the active document app

| Route | Desktop presentation | App metaphor |
| --- | --- | --- |
| `/` | Clean desktop | Desktop |
| `/projects` | Near-maximized fixed frame | Files |
| `/projects/:projectId` | Selected project in Files | Files |
| `/blog` | Fullscreen document app | Firefox |
| `/blog/:slug` | Selected article in Firefox | Firefox |
| `/code` | Near-maximized fixed frame | Code |
| `/contact` | Centered medium frame | Mail |
| `/about` | Centered medium frame | About Yusuf |

Dock navigation must use the router so refresh, deep links, browser back, and browser forward behave naturally

The active app is derived from the current route. It must not be duplicated in independent React state

Unknown desktop routes render a shell-level not-found state with a clear Desktop action. A missing Blog slug stays inside Firefox and offers a return to the article list

## Wallpaper

The final desktop wallpaper is the user-provided:

```text
wallhaven-qrmykq_1920x1080.png
```

Requirements:

- Preserve the original artwork without adding large branding text
- Render it as the clean desktop background
- Use centered cover behavior for common desktop ratios
- Use `#0D2720` or a sampled deep forest color while the image loads or if it fails
- Avoid heavy blur, color filters, animated gradients, or overlays that soften the pixel-art character
- Keep the menu bar and dock legible through their own controlled surfaces instead of darkening the whole wallpaper

The wallpaper communicates personal taste. The technical brand is carried by the apps and content rather than an oversized desktop slogan

## Desktop Menu Bar

The top panel should feel structurally close to macOS while using Yusuf's identity and Linux-style telemetry

Initial height target:

```text
30px
```

### Left Side

```text
Yusuf · active app · contextual menus
```

The `Yusuf` menu contains:

- About Yusuf
- Resume
- GitHub
- LinkedIn

GitHub and LinkedIn behave differently:

- LinkedIn is external-only and should open the profile from menus or contact surfaces
- GitHub remains available as an external profile link, but may also be represented by a later internal `Code` app that summarizes public development activity

Contextual menus only expose working commands. Likely groups include:

- `File`: close active app, copy route link, download resume when relevant
- `View`: Desktop, Files, Firefox, Mail
- `Go`: browser back and forward
- App-specific menus when meaningful

Do not render a long row of decorative `File`, `Edit`, or `Window` labels when they have no real commands

### Right Side

Wide desktop should show:

```text
CPU · RAM · Storage · Network · Battery · Volume · Clock · Power
```

Behavior:

- CPU and RAM are explicitly simulated session telemetry
- CPU and RAM use deterministic arrays instead of true random values
- Values advance about every three seconds
- Updates pause when `document.visibilityState` is hidden
- Numeric containers use tabular figures and stable widths to avoid layout shift
- Clock uses the visitor's local time
- Network uses browser online and offline events
- Battery, volume, and storage can use stable simulated values
- Simulated values expose a tooltip such as `simulated workstation telemetry`

Initial sequences may use:

```js
cpu: [17, 25, 35, 28, 45, 31]
ramGiB: [4.89, 5.04, 5.18, 5.11, 4.96]
```

The Power control opens a small menu with these working commands:

- Close active app
- Close all app surfaces and return to Desktop
- Reload desktop

Closing all app surfaces also hides Kitty but does not clear its session

At narrower desktop widths, CPU, RAM, and Storage may collapse into one system-status control, but their values must remain available inside its popover

## Dock

The dock is centered at the bottom and remains visible in the initial implementation

Dock apps:

- Files
- Firefox
- Mail
- Kitty

Initial Phase 1 keeps the dock to these four apps. A later phase may add `Code` between Firefox and Mail after the internal GitHub activity surface exists. Do not add a dock item that only redirects to an external website.

Behavior:

- Icons use familiar app metaphors rather than text-filled rounded rectangles
- Hover and keyboard focus expose concise tooltips
- The active document app has a small indicator
- Clicking the active app focuses it but does not close it
- Closing a document app returns to `/`
- Kitty uses one local Kitty logo asset and controls the same terminal instance as `Ctrl+J`

The dock should be compact enough that it does not dominate or obscure the wallpaper's central waterfall

### Provisional Application Icon Mapping

The selected user-provided icon assets now live under `public/icons/` in the desktop development worktree. The intended mapping for the desktop home screen is:

| Asset | Destination | Role |
| --- | --- | --- |
| `public/icons/firefox.png` | Blog | Firefox reading browser |
| `public/icons/about-folder.png` | About | Yusuf profile surface |
| `public/icons/github.png` | GitHub | External GitHub profile or later Code surface |
| `public/icons/vscode.png` | Projects | Project browser |

This mapping is recorded for the next desktop shell revision. The assets are relocated, but dock implementation remains a separate task.

### Code And GitHub

GitHub has enough portfolio content to become an internal app, but it should not be treated like LinkedIn.

Presentation:

- Planned route: `/code`
- Near-maximized fixed frame, similar in scale to Files
- Not part of Phase 1 unless explicitly pulled forward
- Dock label: `Code`, not `GitHub`, so it feels like a portfolio surface rather than a web shortcut

Content direction:

- Contribution graph or existing contribution visualization
- Highlighted repositories and Build-X-From-Scratch work
- Language or focus summary based on truthful local data or GitHub API data
- Recent public activity only if the data source is available and failure-tolerant
- External actions to GitHub profile and selected repositories

Constraints:

- Do not fabricate stars, commit counts, contribution counts, followers, or activity
- If GitHub API data fails, show a quiet fallback and keep the app useful with local curated repository data
- LinkedIn remains external-only and does not get its own dock app

## Application Presentation Modes

The shell supports a small fixed set of presentation modes. Users cannot drag or resize them

### Files And Projects

Presentation:

- Near-maximized fixed frame
- Approximately `94vw`
- Height fills the safe area between the menu bar and dock
- Initial desktop margin target of `16px` to `24px`
- One primary surface, no nested decorative card shell

Layout:

- Fixed sidebar around `220px` to `240px`
- Breadcrumb such as `Yusuf / Projects / SVector`
- Scrollable project detail panel
- Selected project is represented in the route

Sidebar entries:

- SVector
- forward_list_scratch
- Stack / Queue
- Trees / Algorithms
- Research Notes

Project detail includes:

- Project name
- Sharp technical statement
- GitHub action for public work
- Type, language, focus, and visibility metadata
- Real source excerpts, test output, architecture notes, or repository artifacts

Do not invent screenshots, benchmarks, stars, users, or technical metrics. If no visual artifact exists, use a truthful source-oriented presentation rather than a placeholder marketing image

`SVector` remains the default flagship selection

### Firefox And Blog

Presentation:

- Fullscreen document app below the global menu bar
- Dock remains available
- Reading content uses a constrained measure even though the app surface is fullscreen
- The visual language is recognizably browser-like: tab strip, address field, navigation controls, and a New Tab surface
- This is a portfolio reading environment, not a general web browser and not a literal browser clone

Layout:

- The initial New Tab shows the article index with title, date, category, tags, and calculated read time
- Opening an article creates or focuses a tab; the same article must not be opened in duplicate tabs
- Multiple article tabs may remain open at once and can be closed independently
- Closing the final article tab returns to New Tab
- Browser back, forward, reload, and address navigation remain real route-backed actions
- `/blog/:slug` opens a shareable article route and focuses the corresponding tab
- Returning to `/blog` shows New Tab

Blog content moves out of `Blog.jsx` into Markdown files such as:

```text
src/content/blog/<slug>.md
```

Suggested frontmatter:

```yaml
title: Building std::vector From Scratch
date: 2024-01-05
category: deep-dive
summary: The implementation details that changed how I think about containers
tags:
  - C++
  - STL
draft: false
```

Content rules:

- Articles are written manually as `.md` files. The initial phase does not require MDX components
- Frontmatter is parsed structurally and validated before an article enters the production list
- Read time is derived from article word count; it is not manually authored
- Use `react-markdown` with `remark-gfm` for Markdown rendering
- Use `remark-math` to parse inline `$...$` and block `$$...$$` equations
- Use `rehype-katex` and the KaTeX stylesheet to render LaTeX equations
- Equation rendering must support both inline and display math without breaking horizontal overflow or the reading measure
- The loader may reserve `.mdx` support for a later phase, but `.mdx` is not required for the first Firefox implementation
- Do not parse Markdown with ad hoc HTML or string manipulation

Existing Blog content may be migrated, but implementation must not add unsupported performance claims or fabricated writing

### Mail And Contact

Presentation:

- Centered medium fixed frame
- No drag or resize
- One focused contact surface rather than a dashboard

Content:

- Email
- GitHub
- LinkedIn
- Resume download
- Optional action to open Kitty

LinkedIn in Mail is an external profile action only. GitHub can link outward from Mail, but richer GitHub activity belongs in the planned Code app.

No contact form backend is included in this phase

### About Yusuf

Presentation:

- Centered medium fixed frame
- Opened from the `Yusuf` system menu rather than the dock

Content:

- Short profile
- Existing working principles
- Contribution heatmap
- Resume and external links

About may link to LinkedIn and GitHub externally. If a Code app exists, About may also include an internal `Open Code` action.

### Kitty

Kitty is a singleton utility overlay rather than a route-backed document app

Presentation:

- Near-maximized fixed terminal
- Initial target around `96vw` by `82vh` to `88vh`
- Wallpaper or current app remains visible at the edges
- Background layer dims by roughly `12%` to `18%`
- No heavy backdrop blur
- No drag or resize
- Minimal functional chrome

Visual reference:

- Ghostty-like background around `#141B1E`
- Colorful prompt output provides the primary accent
- Avoid decorative fake terminal chrome
- Provide an accessible close control while keeping the terminal visually quiet

Lifecycle:

- `KittyWindow` remains mounted for the life of `DesktopShell`
- Closing Kitty hides it without clearing terminal output or internal state
- Command history, virtual working directory, Easter eggs, and achievements persist
- Only one Kitty instance can exist
- Dock icon and `Ctrl+J` toggle the same instance
- `Escape` closes Kitty when it is the topmost active surface
- Kitty may open over Desktop, Files, Firefox, Code, Mail, or About and returns to the previous context when closed

## Color And Typography Direction

### Shell

The menu bar and dock derive their base from the wallpaper's deep forest colors

Suggested starting values:

```text
forest chrome: #0D2720
deep teal:     #0C4F48
jade accent:   #298D6C
muted moss:    #58684D
```

Their surfaces may use controlled translucency, but text contrast must not depend on the wallpaper region behind them

### Document Apps

Files, Firefox, Mail, and About use light editorial surfaces so the redesign does not return entirely to dark mode

Suggested starting values:

```text
canvas:        #F3F5F2
surface:       #E8EDE9
ink:           #17231F
muted ink:     #63706A
border:        #C9D2CC
jade:          #2A7D67
mustard:       #C5963F
coral:         #C9635A
```

Use jade, mustard, and coral sparingly for state and emphasis. Do not make the application a one-note green theme

Typography keeps the established split:

- Display and body typography for editorial content
- Monospace for source, commands, paths, build metadata, and telemetry
- Small metadata should remain soft and avoid excessive uppercase tracking
- Blog prose can use normal punctuation; compact interface labels should remain concise

## Motion

- App entry and switching use a restrained `180ms` to `220ms` fade or slight scale transition
- Kitty can use a short opacity and position transition without simulating physical window movement
- Telemetry values may crossfade lightly
- Dock hover may use a small lift or scale response without large magnification
- `prefers-reduced-motion` removes spatial transitions and keeps direct state changes
- Existing Framer Motion is sufficient
- No GSAP dependency is required

## Interaction And Keyboard Behavior

- `Ctrl+J` toggles Kitty
- `Escape` closes the active menu, popover, or Kitty overlay first
- Browser back and forward follow route history
- App menus and dock are keyboard accessible
- Focus returns to the launcher or menu control that opened a dismissed surface
- Tooltips never contain the only accessible label

## Data Flow And State Boundaries

- Router location owns the active document app
- `DesktopShell` owns menu, dock, telemetry, and Kitty visibility
- `Terminal` retains its existing internal session state and remains mounted
- Firefox content loader owns Markdown discovery, frontmatter validation, metadata normalization, and equation-ready source handling
- Projects continue to use structured project data rather than duplicating content in JSX
- App frames receive presentation mode and content through explicit props or route configuration

Avoid a single oversized desktop component. The shell, menu bar, dock, telemetry, application frame, and content apps should remain independently understandable and testable

## Error And Empty States

- Wallpaper load failure uses a deep forest fallback color
- Unknown routes provide a Desktop action
- Missing project IDs show a Files not-found state with an action that opens `SVector`
- Missing Blog slugs show a Firefox not-found state and New Tab action
- Invalid Markdown metadata is reported clearly during development and skipped safely in production
- Network-offline state updates the top panel without blocking local portfolio content
- External-link failures remain browser-controlled and do not corrupt app state

## Verification Strategy

### Build And Static Checks

- `npm run build`
- `git diff --check`
- No unintentional changes to `netlify/functions/github-stats.js`
- No generated `dist` churn committed

### Behavior

- Clean Desktop loads at `/`
- Dock routes to Files, Firefox, and Mail
- LinkedIn remains external-only and is not a dock app
- Planned Code app, when implemented, contains truthful GitHub activity rather than a bare external redirect
- Browser back and forward restore the previous app
- Direct Blog article URLs work
- Closing a document app returns to Desktop
- Kitty never duplicates
- Kitty output and command history survive close, route changes, and reopen
- `Ctrl+J` and `Escape` follow their defined priorities
- CPU and RAM loop deterministically and clean up timers
- Clock and online status update correctly

### Visual And Responsive

Desktop screenshots at representative widths:

- `1280px`
- `1440px`
- `1920px`

Mobile regression screenshots:

- `390px`
- `768px`

Check:

- Wallpaper framing and crop
- Top-panel overflow
- Stable telemetry widths
- Dock and content overlap
- Project sidebar and detail scrolling
- Firefox tab strip, New Tab index, and article reading measure
- Kitty framing and backdrop
- Light document contrast against dark shell
- No text overflow or incoherent overlap

## Acceptance Criteria

- Desktop opens to a clean workstation view with the approved wallpaper
- Top panel visibly includes Yusuf, active-app context, CPU, RAM, Storage, Network, Battery, Volume, Clock, and Power
- CPU and RAM visibly cycle through deterministic values
- Phase 1 dock contains Files, Firefox, Mail, and Kitty
- Final dock may contain Files, Firefox, Code, Mail, and Kitty after the Code app is implemented
- Files uses the approved sidebar-detail Projects layout in one near-maximized fixed frame
- Firefox supports Markdown-backed Blog list and article routes with multiple article tabs
- Firefox renders Markdown tables, fenced code, inline LaTeX, and display LaTeX equations
- Mail and About use focused fixed frames
- Only one document app is active at once
- Kitty is near-maximized, singleton, and session-persistent
- Current mobile portfolio remains usable
- No window is draggable or user-resizable
- No unsupported system data or project metrics are presented as real
- Build and targeted desktop/mobile verification pass
