# Desktop Workspace Portfolio Implementation Plan

Status: working implementation plan, not a final locked product direction. Phase 1 is implemented first; later phases may revise app lineup and content surfaces before execution.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the desktop landing page with a routed personal workstation while preserving the current portfolio below `1024px`, adding deterministic system telemetry, a persistent singleton Kitty terminal, a Files-style project browser, and a Markdown-backed Notes app.

**Architecture:** `BrowserRouter` wraps a responsive application root. Routes are the only source of truth for the active desktop document app, while `DesktopShellProvider` owns transient shell state such as open menus and Kitty visibility. The existing mobile composition is extracted intact and receives route-to-section bridging. Shared project, profile, and Blog data feed both presentations.

**Tech Stack:** React 19, Vite 7, React Router 7, Tailwind CSS 3, Framer Motion 12, React Icons 5, Vitest, React Testing Library, Playwright, `react-markdown`, `remark-gfm`, and `gray-matter`.

## Global Constraints

- Desktop mode starts at `1024px`; widths below it keep the current vertical portfolio.
- `/` is a clean desktop. Document apps are route-backed at `/projects`, `/projects/:projectId`, `/blog`, `/blog/:slug`, `/contact`, and `/about`.
- GitHub is a planned internal `Code` app for a later phase, likely route-backed at `/code`, but Phase 1 does not implement it.
- Only one document app is visible. No app can be dragged or user-resized.
- Kitty is not a route. It stays mounted within `DesktopShell`, can be hidden, and has one session shared by the dock and `Ctrl+J`.
- Use the supplied `wallhaven-qrmykq_1920x1080.png` unchanged as the desktop wallpaper.
- Use the supplied `kitty-dark.png` unchanged as the local Kitty dock asset.
- Never stage or edit `netlify/functions/github-stats.js`, `.superpowers/`, or `ChatGPT Image Aug 15, 2026, 04_19_10 PM.png`.
- Do not commit generated `dist/` output.
- Document apps use light editorial surfaces; Kitty remains dark with a `#141B1E` base.
- CPU and RAM are visibly simulated deterministic sequences, not random or claimed hardware readings.
- Do not invent project screenshots, benchmarks, stars, users, system access, or Blog claims.
- Do not invent GitHub activity, contribution counts, stars, followers, commit counts, or repository metrics.
- Use existing Framer Motion only. Do not add GSAP.
- Every visible launcher, menu item, close control, and external action must work with keyboard and pointer input.
- Respect `prefers-reduced-motion` and keep compact metadata free from excessive uppercase tracking.

---

## Task 1: Add the test harness and responsive application boundary

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `vite.config.js`
- Modify: `src/main.jsx`
- Modify: `src/App.jsx`
- Create: `src/test/setup.js`
- Create: `src/hooks/useMediaQuery.js`
- Create: `src/layouts/MobilePortfolio.jsx`
- Create: `src/desktop/DesktopShell.jsx`
- Test: `src/App.test.jsx`

**Interfaces:**
- Consumes: the current `App.jsx` mobile composition and browser media-query API.
- Produces: `useMediaQuery(query)`, `MobilePortfolio`, and a responsive `App` that selects exactly one shell.

- [ ] Install the test dependencies and add stable scripts.

  Run:

  ```bash
  npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @playwright/test
  ```

  Add these scripts to `package.json`:

  ```json
  {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
  ```

- [ ] Configure Vitest in `vite.config.js` and load DOM matchers from `src/test/setup.js`.

  ```js
  // vite.config.js
  export default defineConfig({
      plugins: [react()],
      test: {
          environment: 'jsdom',
          setupFiles: './src/test/setup.js',
          css: true,
      },
  })
  ```

  ```js
  // src/test/setup.js
  import '@testing-library/jest-dom/vitest'
  import { afterEach } from 'vitest'
  import { cleanup } from '@testing-library/react'

  afterEach(() => cleanup())
  ```

- [ ] Write `src/App.test.jsx` before changing the application root.

  ```jsx
  import { render, screen } from '@testing-library/react'
  import { MemoryRouter } from 'react-router-dom'
  import { beforeEach, describe, expect, it, vi } from 'vitest'
  import App from './App'

  const setDesktop = (matches) => {
      window.matchMedia = vi.fn().mockImplementation(() => ({
          matches,
          media: '(min-width: 1024px)',
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn(),
      }))
  }

  describe('responsive application root', () => {
      beforeEach(() => setDesktop(false))

      it('keeps the existing portfolio below the desktop breakpoint', () => {
          render(<MemoryRouter><App /></MemoryRouter>)
          expect(screen.getByTestId('mobile-portfolio')).toBeInTheDocument()
          expect(screen.queryByTestId('desktop-shell')).not.toBeInTheDocument()
      })

      it('renders only the workstation at desktop width', () => {
          setDesktop(true)
          render(<MemoryRouter><App /></MemoryRouter>)
          expect(screen.getByTestId('desktop-shell')).toBeInTheDocument()
          expect(screen.queryByTestId('mobile-portfolio')).not.toBeInTheDocument()
      })
  })
  ```

- [ ] Run the focused test and confirm it fails because the responsive components do not exist.

  Run: `npm test -- src/App.test.jsx`

  Expected: FAIL on the missing `data-testid="mobile-portfolio"` or missing desktop shell.

