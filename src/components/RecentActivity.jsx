import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import GlitchText from './GlitchText';

const activities = [
    {
        hash: 'a3f9c12',
        date: '2024-02',
        title: 'Optimized Fuzzy C-Means Algorithm',
        description: 'Improved clustering performance by 40% using parallel processing',
        type: 'research',
    },
    {
        hash: 'b81e4f7',
        date: '2024-01',
        title: 'Published AI Stylometry Paper',
        description: 'Code authorship attribution using machine learning techniques',
        type: 'paper',
    },
    {
        hash: 'c02d9a3',
        date: '2023-12',
        title: 'Contributed to Linux Kernel',
        description: 'Performance monitoring module for system resource optimization',
        type: 'contrib',
    },
    {
        hash: 'd74b1e6',
        date: '2023-10',
        title: 'Built STL Vector Implementation',
        description: 'From-scratch C++ vector with custom allocator and memory pool',
        type: 'project',
    },
    {
        hash: 'e55f8c1',
        date: '2023-09',
        title: 'Started Freelance Development',
        description: 'Full-stack and automation projects for local clients',
        type: 'career',
    },
];

const TYPE_META = {
    research: { label: 'research', color: 'text-everblush-green  border-everblush-green/40', dot: 'bg-everblush-green' },
    paper: { label: 'paper', color: 'text-everblush-blue   border-everblush-blue/40', dot: 'bg-everblush-blue' },
    contrib: { label: 'contrib', color: 'text-everblush-red    border-everblush-red/40', dot: 'bg-everblush-red' },
    project: { label: 'project', color: 'text-everblush-yellow border-everblush-yellow/40', dot: 'bg-everblush-yellow' },
    career: { label: 'career', color: 'text-everblush-fg/60  border-everblush-fg/20', dot: 'bg-everblush-fg/60' },
};

const RecentActivity = () => {
    const navigate = useNavigate();

    return (
        <section id="activity" className="py-20 px-4 sm:px-6 lg:px-8 mobile-page-padding">
            <div className="max-w-6xl mx-auto">

                <ScrollReveal>
                    <div className="mb-12">
                        <h2 className="text-3xl sm:text-4xl font-mono font-bold text-syntax-header mb-2">
                            <GlitchText text="// Recent Activity" />
                        </h2>
                        <p className="font-mono text-sm text-syntax-meta">
                            <span className="syntax-keyword">git</span> log --oneline --graph --all
                        </p>
                    </div>
                </ScrollReveal>

                {/* Git-log timeline */}
                <div className="relative">
                    {/* Vertical connector line */}
                    <div className="absolute left-[18px] sm:left-[22px] top-0 bottom-0 w-px bg-everblush-green/20" />

                    <div className="space-y-1">
                        {activities.map((act, i) => {
                            const meta = TYPE_META[act.type];
                            return (
                                <ScrollReveal key={i} delay={i * 0.08}>
                                    <motion.div
                                        className="relative flex items-start gap-4 sm:gap-6 pl-10 sm:pl-14 py-4 group"
                                        whileHover={{ x: 2 }}
                                        transition={{ type: 'spring', stiffness: 400 }}
                                    >
                                        {/* Commit dot */}
                                        <div className={`absolute left-[13px] sm:left-[17px] top-6 w-3 h-3 rounded-full border-2 border-everblush-bg ${meta.dot} z-10`} />

                                        {/* Commit content */}
                                        <div className="flex-1 border border-everblush-green/15 rounded-lg p-4
                                                        bg-everblush-bg/40 backdrop-blur-sm
                                                        group-hover:border-everblush-green/30
                                                        group-hover:bg-everblush-bg/60
                                                        transition-all duration-300">

                                            {/* Meta row */}
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <span className="font-mono text-everblush-fg/30 text-xs">
                                                    * {act.hash}
                                                </span>
                                                <span className="font-mono text-everblush-fg/40 text-xs">{act.date}</span>
                                                <span className={`font-mono text-xs px-2 py-0.5 border rounded ${meta.color}`}>
                                                    {meta.label}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="font-mono text-sm sm:text-base font-bold text-syntax-header mb-1">
                                                {act.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="font-mono text-xs sm:text-sm text-everblush-fg/60 leading-relaxed">
                                                {act.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </ScrollReveal>
                            );
                        })}

                        {/* End marker */}
                        <div className="relative flex items-center gap-4 sm:gap-6 pl-10 sm:pl-14 py-2">
                            <div className="absolute left-[13px] sm:left-[17px] top-4 w-3 h-3 rounded-full border-2 border-everblush-green/30 bg-everblush-bg z-10" />
                            <span className="font-mono text-everblush-fg/20 text-xs">○ ... (initial commit)</span>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <ScrollReveal delay={0.4}>
                    <div className="mt-10 flex justify-center">
                        <motion.button
                            onClick={() => navigate('/projects')}
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="font-mono text-sm px-6 py-3 border border-everblush-green/40
                                       text-everblush-green/70 hover:text-everblush-green
                                       hover:border-everblush-green hover:shadow-glow-green
                                       rounded transition-all duration-300 cursor-pointer"
                        >
                            <span className="syntax-comment">// </span>
                            view all projects →
                        </motion.button>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
};

export default RecentActivity;
