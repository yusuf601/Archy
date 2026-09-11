import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ScrollReveal from '../components/ScrollReveal';
import GlitchText from '../components/GlitchText';
import { getAllPosts } from '../data/blogLoader';

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
            <span className={`font-mono text-xs px-2 py-0.5 border rounded ${TYPE_COLOR[post.category] || 'text-everblush-fg border-everblush-fg/40'}`}>
                {post.category || 'article'}
            </span>
            <p className="font-mono text-xs text-everblush-fg/40 mt-3">{post.date} · {post.readTime} read</p>
            <h1 className="font-mono text-2xl sm:text-3xl font-bold text-syntax-header mt-3 mb-4">
                {post.title}
            </h1>
            <p className="font-mono text-sm text-everblush-fg/60 mb-6">{post.summary}</p>
            <div className="flex flex-wrap gap-2 mb-8">
                {post.tags && post.tags.map(t => (
                    <span key={t} className="font-mono text-xs border border-everblush-green/20 text-everblush-fg/50 px-2 py-0.5 rounded">
                        {t}
                    </span>
                ))}
            </div>
            <div className="h-px bg-everblush-green/20 mb-8" />
        </div>

        <div className="font-mono text-sm text-everblush-fg/80 leading-relaxed bg-everblush-bg/60 border border-everblush-green/20 rounded-lg p-6 overflow-x-auto markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
            </ReactMarkdown>
        </div>
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
            <span className={`font-mono text-xs px-2 py-0.5 border rounded ${TYPE_COLOR[post.category] || 'text-everblush-fg border-everblush-fg/40'}`}>
                {post.category || 'article'}
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
            {post.tags && post.tags.map(t => (
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
    const { slug } = useParams();
    const navigate = useNavigate();
    const posts = getAllPosts();
    const post = posts.find(p => p.slug === slug);

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
                    {post && post.content?.trim() && post.content.trim() !== '*Content coming soon.*' ? (
                        <PostView key={post.slug} post={post} onBack={() => navigate('/blog')} />
                    ) : (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                            {posts.map((p, i) => (
                                <ScrollReveal key={p.slug} delay={i * 0.08}>
                                    <PostCard
                                        post={p}
                                        onClick={() => p.content?.trim() && p.content.trim() !== '*Content coming soon.*' ? navigate(`/blog/${p.slug}`) : null}
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