- [ ] Implement `useMediaQuery` with listener cleanup.

  ```js
  import { useEffect, useState } from 'react'

  export default function useMediaQuery(query) {
      const getMatch = () => typeof window !== 'undefined' && window.matchMedia(query).matches
      const [matches, setMatches] = useState(getMatch)

      useEffect(() => {
          const media = window.matchMedia(query)
          const update = () => setMatches(media.matches)
          update()
          media.addEventListener('change', update)
          return () => media.removeEventListener('change', update)
      }, [query])

      return matches
  }
  ```

- [ ] Move the current `App.jsx` JSX and terminal state unchanged into `MobilePortfolio.jsx`; add only `data-testid="mobile-portfolio"` to its outer element.

- [ ] Create the initial desktop root and responsive selector.

  ```jsx
  // src/desktop/DesktopShell.jsx
  export default function DesktopShell() {
      return <div data-testid="desktop-shell" className="desktop-shell" />
  }
  ```

  ```jsx
  // src/App.jsx
  import DesktopShell from './desktop/DesktopShell'
  import useMediaQuery from './hooks/useMediaQuery'
  import MobilePortfolio from './layouts/MobilePortfolio'

  export default function App() {
      const isDesktop = useMediaQuery('(min-width: 1024px)')
      return isDesktop ? <DesktopShell /> : <MobilePortfolio />
  }
  ```

- [ ] Wrap `App` in `BrowserRouter` in `src/main.jsx`; keep tests responsible for their own `MemoryRouter`.

- [ ] Run `npm test -- src/App.test.jsx` and `npm run build`.

  Expected: both pass, and mobile behavior remains owned by `MobilePortfolio`.

- [ ] Commit the responsive foundation.

  ```bash
  git add package.json package-lock.json vite.config.js src/main.jsx src/App.jsx src/test/setup.js src/hooks/useMediaQuery.js src/layouts/MobilePortfolio.jsx src/desktop/DesktopShell.jsx src/App.test.jsx
  git commit -m "refactor: split desktop and mobile portfolio shells"
  ```

## Task 2: Build the routed desktop shell and fixed presentation modes

**Files:**
- Modify: `src/desktop/DesktopShell.jsx`
- Modify: `src/index.css`
- Create: `src/desktop/desktopApps.js`
- Create: `src/desktop/DesktopRoutes.jsx`
- Create: `src/desktop/DesktopAppFrame.jsx`
- Create: `src/desktop/DesktopNotFound.jsx`
- Create: `src/desktop/DesktopShellContext.jsx`
- Create: `src/desktop/apps/FilesApp.jsx`
- Create: `src/desktop/apps/NotesApp.jsx`
- Create: `src/desktop/apps/MailApp.jsx`
- Create: `src/desktop/apps/AboutApp.jsx`
- Create: `src/desktop/desktop.css`
- Create: `public/wallpapers/forest-workstation.png`
- Test: `src/desktop/DesktopRoutes.test.jsx`

**Interfaces:**
- Consumes: router pathname, supplied wallpaper, and desktop breakpoint from Task 1.
- Produces: `resolveDesktopApp(pathname)`, route-backed app frames, a shell-level not-found state, and shared shell actions.

- [ ] Copy the approved wallpaper without modifying image pixels.

  Run:

  ```bash
  mkdir -p public/wallpapers
  cp wallhaven-qrmykq_1920x1080.png public/wallpapers/forest-workstation.png
  ```

- [ ] Write route-resolution tests in `src/desktop/DesktopRoutes.test.jsx`.

  ```jsx
  import { describe, expect, it } from 'vitest'
  import { resolveDesktopApp } from './desktopApps'

  describe('resolveDesktopApp', () => {
      it.each([
          ['/', null],
          ['/projects', 'files'],
          ['/projects/svector', 'files'],
          ['/blog', 'notes'],
          ['/blog/fuzzy-cmeans-parallel', 'notes'],
          ['/contact', 'mail'],
          ['/about', 'about'],
      ])('maps %s to %s', (pathname, appId) => {
          expect(resolveDesktopApp(pathname)?.id ?? null).toBe(appId)
      })

      it('returns the shell not-found descriptor for unknown paths', () => {
          expect(resolveDesktopApp('/unknown').id).toBe('not-found')
      })
  })
  ```

- [ ] Run `npm test -- src/desktop/DesktopRoutes.test.jsx` and confirm the missing module failure.

- [ ] Implement one registry with exact app ids and presentation modes.

  ```js
  import { matchPath } from 'react-router-dom'

  export const DESKTOP_APPS = Object.freeze({
      files: { id: 'files', label: 'Files', route: '/projects', mode: 'near-max' },
      notes: { id: 'notes', label: 'Notes', route: '/blog', mode: 'fullscreen' },
      mail: { id: 'mail', label: 'Mail', route: '/contact', mode: 'medium' },
      about: { id: 'about', label: 'About Yusuf', route: '/about', mode: 'medium' },
  })

  export function resolveDesktopApp(pathname) {
      if (pathname === '/') return null
      if (matchPath('/projects/:projectId?', pathname)) return DESKTOP_APPS.files
      if (matchPath('/blog/:slug?', pathname)) return DESKTOP_APPS.notes
      if (pathname === '/contact') return DESKTOP_APPS.mail
      if (pathname === '/about') return DESKTOP_APPS.about
      return { id: 'not-found', label: 'Not Found', mode: 'medium' }
  }
  ```

