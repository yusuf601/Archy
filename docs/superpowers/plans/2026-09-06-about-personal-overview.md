# About Yusuf Personal Overview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Use superpowers:subagent-driven-development only if delegation is authorized. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the About app interior with the agreed native-style Personal Overview and two permanently visible favorite-media groups.

**Architecture:** Keep the existing route and shared application frame. About owns a narrow sidebar and one scrolling reading pane; a small navigation component follows the visible section. Existing profile/media data feeds the composition and a stateless two-group collection, with local image-error state only.

**Tech Stack:** React 19, Vite 7, native scoped CSS, existing react-icons, Vitest/Testing Library, Playwright for browser verification.

**Spec:** [About Personal Overview design](../specs/2026-09-06-about-personal-overview-design.md)

**Execution status:** Not started. This document is not permission to implement or download assets.

## Global Constraints

- Scope is the interior of the About Yusuf app at `/about`.
- Do not modify the top bar, dock, terminal, other app interiors, routing, or mobile portfolio.
- Do not modify the shared `DesktopAppFrame` component or global font configuration.
- Use neutral light and dark surfaces; no green application backgrounds.
- Do not render selected work, project links, Arch Linux, daily-driver information, or system widgets in About.
- Render Films above Series, with both groups present together and no tabs or category-toggle buttons.
- Use Caveat only for short supporting copy; use a clean system sans-serif for primary content.
- Preserve the six approved media titles, their years, their types, and their order within each group.
- Preserve original image files; do not stretch artwork or crop artwork, faces, titles, or credits.
- Preserve existing unrelated worktree changes; never stage the entire dirty worktree.
- This documentation request authorizes spec and plan files only, not implementation, asset downloads, or deployment.

---

## Worktree and baseline

Execute from:

~~~sh
cd /home/kali/Archy/.worktrees/desktop-workspace-phase1
git branch --show-current
git status --short
git diff --cached --name-only
~~~

Expected branch: `desktop-workspace-phase1`. The primary checkout is on `main`; do not implement there.

This worktree already has edits to Terminal, KittyWindow, DesktopDock, DesktopRoutes tests, About files, shared CSS, media data, and untracked assets/dist. Those changes belong to the existing session. Record the current diff before editing. In particular, shared CSS includes dock enlargement and animation that must survive this task.

After execution is authorized, run `npm test` and `npm run build` once as a fresh baseline. Earlier work reported 37 passing tests; that historical result is not a substitute for a fresh run. Known historical build warnings concern Browserslist age and bundle size.

## File map

| File | Responsibility |
| --- | --- |
| Modify `src/data/aboutContent.js` | Explicit role/interests, approved display capitalization, chosen media imports |
| Modify `src/data/aboutContent.test.js` | Data contract and exact title/year/type ordering |
| Modify `src/desktop/apps/AboutApp.jsx` | Identity, education, learning, nav refs, collection composition |
| Create `src/desktop/apps/AboutApp.css` | About-scoped neutral surfaces, responsive layout, media styling, local font |
| Create `src/components/about/AboutSectionNav.jsx` | Two navigation destinations and active section |
| Modify `src/components/about/OnScreenShelf.jsx` | Films and Series rendered together, poster failure handling |
| Modify `src/desktop/apps/AboutApp.test.jsx` | Approved profile content and excluded old content |
| Modify `src/components/about/OnScreenShelf.test.jsx` | Simultaneous groups, order, metadata, empty/failure states |
| Modify content selectors in the About block of `src/desktop/desktop.css` | Remove obsolete About layout styles; preserve chrome rules and their tokens |
| Create `src/assets/fonts/about/` files | Caveat WOFF2, license, provenance |
| Create `src/assets/images/media/about/` files | Needed replacements/derivatives and SOURCES.md |
| Create `scripts/qa/about-overview.mjs` | Reproducible browser checks and screenshot capture |

Do not introduce an application-wide component system, new router, global store, or image library.

## Task 1: Establish the approved data contract

**Files:** `src/data/aboutContent.js`, `src/data/aboutContent.test.js`.

