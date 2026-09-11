import { FiArrowRight, FiGithub } from 'react-icons/fi'
import { Link, Navigate, useParams } from 'react-router-dom'
import { defaultProjectId, findProject, projectArtifacts } from '../../data/projectArtifacts'
import DesktopAppFrame from '../DesktopAppFrame'
import { DESKTOP_APPS } from '../desktopApps'

export default function FilesApp() {
    const { projectId } = useParams()

    if (!projectId) {
        return <Navigate to={`/projects/${defaultProjectId}`} replace />
    }

    const project = findProject(projectId)

    return (
        <DesktopAppFrame app={DESKTOP_APPS.files} title={project?.name ?? 'Project Not Found'}>
            <div className="files-app-shell">
                <aside className="files-app-sidebar" aria-label="Projects">
                    <p className="files-app-sidebar-title">Projects</p>
                    <nav className="files-app-sidebar-nav">
                        {projectArtifacts.map((artifact) => {
                            const active = artifact.id === projectId

                            return (
                                <Link
                                    key={artifact.id}
                                    to={`/projects/${artifact.id}`}
                                    aria-current={active ? 'page' : undefined}
                                    className="files-app-sidebar-link"
                                    data-active={active ? 'true' : 'false'}
                                >
                                    <span>{artifact.name}</span>
                                    <span>{artifact.visibility}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </aside>

                <section className="files-app-detail">
                    {project ? (
                        <>
                            <div className="files-app-breadcrumb">Yusuf / Projects / {project.name}</div>
                            <div className="files-app-detail-body">
                                <p className="files-app-kind">{project.kind}</p>
                                <h2>{project.name}</h2>
                                <p className="files-app-statement">{project.statement}</p>

                                <dl className="files-app-metadata">
                                    <div>
                                        <dt>Language</dt>
                                        <dd>{project.language ?? 'Mixed'}</dd>
                                    </div>
                                    <div>
                                        <dt>Focus</dt>
                                        <dd>{project.focus}</dd>
                                    </div>
                                    <div>
                                        <dt>Visibility</dt>
                                        <dd>{project.visibility}</dd>
                                    </div>
                                </dl>

                                <div className="files-app-tech-row">
                                    {project.tech.map((item) => (
                                        <span key={item}>{item}</span>
                                    ))}
                                </div>

                                {project.visibility === 'public' && project.github ? (
                                    <a
                                        className="files-app-action"
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FiGithub aria-hidden="true" />
                                        <span>Open GitHub</span>
                                    </a>
                                ) : null}
                            </div>
                        </>
                    ) : (
                        <div className="files-app-detail-body">
                            <div className="files-app-breadcrumb">Yusuf / Projects / Missing</div>
                            <p className="files-app-kind">not found</p>
                            <h2>Project Not Found</h2>
                            <p className="files-app-statement">This route does not match one of the current project artifacts.</p>
                            <Link className="files-app-action" to={`/projects/${defaultProjectId}`}>
                                <FiArrowRight aria-hidden="true" />
                                <span>Open SVector</span>
                            </Link>
                        </div>
                    )}
                </section>
            </div>
        </DesktopAppFrame>
    )
}