- [ ] Create `DesktopShellContext` with `activeMenu`, `openMenu(id)`, `closeMenus()`, `kittyOpen`, `openKitty(triggerElement)`, `closeKitty()`, `toggleKitty(triggerElement)`, `registerActiveApp(node)`, `focusActiveApp()`, and `closeAll()`. `closeAll()` must navigate to `/` and hide Kitty without remounting the provider.

- [ ] Implement `DesktopRoutes` with explicit `Route` entries and no duplicated active-app state.

  ```jsx
  <Routes>
      <Route path="/" element={null} />
      <Route path="/projects" element={<FilesApp />} />
      <Route path="/projects/:projectId" element={<FilesApp />} />
      <Route path="/blog" element={<NotesApp />} />
      <Route path="/blog/:slug" element={<NotesApp />} />
      <Route path="/contact" element={<MailApp />} />
      <Route path="/about" element={<AboutApp />} />
      <Route path="*" element={<DesktopNotFound />} />
  </Routes>
  ```

- [ ] Give each initial app component a real heading and working close action through `useNavigate()`. These are baseline surfaces that later tasks enrich, not independent route state.

- [ ] Implement `DesktopAppFrame` with `data-mode` and a labelled close icon. Use these fixed layout values in `desktop.css`:

  ```css
  .desktop-shell { min-height: 100dvh; overflow: hidden; background: #0d2720 url('/wallpapers/forest-workstation.png') center / cover no-repeat; }
  .desktop-work-area { position: fixed; inset: 30px 0 0; }
  .desktop-app-frame[data-mode='near-max'] { inset: 18px 3vw 86px; }
  .desktop-app-frame[data-mode='fullscreen'] { inset: 0 0 74px; border-radius: 0; }
  .desktop-app-frame[data-mode='medium'] { inset: 0; width: min(760px, calc(100vw - 48px)); height: min(640px, calc(100dvh - 132px)); }
  .desktop-app-frame { position: absolute; margin: auto; overflow: hidden; background: #f3f5f2; color: #17231f; border: 1px solid #c9d2cc; border-radius: 8px; }
  ```

- [ ] Register the focusable app frame through `registerActiveApp`, set `tabIndex={-1}`, and use a `200ms` opacity/slight-scale entry. Add a shell-scoped `prefers-reduced-motion: reduce` rule that removes transform and sets transition/animation duration to `0.01ms`.

- [ ] Compose `DesktopShellProvider`, wallpaper, dim layer, and `DesktopRoutes` in `DesktopShell`; derive the active descriptor from `useLocation().pathname`.

- [ ] Run `npm test -- src/desktop/DesktopRoutes.test.jsx`, `npm run build`, and `git diff --check`.

- [ ] Commit only the shell, route, CSS, and approved wallpaper files.

  ```bash
  git add src/desktop src/index.css public/wallpapers/forest-workstation.png
  git commit -m "feat: add routed desktop workspace shell"
  ```

## Task 3: Add profile data, contextual menus, and deterministic telemetry

**Files:**
- Modify: `src/desktop/DesktopShell.jsx`
- Modify: `src/desktop/desktop.css`
- Create: `src/data/profile.js`
- Create: `src/desktop/DesktopMenuBar.jsx`
- Create: `src/desktop/MenuPopover.jsx`
- Create: `src/hooks/useSystemTelemetry.js`
- Create: `src/hooks/useClock.js`
- Create: `src/hooks/useOnlineStatus.js`
- Test: `src/hooks/useSystemTelemetry.test.js`
- Test: `src/desktop/DesktopMenuBar.test.jsx`

**Interfaces:**
- Consumes: active app descriptor, browser visibility and online status, and canonical profile links.
- Produces: a `30px` menu bar with working Yusuf/app/system menus and deterministic stable-width widgets.

- [ ] Create canonical profile data with the verified links.

  ```js
  export const profile = Object.freeze({
      name: 'Yusuf',
      email: 'yusufmuhyusuh@gmail.com',
      github: 'https://github.com/yusuf601',
      linkedin: 'https://www.linkedin.com/in/muh-yusuf-7154b7204',
      resume: '/MuhYusuf_Resume.pdf',
  })
  ```