**Interfaces:**
- Consumes the existing frozen `aboutProfile`, `aboutVisualAssets`, and `onScreenItems` exports.
- Produces `aboutProfile.role: string` and `aboutProfile.interests: readonly string[]`.
- Keeps `onScreenItems` as records with `title, year, type, poster, alt`; `type` remains `film | series`.

- [ ] Add this behavioral data assertion before changing the data:

~~~js
it('provides the approved identity, interests and learning topics', () => {
    expect(aboutProfile.role).toBe('Informatics student')
    expect(aboutProfile.interests).toEqual([
        'Computer Vision', 'Computation', 'Systems',
    ])
    expect(aboutProfile.currentLearning).toEqual([
        'Data Science', 'Low-level programming', 'Machine Learning',
    ])
})
~~~

Import `aboutProfile` into the test. Retain catalog coverage, but stop asserting exact bundled poster URLs if assets are replaced; assert exact title/year/type order and nonempty local poster paths instead.

- [ ] Run `npm test -- src/data/aboutContent.test.js`. Expect the new role/interests assertions to fail against the old model.
- [ ] Add these fields and capitalization to the frozen profile:

~~~js
role: 'Informatics student',
interests: Object.freeze(['Computer Vision', 'Computation', 'Systems']),
currentLearning: Object.freeze([
    'Data Science', 'Low-level programming', 'Machine Learning',
]),
~~~

Keep legacy fields/exports if removing them would disturb other work. The new About component will not render them.

- [ ] Run the data test again. Expect all assertions to pass.
- [ ] Review that no media title, year, group, or ordering changed.

## Task 2: Prepare consistent media and the Caveat accent

**Files:** existing media files for inspection only; new `src/assets/images/media/about/` assets and `SOURCES.md`; `src/data/aboutContent.js` imports; new `src/assets/fonts/about/` files.

**Interfaces:**
- Consumes the six catalog records and the spec's poster criteria.
- Produces local, visually checked poster paths through the existing `poster` property.
- Produces `src/assets/fonts/about/caveat-latin-600.woff2`, its license, and provenance.

- [ ] Open all six existing image files at original resolution. Record file dimensions and baked-in borders separately from the intended 2:3 display frame.
- [ ] Create the asset source table with the columns specified in spec section 7. Record “source unknown” for existing files whose origin cannot be established; never fabricate attribution.
- [ ] For each unsuitable image, search its exact title/year plus “official vertical poster” or “official key art”. For series, verify the title and avoid accidentally selecting an unrelated season/title. Inspect each candidate visually before accepting it.
- [ ] Prefer an authentic 2:3 source with at least 600×900 pixels. Follow the source's terms and record the selected source page and image URL. If downloads require network approval, request it at execution time.
- [ ] Download only the necessary replacements to `src/assets/images/media/about/`. Suitable originals may continue to be referenced. Do not delete, overwrite, or re-encode original source images.
- [ ] If embedded empty borders need normalization, use an appropriate image-editing workflow that preserves the original artwork and write a derivative. Document the removed bounds. Do not solve mismatches with arbitrary per-title CSS scales or `object-fit: cover`.
- [ ] Update the corresponding static imports in `aboutContent.js`; keep the public record shape unchanged.
- [ ] Obtain Caveat weight 600 as a WOFF2 webfont from the official Google Fonts distribution, retaining the OFL license and source information. Validate the downloaded file as a font, not an HTML error page. No project-wide font changes.
- [ ] Run `npm test -- src/data/aboutContent.test.js`.
- [ ] Assess all six at the intended presentation size during Task 6. An inconsistent source is an asset task to resolve, not a CSS success.

No new automated test is necessary for each reversible asset substitution. Data validation plus original-resolution and browser inspection provides the relevant evidence.

## Task 3: Render Films and Series together

**Files:** `src/components/about/OnScreenShelf.jsx`, `src/components/about/OnScreenShelf.test.jsx`.

