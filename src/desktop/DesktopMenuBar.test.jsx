import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import DesktopShell from './DesktopShell'

it('shows simulated workstation widgets and working menu actions', async () => {
    const user = userEvent.setup()

    render(<MemoryRouter initialEntries={['/projects']}><DesktopShell /></MemoryRouter>)

    expect(screen.getAllByTitle('simulated workstation telemetry')[0]).toHaveTextContent('CPU 17%')
    expect(screen.getByText(/RAM 4.89 GiB/)).toBeInTheDocument()
    expect(screen.getByText(/Storage 318.67 GB/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Yusuf menu' }))
    expect(screen.getByRole('menuitem', { name: 'Resume' })).toHaveAttribute('href', '/MuhYusuf_Resume.pdf')
    expect(screen.getByRole('menuitem', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/yusuf601')

    await user.click(screen.getByRole('button', { name: 'Power menu' }))
    await user.click(screen.getByRole('menuitem', { name: 'Close all app surfaces' }))
    expect(screen.queryByRole('heading', { name: 'Projects' })).not.toBeInTheDocument()
})
