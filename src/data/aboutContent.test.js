import { expect, it } from 'vitest'
import { aboutProfile, aboutVisualAssets, onScreenItems } from './aboutContent'

it('provides the approved identity, interests and learning topics', () => {
    expect(aboutProfile.role).toBe('Informatics student')
    expect(aboutProfile.interests).toEqual([
        'Computer Vision', 'Computation', 'Systems',
    ])
    expect(aboutProfile.currentLearning).toEqual([
        'Data Science', 'Low-level programming', 'Machine Learning',
    ])
})

it('exports local portrait and university logo assets', () => {
    expect(aboutVisualAssets).toEqual({
        portrait: '/avatar.png',
        universityLogo: expect.stringMatching(/halu-oleo-logo\.png$/),
    })

    expect(aboutVisualAssets.portrait).not.toMatch(/^https?:\/\//)
    expect(aboutVisualAssets.universityLogo).not.toMatch(/^https?:\/\//)
})

it('exports the exact production On Screen catalog with local posters', () => {
    expect(onScreenItems.map(({ title, year, type }) => ({ title, year, type }))).toEqual([
        {
            title: 'The Martian',
            year: 2015,
            type: 'film',
        },
        {
            title: 'Leave the World Behind',
            year: 2023,
            type: 'film',
        },
        {
            title: 'Cars',
            year: 2006,
            type: 'film',
        },
        {
            title: 'Reply 1988',
            year: 2015,
            type: 'series',
        },
        {
            title: 'FROM',
            year: 2022,
            type: 'series',
        },
        {
            title: 'The Night Agent',
            year: 2023,
            type: 'series',
        },
    ])

    expect(onScreenItems.every(({ poster }) => poster && !/^https?:\/\//.test(poster))).toBe(true)
})