**Interfaces:**
- Consumes `OnScreenShelf({ items })` with the existing catalog record shape.
- Produces a section labeled by `on-screen-heading`, two named subgroup regions, and a stable DOM with all entries rendered.
- Keeps poster title/year outside the image fallback so failures never hide metadata.

- [ ] Replace tests that assert tab filtering with this contract. Import `within` and `fireEvent` from Testing Library:

~~~js
it('shows films and series together in reading order', () => {
    render(<OnScreenShelf items={items} />)
    const films = screen.getByRole('region', { name: 'Films', exact: true })
    const series = screen.getByRole('region', { name: 'Series', exact: true })
    expect(within(films).getByRole('img', {
        name: 'Poster for The Martian',
    })).toBeInTheDocument()
    expect(within(series).getByRole('img', {
        name: 'Poster for Reply 1988',
    })).toBeInTheDocument()
    expect(films.compareDocumentPosition(series) &
        Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Films' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Series' })).not.toBeInTheDocument()
    expect(screen.getByText('Favorite films & series')).toBeInTheDocument()
})

it('keeps a title and year readable if a poster fails', () => {
    render(<OnScreenShelf items={[items[0]]} />)
    fireEvent.error(screen.getByRole('img', { name: 'Poster for The Martian' }))
    expect(screen.getByText('Poster unavailable')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'The Martian' })).toBeInTheDocument()
    expect(screen.getByText('2015')).toBeInTheDocument()
})

it('labels both empty groups', () => {
    render(<OnScreenShelf items={[]} />)
    expect(screen.getByText('No films listed.')).toBeInTheDocument()
    expect(screen.getByText('No series listed.')).toBeInTheDocument()
})
~~~

- [ ] Run `npm test -- src/components/about/OnScreenShelf.test.jsx`; expect failure for missing Series region and fallback.
- [ ] Remove `selectedType` and toggle controls. Render the groups in this order:

~~~jsx
const groups = [
    { type: 'film', title: 'Films', id: 'about-films', empty: 'No films listed.' },
    { type: 'series', title: 'Series', id: 'about-series', empty: 'No series listed.' },
]

function Poster({ item }) {
    const [failed, setFailed] = useState(false)
    return (
        <div className="about-poster-frame">
            {failed
                ? <span className="about-poster-fallback">Poster unavailable</span>
                : <img src={item.poster} alt={item.alt} width="600" height="900"
                    loading="lazy" decoding="async" onError={() => setFailed(true)} />}
        </div>
    )
}
~~~

Keep `useState` only for the local Poster error state. Key each poster component by its source URL so a replacement source resets failure state.

- [ ] Use this subgroup rendering inside the outer On Screen section, after its h2 and Caveat helper:

~~~jsx
{groups.map(group => {
    const entries = items.filter(item => item.type === group.type)
    return (
        <section key={group.type} aria-labelledby={group.id} className="about-media-group">
            <h3 id={group.id}>{group.title}</h3>
            {entries.length === 0
                ? <p>{group.empty}</p>
                : <div className="about-poster-grid">
                    {entries.map(item => (
                        <article key={item.title} className="about-media-item">
                            <Poster key={item.poster} item={item} />
                            <h4>{item.title}</h4>
                            <p>{item.year}</p>
                        </article>
                    ))}
                </div>}
        </section>
    )
})}
~~~

- [ ] Run the collection tests again; expect all to pass. Do not retain the old routing probe solely for removed toggle behavior.

## Task 4: Replace the About interior and its scoped presentation

**Files:** `src/desktop/apps/AboutApp.jsx`, new `src/desktop/apps/AboutApp.css`, `src/desktop/apps/AboutApp.test.jsx`, About block only in `src/desktop/desktop.css`.

**Interfaces:**
- Consumes profile, assets, collection, and Task 5's `AboutSectionNav({ scrollRef, overviewRef, onScreenRef })`.
- Produces refs to the dedicated scroll pane and the two top-level section wrappers.
- Keeps the existing `DesktopAppFrame` call, title, and app descriptor.

Tasks 4 and 5 form one integrated layout deliverable; complete both before claiming this view works.

