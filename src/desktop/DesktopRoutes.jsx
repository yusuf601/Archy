import { Route, Routes } from 'react-router-dom'
import AboutApp from './apps/AboutApp'
import FilesApp from './apps/FilesApp'
import MailApp from './apps/MailApp'
import NotesApp from './apps/NotesApp'
import DesktopNotFound from './DesktopNotFound'
import GitHubApp from './apps/GitHubApp'

export default function DesktopRoutes() {
    return (
        <Routes>
            <Route path="/" element={null} />
            <Route path="/projects" element={<FilesApp />} />
            <Route path="/projects/:projectId" element={<FilesApp />} />
            <Route path="/blog" element={<NotesApp />} />
            <Route path="/blog/:slug" element={<NotesApp />} />
            <Route path="/contact" element={<MailApp />} />
            <Route path="/about" element={<AboutApp />} />
            <Route path="/github" element={<GitHubApp />} />
            <Route path="*" element={<DesktopNotFound />} />
        </Routes>
    )
}
