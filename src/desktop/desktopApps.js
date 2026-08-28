import { matchPath } from 'react-router-dom'

export const DESKTOP_APPS = Object.freeze({
    files: { id: 'files', label: 'Files', route: '/projects', mode: 'near-max' },
    notes: { id: 'notes', label: 'Notes', route: '/blog', mode: 'fullscreen' },
    mail: { id: 'mail', label: 'Mail', route: '/contact', mode: 'medium' },
    about: { id: 'about', label: 'About Yusuf', route: '/about', mode: 'fullscreen' },
})

export function resolveDesktopApp(pathname) {
    if (pathname === '/') return null
    if (pathname === '/projects' || matchPath('/projects/:projectId', pathname)) return DESKTOP_APPS.files
    if (pathname === '/blog' || matchPath('/blog/:slug', pathname)) return DESKTOP_APPS.notes
    if (pathname === '/contact') return DESKTOP_APPS.mail
    if (pathname === '/about') return DESKTOP_APPS.about
    return { id: 'not-found', label: 'Not Found', mode: 'medium' }
}
