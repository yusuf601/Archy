import { expect, it } from 'vitest'
import { aboutVisualAssets, onScreenItems } from './aboutContent'

it('exports local portrait and university logo assets', () => {
    expect(aboutVisualAssets).toEqual({
        portrait: expect.stringMatching(/about-anime\.png$/),
        universityLogo: expect.stringMatching(/halu-oleo-logo\.png$/),
    })

    expect(aboutVisualAssets.portrait).not.toMatch(/^https?:\/\//)
    expect(aboutVisualAssets.universityLogo).not.toMatch(/^https?:\/\//)
})

it('exports the exact production On Screen catalog with local posters', () => {
    expect(onScreenItems).toEqual([
        {
            title: 'The Martian',
            year: 2015,
            type: 'film',
            poster: '/src/assets/images/media/the-martian.jpg',
            alt: 'Poster for The Martian',
        },
        {
            title: 'Leave the World Behind',
            year: 2023,
            type: 'film',
            poster: '/src/assets/images/media/leave-the-world-behind.jpg',
            alt: 'Poster for Leave the World Behind',
        },
        {
            title: 'Cars',
            year: 2006,
            type: 'film',
            poster: '/src/assets/images/media/cars.jpg',
            alt: 'Poster for Cars',
        },
        {
            title: 'Reply 1988',
            year: 2015,
            type: 'series',
            poster: '/src/assets/images/media/reply-1988.jpg',
            alt: 'Poster for Reply 1988',
        },
        {
            title: 'FROM',
            year: 2022,
            type: 'series',
            poster: '/src/assets/images/media/from.jpg',
            alt: 'Poster for FROM',
        },
        {
            title: 'The Night Agent',
            year: 2023,
            type: 'series',
            poster: '/src/assets/images/media/the-night-agent.jpg',
            alt: 'Poster for The Night Agent',
        },
    ])
})
