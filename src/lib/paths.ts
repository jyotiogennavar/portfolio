/** Path helpers for HTML and Markdown representations of the same page. */

export function normalizePathname(pathname: string): string {
  const path = pathname.split("?")[0]?.split("#")[0] ?? "/"
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1)
  return path || "/"
}

/** Map retired URLs onto the page that actually describes them. */
export function canonicalDocumentPath(pathname: string): string {
  const path = normalizePathname(pathname)
  if (path === "/about-me") return "/about"
  return path
}

export function isStaticAsset(pathname: string): boolean {
  const path = normalizePathname(pathname)
  const last = path.split("/").pop() ?? ""
  if (!last.includes(".")) return false
  return !last.endsWith(".md")
}

export function markdownSiblingPath(canonicalPath: string): string {
  if (canonicalPath === "/") return "/index.md"
  return `${canonicalPath}.md`
}

export function canonicalFromMarkdownSibling(pathname: string): string {
  const path = normalizePathname(pathname)
  if (!path.endsWith(".md")) return canonicalDocumentPath(path)

  let without = path.slice(0, -3)
  if (without === "" || without === "/") return "/"
  if (without.endsWith("/index")) {
    without = without.slice(0, -"/index".length)
  }
  if (without === "") without = "/"
  return canonicalDocumentPath(without)
}

export function markdownApiPath(canonicalPath: string): string {
  if (canonicalPath === "/") return "/api/markdown"
  return `/api/markdown${canonicalPath}`
}
