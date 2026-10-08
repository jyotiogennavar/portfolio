export type Inline =
  | { type: "text"; text: string }
  | { type: "link"; href: string; text: string }

export type Block =
  | { type: "p"; content: Inline[] }
  | { type: "h2"; text: string }
  | { type: "ul"; items: Inline[][] }

export function text(value: string): Inline {
  return { type: "text", text: value }
}

export function link(href: string, label: string): Inline {
  return { type: "link", href, text: label }
}

export function inlinePlainText(content: Inline[]): string {
  return content.map((part) => part.text).join("")
}

export function blocksPlainText(blocks: Block[]): string {
  return blocks
    .map((block) => {
      if (block.type === "h2") return block.text
      if (block.type === "p") return inlinePlainText(block.content)
      return block.items.map((item) => inlinePlainText(item)).join(" ")
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
}

export function inlineMarkdown(content: Inline[], siteUrl: string): string {
  return content
    .map((part) => {
      if (part.type === "text") return part.text
      const href = part.href.startsWith("/") ? `${siteUrl}${part.href}` : part.href
      return `[${part.text}](${href})`
    })
    .join("")
}

export function blocksToMarkdown(blocks: Block[], siteUrl: string): string {
  const lines: string[] = []
  for (const block of blocks) {
    if (block.type === "h2") {
      lines.push(`## ${block.text}`, "")
      continue
    }
    if (block.type === "p") {
      lines.push(inlineMarkdown(block.content, siteUrl), "")
      continue
    }
    for (const item of block.items) {
      lines.push(`- ${inlineMarkdown(item, siteUrl)}`)
    }
    lines.push("")
  }
  return `${lines.join("\n").trim()}\n`
}
