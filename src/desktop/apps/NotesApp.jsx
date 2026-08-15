import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import DesktopAppFrame from '../DesktopAppFrame'
import { DESKTOP_APPS } from '../desktopApps'
import { getAllPosts } from '../../data/blogLoader'

export default function NotesApp() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const posts = getAllPosts()
    const activePost = posts.find(p => p.slug === slug)

    return (
        <DesktopAppFrame app={DESKTOP_APPS.notes} title={activePost ? activePost.title : 'All Notes'}>
            <div className="notes-app-shell">
                <aside className="notes-app-sidebar">
                    <p className="notes-app-sidebar-title">Articles</p>
                    <nav className="notes-app-sidebar-nav">
                        {posts.map(post => (
                            <button 
                                key={post.slug}
                                className="notes-app-sidebar-link"
                                data-active={slug === post.slug}
                                onClick={() => navigate(`/blog/${post.slug}`)}
                            >
                                <span className="notes-app-item-title">{post.title}</span>
                                <span className="notes-app-item-meta">
                                    <span>{post.date}</span>
                                    <span>·</span>
                                    <span style={{ textTransform: 'capitalize' }}>{post.category}</span>
                                </span>
                            </button>
                        ))}
                    </nav>
                </aside>

                <main className="notes-app-detail">
                    {slug && !activePost ? (
                        <div className="desktop-empty-state">
                            <p>Article not found</p>
                            <h2>The requested markdown file could not be loaded.</h2>
                            <button type="button" onClick={() => navigate('/blog')}>
                                Return to Articles
                            </button>
                        </div>
                    ) : activePost ? (
                        <article className="notes-article markdown-body">
                            <header className="notes-article-header">
                                <h1>{activePost.title}</h1>
                                <div className="notes-article-meta">
                                    <span>{activePost.date}</span>
                                    <span>·</span>
                                    <span>{activePost.readTime} read</span>
                                </div>
                            </header>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {activePost.content}
                            </ReactMarkdown>
                        </article>
                    ) : (
                        <div className="desktop-empty-state">
                            <p>Notes</p>
                            <h2>Select an article to read.</h2>
                        </div>
                    )}
                </main>
            </div>
        </DesktopAppFrame>
    )
}