- [ ] Write a fake-timer test proving deterministic sequence order and hidden-tab pause.

  ```js
  import { act, renderHook } from '@testing-library/react'
  import { afterEach, describe, expect, it, vi } from 'vitest'
  import { useSystemTelemetry } from './useSystemTelemetry'

  describe('useSystemTelemetry', () => {
      afterEach(() => {
          vi.useRealTimers()
          vi.restoreAllMocks()
      })

      it('advances deterministic values every three seconds', () => {
          vi.useFakeTimers()
          const { result } = renderHook(() => useSystemTelemetry())
          expect(result.current.cpu).toBe(17)
          expect(result.current.ramGiB).toBe(4.89)
          act(() => vi.advanceTimersByTime(3000))
          expect(result.current.cpu).toBe(25)
          expect(result.current.ramGiB).toBe(5.04)
      })

      it('pauses while the document is hidden and resumes once visible', () => {
          vi.useFakeTimers()
          let visibility = 'visible'
          vi.spyOn(document, 'visibilityState', 'get').mockImplementation(() => visibility)
          const { result } = renderHook(() => useSystemTelemetry())

          visibility = 'hidden'
          act(() => document.dispatchEvent(new Event('visibilitychange')))
          act(() => vi.advanceTimersByTime(6000))
          expect(result.current.cpu).toBe(17)

          visibility = 'visible'
          act(() => document.dispatchEvent(new Event('visibilitychange')))
          act(() => vi.advanceTimersByTime(3000))
          expect(result.current.cpu).toBe(25)
      })
  })
  ```

- [ ] Run `npm test -- src/hooks/useSystemTelemetry.test.js` and confirm the missing hook failure.

- [ ] Implement deterministic arrays, visibility cleanup, and stable simulated values.

  ```js
  import { useEffect, useState } from 'react'

  export const CPU_SEQUENCE = [17, 25, 35, 28, 45, 31]
  export const RAM_SEQUENCE = [4.89, 5.04, 5.18, 5.11, 4.96]

  export function useSystemTelemetry(intervalMs = 3000) {
      const [index, setIndex] = useState(0)

      useEffect(() => {
          let timer
          const start = () => {
              window.clearInterval(timer)
              if (document.visibilityState === 'visible') {
                  timer = window.setInterval(() => setIndex((value) => value + 1), intervalMs)
              }
          }
          start()
          document.addEventListener('visibilitychange', start)
          return () => {
              window.clearInterval(timer)
              document.removeEventListener('visibilitychange', start)
          }
      }, [intervalMs])

      return {
          cpu: CPU_SEQUENCE[index % CPU_SEQUENCE.length],
          ramGiB: RAM_SEQUENCE[index % RAM_SEQUENCE.length],
          storageGiB: 318.67,
          battery: 96,
          volume: 60,
      }
  }
  ```

- [ ] Implement `useClock` with one-minute updates and `Intl.DateTimeFormat`, plus `useOnlineStatus` using browser `online` and `offline` events.

- [ ] Write menu tests that open the Yusuf menu, navigate About, expose the real resume link, and call `closeAll()` from Power.

- [ ] Implement `MenuPopover` as an accessible `role="menu"` surface. Escape closes the active menu and restores focus to its trigger; clicking outside closes it.

- [ ] Implement `DesktopMenuBar` with these exact wide-layout groups:

  ```text
  Yusuf | active app | working contextual menu     CPU | RAM | Storage | Network | Battery | Volume | Clock | Power
  ```

  The Yusuf menu routes to `/about` and exposes Resume, GitHub, and LinkedIn anchors. LinkedIn is external-only. GitHub remains an external anchor here, while richer GitHub activity belongs to a later internal `Code` app. Context commands are `Close active app`, `Copy route link`, `Desktop`, `Files`, `Notes`, `Mail`, browser Back, and browser Forward. Power offers `Close active app`, `Close all app surfaces`, and `Reload desktop`.

- [ ] At `1024px` through `1279px`, collapse CPU, RAM, and Storage behind one icon button labelled `System telemetry`; keep all three values inside its popover.

- [ ] Add `font-variant-numeric: tabular-nums` and fixed minimum widths for CPU, RAM, Storage, Battery, Volume, and Clock. Use `title="simulated workstation telemetry"` on simulated values.

- [ ] Run both focused tests, then `npm run build` and `git diff --check`.

- [ ] Commit the menu and telemetry slice.

  ```bash
  git add src/data/profile.js src/hooks/useSystemTelemetry.js src/hooks/useSystemTelemetry.test.js src/hooks/useClock.js src/hooks/useOnlineStatus.js src/desktop/DesktopMenuBar.jsx src/desktop/DesktopMenuBar.test.jsx src/desktop/MenuPopover.jsx src/desktop/DesktopShell.jsx src/desktop/desktop.css
  git commit -m "feat: add desktop menu bar and telemetry"
  ```

## Task 4: Integrate one persistent Kitty terminal

**Files:**
- Modify: `src/desktop/DesktopShell.jsx`
- Modify: `src/desktop/DesktopShellContext.jsx`
- Modify: `src/desktop/desktop.css`
- Modify: `src/components/Terminal.jsx`
- Create: `src/desktop/KittyWindow.jsx`
- Create: `public/icons/kitty-dark.png`
- Test: `src/desktop/KittyWindow.test.jsx`

**Interfaces:**
- Consumes: existing `Terminal` internal session state, shell actions, supplied Kitty asset, and global keyboard events.
- Produces: one always-mounted terminal window whose visibility can change without resetting output or command history.

- [ ] Copy the approved Kitty image locally without editing it.

  Run:

  ```bash
  mkdir -p public/icons
  cp kitty-dark.png public/icons/kitty-dark.png
  ```

