import theMartianPoster from '../assets/images/media/about/the-martian-2015.jpg'
import leaveTheWorldBehindPoster from '../assets/images/media/leave-the-world-behind.jpg'
import carsPoster from '../assets/images/media/cars.jpg'
import reply1988Poster from '../assets/images/media/about/reply-1988-2015.jpg'
import fromPoster from '../assets/images/media/about/from-2022.jpg'
import theNightAgentPoster from '../assets/images/media/about/the-night-agent-2023.jpg'

export const aboutProfile = Object.freeze({
    name: 'Muh Yusuf',
    role: 'Informatics student',
    university: 'Halu Oleo University',
    major: 'Informatics Engineering',
    semester: '5th semester',
    interests: Object.freeze(['Computer Vision', 'Computation', 'Systems']),
    currentLearning: Object.freeze([
        'Data Science', 'Low-level programming', 'Machine Learning',
    ]),
})

export const onScreenItems = Object.freeze([
    Object.freeze({
        title: 'The Martian',
        genre: 'Sci-fi / Adventure',
        description: 'Survival, one problem at a time. Science and stubborn optimism turn an empty planet into a way home.',
        year: 2015,
        type: 'film',
        poster: theMartianPoster,
        alt: 'Poster for The Martian',
    }),
    Object.freeze({
        title: 'Leave the World Behind',
        genre: 'Thriller / Drama',
        description: 'An ordinary getaway unravels. The unsettling part is how little anyone knows—and who they choose to trust.',
        year: 2023,
        type: 'film',
        poster: leaveTheWorldBehindPoster,
        alt: 'Poster for Leave the World Behind',
    }),
    Object.freeze({
        title: 'Cars',
        genre: 'Animation / Adventure',
        description: 'A detour through Radiator Springs turns a race for first place into a story about friendship and slowing down.',
        year: 2006,
        type: 'film',
        poster: carsPoster,
        alt: 'Poster for Cars',
    }),
    Object.freeze({
        title: 'Reply 1988',
        genre: 'Comedy / Drama',
        description: 'Friendship, family, and growing up on one Seoul street. Small everyday moments give this neighborhood its heart.',
        year: 2015,
        type: 'series',
        poster: reply1988Poster,
        alt: 'Poster for Reply 1988',
    }),
    Object.freeze({
        title: 'FROM',
        genre: 'Mystery / Horror',
        description: 'A town with no way out, and nights nobody wants to face. Every answer seems to open another question.',
        year: 2022,
        type: 'series',
        poster: fromPoster,
        alt: 'Poster for FROM',
    }),
    Object.freeze({
        title: 'The Night Agent',
        genre: 'Action / Thriller',
        description: 'One late-night call pulls an FBI agent into a conspiracy. Shifting loyalties keep the next safe move uncertain.',
        year: 2023,
        type: 'series',
        poster: theNightAgentPoster,
        alt: 'Poster for The Night Agent',
    }),
])
