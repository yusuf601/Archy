import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    FaChevronRight,
    FaChevronDown,
    FaFolder,
    FaFolderOpen,
    FaCode,
    FaTerminal,
    FaDownload,
    FaEnvelope,
    FaGithub,
    FaUser,
    FaBriefcase,
    FaGraduationCap,
    FaCube
} from 'react-icons/fa';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Section collapse states
    const [openSections, setOpenSections] = useState({
        explorer: true,
        portfolio: true,
        blog: false,
        outline: false,
        modules: false,
        languages: false,
        systems: false,
        research: false,
        actions: true
    });

    // Toggle section
    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Check if path is active
    const isActive = (path) => location.pathname === path;

    // Navigation data
    const portfolioFiles = [
        { name: 'main.cpp', icon: FaCode, path: '/' },
        { name: 'profile.h', icon: FaUser, path: '/#about' },
        { name: 'projects.cpp', icon: FaCode, path: '/projects' }
    ];

    const blogFiles = [
        { name: 'coming_soon.md', icon: FaCode, path: '/blog' }
    ];

    // Career data
    const education = [
        { name: 'UHO_Informatics', detail: 'Sem 4' }
    ];

    const experience = [
        { name: 'Research_Assistant', detail: '2024-Present' },
        { name: 'Freelance_Dev', detail: '2023-Present' }
    ];

    // Tech stack data
    const techStack = {
        languages: ['cpp_std_20', 'python_3', 'bash_shell'],
        systems: ['linux_kernel', 'neovim_lua', 'git_control'],
        research: ['fuzzy_logic', 'clustering', 'ml_models']
    };

    // Quick actions
    const actions = [
        {
            icon: FaDownload,
            cmd: 'make install_cv',
            label: 'Download CV',
            action: () => {
                const link = document.createElement('a');
                link.href = '/MuhYusuf_Resume.pdf';
                link.download = 'MuhYusuf_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        },
        {
            icon: FaEnvelope,
            cmd: './send_email',
            label: 'Send Email',
            action: () => window.location.href = 'mailto:yusufmuhyusuh@gmail.com'
        },
        {
            icon: FaGithub,
            cmd: 'git remote -v',
            label: 'GitHub',
            action: () => window.open('https://github.com/yusuf601', '_blank')
        }
    ];

    // Reusable Section Header Component
    const SectionHeader = ({ icon: Icon, title, isOpen, onClick, className = '' }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-2 px-3 py-2 font-mono text-xs
                text-everblush-fg/70 hover:bg-everblush-green/10 hover:text-everblush-green
                transition-all duration-200 ${className}`}
        >
            {isOpen ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
            {Icon && <Icon className="text-sm" />}
            <span className="font-semibold tracking-wide">{title}</span>
        </button>
    );

    // File/Folder Item Component
    const FileItem = ({ icon: Icon, name, path, indent = 0, isFolder = false, isOpen = false, onClick }) => {
        const active = isActive(path);

        const handleClick = () => {
            if (onClick) {
                onClick();
            } else if (path) {
                navigate(path);
                setIsMobileOpen(false);
            }
        };

        return (
            <button
                onClick={handleClick}
                className={`w-full flex items-center gap-2 py-1.5 px-3 font-mono text-xs
                    transition-all duration-200
                    ${active
                        ? 'bg-everblush-green/20 text-everblush-green border-l-2 border-everblush-green'
                        : 'text-everblush-fg/80 hover:bg-everblush-green/10 hover:text-everblush-green'
                    }`}
                style={{ paddingLeft: `${12 + indent * 16}px` }}
            >
                {isFolder && (
                    isOpen ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />
                )}
                <Icon className="text-sm" />
                <span>{name}</span>
            </button>
        );
    };

    // Tech Item Component
    const TechItem = ({ name, indent = 0 }) => (
        <div
            className="py-1 px-3 font-mono text-xs text-everblush-fg/70"
            style={{ paddingLeft: `${12 + indent * 16}px` }}
        >
            <span className="text-everblush-blue">├─</span> {name}
        </div>
    );

    // Sidebar Content
    const sidebarContent = (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-everblush-green/30">
                <div className="font-mono text-xs text-everblush-fg/70">
                    <span className="text-everblush-green">guest</span>
                    <span className="text-everblush-fg">@</span>
                    <span className="text-everblush-green">yusuf</span>
                    <span className="text-everblush-fg">:</span>
                    <span className="text-everblush-blue">
                        {location.pathname === '/' ? '~' : `~${location.pathname}`}
                    </span>
                    <span className="text-everblush-green">$</span>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
                {/* EXPLORER Section */}
                <div className="border-b border-everblush-green/30">
                    <SectionHeader
                        icon={FaFolder}
                        title="EXPLORER"
                        isOpen={openSections.explorer}
                        onClick={() => toggleSection('explorer')}
                    />
                    <AnimatePresence>
                        {openSections.explorer && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                {/* Portfolio Folder */}
                                <FileItem
                                    icon={openSections.portfolio ? FaFolderOpen : FaFolder}
                                    name="portfolio/"
                                    isFolder
                                    isOpen={openSections.portfolio}
                                    onClick={() => toggleSection('portfolio')}
                                    indent={1}
                                />
                                <AnimatePresence>
                                    {openSections.portfolio && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            {portfolioFiles.map(file => (
                                                <FileItem
                                                    key={file.name}
                                                    icon={file.icon}
                                                    name={file.name}
                                                    path={file.path}
                                                    indent={2}
                                                />
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Blog Folder */}
                                <FileItem
                                    icon={openSections.blog ? FaFolderOpen : FaFolder}
                                    name="blog/"
                                    isFolder
                                    isOpen={openSections.blog}
                                    onClick={() => toggleSection('blog')}
                                    indent={1}
                                />
                                <AnimatePresence>
                                    {openSections.blog && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            {blogFiles.map(file => (
                                                <FileItem
                                                    key={file.name}
                                                    icon={file.icon}
                                                    name={file.name}
                                                    path={file.path}
                                                    indent={2}
                                                />
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Contact File */}
                                <FileItem
                                    icon={FaTerminal}
                                    name="contact.sh"
                                    path="/contact"
                                    indent={1}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* OUTLINE Section */}
                <div className="border-b border-everblush-green/30">
                    <SectionHeader
                        icon={FaBriefcase}
                        title="OUTLINE"
                        isOpen={openSections.outline}
                        onClick={() => toggleSection('outline')}
                    />
                    <AnimatePresence>
                        {openSections.outline && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden pb-2"
                            >
                                {/* Education */}
                                <div className="px-3 py-1.5 font-mono text-xs text-everblush-fg/70">
                                    <div className="flex items-center gap-2 mb-1">
                                        <FaGraduationCap className="text-sm text-everblush-blue" />
                                        <span className="font-semibold">Education</span>
                                    </div>
                                    {education.map((edu, idx) => (
                                        <div key={idx} className="ml-6 text-everblush-fg/60">
                                            <span className="text-everblush-blue">├─</span> {edu.name}
                                            <span className="text-everblush-fg/50 ml-2">({edu.detail})</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Experience */}
                                <div className="px-3 py-1.5 font-mono text-xs text-everblush-fg/70">
                                    <div className="flex items-center gap-2 mb-1">
                                        <FaBriefcase className="text-sm text-everblush-green" />
                                        <span className="font-semibold">Experience</span>
                                    </div>
                                    {experience.map((exp, idx) => (
                                        <div key={idx} className="ml-6 text-everblush-fg/60">
                                            <span className="text-everblush-green">├─</span> {exp.name}
                                            <span className="text-everblush-fg/50 ml-2">({exp.detail})</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* MODULES Section */}
                <div className="border-b border-everblush-green/30">
                    <SectionHeader
                        icon={FaCube}
                        title="MODULES"
                        isOpen={openSections.modules}
                        onClick={() => toggleSection('modules')}
                    />
                    <AnimatePresence>
                        {openSections.modules && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden pb-2"
                            >
                                {/* Languages */}
                                <div className="px-3 py-1">
                                    <button
                                        onClick={() => toggleSection('languages')}
                                        className="flex items-center gap-2 font-mono text-xs text-everblush-fg/70 hover:text-everblush-green"
                                    >
                                        {openSections.languages ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
                                        <FaFolder className="text-sm text-everblush-yellow" />
                                        <span>Languages</span>
                                    </button>
                                    <AnimatePresence>
                                        {openSections.languages && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                {techStack.languages.map((lang, idx) => (
                                                    <TechItem key={idx} name={lang} indent={1} />
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Systems */}
                                <div className="px-3 py-1">
                                    <button
                                        onClick={() => toggleSection('systems')}
                                        className="flex items-center gap-2 font-mono text-xs text-everblush-fg/70 hover:text-everblush-green"
                                    >
                                        {openSections.systems ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
                                        <FaFolder className="text-sm text-everblush-magenta" />
                                        <span>Systems</span>
                                    </button>
                                    <AnimatePresence>
                                        {openSections.systems && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                {techStack.systems.map((sys, idx) => (
                                                    <TechItem key={idx} name={sys} indent={1} />
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Research */}
                                <div className="px-3 py-1">
                                    <button
                                        onClick={() => toggleSection('research')}
                                        className="flex items-center gap-2 font-mono text-xs text-everblush-fg/70 hover:text-everblush-green"
                                    >
                                        {openSections.research ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
                                        <FaFolder className="text-sm text-everblush-cyan" />
                                        <span>Research</span>
                                    </button>
                                    <AnimatePresence>
                                        {openSections.research && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                {techStack.research.map((res, idx) => (
                                                    <TechItem key={idx} name={res} indent={1} />
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ACTIONS Section */}
                <div className="border-b border-everblush-green/30">
                    <SectionHeader
                        icon={FaTerminal}
                        title="ACTIONS"
                        isOpen={openSections.actions}
                        onClick={() => toggleSection('actions')}
                    />
                    <AnimatePresence>
                        {openSections.actions && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden pb-2"
                            >
                                {actions.map((action, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            action.action();
                                            setIsMobileOpen(false);
                                        }}
                                        className="w-full px-3 py-2 font-mono text-xs text-left
                                            text-everblush-fg/80 hover:bg-everblush-green/10 hover:text-everblush-green
                                            transition-all duration-200 flex items-center gap-2"
                                        title={action.label}
                                    >
                                        <action.icon className="text-sm text-everblush-green" />
                                        <span className="text-everblush-blue">$</span>
                                        <span>{action.cmd}</span>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Info */}
            <div className="p-3 border-t border-everblush-green/30 font-mono text-xs text-everblush-fg/50">
                <div>{portfolioFiles.length + blogFiles.length + 1} items</div>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-everblush-bg border border-everblush-green/30 rounded
                    text-everblush-green hover:bg-everblush-green/10 transition-all"
                aria-label="Toggle sidebar"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileOpen(false)}
                        className="md:hidden fixed inset-0 bg-black/50 z-40"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar - Desktop */}
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden md:flex w-64 bg-everblush-bg border-r border-everblush-green/30 flex-col h-screen"
            >
                {sidebarContent}
            </motion.aside>

            {/* Sidebar - Mobile Slide-in */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden fixed left-0 top-0 w-64 bg-everblush-bg border-r border-everblush-green/30 h-screen z-50"
                    >
                        {sidebarContent}
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
