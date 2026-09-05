import { describe, expect, it } from 'vitest'
import { DESKTOP_APPS, resolveDesktopApp } from './desktopApps'

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

    it('keeps the About document fullscreen without changing other app modes', () => {
        expect(Object.fromEntries(
            Object.entries(DESKTOP_APPS).map(([id, app]) => [id, app.mode]),
        )).toEqual({
            files: 'near-max',
            notes: 'fullscreen',
            mail: 'medium',
            about: 'fullscreen',
        })
    })
})