- [ ] Update obsolete tests: “Profile” as a separate card heading and the combined specialization string are no longer requirements. Replace the old optional-section mock tests with assertions that unapproved copy is never displayed.
- [ ] Import `within` from Testing Library and add these assertions using the existing `renderAboutApp()` helper:

~~~js
it('shows only the approved profile and two navigation destinations', () => {
    renderAboutApp()
    const nav = screen.getByRole('navigation', { name: 'About sections' })
    expect(within(nav).getAllByRole('link').map(link => link.textContent)).toEqual([
        'Overview', 'On Screen',
    ])
    expect(screen.getByRole('heading', { name: 'Muh Yusuf', level: 2 })).toBeInTheDocument()
    expect(screen.getByText('Informatics student')).toBeInTheDocument()
    expect(screen.getByText('Halu Oleo University')).toBeInTheDocument()
    expect(screen.getByText('Informatics Engineering')).toBeInTheDocument()
    expect(screen.getByText('5th semester')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Interests' })).toBeInTheDocument()
    expect(screen.getByText('Computer Vision')).toBeInTheDocument()
    expect(screen.getByText('Computation')).toBeInTheDocument()
    expect(screen.getByText('Systems')).toBeInTheDocument()
    expect(screen.getByText('Data Science')).toBeInTheDocument()
    expect(screen.getByText('Low-level programming')).toBeInTheDocument()
    expect(screen.getByText('Machine Learning')).toBeInTheDocument()
    expect(screen.getAllByRole('img', {
        name: 'Pixel-art portrait of Muh Yusuf',
    })).toHaveLength(1)
    expect(screen.queryByText('Arch Linux')).not.toBeInTheDocument()
    expect(screen.queryByText('Daily driver')).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /projects/i })).not.toBeInTheDocument()
})
~~~

- [ ] Run the About test and observe failures before changing the old interior.
- [ ] Remove the desk-owner sidebar block, generic greeting/prose, project link/import, terminal icon, daily-driver block, optional personal-section renderer, and note/card wrappers.
- [ ] Build this composition with semantic content populated from Task 1:

~~~jsx
<DesktopAppFrame app={DESKTOP_APPS.about} title="About Yusuf">
    <div className="about-overview-app">
        <AboutSectionNav scrollRef={scrollRef}
            overviewRef={overviewRef} onScreenRef={onScreenRef} />
        <div ref={scrollRef} className="about-reading-pane" tabIndex={0}
            role="region" aria-label="About Yusuf content">
            <div className="about-document">
                <section ref={overviewRef} aria-labelledby="about-profile-heading">
                    <div className="about-profile-header">
                        <img src={aboutVisualAssets.portrait}
                            alt="Pixel-art portrait of Muh Yusuf" width="112" height="112" />
                        <div>
                            <h2 id="about-profile-heading" tabIndex={-1}>{aboutProfile.name}</h2>
                            <p>{aboutProfile.role}</p>
                            <div className="about-education">
                                <img src={aboutVisualAssets.universityLogo}
                                    alt="Halu Oleo University logo" width="40" height="40" />
                                <div>
                                    <p>{aboutProfile.university}</p>
                                    <p>{aboutProfile.major}</p>
                                    <p>{aboutProfile.semester}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="about-learning-columns">
                        <section aria-labelledby="about-interests-heading">
                            <h3 id="about-interests-heading">Interests</h3>
                            <ul>{aboutProfile.interests.map(item => <li key={item}>{item}</li>)}</ul>
                        </section>
                        <section aria-labelledby="about-learning-heading">
                            <h3 id="about-learning-heading">Currently Learning</h3>
                            <ul>{aboutProfile.currentLearning.map(item => <li key={item}>{item}</li>)}</ul>
                        </section>
                    </div>
                </section>
                <div ref={onScreenRef}>
                    <OnScreenShelf items={onScreenItems} />
                </div>
            </div>
        </div>
    </div>
</DesktopAppFrame>
~~~

Declare the three refs with `useRef(null)`. Import only the data/components that remain in use. Set `tabIndex={-1}` on the On Screen h2 as well for navigation focus.