- [ ] Write the persistence test before changing `Terminal`.

  ```jsx
  import { render, screen } from '@testing-library/react'
  import userEvent from '@testing-library/user-event'
  import { MemoryRouter } from 'react-router-dom'
  import { expect, it } from 'vitest'
  import DesktopShell from './DesktopShell'

  it('keeps one terminal session when Kitty is hidden and reopened', async () => {
      const user = userEvent.setup()
      render(<MemoryRouter><DesktopShell /></MemoryRouter>)

      await user.keyboard('{Control>}j{/Control}')
      const input = screen.getByLabelText('Terminal command')
      await user.type(input, 'echo persistent-session{Enter}')
      expect(screen.getByText('persistent-session')).toBeInTheDocument()

      await user.keyboard('{Escape}')
      expect(screen.getByTestId('kitty-window')).not.toBeVisible()
      await user.keyboard('{Control>}j{/Control}')
      expect(screen.getByText('persistent-session')).toBeInTheDocument()
      expect(screen.getAllByTestId('kitty-window')).toHaveLength(1)
  })
  ```

- [ ] Run `npm test -- src/desktop/KittyWindow.test.jsx` and confirm it fails because Kitty is not mounted.

- [ ] Make the current terminal reusable without changing command behavior:

  ```jsx
  const Terminal = ({
      onModeChange = () => {},
      isOpen,
      onToggle,
      appearance = 'mobile',
  }) => {
  ```

  Add `aria-label="Terminal command"` to the command input. Derive the virtual route display from `window.location.pathname` for desktop instead of relying only on `window.location.hash`. Render the current full chrome for `appearance="mobile"` and minimal close/title chrome for `appearance="desktop"`.

- [ ] Implement `KittyWindow` so the outer node always exists, uses `aria-hidden={!isOpen}`, marks hidden descendants inert, and renders `<Terminal appearance="desktop" ... />` exactly once.

- [ ] Add one global key handler in `DesktopShell`: `Ctrl+J` toggles Kitty; Escape closes an open menu first, then Kitty. Do not register a second desktop handler inside the dock.

- [ ] Restore focus to the element recorded by `openKitty(triggerElement)` when Kitty closes. Focus the terminal input after opening.

- [ ] Style the window at approximately `96vw`, `82vh` to `88vh`, with `#141b1e`, no drag affordance, no resize affordance, and an accessible icon-only close button. When open, dim the layer below with `background: rgb(0 0 0 / 0.15)` and no backdrop blur.

- [ ] Run the Kitty test, all tests, `npm run build`, and `git diff --check`.

- [ ] Commit the persistent terminal slice and local icon.

  ```bash
  git add src/components/Terminal.jsx src/desktop/DesktopShell.jsx src/desktop/DesktopShellContext.jsx src/desktop/KittyWindow.jsx src/desktop/KittyWindow.test.jsx src/desktop/desktop.css public/icons/kitty-dark.png
  git commit -m "feat: add persistent Kitty utility window"
  ```

## Task 5: Add the functional Files, Notes, Mail, and Kitty dock

**Files:**
- Modify: `src/desktop/DesktopShell.jsx`
- Modify: `src/desktop/desktop.css`
- Create: `src/desktop/DesktopDock.jsx`
- Test: `src/desktop/DesktopDock.test.jsx`

**Interfaces:**
- Consumes: router location/navigation, `DESKTOP_APPS`, shell Kitty actions, and `/icons/kitty-dark.png`.
- Produces: a bottom-centered dock with route indicators, accessible labels, tooltips, and one Kitty launcher.
- Phase 1 dock intentionally stays limited to Files, Notes, Mail, and Kitty. Do not add LinkedIn. Do not add GitHub as a redirect-only dock item.

- [ ] Write dock interaction tests for route navigation, active indicators, and Kitty toggling.

  ```jsx
  it('routes document apps and toggles the same Kitty instance', async () => {
      const user = userEvent.setup()
      render(<MemoryRouter initialEntries={['/']}><DesktopShell /></MemoryRouter>)
      await user.click(screen.getByRole('button', { name: 'Open Files' }))
      expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Open Files' })).toHaveAttribute('aria-current', 'page')
      await user.click(screen.getByRole('button', { name: 'Open Kitty' }))
      expect(screen.getByTestId('kitty-window')).toBeVisible()
  })
  ```

- [ ] Run `npm test -- src/desktop/DesktopDock.test.jsx` and confirm the missing dock failure.

- [ ] Implement document buttons with `useNavigate`, active state from `useLocation`, and icons `FiFolder`, `FiFileText`, and `FiMail`. Use the local PNG for Kitty.

- [ ] Leave space in the app model for a future `Code` app, but do not implement `/code` in Phase 1.

- [ ] Keep button dimensions at `48px` with a stable `4px` active-indicator track. Show labels through CSS tooltips on hover and `:focus-visible`; keep `aria-label` independent from tooltip visibility.

- [ ] Clicking the active route calls `focusActiveApp()` rather than returning to Desktop. Clicking Kitty always calls `toggleKitty(event.currentTarget)`.

- [ ] Style a compact forest dock with a maximum content width, `8px` or smaller corner radius, controlled translucency, and no large macOS magnification. Keep it clear of the waterfall focal point.

- [ ] Run the focused test, all tests, `npm run build`, and `git diff --check`.

- [ ] Commit the dock.

  ```bash
  git add src/desktop/DesktopDock.jsx src/desktop/DesktopDock.test.jsx src/desktop/DesktopShell.jsx src/desktop/desktop.css
  git commit -m "feat: add desktop application dock"
  ```

