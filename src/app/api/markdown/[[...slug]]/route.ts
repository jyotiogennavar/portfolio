import { markdownForPath, markdownHeaders } from "@/lib/markdown-doc"
import { canonicalDocumentPath } from "@/lib/paths"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type RouteContext = {
  params: Promise<{ slug?: string[] }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { slug = [] } = await context.params
  const joined = slug.filter(Boolean).join("/")
  const pathname = canonicalDocumentPath(joined ? `/${joined}` : "/")
  const result = markdownForPath(pathname)

  return new Response(result.body, {
    status: result.status,
    headers: markdownHeaders(result.status),
  })
}
