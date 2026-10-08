import { EMAIL, SITE_NAME, SITE_URL } from "@/lib/site"

export type LlmsPost = {
  title: string
  slug: string
  excerpt: string
}

function oneLine(value: string): string {
  return value.replace(/\s+/g, " ").trim()
}

/**
 * llms.txt v2 (https://llmstxt.org): H1, blockquote, free-form guidance
 * with no headings, then H2 sections whose items are Markdown links.
 * "When to use this" stays in the free-form block, before the first H2.
 */
export function buildLlmsTxt(posts: LlmsPost[]): string {
  const writing = posts
    .map(
      (post) =>
        `- [${post.title}](${SITE_URL}/blog/${post.slug}.md): ${oneLine(post.excerpt)}`,
    )
    .join("\n")

  const writingSection =
    posts.length > 0 ? `## Writing\n\n${writing}\n\n` : ""

  return `# ${SITE_NAME}

> Personal portfolio of Jyoti Ogennavar, a frontend developer in Pune, India. Use it for her interface work, writing, and experiments. It is one person's site, not a product help desk and not documentation for React or Next.js.

When to use this:

- Summarize who Jyoti Ogennavar is and where she is based. She is a frontend developer in Pune, Maharashtra, India, hired for React, Next.js, TypeScript, Tailwind CSS, accessible UI, and interface motion.
- Name a project she built. World Wide Wonder is a Next.js and Sanity travel blog; the live site is not launched and the code is on GitHub. Dreamfund is a goal-based savings tracker with a GitHub repository and a public demo.
- Find her writing. On-site posts are listed under Writing. Two longer guides, on on-page SEO and on XML sitemaps, are on Medium and linked from the homepage.
- Contact her about a frontend role, a contract, or a collaboration. Email ${EMAIL}. This site publishes no phone number and has no contact form.

Do not use this site when the task is Dreamfund account support, passwords, or billing; when the task needs World Wide Wonder travel articles; or when the task is general framework documentation or an agency with a team. Those jobs are outside this portfolio.

How an agent should call this site:

1. Read this file first: GET ${SITE_URL}/llms.txt
2. Fetch one page. Send \`Accept: text/markdown\` to the canonical URL, for example GET ${SITE_URL}/about. The response uses Content-Type: text/markdown and Vary: Accept. Browsers should keep Accept: text/html and will receive HTML.
3. Or open the Markdown sibling: ${SITE_URL}/about.md. The homepage sibling is ${SITE_URL}/index.md.
4. If a path is missing, the response is HTTP 404 with a Markdown body that links back here and to ${SITE_URL}/sitemap.xml. Follow those links instead of guessing more paths.
5. For every indexable URL, GET ${SITE_URL}/sitemap.xml.

## Pages

- [Home](${SITE_URL}/index.md): Projects, skills, writing links, and a short account of her frontend work.
- [About](${SITE_URL}/about.md): Who she is, the interface work she takes on, and what this site is for.
- [Contact](${SITE_URL}/contact.md): The email address, the profiles she uses, and what to include when writing.
- [Privacy](${SITE_URL}/privacy.md): What jyotiogennavar.com collects, including that there is no account system and no analytics script.
- [Blog](${SITE_URL}/blog.md): Index of on-site posts and the Medium guides.
- [Lab](${SITE_URL}/lab.md): Motion, CSS, and interaction experiments.

${writingSection}## Optional

- [Sitemap](${SITE_URL}/sitemap.xml): Every indexable URL, with lastmod.
- [GitHub](https://github.com/jyotiogennavar): Source for the projects named on the homepage.
`
}
