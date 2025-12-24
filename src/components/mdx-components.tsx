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
    <h1 id={id} {...props} className="text-3xl md:text-4xl font-bold tracking-tight mt-8 mb-4">
      {children}
    </h1>
  )
}

export function H2({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const id = typeof children === "string" ? generateSlug(children) : undefined
  return (
    <h2 id={id} {...props} className="text-2xl md:text-3xl font-semibold tracking-tight mt-10 mb-4">
      {children}
    </h2>
  )
}

export function H3({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const id = typeof children === "string" ? generateSlug(children) : undefined
  return (
    <h3 id={id} {...props} className="text-xl md:text-2xl font-semibold tracking-tight mt-8 mb-3">
      {children}
    </h3>
  )
}

export function H4({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const id = typeof children === "string" ? generateSlug(children) : undefined
  return (
    <h4 id={id} {...props} className="text-lg md:text-xl font-semibold tracking-tight mt-6 mb-2">
      {children}
    </h4>
  )
}

export function P({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...props} className="leading-7 my-4">
      {children}
    </p>
  )
}

export function A({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} className="underline decoration-dotted underline-offset-4 text-primary hover:text-primary/80">
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
      className="border-l-4 border-muted-foreground/40 pl-6 py-2 my-6 text-muted-foreground italic"
    >
      {children}
    </blockquote>
  )
}

export function Quote({ children, author }: { children: React.ReactNode; author?: string }) {
  return (
    <blockquote className="border-l-4 border-primary pl-6 py-4 bg-muted/50 rounded-r-lg my-8">
      <p className="text-lg italic mb-2">{children}</p>
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
          <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold mb-3 text-amber-800 dark:text-amber-200">Need to Know</h2>
            <div className="space-y-3 text-amber-700 dark:text-amber-300 prose prose-sm">{children}</div>
          </div>
        </div>
      </CardContent>
    </Card>
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
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <ExternalLink className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
        <div>
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          <div className="text-sm space-y-1 prose prose-sm">{children}</div>
        </div>
      </div>
    </Card>
  )
}
