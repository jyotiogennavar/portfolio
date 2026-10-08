import { preferredType } from "@/lib/accept"
import {
  canonicalDocumentPath,
  canonicalFromMarkdownSibling,
  isStaticAsset,
  markdownApiPath,
  markdownSiblingPath,
  normalizePathname,
} from "@/lib/paths"

export type NegotiationPlan =
  | { action: "passthrough" }
  | { action: "html"; link: string }
  | { action: "markdown"; pathname: string }
  | { action: "not-acceptable" }

export function planNegotiation(pathname: string, accept: string | null): NegotiationPlan {
  const path = normalizePathname(pathname)
  if (isStaticAsset(path)) return { action: "passthrough" }

  if (path.endsWith(".md")) {
    return {
      action: "markdown",
      pathname: markdownApiPath(canonicalFromMarkdownSibling(path)),
    }
  }

  const chosen = preferredType(accept)
  const canonical = canonicalDocumentPath(path)
  if (chosen === "text/markdown") {
    return { action: "markdown", pathname: markdownApiPath(canonical) }
  }
  if (chosen === null && accept) return { action: "not-acceptable" }

  const sibling = markdownSiblingPath(canonical)
  return {
    action: "html",
    link: `<${sibling}>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"`,
  }
}
