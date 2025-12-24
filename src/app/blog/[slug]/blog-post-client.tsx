"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Calendar, Clock, Heart, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { compileMDX } from "next-mdx-remote/rsc"
import {
  Quote,
  NeedToKnow,
  MoreAbout,
  ResourceGrid,
  ResourceCard,
  H1,
  H2,
  H3,
  H4,
  P,
  A,
  UL,
  OL,
  LI,
  Blockquote,
  HR,
  Pre,
  Code,
  Img,
} from "@/components/mdx-components"
import type { BlogPost } from "@/lib/mdx"

type TableOfContentsItem = {
  id: string
  title: string
  level: number
}

const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  a: A,
  ul: UL,
  ol: OL,
  li: LI,
  blockquote: Blockquote,
  hr: HR,
  pre: Pre,
  code: Code,
  img: Img,
  Quote,
  NeedToKnow,
  MoreAbout,
  ResourceGrid,
  ResourceCard,
}

interface BlogPostClientProps {
  frontmatter: BlogPost
  content: string
  tableOfContents: TableOfContentsItem[]
}

export function BlogPostClient({ frontmatter, content, tableOfContents }: BlogPostClientProps) {
  const [activeSection, setActiveSection] = useState("")
  const [likes, setLikes] = useState(42)
  const [isLiked, setIsLiked] = useState(false)
  const [mdxContent, setMdxContent] = useState<React.ReactElement | null>(null)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    async function compileMdx() {
      const { content: compiledContent } = await compileMDX({
        source: content,
        components: mdxComponents,
        options: {
          parseFrontmatter: false,
        },
      })
      setMdxContent(compiledContent)
    }

    compileMdx()
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0% -35% 0%" },
    )

    tableOfContents.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [tableOfContents])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left" style={{ scaleX }} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Badge variant="secondary" className="mb-4">
              {frontmatter.category}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{frontmatter.title}</h1>
            <div className="flex items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{frontmatter.readingTime}</span>
              </div>
            </div>
            <Separator />
          </motion.div>

          {/* Content with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-gray dark:prose-invert max-w-[700px]">
                {mdxContent}

                {/* Feedback Section */}
                <motion.section
                  id="feedback"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mb-12 not-prose"
                >
                  <Card className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
                    <p className="text-muted-foreground mb-6">
                      Did you find this article helpful? Let me know what you think!
                    </p>
                    <div className="flex items-center gap-4">
                      <Button
                        variant={isLiked ? "default" : "outline"}
                        size="sm"
                        onClick={handleLike}
                        className="flex items-center gap-2"
                      >
                        <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
                        {likes} Likes
                      </Button>
                    </div>
                  </Card>
                </motion.section>
              </article>
            </div>

            {/* Sidebar Navigation - Desktop Only */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-8">
                <div className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Table of Contents
                  </h3>
                  <nav className="space-y-1">
                    {tableOfContents.map(({ id, title, level }) => (
                      <button
                        key={id}
                        onClick={() => scrollToSection(id)}
                        className={cn(
                          "block w-full text-left text-sm py-1 px-2 rounded transition-colors",
                          level === 3 && "ml-4",
                          activeSection === id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted",
                        )}
                      >
                        {title}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
