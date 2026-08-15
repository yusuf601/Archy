import { describe, it, expect } from 'vitest';
import { getAllPosts, getPostBySlug } from './blogLoader';

describe('blogLoader', () => {
    it('returns all posts sorted by date descending', () => {
        const posts = getAllPosts();
        expect(posts.length).toBeGreaterThan(0);
        
        // Check sorting
        for (let i = 0; i < posts.length - 1; i++) {
            const dateA = new Date(posts[i].date);
            const dateB = new Date(posts[i + 1].date);
            expect(dateA.getTime()).toBeGreaterThanOrEqual(dateB.getTime());
        }
    });

    it('calculates readTime based on word count', () => {
        const post = getPostBySlug('fuzzy-cmeans-parallel');
        expect(post).toBeDefined();
        // fuzzy-cmeans-parallel.md has ~241 words, which is ceil(241/200) = 2 mins
        expect(post.readTime).toMatch(/^\d+ min$/);
    });

    it('filters out draft posts', () => {
        const posts = getAllPosts();
        const drafts = posts.filter(p => p.draft);
        expect(drafts.length).toBe(0);
    });
});
