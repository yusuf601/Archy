import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({
    title,
    description,
    techStack = [],
    role,
    githubUrl,
    liveUrl
}) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="border border-everblush-green/30 rounded-lg bg-everblush-bg/50 backdrop-blur-sm overflow-hidden glow-on-hover"
        >
            {/* Window Header */}
            <div className="bg-everblush-green/10 border-b border-everblush-green/30 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-everblush-red text-xs">●</span>
                    <span className="text-everblush-blue text-xs">●</span>
                    <span className="text-everblush-green text-xs">●</span>
                    <span className="font-mono text-sm text-everblush-green ml-2">{title}</span>
                </div>
                <div className="flex gap-3">
                    {githubUrl && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-everblush-fg/70 hover:text-everblush-green transition-colors"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    )}
                    {liveUrl && (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-everblush-fg/70 hover:text-everblush-blue transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Role */}
                {role && (
                    <div className="mb-3">
                        <span className="text-everblush-blue text-sm font-mono">{role}</span>
                    </div>
                )}

                {/* Description */}
                <p className="font-mono text-sm text-everblush-fg/80 mb-4 leading-relaxed">
                    {description}
                </p>

                {/* Tech Stack */}
                {techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 text-xs font-mono bg-everblush-green/10 text-everblush-green border border-everblush-green/30 rounded"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectCard;
