import { fireEvent, render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import OnScreenShelf from './OnScreenShelf'

const items = [
    { title: 'The Martian', year: 2015, type: 'film', poster: '/martian.jpg', alt: 'Poster for The Martian' },
    { title: 'Cars', year: 2006, type: 'film', poster: '/cars.jpg', alt: 'Poster for Cars' },
    { title: 'Reply 1988', year: 2015, type: 'series', poster: '/reply-1988.jpg', alt: 'Poster for Reply 1988' },
]

it('shows films and series together in reading order', () => {
    render(<OnScreenShelf items={items} />)
    const films = screen.getByRole('region', { name: 'Films', exact: true })
    const series = screen.getByRole('region', { name: 'Series', exact: true })
    expect(within(films).getByRole('img', {
        name: 'Poster for The Martian',
    })).toBeInTheDocument()
    expect(within(series).getByRole('img', {
        name: 'Poster for Reply 1988',
    })).toBeInTheDocument()
    expect(films.compareDocumentPosition(series) &
        Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Films' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Series' })).not.toBeInTheDocument()
    expect(screen.getByText('Favorite films & series')).toBeInTheDocument()
})

it('keeps a title and year readable if a poster fails', () => {
    render(<OnScreenShelf items={[items[0]]} />)
    fireEvent.error(screen.getByRole('img', { name: 'Poster for The Martian' }))
    expect(screen.getByText('Poster unavailable')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'The Martian' })).toBeInTheDocument()
    expect(screen.getByText('2015')).toBeInTheDocument()
})

it('labels both empty groups', () => {
    render(<OnScreenShelf items={[]} />)
    expect(screen.getByText('No films listed.')).toBeInTheDocument()
    expect(screen.getByText('No series listed.')).toBeInTheDocument()
})
