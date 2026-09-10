import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Info, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import Image, { type ImageProps } from "next/image"

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

// Custom heading components that automatically generate IDs
export function H1({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const id = typeof children === "string" ? generateSlug(children) : undefined
  return (
    <h1 id={id} {...props} className="mb-4 mt-8 text-3xl font-bold tracking-tight md:text-4xl">
      {children}
    </h1>
  )
}

export function H2({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const id = typeof children === "string" ? generateSlug(children) : undefined
  return (
    <h2 id={id} {...props} className="mb-4 mt-10 text-2xl font-semibold tracking-tight md:text-3xl">
      {children}
    </h2>
  )
}

export function H3({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const id = typeof children === "string" ? generateSlug(children) : undefined
  return (
    <h3 id={id} {...props} className="mb-3 mt-8 text-xl font-semibold tracking-tight md:text-2xl">
      {children}
    </h3>
  )
}

export function H4({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const id = typeof children === "string" ? generateSlug(children) : undefined
  return (
    <h4 id={id} {...props} className="mb-2 mt-6 text-lg font-semibold tracking-tight md:text-xl">
      {children}
    </h4>
  )
}

export function P({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...props} className="my-4 leading-relaxed">
      {children}
    </p>
  )
}

export function A({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} className="break-words text-primary underline decoration-dotted decoration-from-font underline-offset-4 hoverable:hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      {children}
    </a>
  )
}

export function UL({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul {...props} className="my-4 list-disc pl-6 space-y-2">
      {children}
    </ul>
  )
}

export function OL({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol {...props} className="my-4 list-decimal pl-6 space-y-2">
      {children}
    </ol>
  )
}

export function LI({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li {...props} className="marker:text-muted-foreground">
      {children}
    </li>
  )
}

export function Blockquote({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      {...props}
      className="my-6 border-l-4 border-muted-foreground/40 py-2 pl-6 text-muted-foreground"
    >
      {children}
    </blockquote>
  )
}

export function Quote({ children, author }: { children: React.ReactNode; author?: string }) {
  return (
    <blockquote className="border-l-4 border-primary pl-6 py-4 bg-muted/50 rounded-r-lg my-8">
      <p className="mb-2 text-lg">{children}</p>
      {author && <cite className="text-sm text-muted-foreground">— {author}</cite>}
    </blockquote>
  )
}

export function HR(props: React.HTMLAttributes<HTMLHRElement>) {
  return <hr {...props} className="my-10 border-t border-muted" />
}

export function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-lg border bg-muted/60 p-4 text-sm leading-relaxed"
    >
      {children}
    </pre>
  )
}

export function Code({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      {...props}
      className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono"
    >
      {children}
    </code>
  )
}

export function Img(props: ImageProps) {
  const { className, width, height, alt, ...rest } = props

  if (width && height) {
    return (
      <Image
        {...rest}
        alt={alt}
        width={width}
        height={height}
        className={cn("rounded-lg mx-auto my-6 w-full h-auto object-cover", className)}
      />
    )
  }

  return (
    <div
      className="relative mx-auto my-6 w-full max-h-80 overflow-hidden"
      style={{ aspectRatio: "16 / 9" }}
    >
      <Image
        {...rest}
        alt={alt}
        fill
        sizes="100vw"
        className={cn("rounded-lg object-cover", className)}
      />
    </div>
  )
}

export function NeedToKnow({ children }: { children: React.ReactNode }) {
  return (
    <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20 my-8">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 pointer-events-none text-amber-600 dark:text-amber-400" />
          <div>
            <h2 className="text-xl font-semibold mb-3 text-amber-800 dark:text-amber-200">Need to Know</h2>
            <div className="space-y-3 text-amber-700 dark:text-amber-300 prose prose-sm">{children}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function HowItWorks({
  title = "How it works",
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <details className="not-prose my-10 rounded-xl border border-border bg-muted/40 px-5 py-1">
      <summary className="flex min-h-11 cursor-pointer list-none items-center font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
        {title}
      </summary>
      <div className="pb-5 pt-2 text-sm leading-7 text-muted-foreground [&_a]:text-foreground [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:bg-muted/60 [&_pre]:p-4 [&_pre]:text-sm">
        {children}
      </div>
    </details>
  )
}

export function MoreAbout({ children }: { children: React.ReactNode }) {
  return (
    <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20 my-8">
      <CardContent className="p-6">
        <div className="space-y-4 text-blue-700 dark:text-blue-300 prose prose-sm">{children}</div>
      </CardContent>
    </Card>
  )
}

export function ProjectLink({
  href,
  title = "View the project",
  description,
}: {
  href: string
  title?: string
  description?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="not-prose mt-10 flex items-start gap-3 rounded-xl bg-card p-5 text-foreground no-underline shadow-none transition-[box-shadow] duration-200 ease hoverable:hover:shadow-[0_8px_32px_rgba(236,72,153,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <ExternalLink className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
      <span>
        <span className="block font-semibold">{title}</span>
        {description ? (
          <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
        ) : null}
      </span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

export function ResourceGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2 my-6">{children}</div>
}

export function ResourceCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <ExternalLink className="mt-1 h-5 w-5 shrink-0 pointer-events-none text-primary" />
        <div>
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          <div className="text-sm space-y-1 prose prose-sm">{children}</div>
        </div>
      </div>
    </Card>
  )
}