## Task 6: Turn Projects into the Files application with shared data

**Files:**
- Modify: `src/pages/Projects.jsx`
- Modify: `src/desktop/apps/FilesApp.jsx`
- Modify: `src/desktop/desktop.css`
- Create: `src/data/projectArtifacts.js`
- Test: `src/desktop/apps/FilesApp.test.jsx`

**Interfaces:**
- Consumes: the five truthful artifacts currently embedded in `Projects.jsx` and route param `projectId`.
- Produces: one shared project collection, stable slugs, Files sidebar navigation, selected detail, and a route-local missing-project state.

- [ ] Extract the current five artifacts verbatim and add stable ids plus factual metadata.

  ```js
  export const projectArtifacts = [
      {
          id: 'svector',
          name: 'SVector',
          kind: 'container rebuild',
          statement: 'A source-level rebuild of std::vector with allocator control, capacity rules, iterator behavior, and API-compatible muscle memory',
          github: 'https://github.com/Build-X-From-Scratch/SVector',
          tech: ['C++20', 'Allocator', 'STL'],
          language: 'C++',
          focus: 'allocator control and container semantics',
          visibility: 'public',
      },
      {
          id: 'forward-list-scratch',
          name: 'forward_list_scratch',
          kind: 'linked primitive',
          statement: 'A forward-list implementation focused on splice, merge, sort, node ownership, and the real cost of pointer-shaped abstractions',
          github: 'https://github.com/Build-X-From-Scratch/forward_list_sratch',
          tech: ['C++20', 'Nodes', 'Algorithms'],
          language: 'C++',
          focus: 'node ownership and list algorithms',
          visibility: 'public',
      },
      {
          id: 'stack-queue',
          name: 'Stack / Queue',
          kind: 'linear adapters',
          statement: 'Small primitives rebuilt to expose the tradeoffs behind interface simplicity',
          github: 'https://github.com/Build-X-From-Scratch/Stack_Scratch',
          tech: ['Adapters', 'Buffer'],
          language: 'C++',
          focus: 'linear container adapters',
          visibility: 'public',
      },
      {
          id: 'trees-algorithms',
          name: 'Trees / Algorithms',
          kind: 'algorithmic internals',
          statement: 'Traversal, insertion, sorting, search, and the pieces hidden behind standard headers',
          github: null,
          tech: ['Trees', 'Sort', 'Search'],
          language: 'C++',
          focus: 'tree traversal, sorting, and search',
          visibility: 'private',
      },
      {
          id: 'research-notes',
          name: 'Research Notes',
          kind: 'systems to ML',
          statement: 'Academic and experimental notes connecting implementation details to computational models',
          github: 'https://github.com/yusuf601/my-paper',
          tech: ['Research', 'ML'],
          language: null,
          focus: 'computational models and implementation notes',
          visibility: 'public',
      },
  ]

  export const defaultProjectId = 'svector'
  export const findProject = (id) => projectArtifacts.find((project) => project.id === id)
  ```

- [ ] Write Files route tests covering default selection, a selected sidebar item, and an invalid id.

  ```jsx
  it.each([
      ['/projects', 'SVector'],
      ['/projects/research-notes', 'Research Notes'],
  ])('opens the selected project for %s', (route, title) => {
      render(<MemoryRouter initialEntries={[route]}><Routes><Route path="/projects/:projectId?" element={<FilesApp />} /></Routes></MemoryRouter>)
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
  })
  ```

- [ ] Run `npm test -- src/desktop/apps/FilesApp.test.jsx` and confirm it fails against the baseline app.

- [ ] Implement a single Files surface with a fixed `230px` sidebar, breadcrumb `Yusuf / Projects / <name>`, and independently scrollable detail pane. Sidebar links use `/projects/<id>` and `aria-current="page"`.

- [ ] In project detail, render name, statement, kind, language/tech, focus, visibility, and a working GitHub action only when `visibility === 'public'` and the URL is not `#`. Use source-oriented text and existing metadata; do not add visual mockups or metrics.

- [ ] For `/projects`, redirect with `replace` to `/projects/svector` so refresh and history settle on the flagship route. For an unknown id, keep the Files frame visible and provide a working `Open SVector` action.

- [ ] Refactor mobile `Projects.jsx` to import `projectArtifacts` while preserving its current hierarchy and animations.

- [ ] Add responsive containment so sidebar labels never resize tracks, the detail panel scrolls without moving the dock, and the frame remains within the top-bar/dock safe area at `1024px`, `1280px`, and `1920px`.

- [ ] Run the focused test, all tests, `npm run build`, and `git diff --check`.

- [ ] Commit the shared project data and Files app.

  ```bash
  git add src/data/projectArtifacts.js src/pages/Projects.jsx src/desktop/apps/FilesApp.jsx src/desktop/apps/FilesApp.test.jsx src/desktop/desktop.css
  git commit -m "feat: add Files-style project browser"
  ```