- [ ] Create `AboutApp.css` and import it from AboutApp. Scope every layout selector beneath `.about-overview-app`, except the uniquely named font face:

~~~css
@font-face {
    font-family: 'About Caveat';
    src: url('../../assets/fonts/about/caveat-latin-600.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
}

.about-overview-app {
    --about-surface: #f7f7f9;
    --about-sidebar: #ededf0;
    --about-text: #242426;
    --about-muted: #626268;
    --about-line: #d6d6dc;
    --about-accent: #1767c9;
    --about-selection: #e0e8f4;
    display: grid;
    grid-template-columns: 168px minmax(0, 1fr);
    height: 100%;
    min-height: 0;
    overflow: hidden;
    color: var(--about-text);
    background: var(--about-surface);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.about-overview-app .about-reading-pane {
    min-width: 0;
    min-height: 0;
    overflow-y: auto;
    container-type: inline-size;
}
.about-overview-app .about-document {
    max-width: 960px;
    margin-inline: auto;
    padding: 36px 40px 56px;
}
.about-overview-app .about-profile-header {
    display: grid;
    grid-template-columns: 112px minmax(0, 1fr);
    gap: 24px;
}
.about-overview-app .about-learning-columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px;
    margin-block: 32px 40px;
    padding-block: 28px;
    border-block: 1px solid var(--about-line);
}
.about-overview-app .on-screen-shelf-caption {
    font-family: 'About Caveat', cursive;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    color: var(--about-muted);
}
.about-overview-app .about-poster-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 200px));
    gap: 24px;
}
.about-overview-app .about-poster-frame {
    aspect-ratio: 2 / 3;
    display: grid;
    place-items: center;
    overflow: hidden;
    background: var(--about-sidebar);
}
.about-overview-app .about-poster-frame img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
}
@container (max-width: 560px) {
    .about-overview-app .about-learning-columns { grid-template-columns: 1fr; }
    .about-overview-app .about-poster-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .about-overview-app .about-document { padding-inline: 24px; }
}
@container (max-width: 360px) {
    .about-overview-app .about-profile-header { grid-template-columns: 1fr; }
    .about-overview-app .about-poster-grid { grid-template-columns: minmax(0, 200px); }
}
~~~

- [ ] Finish presentation using exact spec values: 36px semibold name, 16px role/body, 15–16px subgroup labels, 14px years, 40px spacing between media groups, 12px title-to-image spacing, natural multiline titles, no card backgrounds/borders around text groups. Avatar and logo use `object-fit: contain`.
- [ ] Add dark tokens from spec section 5 under `prefers-color-scheme: dark`; use 152px sidebar width below 1200px viewport width. Set nav padding to 12px, links to a minimum 40px target height, selection to the scoped token, and 2px accent focus outlines with 3px offset.
- [ ] Remove obsolete content selectors only from the existing About block in `desktop.css`, including desk cards and old collection toggle styles. Retain the `.desktop-shell[data-active-app='about']` tokens and its frame/titlebar rules, which keep existing app chrome stable. Do not edit any selector for other apps, titlebars, menu bars, dock, terminal, or shared frame geometry.
- [ ] Complete Task 5 and rerun About, media, and DesktopRoutes tests. Expected: approved content is present, obsolete content absent, routing/close behavior preserved.

## Task 5: Implement section navigation against the real scroll container

**File:** `src/components/about/AboutSectionNav.jsx`.

**Interfaces:**
- Consumes `scrollRef` (reading pane), `overviewRef` (profile section), `onScreenRef` (collection wrapper).
- Produces `<nav aria-label="About sections">` with exactly two links.
- Local active state is `'overview' | 'on-screen'`. No router/global state changes.

- [ ] Create links with hrefs `#about-profile-heading` and `#on-screen-heading`, visible labels Overview and On Screen, and `aria-current="location"` only on the active link.
- [ ] For normal activation, prevent the default only to scroll the intended pane. Use this geometry rather than window scroll:

