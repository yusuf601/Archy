import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, expect, it, vi } from 'vitest'
import DesktopShell from '../DesktopShell'

afterEach(() => vi.unstubAllGlobals())

it('opens from the dock, retries a failed request, and renders real response values', async () => {
    const fetchMock = vi.fn()
        .mockResolvedValueOnce({ ok: false, status: 503 })
        .mockResolvedValueOnce({ ok: true, json: async () => ({
            totalContributions: 1234, streak: 7, totalRepos: 12, totalStars: 42, followers: 18,
            contributionWeeks: [{ days: [{ weekday: 0, date: '2026-09-06', count: 4 }] }],
        }) })
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    render(<MemoryRouter><DesktopShell /></MemoryRouter>)
    const dock = screen.getByRole('button', { name: 'Open GitHub' })
    expect(dock.querySelector('img')).toHaveAttribute('src', expect.stringContaining('Github__Dark__Golden_Gate'))
    await user.click(dock)
    expect(await screen.findByText('Activity is unavailable right now.')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Try again' }))
    expect(await screen.findByText('1,234')).toBeInTheDocument()
    expect(screen.getByText('2026-09-06: 4 contributions')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View profile' })).toHaveAttribute('href', 'https://github.com/yusuf601')
    expect(dock).toHaveAttribute('aria-current', 'page')
    await user.click(dock)
    expect(screen.getByRole('region', { name: 'GitHub' })).toHaveFocus()
    await user.click(screen.getByRole('button', { name: 'Close GitHub' }))
    expect(screen.queryByRole('region', { name: 'GitHub' })).not.toBeInTheDocument()
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2))
})
