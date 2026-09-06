import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'

// Run against a local Vite server, with an outer process deadline:
// timeout 100s env ABOUT_BROWSER_EXECUTABLE=/usr/bin/google-chrome-stable node scripts/qa/about-overview.mjs
// PASS covers executable assertions, not visual artwork normalization or real browser UI zoom.
const url = process.env.ABOUT_QA_URL || 'http://127.0.0.1:4175/about'
const output = '/tmp/archy-about-overview-qa'
const expected = ['The Martian', 'Leave the World Behind', 'Cars', 'Reply 1988', 'FROM', 'The Night Agent']
const errors = []
const results = []
const screenshots = []
const limitations = [
    'Retained Cars and Leave the World Behind sources remain unknown; replacement poster rights remain with their respective owners. See src/assets/images/media/about/SOURCES.md.',
    '200% zoom uses an equivalent CSS viewport/DPR, not browser UI zoom.',
]
const run = { id: randomUUID(), startedAt: new Date().toISOString(), url }
let status = 'RUNNING'
let browser
const manifest = () => ({ run, status, results, errors, limitations, screenshots })
await mkdir(output, { recursive: true })
await writeFile(`${output}/results.json`, JSON.stringify(manifest(), null, 2))
const paneOf = page => page.getByRole('region', { name: 'About Yusuf content' })
const navOf = page => page.getByRole('navigation', { name: 'About sections' })
const active = async (page, name) => {
    await page.waitForFunction(name => document.querySelector('nav[aria-label="About sections"] [aria-current="location"]')?.textContent === name, name)
}
async function open(options = {}, hash = '') {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light', ...options })
    const page = await context.newPage()
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(`${url.split('#')[0]}${hash}`)
    await page.getByRole('heading', { name: 'Muh Yusuf', exact: true }).waitFor()
    await page.evaluate(() => document.fonts.ready)
    // The existing shell enters with opacity/transform motion. Wait for its actual
    // final paint, not just the mounted heading, before measuring or capturing.
    await page.waitForFunction(() => {
        let node = document.querySelector('.about-overview-app')
        while (node) {
            const style = getComputedStyle(node)
            if (Number(style.opacity) < 1 || node.getAnimations().some(a => a.playState === 'running')) return false
            node = node.parentElement
        }
        return true
    })
    return { page, context }
}
async function capture(page, name) {
    const path = `${output}/${name}.png`
    await page.screenshot({ path })
    screenshots.push(path)
}
async function geometry(page) {
    const value = await paneOf(page).evaluate(el => {
        const r = el.getBoundingClientRect()
        return { width: el.clientWidth, height: el.clientHeight, scrollWidth: el.scrollWidth, scrollHeight: el.scrollHeight, top: r.top, bottom: r.bottom }
    })
    assert.ok(value.width > 0 && value.height > 0, 'reading pane has usable dimensions')
    assert.ok(value.scrollWidth <= value.width, `horizontal pane overflow: ${JSON.stringify(value)}`)
    assert.ok(value.top >= 0 && value.bottom <= page.viewportSize().height, 'pane stays inside viewport')
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no page overflow')
    return value
}
async function media(page) {
    assert.equal(await page.getByRole('img', { name: /^Poster for / }).count(), 6)
    assert.equal(await page.getByRole('button', { name: /^(Films|Series)$/ }).count(), 0)
    assert.deepEqual(await page.locator('.about-media-item h4').allTextContents(), expected)
    assert.deepEqual(await page.locator('.about-media-group > h3').allTextContents(), ['Films', 'Series'])
    for (const title of expected) {
        const img = page.getByRole('img', { name: `Poster for ${title}`, exact: true })
        await img.scrollIntoViewIfNeeded()
        await img.evaluate(async el => { if (!el.complete) await new Promise(resolve => { el.addEventListener('load', resolve, { once: true }); el.addEventListener('error', resolve, { once: true }) }); await el.decode() })
        assert.ok(await img.evaluate(el => el.naturalWidth > 0), `${title} decoded`)
        const box = await img.boundingBox()
        const pane = await paneOf(page).boundingBox()
        assert.ok(box.y >= pane.y - 1 && box.y + box.height <= pane.y + pane.height + 1, `${title} reachable vertically`)
        assert.equal(await img.evaluate(el => getComputedStyle(el).objectFit), 'contain')
    }
    const frames = await page.locator('.about-poster-frame').evaluateAll(nodes => nodes.map(el => { const r = el.getBoundingClientRect(); return { width: r.width, height: r.height } }))
    for (const frame of frames) {
        assert.ok(Math.abs(frame.width - frames[0].width) <= 1 && Math.abs(frame.height - frames[0].height) <= 1, 'equal poster frames')
        assert.ok(Math.abs(frame.height - frame.width * 1.5) <= 1, '2:3 reserved frame')
    }
    const title = page.getByRole('heading', { name: 'Leave the World Behind', exact: true })
    assert.ok(await title.evaluate(el => {
        const s = getComputedStyle(el)
        return el.scrollWidth <= el.clientWidth && el.scrollHeight <= el.clientHeight && s.textOverflow !== 'ellipsis' && s.whiteSpace !== 'nowrap' && s.webkitLineClamp === 'none'
    }), 'long title wraps without clipping or ellipsis')
    return frames[0]
}
async function section(page, name) {
    await navOf(page).getByRole('link', { name, exact: true }).click()
    await active(page, name)
    assert.equal(new URL(page.url()).pathname, new URL(url).pathname)
}
async function theme(page) {
    const styles = await page.locator('.about-overview-app').evaluate(el => {
        const s = getComputedStyle(el)
        const helper = getComputedStyle(el.querySelector('.on-screen-shelf-caption'))
        return { background: s.backgroundColor, primary: s.color, muted: helper.color, font: helper.fontFamily, size: parseFloat(helper.fontSize), loaded: document.fonts.check('600 20px "About Caveat"') }
    })
    assert.match(styles.font, /About Caveat/)
    assert.ok(styles.loaded && styles.size >= 18 && styles.size <= 20, 'local Caveat loaded at readable size')
    const rgb = color => color.match(/[\d.]+/g).slice(0, 3).map(Number)
    const luminance = color => rgb(color).map(x => { const c = x / 255; return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4 }).reduce((sum, c, i) => sum + c * [.2126, .7152, .0722][i], 0)
    const bg = rgb(styles.background)
    assert.ok(Math.max(...bg) - Math.min(...bg) <= 5, 'neutral app surface')
    for (const color of [styles.primary, styles.muted]) {
        const values = [luminance(color), luminance(styles.background)].sort((a, b) => a - b)
        assert.ok((values[1] + .05) / (values[0] + .05) >= 4.5, 'body/helper contrast >= 4.5:1')
    }
    const cards = await page.locator('.about-profile-header, .about-education, .about-learning-columns section').evaluateAll(nodes => nodes.map(el => { const s = getComputedStyle(el); return [s.backgroundColor, s.boxShadow, s.borderLeftWidth, s.borderRightWidth] }))
    cards.forEach(styles => assert.deepEqual(styles, ['rgba(0, 0, 0, 0)', 'none', '0px', '0px'], 'text groups have no cards'))
}
try {
    browser = await chromium.launch({ headless: true, executablePath: process.env.ABOUT_BROWSER_EXECUTABLE || undefined })
    for (const colorScheme of ['light', 'dark']) {
        const { page, context } = await open({ colorScheme })
        await geometry(page)
        await theme(page)
        await capture(page, `1440-${colorScheme}-profile`)
        await media(page)
        await section(page, 'On Screen')
        await capture(page, `1440-${colorScheme}-films`)
        await paneOf(page).evaluate(el => el.scrollTo({ top: el.scrollHeight }))
        await active(page, 'On Screen')
        await capture(page, `1440-${colorScheme}-series`)
        results.push(`1440×900 ${colorScheme}: composition, six loaded posters, equal frames, title wrapping, local font, neutral surfaces and contrast`)
        await context.close()
    }
    for (const viewport of [{ width: 1280, height: 800 }, { width: 1024, height: 768 }]) {
        const { page, context } = await open({ viewport })
        await geometry(page)
        await capture(page, `${viewport.width}-profile`)
        await media(page)
        await section(page, 'On Screen')
        await capture(page, `${viewport.width}-films`)
        await paneOf(page).evaluate(el => el.scrollTo({ top: el.scrollHeight }))
        await active(page, 'On Screen')
        await capture(page, `${viewport.width}-series`)
        results.push(`${viewport.width}×${viewport.height}: no overflow, all six posters reachable`)
        await context.close()
    }
    {
        const { page, context } = await open({ reducedMotion: 'reduce' })
        const pane = paneOf(page)
        const sidebarBefore = await navOf(page).boundingBox()
        // Activate each link from the opposite section using real Tab/Enter.
        // Sample from click capture, before React handles navigation: waiting for
        // aria-current first would hide a broken smooth-scroll implementation.
        await pane.evaluate(el => el.scrollTo({ top: el.scrollHeight }))
        await active(page, 'On Screen')
        for (const name of ['Overview', 'On Screen']) {
            await page.getByRole('button', { name: 'Close About Yusuf', exact: true }).focus()
            for (let i = 0; i < (name === 'Overview' ? 1 : 2); i++) await page.keyboard.press('Tab')
            assert.equal(await page.evaluate(() => document.activeElement.textContent), name, `Tab reaches ${name}`)
            assert.ok(await page.evaluate(() => document.activeElement.matches(':focus-visible') && parseFloat(getComputedStyle(document.activeElement).outlineWidth) >= 2), 'visible keyboard focus')
            await capture(page, `keyboard-${name === 'Overview' ? 'overview' : 'on-screen'}-sidebar-focus`)
            const headingId = name === 'Overview' ? 'about-profile-heading' : 'on-screen-heading'
            await page.evaluate(({ name, headingId }) => {
                const pane = document.querySelector('.about-reading-pane')
                const heading = document.getElementById(headingId)
                const desired = name === 'Overview' ? 0 : heading.getBoundingClientRect().top - pane.getBoundingClientRect().top + pane.scrollTop - 24
                const expected = Math.max(0, Math.min(desired, pane.scrollHeight - pane.clientHeight))
                window.__aboutNavigation = { name, headingId, expected, before: pane.scrollTop, samples: [] }
                document.activeElement.addEventListener('click', () => {
                    function sample() {
                        window.__aboutNavigation.samples.push({ top: pane.scrollTop, focus: document.activeElement.id, offset: heading.getBoundingClientRect().top - pane.getBoundingClientRect().top })
                        if (window.__aboutNavigation.samples.length < 5) requestAnimationFrame(sample)
                    }
                    requestAnimationFrame(sample)
                }, { capture: true, once: true })
            }, { name, headingId })
            await page.keyboard.press('Enter')
            await page.waitForFunction(() => window.__aboutNavigation.samples.length === 5)
            const navigation = await page.evaluate(() => window.__aboutNavigation)
            assert.ok(Math.abs(navigation.before - navigation.expected) > 100, `${name} starts in opposite section`)
            for (const [frame, sample] of navigation.samples.entries()) {
                assert.ok(Math.abs(sample.top - navigation.expected) <= 1, `${name} reaches destination by frame ${frame + 1}: ${JSON.stringify(navigation)}`)
                assert.equal(sample.focus, headingId, `${name} destination focused by first frame`)
                assert.ok(sample.offset >= 0 && sample.offset <= 40, `${name} heading at pane top`)
            }
            results.push({ reducedMotionNavigation: navigation })
            await active(page, name)
            assert.ok(await page.locator(`#${headingId}`).evaluate(el => el.matches(':focus-visible') && parseFloat(getComputedStyle(el).outlineWidth) >= 2), 'heading focus stays visible after Enter')
            await capture(page, `keyboard-${name === 'Overview' ? 'overview' : 'on-screen'}-heading-focus`)
        }
        await page.locator('.about-poster-frame').first().hover()
        assert.equal(await page.locator('.about-overview-app').evaluate(el => el.getAnimations({ subtree: true }).filter(a => a.playState === 'running').length), 0, 'no About hover/scroll animations under reduced motion')
        assert.deepEqual(await navOf(page).boundingBox(), sidebarBefore, 'sidebar remains stationary')
        await pane.evaluate(el => el.scrollTo({ top: 0 }))
        await active(page, 'Overview')
        await pane.evaluate(el => { const target = el.querySelector('#on-screen-heading'); el.scrollTop += target.getBoundingClientRect().top - el.getBoundingClientRect().top - 48 })
        await active(page, 'On Screen')
        await pane.evaluate(el => el.scrollTo({ top: el.scrollHeight }))
        await active(page, 'On Screen')
        await page.setViewportSize({ width: 1440, height: 650 })
        await geometry(page)
        await active(page, 'On Screen')
        await capture(page, 'resize-scrolled-650')
        await page.setViewportSize({ width: 1440, height: 1000 })
        await geometry(page)
        await active(page, 'On Screen')
        await pane.evaluate(el => el.scrollTo({ top: 0 }))
        await active(page, 'Overview')
        await page.getByRole('button', { name: 'Close About Yusuf', exact: true }).click()
        await page.waitForURL(new URL('/', url).href)
        // History can update before React commits the destination route DOM.
        await pane.waitFor({ state: 'detached' })
        assert.equal(await page.getByRole('region', { name: 'About Yusuf content' }).count(), 0)
        results.push('Keyboard Tab/Enter/focus, stationary sidebar, reduced motion, manual scroll/top/bottom, resize while scrolled, close route')
        await context.close()
    }
    for (const [hash, name] of [['#on-screen-heading', 'On Screen'], ['#about-profile-heading', 'Overview']]) {
        const { page, context } = await open({}, hash)
        await active(page, name)
        const scrollTop = await paneOf(page).evaluate(el => el.scrollTop)
        assert.ok(name === 'Overview' ? scrollTop === 0 : scrollTop > 0, `initial ${hash} scroll`)
        const target = await page.locator(hash).boundingBox()
        const pane = await paneOf(page).boundingBox()
        assert.ok(target.y >= pane.y && target.y < pane.y + 100, 'initial anchor lands near pane top')
        await capture(page, `anchor-${name === 'Overview' ? 'overview' : 'on-screen'}`)
        await context.close()
    }
    results.push('Both initial heading anchors')
    {
        const { page, context } = await open()
        const source = await page.getByRole('img', { name: 'Poster for The Martian', exact: true }).getAttribute('src')
        const goodFrame = await page.locator('.about-poster-frame').first().boundingBox()
        await context.close()
        const brokenContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' })
        await brokenContext.route(new URL(source, url).href, route => route.abort())
        const broken = await brokenContext.newPage()
        broken.on('pageerror', error => errors.push(error.message))
        await broken.goto(url)
        await broken.getByText('Poster unavailable', { exact: true }).waitFor()
        await section(broken, 'On Screen')
        const frame = await broken.locator('.about-poster-frame').first().boundingBox()
        assert.ok(Math.abs(frame.width - goodFrame.width) <= 1 && Math.abs(frame.height - goodFrame.height) <= 1, 'failed poster keeps frame')
        const article = broken.locator('.about-media-item').first()
        assert.equal(await article.getByRole('heading', { name: 'The Martian' }).count(), 1)
        assert.equal(await article.getByText('2015', { exact: true }).count(), 1)
        assert.equal(await article.locator('img').count(), 0, 'no broken-image glyph')
        await capture(broken, 'broken-poster')
        await brokenContext.close()
        results.push('Fresh-context blocked poster retains reserved frame and title/year')
    }
    for (const width of [540, 340]) {
        const { page, context } = await open()
        // Isolate available component width without changing the app/mobile breakpoint.
        await page.locator('.about-overview-app').evaluate((el, width) => { el.style.width = `${width + 168}px` }, width)
        await page.waitForFunction(width => document.querySelector('.about-reading-pane').clientWidth === width, width)
        await geometry(page)
        const learning = await page.locator('.about-learning-columns section').evaluateAll(nodes => nodes.map(el => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y } }))
        assert.ok(Math.abs(learning[0].x - learning[1].x) <= 1 && learning[1].y > learning[0].y, 'narrow learning stacks')
        const columns = await page.locator('.about-poster-grid').first().evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length)
        assert.equal(columns, width === 540 ? 2 : 1, 'narrow poster columns wrap')
        await capture(page, `isolated-${width}-profile`)
        await section(page, 'On Screen')
        await capture(page, `isolated-${width}-films`)
        await context.close()
        results.push(`Isolated ${width}px pane: stacked learning, ${columns} poster columns, no horizontal overflow`)
    }
    for (const viewport of [{ width: 390, height: 844 }, { width: 720, height: 450 }]) {
        const context = await browser.newContext({ viewport, deviceScaleFactor: viewport.width === 720 ? 2 : 1 })
        const page = await context.newPage()
        page.on('pageerror', error => errors.push(error.message))
        await page.goto(url)
        await page.getByTestId('mobile-portfolio').waitFor()
        await page.evaluate(() => document.fonts.ready)
        // Wait for the existing mobile heading reveal before capturing it.
        await page.waitForFunction(() => {
            const about = document.querySelector('#about')
            return [...about.querySelectorAll('h3, h3 span')].every(el => {
                    const style = getComputedStyle(el)
                    return Number(style.opacity) === 1 && ['none', 'blur(0px)'].includes(style.filter)
                })
        })
        assert.equal(await page.locator('.about-overview-app').count(), 0)
        assert.ok(await page.locator('#about').isVisible(), 'existing mobile About renders')
        assert.equal(await page.evaluate(() => matchMedia('(min-width: 1024px)').matches), false)
        await capture(page, viewport.width === 390 ? 'mobile-390' : 'zoom-200-equivalent')
        await context.close()
    }
    // Browser page zoom's relevant layout state at 1440×900 / 200% is 720×450
    // CSS pixels and DPR 2. Pinch zoom (CDP setPageScaleFactor) does not test
    // media queries; explicitly emulate the layout state, and label it honestly.
    results.push('Existing mobile fallback: 390×844 and 200% page-zoom-equivalent 720×450 CSS viewport / DPR 2 (not browser UI zoom)')
    assert.deepEqual(errors, [], 'no uncaught browser errors')
    status = 'PASS'
    console.log(JSON.stringify(manifest(), null, 2))
} catch (error) {
    status = 'FAIL'
    errors.push(error.stack || error.message)
    throw error
} finally {
    run.finishedAt = new Date().toISOString()
    await writeFile(`${output}/results.json`, JSON.stringify(manifest(), null, 2))
    await browser?.close()
}
