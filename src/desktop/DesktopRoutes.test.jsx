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
