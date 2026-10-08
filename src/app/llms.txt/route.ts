import { getAllPosts } from "@/lib/mdx"
import { buildLlmsTxt } from "@/lib/llms"

export const runtime = "nodejs"

export function GET() {
  const body = buildLlmsTxt(
    getAllPosts().map((post) => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
    })),
  )

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
