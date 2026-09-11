import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'

const url = process.env.WALLPAPER_QA_URL || 'http://127.0.0.1:5174/'
const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.WALLPAPER_BROWSER_EXECUTABLE || '/usr/bin/google-chrome-stable',
})
try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' })
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(url)
    const video = page.locator('.desktop-wallpaper')
    await page.waitForFunction(() => {
        const node = document.querySelector('.desktop-wallpaper')
        return node && !node.paused && node.currentTime > 0.2
    })
    assert.ok(await video.evaluate(node => node.muted && node.loop && node.playsInline))
    assert.equal(await video.evaluate(node => getComputedStyle(node).pointerEvents), 'none')
    await page.screenshot({ path: '/tmp/archy-live-wallpaper.png' })

    await page.getByRole('button', { name: 'Open About Yusuf' }).click()
    await page.waitForURL(new URL('/about', url).href)
    await page.waitForFunction(() => document.querySelector('.desktop-wallpaper').paused)
    assert.ok(await video.evaluate(node => node.paused))
    const pausedAt = await video.evaluate(node => node.currentTime)
    await page.waitForTimeout(400)
    assert.equal(await video.evaluate(node => node.currentTime), pausedAt)
    await page.getByRole('button', { name: 'Close About Yusuf' }).click()
    await page.waitForFunction(time => {
        const node = document.querySelector('.desktop-wallpaper')
        return !node.paused && node.currentTime > time
    }, pausedAt)

    await page.getByRole('button', { name: 'Open Kitty' }).click()
    await page.waitForFunction(() => document.querySelector('.desktop-wallpaper').paused)
    assert.ok(await video.evaluate(node => node.paused))
    await page.keyboard.press('Escape')
    await page.waitForFunction(() => !document.querySelector('.desktop-wallpaper').paused)

    // Exercise the actual browser loop boundary, not just the loop attribute.
    await video.evaluate(node => { node.currentTime = node.duration - 0.3 })
    await page.waitForFunction(() => {
        const node = document.querySelector('.desktop-wallpaper')
        return !node.paused && node.currentTime > 0 && node.currentTime < 1
    })

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.waitForFunction(() => !document.querySelector('.desktop-wallpaper').hasAttribute('src'))
    assert.ok(await video.evaluate(node => node.paused))
    await page.goto(new URL('/about', url).href)
    assert.equal(await video.getAttribute('src'), null)
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.waitForFunction(() => document.querySelector('.desktop-wallpaper').hasAttribute('src'))
    assert.ok(await video.evaluate(node => node.paused))

    assert.deepEqual(errors, [])
    console.log('PASS: playback, About pause/resume, Kitty pause/resume, loop boundary, reduced motion, deep link; no browser errors.')
} finally {
    await browser.close()
}
