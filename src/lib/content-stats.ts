export type ContentStats = {
  text: string
  characters: number
  ratio: number
  headings: number[]
}

/** Visible text over the full document, with script and style contents excluded from the text. */
export function contentStats(html: string): ContentStats {
  const withoutEmbedded = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
  const text = withoutEmbedded
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#0?39;|&#x27;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&#x27;/gi, "'")
    .replace(/\s+/g, " ")
    .trim()

  const headings = [...html.matchAll(/<h([1-6])\b/gi)].map((match) => Number(match[1]))

  return {
    text,
    characters: text.length,
    ratio: html.length === 0 ? 0 : text.length / html.length,
    headings,
  }
}

export function headingsAreSequential(levels: number[]): boolean {
  if (levels.length === 0 || levels[0] !== 1) return false
  for (let index = 1; index < levels.length; index++) {
    const current = levels[index]
    const previous = levels[index - 1]
    if (current === undefined || previous === undefined) return false
    if (current > previous + 1) return false
  }
  return true
}
