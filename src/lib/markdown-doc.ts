import { getAllPosts, getPostBySlug, type BlogPost } from "@/lib/mdx"
import { homeAboutParagraphs, homeProjects, mediumPosts } from "@/lib/home-content"
import { blocksToMarkdown } from "@/lib/prose"
import { canonicalDocumentPath } from "@/lib/paths"
import {
  aboutBlocks,
  contactBlocks,
  pageDescriptions,
  privacyBlocks,
} from "@/lib/site-pages"
import { SITE_NAME, SITE_URL } from "@/lib/site"

export const MARKDOWN_MEDIA_TYPE = "text/markdown; charset=utf-8"

export type MarkdownResult = {
  status: 200 | 404
  body: string
}

function pageDocument(title: string, description: string, body: string): string {
  return `# ${title}\n\n> ${description}\n\n${body.trim()}\n`
}

export function notFoundMarkdown(pathname: string): string {
  const safe = pathname.replace(/[`\r\n]/g, "").slice(0, 200)
  return `# Page not found

No page exists at \`${safe}\`. The address may be mistyped, or the page may have moved.

Continue from one of these:

- [Agent guide](${SITE_URL}/llms.txt)
- [Sitemap](${SITE_URL}/sitemap.xml)
- [Homepage](${SITE_URL}/)

`
}

function homeMarkdown(): string {
  const about = homeAboutParagraphs.join("\n\n")
  const projects = homeProjects
    .map((project) => {
      const links = [`[GitHub](${project.github})`]
      if ("live" in project && project.live) links.push(`[Live demo](${project.live})`)
      if ("note" in project && project.note) links.push(project.note)
      return `### ${project.title}\n\n${project.description}\n\n${links.join(" · ")}`
    })
    .join("\n\n")
  const writing = mediumPosts
    .map((post) => `- [${post.title}](${post.href}): ${post.description}`)
    .join("\n")

  return pageDocument(
    SITE_NAME,
    "Frontend developer in Pune, India. Projects, writing, and the stack she uses.",
    `## About\n\n${about}\n\n## Projects\n\n${projects}\n\n## Writing on Medium\n\n${writing}\n\nOn-site essays are listed at ${SITE_URL}/blog.md.`,
  )
}

function blogIndexMarkdown(): string {
  const posts = getAllPosts()
    .map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}.md): ${post.excerpt}`)
    .join("\n")
  const medium = mediumPosts
    .map((post) => `- [${post.title}](${post.href}): ${post.description}`)
    .join("\n")

  return pageDocument(
    "Blog",
    "Essays by Jyoti Ogennavar on CSS, motion, and frontend work, plus two Medium guides.",
    `${posts}\n\n## On Medium\n\n${medium}`,
  )
}

function mdxToMarkdown(source: string): string {
  return source
    .split("\n")
    .filter((line) => !/^<[A-Z][^>]*\/>\s*$/.test(line.trim()))
    .join("\n")
    .trim()
}

function publishedDate(post: BlogPost): string {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(post.date)
  if (!match) return post.formattedDate
  const parsed = new Date(Date.UTC(Number(match[3]), Number(match[2]) - 1, Number(match[1])))
  if (Number.isNaN(parsed.getTime())) return post.formattedDate
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

function postMarkdown(post: BlogPost): string {
  return pageDocument(
    post.title,
    post.excerpt,
    `Published ${publishedDate(post)}. Author: ${post.author || SITE_NAME}.\n\n${mdxToMarkdown(post.content)}`,
  )
}

function labMarkdown(): string {
  return pageDocument(
    "Lab",
    "Interactive experiments and motion studies Jyoti builds in order to learn how something should feel.",
    `The lab is a gallery of small interface studies, not client work.

- Save modal: leave a draft with unsaved notes, then save, retry, or stay, including slow and offline states.
- Exploding heart: a like button that bursts pastel particles when you turn it on.
- Wand cursor: a custom wand cursor that sprinkles sparkles where you click.

These are experiments. They are not products with accounts or support.`,
  )
}

function expMarkdown(): string {
  return pageDocument(
    "Save modal experiment",
    "A single lab study, also shown in the lab gallery.",
    "This URL renders the save-modal experiment on its own: leave a draft, then save, retry, or stay. The indexed write-up of the lab lives at " +
      `${SITE_URL}/lab.md.`,
  )
}

export function markdownForPath(pathname: string): MarkdownResult {
  const path = canonicalDocumentPath(pathname)

  if (path === "/") return { status: 200, body: homeMarkdown() }
  if (path === "/about") {
    return {
      status: 200,
      body: pageDocument("About", pageDescriptions.about, blocksToMarkdown(aboutBlocks, SITE_URL)),
    }
  }
  if (path === "/contact") {
    return {
      status: 200,
      body: pageDocument(
        "Contact",
        pageDescriptions.contact,
        blocksToMarkdown(contactBlocks, SITE_URL),
      ),
    }
  }
  if (path === "/privacy") {
    return {
      status: 200,
      body: pageDocument(
        "Privacy",
        pageDescriptions.privacy,
        blocksToMarkdown(privacyBlocks, SITE_URL),
      ),
    }
  }
  if (path === "/blog") return { status: 200, body: blogIndexMarkdown() }
  if (path === "/lab") return { status: 200, body: labMarkdown() }
  if (path === "/exp") return { status: 200, body: expMarkdown() }

  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length)
    if (!slug || slug.includes("/")) return { status: 404, body: notFoundMarkdown(path) }
    const post = getPostBySlug(slug)
    if (!post || post.published === false) return { status: 404, body: notFoundMarkdown(path) }
    return { status: 200, body: postMarkdown(post) }
  }

  return { status: 404, body: notFoundMarkdown(path) }
}

export function markdownHeaders(status: number): Headers {
  const headers = new Headers({
    "Content-Type": MARKDOWN_MEDIA_TYPE,
    Vary: "Accept",
    "Cache-Control":
      status === 200 ? "public, s-maxage=60, stale-while-revalidate=86400" : "no-store",
    Link: `<${SITE_URL}/llms.txt>; rel="describedby"`,
  })
  if (status === 404) headers.set("X-Robots-Tag", "noindex")
  return headers
}
