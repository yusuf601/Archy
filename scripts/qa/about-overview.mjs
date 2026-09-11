import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'

const url = process.env.ABOUT_QA_URL || 'http://127.0.0.1:5173/about'
const output = '/tmp/archy-about-dossier-qa'
const results = { startedAt: new Date().toISOString(), url, status: 'RUNNING', errors: [], screenshots: [] }
await mkdir(output, { recursive: true })
await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2))
let browser
try {
    browser = await chromium.launch({ headless: true, executablePath: process.env.ABOUT_BROWSER_EXECUTABLE || undefined })
    for (const colorScheme of ['light', 'dark']) {
        for (const viewport of [{ width: 1440, height: 900 }, { width: 1024, height: 768 }]) {
            const context = await browser.newContext({ viewport, colorScheme, reducedMotion: 'reduce' })
            const page = await context.newPage()
            page.on('pageerror', error => results.errors.push(error.message))
            await page.goto(url)
            await page.getByRole('heading', { name: 'Hi, I’m Yusuf.', exact: true }).waitFor()
            await page.evaluate(() => document.fonts.ready)
            const app = page.locator('.about-overview-app')
            assert.equal(await app.evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(255, 255, 255)')
            assert.equal(await app.locator('nav').count(), 0)
            assert.equal(await app.getByRole('img', { name: /^Poster for / }).count(), 6)
            assert.equal(await app.getByText('On Screen', { exact: true }).count(), 0)
            assert.equal(await app.getByRole('img', { name: 'Halu Oleo University logo' }).count(), 0)
            for (const topic of ['Computer Vision', 'Computation', 'Systems', 'Data Science', 'Low-level programming', 'Machine Learning']) {
                assert.ok(await app.getByText(topic, { exact: true }).isVisible())
            }
            const frame = await page.locator('.desktop-app-frame').boundingBox()
            assert.ok(frame.width <= 840 && frame.x > 0, 'About is a medium window')
            assert.ok(frame.y >= 30 && frame.y + frame.height < viewport.height - 80, 'window clears desktop chrome')
            assert.equal(await page.locator('.desktop-app-frame').evaluate(el => getComputedStyle(el).opacity), '1')
            assert.ok(await app.getByText('Away from the keyboard', { exact: true }).isVisible())
            assert.equal(await app.getByRole('heading', { name: 'Films' }).count(), 1)
            assert.equal(await app.getByRole('heading', { name: 'Series' }).count(), 1)
            for (const image of await app.getByRole('img', { name: /^Poster for / }).all()) {
                await image.evaluate(node => node.decode())
            }
            const pane = page.getByRole('region', { name: 'About Yusuf content' })
            assert.ok(await pane.evaluate(el => el.scrollWidth <= el.clientWidth))
            await page.waitForTimeout(400)
            const screenshot = `${output}/${viewport.width}-${colorScheme}.png`
            await page.screenshot({ path: screenshot })
            results.screenshots.push(screenshot)
            await pane.evaluate(el => { el.scrollTop = el.scrollHeight })
            const seriesScreenshot = `${output}/${viewport.width}-${colorScheme}-series.png`
            await page.screenshot({ path: seriesScreenshot })
            results.screenshots.push(seriesScreenshot)
            const poster = app.getByRole('button', { name: 'About The Martian', exact: true })
            await poster.hover()
            assert.equal(await poster.getAttribute('aria-expanded'), 'true')
            const overlay = poster.locator('.about-poster-overlay')
            assert.ok(await overlay.isVisible())
            assert.equal(await overlay.locator('.about-poster-meta').innerText(), '2015\nSci-fi / Adventure')
            const hoverScreenshot = `${output}/${viewport.width}-${colorScheme}-poster-hover.png`
            await poster.screenshot({ path: hoverScreenshot })
            results.screenshots.push(hoverScreenshot)
            await page.mouse.move(0, 0)
            assert.equal(await poster.getAttribute('aria-expanded'), 'false')
            await poster.click()
            await page.mouse.move(0, 0)
            assert.equal(await poster.getAttribute('aria-expanded'), 'true')
            await page.keyboard.press('Escape')
            assert.equal(await poster.getAttribute('aria-expanded'), 'false')
            await page.keyboard.press('Enter')
            assert.equal(await poster.getAttribute('aria-expanded'), 'true')
            await page.keyboard.press('Enter')
            assert.equal(await poster.getAttribute('aria-expanded'), 'false')
            await app.evaluate(el => { el.style.width = '380px' })
            assert.ok(await pane.evaluate(el => el.scrollWidth <= el.clientWidth))
            assert.equal(await page.locator('.about-introduction').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length), 1)
            await page.getByRole('button', { name: 'Close About Yusuf' }).click()
            await page.waitForURL(new URL('/', url).href)
            await app.waitFor({ state: 'detached' })
            await context.close()
        }
    }
    assert.deepEqual(results.errors, [])
    results.status = 'PASS'
    console.log(JSON.stringify(results, null, 2))
} catch (error) {
    results.status = 'FAIL'
    results.failure = error.stack
    throw error
} finally {
    await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2))
    await browser?.close()
}
