import { useState } from 'react'

const groups = [
    { type: 'film', title: 'Films', id: 'about-films', empty: 'No films listed.' },
    { type: 'series', title: 'Series', id: 'about-series', empty: 'No series listed.' },
]

function Poster({ item }) {
    const [failed, setFailed] = useState(false)

    return (
        <div className="about-poster-frame">
            {failed
                ? <span className="about-poster-fallback">Poster unavailable</span>
                : <img src={item.poster} alt={item.alt} width="600" height="900"
                    loading="lazy" decoding="async" onError={() => setFailed(true)} />}
        </div>
    )
}

export default function OnScreenShelf({ items }) {
    return (
        <section className="on-screen-shelf" aria-labelledby="on-screen-heading">
            <header className="on-screen-shelf-header">
                <div>
                    <h2 id="on-screen-heading">On Screen</h2>
                    <p className="on-screen-shelf-caption">Favorite films &amp; series</p>
                </div>
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
