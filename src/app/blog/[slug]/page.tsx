import React from 'react'
import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
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
} from '@/components/mdx-components'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  const baseUrl = 'https://your-domain.com' // Replace with your actual domain
  const postUrl = `${baseUrl}/blog/${slug}`
  const ogImage = post.ogImage || `${baseUrl}/og-image.png`

  return {
    title: post.metaTitle || `${post.title} - Your Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords || [],
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      title: post.ogTitle || post.title,
      description: post.ogDescription || post.excerpt,
      type: post.ogType as 'article' || 'article',
      url: postUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags || undefined,
    },
    twitter: {
      card: post.twitterCard as 'summary_large_image' || 'summary_large_image',
      title: post.twitterTitle || post.title,
      description: post.twitterDescription || post.excerpt,
      images: [post.twitterImage || ogImage],
    },
    alternates: {
      canonical: post.canonicalUrl || postUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    category: post.category || undefined,
    other: {
      'article:published_time': post.date,
      ...(post.author && { 'article:author': post.author }),
      ...(post.category && { 'article:section': post.category }),
      ...(post.tags && post.tags.length > 0 && { 'article:tag': post.tags.join(', ') }),
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author || 'Author',
    },
    datePublished: post.date,
    dateModified: post.date,
    image: post.ogImage || 'https://your-domain.com/og-image.png',
    url: `https://your-domain.com/blog/${slug}`,
    keywords: post.keywords?.join(', ') || undefined,
    wordCount: post.readingTime ? parseInt(post.readingTime.split(' ')[0]) * 200 : undefined,
    articleSection: post.category || undefined,
    articleBody: post.excerpt,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <article className="container mx-auto px-2 max-w-3xl">
        {/* <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.author && (
              <span>By {post.author}</span>
            )}
            {post.readingTime && (
              <span>{post.readingTime}</span>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header> */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </article>
    </>
  )
} 