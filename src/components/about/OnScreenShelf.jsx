import { useState } from 'react'

export default function OnScreenShelf({ items }) {
    const [selectedType, setSelectedType] = useState('film')
    const visibleItems = items.filter((item) => item.type === selectedType)

    return (
        <section className="on-screen-shelf" aria-labelledby="on-screen-heading">
            <header className="on-screen-shelf-header">
                <h2 id="on-screen-heading">On Screen</h2>
                <div className="on-screen-shelf-toggle" aria-label="On Screen type">
                    <button
                        type="button"
                        aria-pressed={selectedType === 'film'}
                        onClick={() => setSelectedType('film')}
                    >
                        Films
                    </button>
                    <button
                        type="button"
                        aria-pressed={selectedType === 'series'}
                        onClick={() => setSelectedType('series')}
                    >
                        Series
                    </button>
                </div>
            </header>

            <div className="on-screen-shelf-items">
                {visibleItems.map((item) => (
                    <article key={item.title} className="on-screen-shelf-item">
                        <img src={item.poster} alt={item.alt} />
                        <h3>{item.title}</h3>
                        <p>{item.year}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}
