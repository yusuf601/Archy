import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { expect, it } from 'vitest'
import OnScreenShelf from './OnScreenShelf'

const items = [
    { title: 'The Martian', year: 2015, type: 'film', poster: '/martian.jpg', alt: 'Poster for The Martian' },
    { title: 'Cars', year: 2006, type: 'film', poster: '/cars.jpg', alt: 'Poster for Cars' },
    { title: 'Reply 1988', year: 2015, type: 'series', poster: '/reply-1988.jpg', alt: 'Poster for Reply 1988' },
]

function CurrentPath() {
    const { pathname } = useLocation()
    return <output aria-label="Current path">{pathname}</output>
}

function renderShelf() {
    return render(
        <MemoryRouter initialEntries={['/about']}>
            <OnScreenShelf items={items} />
            <CurrentPath />
        </MemoryRouter>,
    )
}

it('shows film posters by default with accessible type controls', () => {
    renderShelf()

    expect(screen.getByRole('heading', { name: 'On Screen' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Films' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Series' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('img', { name: 'Poster for The Martian' })).toBeInTheDocument()
    expect(screen.getByText('2015')).toBeInTheDocument()
    expect(screen.queryByText('Reply 1988')).not.toBeInTheDocument()
})

it('shows series without changing the About route when selected', async () => {
    const user = userEvent.setup()
    renderShelf()

    await user.click(screen.getByRole('button', { name: 'Series' }))

    expect(screen.getByRole('button', { name: 'Films' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Series' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('img', { name: 'Poster for Reply 1988' })).toBeInTheDocument()
    expect(screen.queryByText('The Martian')).not.toBeInTheDocument()
    expect(screen.getByRole('status', { name: 'Current path' })).toHaveTextContent('/about')
})
