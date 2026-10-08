/**
 * Accept negotiation from the Next.js recipe at
 * https://acceptmarkdown.com/recipes/nextjs
 * Specificity overrides q, matching RFC 9110 §12.5.1.
 */

const PRODUCES = ["text/html", "text/markdown"] as const

export type ProducedType = (typeof PRODUCES)[number]

type AcceptEntry = { type: string; q: number; specificity: number }

export function parseAccept(header: string): AcceptEntry[] {
  return header.split(",").map((raw) => {
    const parts = raw
      .trim()
      .split(";")
      .map((part) => part.trim())
    const type = (parts[0] ?? "").toLowerCase()
    let q = 1
    for (const param of parts.slice(1)) {
      const [name, value] = param.split("=").map((part) => part.trim())
      if (name?.toLowerCase() === "q") {
        const parsed = Number(value)
        if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed))
      }
    }
    const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2
    return { type, q, specificity }
  })
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === "*/*") return true
  if (entry.type.endsWith("/*")) return candidate.startsWith(entry.type.slice(0, -1))
  return entry.type === candidate
}

/** The representation to serve, or null when none of the produced types are acceptable. */
export function preferredType(header: string | null): ProducedType | null {
  if (!header) return PRODUCES[0]
  const entries = parseAccept(header)
  if (entries.length === 0) return PRODUCES[0]

  let bestType: ProducedType | null = null
  let bestQ = -1
  let bestPosition = Infinity

  for (const candidate of PRODUCES) {
    let matched: AcceptEntry | null = null
    let matchedPosition = Infinity
    for (let index = 0; index < entries.length; index++) {
      const entry = entries[index]
      if (!entry || !matches(entry, candidate)) continue
      if (
        matched === null ||
        entry.specificity > matched.specificity ||
        (entry.specificity === matched.specificity && index < matchedPosition)
      ) {
        matched = entry
        matchedPosition = index
      }
    }
    if (matched === null || matched.q <= 0) continue

    if (matched.q > bestQ || (matched.q === bestQ && matchedPosition < bestPosition)) {
      bestQ = matched.q
      bestPosition = matchedPosition
      bestType = candidate
    }
  }

  return bestType
}

export function appendVaryAccept(headers: Headers): void {
  const existing = headers.get("Vary")
  if (!existing) {
    headers.set("Vary", "Accept")
    return
  }
  const tokens = existing.split(",").map((token) => token.trim().toLowerCase())
  if (!tokens.includes("accept")) {
    headers.set("Vary", `${existing}, Accept`)
  }
}
