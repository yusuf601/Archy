import theMartianPoster from '../assets/images/media/the-martian.jpg'
import leaveTheWorldBehindPoster from '../assets/images/media/leave-the-world-behind.jpg'
import carsPoster from '../assets/images/media/cars.jpg'
import reply1988Poster from '../assets/images/media/reply-1988.jpg'
import fromPoster from '../assets/images/media/from.jpg'
import theNightAgentPoster from '../assets/images/media/the-night-agent.jpg'

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
        poster: theMartianPoster,
        alt: 'Poster for The Martian',
    }),
    Object.freeze({
        title: 'Leave the World Behind',
        year: 2023,
        type: 'film',
        poster: leaveTheWorldBehindPoster,
        alt: 'Poster for Leave the World Behind',
    }),
    Object.freeze({
        title: 'Cars',
        year: 2006,
        type: 'film',
        poster: carsPoster,
        alt: 'Poster for Cars',
    }),
    Object.freeze({
        title: 'Reply 1988',
        year: 2015,
        type: 'series',
        poster: reply1988Poster,
        alt: 'Poster for Reply 1988',
    }),
    Object.freeze({
        title: 'FROM',
        year: 2022,
        type: 'series',
        poster: fromPoster,
        alt: 'Poster for FROM',
    }),
    Object.freeze({
        title: 'The Night Agent',
        year: 2023,
        type: 'series',
        poster: theNightAgentPoster,
        alt: 'Poster for The Night Agent',
    }),
])