~~~js
function scrollToSection(event, id) {
    event.preventDefault()
    const root = scrollRef.current
    const target = id === 'overview' ? overviewRef.current : onScreenRef.current
    if (!root || !target) return
    const top = id === 'overview'
        ? 0
        : target.getBoundingClientRect().top -
          root.getBoundingClientRect().top + root.scrollTop - 24
    root.scrollTo({ top: Math.max(0, top), behavior: 'auto' })
    target.querySelector('h2')?.focus({ preventScroll: true })
}
~~~

Instant scroll is the default native-utility choice; no animation is necessary. Preserve normal modified-click link behavior if handlers are attached to anchors.

- [ ] Use `IntersectionObserver` rooted in `scrollRef.current` to observe the collection wrapper against the top 96px of the pane. Set the bottom root margin in pixels to `-Math.max(0, root.clientHeight - 96)`, not a percentage of width. Intersecting means On Screen; otherwise Overview.
- [ ] Rebuild the observer when the reading pane resizes using `ResizeObserver`. Disconnect both observers on unmount. If the browser lacks IntersectionObserver, use a passive listener on this reading pane that evaluates the same geometry and remove it on cleanup.
- [ ] Handle the bottom-of-document case using a passive scroll listener on this pane: if the pane is scrollable and within 2px of its bottom while the collection is visible, On Screen is active even if its heading cannot reach the top band. Away from the bottom, evaluate the collection's intersection with the top 96px band so scrolling back out of the bottom case immediately restores the correct state. Remove the listener on cleanup. A fully non-scrollable pane starts at Overview; do not attach a window-level scroll listener.
- [ ] Support initial existing heading hashes after refs attach by scrolling to the corresponding section. Do not change the pathname, navigate to another app, or introduce extra hash-based routes.
- [ ] Check this behavior in a real browser in Task 6. The repository's test IntersectionObserver is a no-op, so unit tests that only invoke that mock are not evidence of scroll-following behavior.

## Task 6: Verify the approved composition and preserve external scope

**Files:** create `scripts/qa/about-overview.mjs`; screenshots go outside the source tree.

**Interfaces:**
- Consumes running Vite app via `ABOUT_QA_URL` (default `http://127.0.0.1:4175/about`).
- Optional `ABOUT_BROWSER_EXECUTABLE` selects an installed Chromium/Chrome binary.
- Produces assertions, browser error output, and screenshots in `/tmp/archy-about-overview-qa/`.

- [ ] Build the QA script with Playwright and Node's `assert/strict`. Use an explicit fresh browser context, collect `pageerror`, and wait for the About heading plus local fonts before capture:

~~~js
import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'

const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.ABOUT_BROWSER_EXECUTABLE || undefined,
})
const page = await browser.newPage()
const errors = []
page.on('pageerror', error => errors.push(error.message))
await mkdir('/tmp/archy-about-overview-qa', { recursive: true })
try {
    await page.goto(process.env.ABOUT_QA_URL || 'http://127.0.0.1:4175/about')
    await page.getByRole('heading', { name: 'Muh Yusuf' }).waitFor()
    await page.evaluate(() => document.fonts.ready)
    assert.equal(await page.getByRole('img', { name: /^Poster for / }).count(), 6)
    assert.equal(await page.getByRole('button', { name: /^(Films|Series)$/ }).count(), 0)
    const pane = page.getByRole('region', { name: 'About Yusuf content' })
    assert.equal(await pane.evaluate(el => el.scrollWidth <= el.clientWidth), true)
    const nav = page.getByRole('navigation', { name: 'About sections' })
    await nav.getByRole('link', { name: 'On Screen', exact: true }).click()
    assert.equal(new URL(page.url()).pathname, '/about')
    await page.waitForFunction(() =>
        document.querySelector('nav[aria-label="About sections"] [aria-current="location"]')
            ?.textContent === 'On Screen')
    await pane.evaluate(el => el.scrollTo({ top: 0 }))
    await page.waitForFunction(() =>
        document.querySelector('nav[aria-label="About sections"] [aria-current="location"]')
            ?.textContent === 'Overview')
    assert.deepEqual(errors, [])
} finally {
    await browser.close()
}
~~~

