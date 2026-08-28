import { expect, it } from 'vitest'
import { aboutVisualAssets } from './aboutContent'

it('exports local portrait and university logo assets', () => {
    expect(aboutVisualAssets).toEqual({
        portrait: expect.stringMatching(/about-anime\.png$/),
        universityLogo: expect.stringMatching(/halu-oleo-logo\.png$/),
    })

    expect(aboutVisualAssets.portrait).not.toMatch(/^https?:\/\//)
    expect(aboutVisualAssets.universityLogo).not.toMatch(/^https?:\/\//)
})