## Task 7: Move Blog content to Markdown and build the Notes application

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `src/pages/Blog.jsx`
- Modify: `src/desktop/apps/NotesApp.jsx`
- Modify: `src/desktop/desktop.css`
- Create: `src/content/blog/fuzzy-cmeans-parallel.md`
- Create: `src/data/blogPosts.js`
- Test: `src/data/blogPosts.test.js`
- Test: `src/desktop/apps/NotesApp.test.jsx`

**Interfaces:**
- Consumes: the one complete post currently embedded in `Blog.jsx`, Markdown raw modules, and route param `slug`.
- Produces: normalized published posts with derived read time, Notes list/article routes, and the same content on mobile.

- [ ] Install maintained Markdown dependencies.

  Run:

  ```bash
  npm install react-markdown remark-gfm gray-matter
  ```

- [ ] Move the complete `fuzzy-cmeans-parallel` article text into Markdown with this metadata schema, preserving its existing wording and claims exactly.

  ```yaml
  ---
  title: Optimizing Fuzzy C-Means with Parallel Processing
  date: 2024-02-10
  category: research
  summary: How I achieved a 40% performance improvement in a clustering algorithm by identifying the right bottleneck — not the one I expected.
  tags:
    - C++
    - Fuzzy Logic
    - Multithreading
    - Performance
  draft: false
  ---
  ```

  Do not create article bodies for the two current preview-only records.

- [ ] Write parser tests with in-memory raw Markdown sources.

  ```js
  import { describe, expect, it } from 'vitest'
  import { loadBlogPosts } from './blogPosts'

  describe('loadBlogPosts', () => {
      it('normalizes metadata, derives slug, and calculates read time', () => {
          const posts = loadBlogPosts({
              '/src/content/blog/sample-note.md': `---\ntitle: Sample Note\ndate: 2026-08-15\ncategory: note\nsummary: A test note\ntags: [C++]\ndraft: false\n---\n${'word '.repeat(240)}`,
          })
          expect(posts[0]).toMatchObject({ slug: 'sample-note', readTimeMinutes: 2 })
      })

      it('filters drafts and sorts newest first', () => {
          const posts = loadBlogPosts({
              '/src/content/blog/old.md': '---\ntitle: Old\ndate: 2024-01-01\ncategory: note\nsummary: Old\ntags: []\ndraft: false\n---\nBody',
              '/src/content/blog/draft.md': '---\ntitle: Draft\ndate: 2026-01-01\ncategory: note\nsummary: Draft\ntags: []\ndraft: true\n---\nBody',
          })
          expect(posts.map((post) => post.slug)).toEqual(['old'])
      })
  })
  ```

- [ ] Run `npm test -- src/data/blogPosts.test.js` and confirm the missing loader failure.

- [ ] Implement `loadBlogPosts(sources)` using `gray-matter`, a required-field validator, basename-derived slug, `Math.max(1, Math.ceil(wordCount / 200))`, draft filtering, and descending ISO date sort. Export production posts from `import.meta.glob('../content/blog/*.md', { eager: true, query: '?raw', import: 'default' })`.

- [ ] In development, throw an error naming the source file when required metadata is invalid. In production, log one concise error and omit that article.

- [ ] Write Notes route tests for list, article, and missing-slug return action. Then implement the fullscreen light Notes app with a compact article list and a main reading pane rendered through `ReactMarkdown` and `remarkGfm`.

- [ ] Constrain prose to `68ch`, give code blocks horizontal scrolling, keep metadata soft, and route article links to `/blog/<slug>`. The missing article action routes to `/blog`.

- [ ] Rewrite mobile `Blog.jsx` to consume the same loader and route params. Preserve mobile visual conventions, remove local `activePost` state, and use URL navigation for list/article transitions.

- [ ] Run both focused tests, all tests, `npm run build`, and `git diff --check`.

- [ ] Commit the Markdown content and Notes app.

  ```bash
  git add package.json package-lock.json src/content/blog/fuzzy-cmeans-parallel.md src/data/blogPosts.js src/data/blogPosts.test.js src/pages/Blog.jsx src/desktop/apps/NotesApp.jsx src/desktop/apps/NotesApp.test.jsx src/desktop/desktop.css
  git commit -m "feat: add Markdown-backed Notes app"
  ```

## Task 8: Finish Mail, About, and mobile route bridging

**Files:**
- Modify: `src/desktop/apps/MailApp.jsx`
- Modify: `src/desktop/apps/AboutApp.jsx`
- Modify: `src/layouts/MobilePortfolio.jsx`
- Modify: `src/pages/Contact.jsx`
- Modify: `src/desktop/desktop.css`
- Test: `src/desktop/apps/MailApp.test.jsx`
- Test: `src/layouts/MobilePortfolio.test.jsx`

**Interfaces:**
- Consumes: canonical profile data, `DesktopShellContext.openKitty`, current About content, current Contact content, and router path.
- Produces: focused Mail/About frames and usable direct routes below `1024px`.

- [ ] Write a Mail test that verifies the real email, GitHub, LinkedIn, resume URL, and `Open Kitty` action.

- [ ] Run `npm test -- src/desktop/apps/MailApp.test.jsx` and confirm it fails against the baseline Mail surface.

- [ ] Implement Mail as one centered communication surface with `mailto:yusufmuhyusuh@gmail.com`, verified external links, resume download, and a button that invokes `openKitty(event.currentTarget)`. Do not add a form.

