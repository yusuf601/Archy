import { useId, useState } from 'react'

const groups = [
    { type: 'film', title: 'Films', id: 'about-films', empty: 'No films listed.' },
    { type: 'series', title: 'Series', id: 'about-series', empty: 'No series listed.' },
]

function Poster({ item }) {
    const [failed, setFailed] = useState(false)
    const [reveal, setReveal] = useState('closed')
    const detailsId = useId()
    const open = reveal !== 'closed'

    return (
        <button type="button" className="about-poster-frame"
            aria-label={`About ${item.title}`} aria-expanded={open} aria-controls={detailsId}
            onPointerEnter={event => {
                if (event.pointerType === 'mouse') setReveal(value => value === 'closed' ? 'preview' : value)
            }}
            onPointerLeave={() => setReveal(value => value === 'preview' ? 'closed' : value)}
            onClick={() => setReveal(value => value === 'pinned' ? 'closed' : 'pinned')}
            onBlur={() => setReveal('closed')}
            onKeyDown={event => {
                if (event.key === 'Escape') { event.preventDefault(); setReveal('closed') }
            }}>
            {failed
                ? <span className="about-poster-fallback">Poster unavailable</span>
                : <img src={item.poster} alt={item.alt} width="600" height="900"
                    loading="eager" decoding="async" onError={() => setFailed(true)} />}
            <span id={detailsId} className="about-poster-overlay" aria-hidden={!open}>
                {open && <>
                <span className="about-poster-meta">
                    <span>{item.year}</span>
                    <span>{item.genre}</span>
                </span>
                <span className="about-poster-story">
                    <span className="about-poster-title">{item.title}</span>
                    <span className="about-poster-description">{item.description}</span>
                </span>
                </>}
            </span>
        </button>
    )
}

export default function OnScreenShelf({ items }) {
    return (
        <section className="on-screen-shelf" aria-label="Favorite films and series">
            <header className="on-screen-shelf-header">
                <p className="on-screen-shelf-caption">Away from the keyboard</p>
            </header>

            <div className="on-screen-shelf-items">
                {groups.map((group) => {
                    const entries = items.filter((item) => item.type === group.type)

                    return (
                        <section key={group.type} aria-labelledby={group.id} className="about-media-group">
                            <h3 id={group.id}>{group.title}</h3>
                            {entries.length === 0
                                ? <p>{group.empty}</p>
                                : <div className="about-poster-grid">
                                    {entries.map((item) => (
                                        <article key={item.title} className="about-media-item">
                                            <Poster key={item.poster} item={item} />
                                            <h4>{item.title}</h4>
                                            <p>{item.year}</p>
                                        </article>
                                    ))}
                                </div>}
                        </section>
                    )
                })}
            </div>
        </section>
    )
}
