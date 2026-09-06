import haluOleoLogo from '../assets/images/halu-oleo-logo.png'
import theMartianPoster from '../assets/images/media/about/the-martian-2015.jpg'
import leaveTheWorldBehindPoster from '../assets/images/media/leave-the-world-behind.jpg'
import carsPoster from '../assets/images/media/cars.jpg'
import reply1988Poster from '../assets/images/media/about/reply-1988-2015.jpg'
import fromPoster from '../assets/images/media/about/from-2022.jpg'
import theNightAgentPoster from '../assets/images/media/about/the-night-agent-2023.jpg'

export const aboutVisualAssets = Object.freeze({
    portrait: '/avatar.png',
    universityLogo: haluOleoLogo,
})

export const aboutProfile = Object.freeze({
    name: 'Muh Yusuf',
    role: 'Informatics student',
    university: 'Halu Oleo University',
    major: 'Informatics Engineering',
    semester: '5th semester',
    specialization: 'Computer Vision & Computation',
    interests: Object.freeze(['Computer Vision', 'Computation', 'Systems']),
    currentLearning: Object.freeze([
        'Data Science', 'Low-level programming', 'Machine Learning',
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
