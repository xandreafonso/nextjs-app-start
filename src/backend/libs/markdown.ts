import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkStringify from 'remark-stringify'
import rehypeParse from 'rehype-parse'
import rehypeRemark from 'rehype-remark'
import rehypeFormat from 'rehype-format'
import { unified } from 'unified'

export const markdown = {
    toHtml: markdownToHtml,
    fromHtml: markdownFromHtml
}

async function markdownToHtml(markdown: string): Promise<string> {
    const file = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(markdown)

    return String(file)
}

async function markdownFromHtml(html: string): Promise<string> {
    const file = await unified()
        .use(rehypeParse, { fragment: true }) // Parse HTML fragment
        .use(rehypeFormat) // Format HTML for better processing
        .use(rehypeRemark) // Convert HTML to Markdown AST
        .use(remarkGfm) // Support GFM features
        .use(remarkStringify, {
            bullet: '-', // Use '-' for bullet lists
            fence: '`', // Use backticks for code fences
            fences: true, // Use fenced code blocks
            incrementListMarker: true, // Increment list markers
        })
        .process(html)

    return String(file)
}