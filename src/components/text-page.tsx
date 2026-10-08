import Link from "next/link"
import type { Block, Inline } from "@/lib/prose"

const linkClassName =
  "underline decoration-stone-300 underline-offset-4 transition-[color] duration-150 ease-out hoverable:hover:decoration-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:decoration-stone-600 dark:hoverable:hover:decoration-stone-200"

function InlineView({ part }: { part: Inline }) {
  if (part.type === "text") return part.text
  if (part.href.startsWith("/")) {
    return (
      <Link href={part.href} className={linkClassName}>
        {part.text}
      </Link>
    )
  }
  const mail = part.href.startsWith("mailto:")
  return (
    <a
      href={part.href}
      className={linkClassName}
      {...(mail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
    >
      {part.text}
    </a>
  )
}

function BlockView({ block }: { block: Block }) {
  if (block.type === "h2") {
    return <h2 className="pt-4 text-xl font-semibold text-foreground">{block.text}</h2>
  }
  if (block.type === "ul") {
    return (
      <ul className="list-disc space-y-2 pl-5">
        {block.items.map((item, index) => (
          <li key={index}>
            {item.map((part, partIndex) => (
              <InlineView key={partIndex} part={part} />
            ))}
          </li>
        ))}
      </ul>
    )
  }
  return (
    <p>
      {block.content.map((part, index) => (
        <InlineView key={index} part={part} />
      ))}
    </p>
  )
}

export function TextPage({ title, blocks }: { title: string; blocks: Block[] }) {
  return (
    <article className="bg-background text-foreground">
      <h1 className="mb-4 mt-20 text-4xl font-bold tracking-tight">{title}</h1>
      <div className="mb-8 max-w-[65ch] space-y-4 text-pretty text-base leading-relaxed text-stone-600 dark:text-stone-400">
        {blocks.map((block, index) => (
          <BlockView key={index} block={block} />
        ))}
      </div>
    </article>
  )
}