- [ ] Extend that script with the following explicit checks; use assertions for geometry/behavior, and screenshots for aesthetic judgment:

| Scenario | Required evidence |
| --- | --- |
| 1440×900 light | Profile screenshot and separate Films/Series screenshots; no cards around text groups |
| 1440×900 dark | Neutral surfaces and readable Caveat/body text |
| 1280×800 and 1024×768 | No horizontal pane overflow; all six items reachable vertically |
| Media fit | Scroll each image into view and wait for its lazy load, then require naturalWidth > 0; equal frame dimensions within 1px; visually equal artwork coverage |
| Long title | Leave the World Behind readable below the poster with no clipping or ellipsis |
| Caveat | Computed family includes About Caveat and document.fonts.check('600 20px "About Caveat"') succeeds after loading |
| Keyboard | Tab reaches both sidebar links; Enter scrolls correctly and visible focus remains |
| Reduced motion | Navigation is instant; no hover/scroll animations continue |
| Manual scroll | Active nav updates when entering collection, returning to profile, and reaching the bottom |
| Resize while scrolled | Active nav and pane geometry remain correct after viewport height changes |
| Initial anchors | /about#on-screen-heading and /about#about-profile-heading land at the intended section |
| Broken poster | Block one poster request in a fresh context; fallback keeps its frame and title/year |
| Close | Existing Close About Yusuf button returns to / |
| Existing mobile fallback | At 390×844 and browser zoom that triggers it, the existing mobile portfolio still renders |

- [ ] Add an isolated component-width check for a reading pane below 560px; confirm stacked learning and wrapping poster columns without changing the global desktop/mobile breakpoint.
- [ ] Run:

~~~sh
npm test -- src/data/aboutContent.test.js src/components/about/OnScreenShelf.test.jsx src/desktop/apps/AboutApp.test.jsx src/desktop/DesktopRoutes.test.jsx
npm test
npm run build
git diff --check
~~~

- [ ] Start the local preview with `npm run dev -- --host 127.0.0.1 --port 4175` or use the existing server after verifying it serves this worktree. Run:

~~~sh
ABOUT_BROWSER_EXECUTABLE=/usr/bin/google-chrome-stable node scripts/qa/about-overview.mjs
~~~

If the environment blocks browser launch or network access, request the required tool approval; do not treat a skipped browser run as a pass.

- [ ] Inspect screenshots yourself, including both media groups. Return to Task 2 if baked-in image margins still cause mismatched visual sizes.
- [ ] Compare the final diff against the recorded starting diff. There must be no new changes to DesktopDock, DesktopMenuBar, KittyWindow, Terminal, DesktopAppFrame, other apps, shared route behavior, or the mobile portfolio.
- [ ] Report test/build/browser results and any real remaining asset limitations. Do not claim a poster was downloaded, normalized, or verified without evidence in SOURCES.md and the browser.

## Review and commit checkpoints

Review Task 1's data contract, Task 2's assets, Task 3's media behavior, and Tasks 4–5's combined layout separately. If commits are requested during execution, stage only exact task files or inspected hunks; never use `git add .` or stage the whole `desktop.css` file over unrelated edits. No commit or implementation is required to finish this documentation request.

## Spec coverage

| Spec area | Plan coverage |
| --- | --- |
| Approved identity/interests/catalog | Tasks 1, 3, 4 |
| Sidebar and continuous reading pane | Tasks 4, 5 |
| Removal of projects/OS/desk cards | Task 4 |
| Films followed by Series | Task 3 |
| Poster normalization and provenance | Tasks 2, 6 |
| Caveat helper and neutral theme | Tasks 2, 4, 6 |
| Responsive layout and existing mobile boundary | Tasks 4, 6 |
| Keyboard, scroll following, motion, fallback | Tasks 3, 5, 6 |
| No top bar/dock/global changes | Global constraints, Task 6 diff review |

## Handoff

Review this plan together with the linked spec. Execution begins only after an explicit implementation request. The next phase is implementation using the execution skill; do not restart brainstorming or add rejected content.
