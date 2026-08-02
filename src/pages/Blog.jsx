import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import GlitchText from '../components/GlitchText';

/* ─── Blog post data ────────────────────────────────────── */
const posts = [
    {
        id: 'fuzzy-cmeans-parallel',
        date: '2024-02-10',
        readTime: '8 min',
        type: 'research',
        title: 'Optimizing Fuzzy C-Means with Parallel Processing',
        summary: 'How I achieved a 40% performance improvement in a clustering algorithm by identifying the right bottleneck — not the one I expected.',
        tags: ['C++', 'Fuzzy Logic', 'Multithreading', 'Performance'],
        content: `
// Background
Fuzzy C-Means (FCM) is a soft-clustering algorithm where each data point
belongs to every cluster with a membership degree in [0,1]. It's the
foundation of my AI Stylometry research.

// The Problem
The naive implementation of FCM has two nested O(n*k) loops per iteration:
one to compute distances, one to update centroids. For our dataset (n=10,000
samples, k=8 clusters, 150+ iterations), this was 12 seconds per run.
Way too slow for research iteration.

// What I tried first (wrong approach)
My first instinct was to parallelize the centroid update loop. It's the
"obvious" bottleneck — lots of floating-point accumulation. But after
profiling with gprof, I discovered the centroid update was only ~15% of
runtime. The membership matrix recomputation was 70%.

// The actual fix
The membership update for each point is independent. std::for_each with
std::execution::par_unseq dropped that step from 8.4s to 5.0s. Then I
moved the inner distance computations to use SIMD-friendly data layouts:
AoS → SoA (Array of Structures → Structure of Arrays). This alone gave
another 1.5s reduction.

// Result
Total: 12s → 7.2s → ~5.0s (final with both changes) = 58% improvement.
The paper reported 40% because we compared against a fair single-threaded
baseline, not the naive version. Always profile before you parallelize.
        `.trim(),
    },
    {
        id: 'stl-vector-internals',
        date: '2024-01-05',
        readTime: '6 min',
        type: 'deep-dive',
        title: 'Building std::vector From Scratch: What I Learned',
        summary: 'The implementation details that surprised me when I tried to replicate one of the most common C++ containers.',
        tags: ['C++', 'STL', 'Memory Management', 'Templates'],
        content: null, // preview-only
    },
    {
        id: 'linux-kernel-module',
        date: '2023-12-20',
        readTime: '10 min',
        type: 'contribution',
        title: 'Writing My First Linux Kernel Module',
        summary: 'A step-by-step account of contributing a performance monitoring module, including the mistakes that taught me the most.',
        tags: ['Linux', 'C', 'Kernel', 'Systems'],
        content: null,
    },
];

const TYPE_COLOR = {
    research: 'text-everblush-green  border-everblush-green/40',
    'deep-dive': 'text-everblush-blue   border-everblush-blue/40',
    contribution: 'text-everblush-red    border-everblush-red/40',
};

/* ─── Full post view ────────────────────────────────────── */
const PostView = ({ post, onBack }) => (
    <motion.div
        key="post"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25 }}
    >
        <button
            onClick={onBack}
            className="font-mono text-sm text-everblush-green/70 hover:text-everblush-green mb-8 flex items-center gap-2 transition-colors"
        >
            ← git checkout blog/
        </button>

        <div className="mb-8">
            <span className={`font-mono text-xs px-2 py-0.5 border rounded ${TYPE_COLOR[post.type]}`}>
                {post.type}
            </span>
            <p className="font-mono text-xs text-everblush-fg/40 mt-3">{post.date} · {post.readTime} read</p>
            <h1 className="font-mono text-2xl sm:text-3xl font-bold text-syntax-header mt-3 mb-4">
                {post.title}
            </h1>
            <p className="font-mono text-sm text-everblush-fg/60 mb-6">{post.summary}</p>
            <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map(t => (
                    <span key={t} className="font-mono text-xs border border-everblush-green/20 text-everblush-fg/50 px-2 py-0.5 rounded">
                        {t}
                    </span>
                ))}
            </div>
            <div className="h-px bg-everblush-green/20 mb-8" />
        </div>

        <pre className="font-mono text-sm text-everblush-fg/80 leading-relaxed whitespace-pre-wrap bg-everblush-bg/60 border border-everblush-green/20 rounded-lg p-6 overflow-x-auto">
            {post.content}
        </pre>
    </motion.div>
);

/* ─── Blog list view ────────────────────────────────────── */
const PostCard = ({ post, onClick }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ x: 4, borderColor: 'rgba(125,211,252,0.5)' }}
        className="w-full text-left border border-everblush-green/20 rounded-lg p-5 bg-everblush-bg/40
                   hover:bg-everblush-bg/60 transition-all duration-300 group"
    >
        <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`font-mono text-xs px-2 py-0.5 border rounded ${TYPE_COLOR[post.type]}`}>
                {post.type}
            </span>
            <span className="font-mono text-xs text-everblush-fg/40">{post.date}</span>
            <span className="font-mono text-xs text-everblush-fg/30">· {post.readTime} read</span>
        </div>
        <h2 className="font-mono font-bold text-base sm:text-lg text-syntax-header mb-2
                       group-hover:text-everblush-green transition-colors duration-200">
            {post.title}
        </h2>
        <p className="font-mono text-sm text-everblush-fg/60 leading-relaxed mb-4">
            {post.summary}
        </p>
        <div className="flex flex-wrap gap-1.5">
            {post.tags.map(t => (
                <span key={t} className="font-mono text-[10px] border border-everblush-fg/15 text-everblush-fg/40 px-2 py-0.5 rounded">
                    {t}
                </span>
            ))}
        </div>
        <p className="font-mono text-xs text-everblush-green/60 mt-4 group-hover:text-everblush-green transition-colors">
            read more →
        </p>
    </motion.button>
);

/* ─── Page ──────────────────────────────────────────────── */
const Blog = () => {
    const [activePost, setActivePost] = useState(null);

    const post = posts.find(p => p.id === activePost);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8 mobile-page-padding"
        >
            <div className="max-w-3xl mx-auto">
                <ScrollReveal>
                    <div className="mb-10">
                        <h1 className="text-4xl sm:text-5xl font-mono font-bold text-syntax-header mb-2">
                            <GlitchText text="// Blog" />
                        </h1>
                        <p className="font-mono text-sm text-syntax-meta">
                            <span className="syntax-keyword">cat</span>{' '}
                            <span className="syntax-string">technical_notes/*.md</span>
                        </p>
                    </div>
                </ScrollReveal>

                <AnimatePresence mode="wait">
                    {post && post.content ? (
                        <PostView key={post.id} post={post} onBack={() => setActivePost(null)} />
                    ) : (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                            {posts.map((p, i) => (
                                <ScrollReveal key={p.id} delay={i * 0.08}>
                                    <PostCard
                                        post={p}
                                        onClick={() => p.content ? setActivePost(p.id) : null}
                                    />
                                </ScrollReveal>
                            ))}

                            <ScrollReveal delay={0.3}>
                                <p className="font-mono text-xs text-everblush-fg/30 text-center pt-4">
                                    <span className="syntax-comment">// More posts coming — writing is slow when you benchmark everything</span>
                                </p>
                            </ScrollReveal>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Blog;
