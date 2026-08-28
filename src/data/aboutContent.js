const localMediaPoster = (filename) => `/src/assets/images/media/${filename}`

export const aboutProfile = Object.freeze({
    name: 'Muh Yusuf',
    university: 'Halu Oleo University',
    major: 'Informatics Engineering',
    semester: '5th semester',
    specialization: 'Computer Vision & Computation',
    currentLearning: Object.freeze([
        'Data science',
        'Low-level programming',
        'Machine learning',
    ]),
    operatingSystem: 'Arch Linux',
})

// No optional personal copy has been confirmed for display yet.
export const aboutSections = Object.freeze([])

export const onScreenItems = Object.freeze([
    Object.freeze({
        title: 'The Martian',
        year: 2015,
        type: 'film',
        poster: localMediaPoster('the-martian.jpg'),
        alt: 'Poster for The Martian',
    }),
    Object.freeze({
        title: 'Leave the World Behind',
        year: 2023,
        type: 'film',
        poster: localMediaPoster('leave-the-world-behind.jpg'),
        alt: 'Poster for Leave the World Behind',
    }),
    Object.freeze({
        title: 'Cars',
        year: 2006,
        type: 'film',
        poster: localMediaPoster('cars.jpg'),
        alt: 'Poster for Cars',
    }),
    Object.freeze({
        title: 'Reply 1988',
        year: 2015,
        type: 'series',
        poster: localMediaPoster('reply-1988.jpg'),
        alt: 'Poster for Reply 1988',
    }),
    Object.freeze({
        title: 'FROM',
        year: 2022,
        type: 'series',
        poster: localMediaPoster('from.jpg'),
        alt: 'Poster for FROM',
    }),
    Object.freeze({
        title: 'The Night Agent',
        year: 2023,
        type: 'series',
        poster: localMediaPoster('the-night-agent.jpg'),
        alt: 'Poster for The Night Agent',
    }),
])