- [ ] Implement About by reusing the current short profile, working principles, and `ContributionHeatmap`. Keep the frame scrollable, use the light app tokens, and source links from `profile.js`.

- [ ] Update mobile `Contact.jsx` to import `profile.js`, replacing the incorrect LinkedIn path while preserving current mobile layout.

- [ ] Write mobile route tests covering `/`, `/projects`, `/about`, `/contact`, `/blog`, and `/blog/fuzzy-cmeans-parallel`.

- [ ] In `MobilePortfolio`, use `useLocation` and `useEffect` so `/projects`, `/about`, and `/contact` render the current one-page composition and scroll the matching section into view with reduced-motion-aware behavior. Render mobile `Blog` directly for `/blog` and `/blog/:slug`.

- [ ] Keep the mobile Navbar terminal and compiler status bar working on portfolio routes. Blog routes do not render duplicate desktop menu/dock surfaces.

- [ ] Run both focused tests, all tests, `npm run build`, and `git diff --check`.

- [ ] Commit the final content applications and mobile route bridge.

  ```bash
  git add src/desktop/apps/MailApp.jsx src/desktop/apps/MailApp.test.jsx src/desktop/apps/AboutApp.jsx src/layouts/MobilePortfolio.jsx src/layouts/MobilePortfolio.test.jsx src/pages/Contact.jsx src/desktop/desktop.css
  git commit -m "feat: complete desktop content apps and mobile routes"
  ```

## Task 9: Add end-to-end checks and perform visual regression review

**Files:**
- Modify: `package.json`
- Create: `playwright.config.js`
- Create: `e2e/desktop-workspace.spec.js`
- Modify: `src/desktop/desktop.css`
- Modify: `src/desktop/desktop.css`

**Interfaces:**
- Consumes: the complete routed workstation and Vite preview server.
- Produces: repeatable desktop/mobile browser checks and final visual evidence.

- [ ] Configure Playwright to use installed Chrome and the Vite preview server.

  ```js
  import { defineConfig } from '@playwright/test'

  export default defineConfig({
      testDir: './e2e',
      use: {
          baseURL: 'http://127.0.0.1:4173',
          channel: 'chrome',
          trace: 'retain-on-failure',
      },
      webServer: {
          command: 'npm run preview -- --host 127.0.0.1 --port 4173',
          port: 4173,
          reuseExistingServer: true,
      },
  })
  ```

- [ ] Write an end-to-end test that verifies clean Desktop, Files routing, Notes deep link, browser back, Mail, Kitty single-instance behavior, terminal persistence, Escape priority, and unknown-route recovery.

- [ ] Add visual smoke checks at `1280x800`, `1440x900`, and `1920x1080`, plus mobile checks at `390x844` and `768x1024`. Capture screenshots to Playwright test output rather than committing generated images.

- [ ] Run the full unit suite.

  Run: `npm test`

  Expected: all Vitest files pass with no leaked timer or `act()` warnings.

- [ ] Build and run Playwright.

  Run:

  ```bash
  npm run build
  npm run test:e2e
  ```

  Expected: route, keyboard, session, and responsive checks pass.

- [ ] Inspect each desktop screenshot for wallpaper crop, top-panel overflow, telemetry width stability, dock overlap, Files sidebar/detail scrolling, Notes reading measure, Kitty frame edges, and contrast between light apps and dark shell.

- [ ] Inspect each mobile screenshot for preserved section layout, no desktop shell leakage, readable Blog content, and no text overlap.

- [ ] Emulate `prefers-reduced-motion: reduce`; verify app and Kitty transitions become direct opacity/state changes with no spatial movement.

- [ ] Scan for forbidden scope and accidental files.

  Run:

  ```bash
  rg -n "Math\.random|gsap|draggable|resize:" src/desktop src/hooks
  git status --short
  git diff --check
  ```

  Expected: no random telemetry, no GSAP or drag implementation, no CSS user-resize control, no edits to `netlify/functions/github-stats.js`, and no staged `dist/`, `.superpowers/`, or rejected wallpaper alternative.

- [ ] Commit only verification code and the final corrections it exposed.

  ```bash
  git add package.json playwright.config.js e2e/desktop-workspace.spec.js src/desktop src/hooks src/layouts src/pages src/data src/content public/wallpapers/forest-workstation.png public/icons/kitty-dark.png
  git diff --cached --name-only
  git commit -m "test: verify desktop workspace experience"
  ```

## Final Verification

- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Run `npm run test:e2e`.
- [ ] Run `git diff --check`.
- [ ] Run `git status --short` and confirm the known unrelated `netlify/functions/github-stats.js` modification remains unstaged.
- [ ] Confirm `/`, `/projects/svector`, `/blog`, `/blog/fuzzy-cmeans-parallel`, `/contact`, `/about`, and an unknown route behave correctly at desktop width.
- [ ] Confirm `/`, `/projects`, `/blog`, `/blog/fuzzy-cmeans-parallel`, `/contact`, and `/about` remain usable at `390px` and `768px`.
- [ ] Confirm Kitty output survives hide, route navigation, and reopen, while only one `kitty-window` exists.
- [ ] Confirm CPU/RAM sequence updates stop while the page is hidden and resume without duplicate intervals.
