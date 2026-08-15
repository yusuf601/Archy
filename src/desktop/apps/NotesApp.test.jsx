import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NotesApp from './NotesApp';

vi.mock('../../data/blogLoader', () => ({
    getAllPosts: () => [
        {
            slug: 'test-post-1',
            title: 'Test Post 1',
            date: '2024-01-01',
            category: 'research',
            readTime: '5 min',
            content: 'Test content 1'
        },
        {
            slug: 'test-post-2',
            title: 'Test Post 2',
            date: '2023-12-01',
            category: 'deep-dive',
            readTime: '3 min',
            content: 'Test content 2'
        }
    ]
}));

vi.mock('../../desktop/DesktopShellContext', () => ({
    useDesktopShell: () => ({
        focusApp: vi.fn(),
        closeApp: vi.fn(),
        isAppFocused: () => true,
        registerActiveApp: vi.fn()
    })
}));

describe('NotesApp', () => {
    it('renders a list of articles', () => {
        render(
            <MemoryRouter initialEntries={['/blog']}>
                <Routes>
                    <Route path="/blog" element={<NotesApp />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Test Post 1')).toBeInTheDocument();
        expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    });

    it('renders article content when slug is provided', () => {
        render(
            <MemoryRouter initialEntries={['/blog/test-post-1']}>
                <Routes>
                    <Route path="/blog/:slug" element={<NotesApp />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Test content 1')).toBeInTheDocument();
    });
});
