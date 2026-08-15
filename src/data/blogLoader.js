import frontMatter from 'front-matter'

const blogFiles = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default', eager: true })

export function getAllPosts() {
    const posts = []
    
    for (const path in blogFiles) {
        const slug = path.split('/').pop().replace('.md', '')
        const rawContent = blogFiles[path]
        const { attributes, body } = frontMatter(rawContent)
        
        // Skip drafts
        if (attributes.draft) {
            continue;
        }

        // Validate required fields
        if (!attributes.title || !attributes.date) {
            console.warn(`Post ${slug} is missing required fields (title, date)`);
            continue;
        }
        
        // Calculate read time based on word count
        const wordCount = body.trim().split(/\s+/).length
        const readTime = Math.max(1, Math.ceil(wordCount / 200))

        posts.push({
            slug,
            ...attributes,
            readTime: `${readTime} min`,
            content: body,
        })
    }
    
    // Sort by date descending
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
    const posts = getAllPosts()
    return posts.find(p => p.slug === slug)
}
