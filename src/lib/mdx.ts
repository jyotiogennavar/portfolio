import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const rootDirectory = path.join(process.cwd(), 'src/content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  formattedDate: string
  excerpt: string
  content: string
  // SEO fields
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonicalUrl?: string
  author?: string
  category?: string
  tags?: string[]
  readingTime?: string
  featured?: boolean
  published?: boolean
}

function formatPostDate(date: string): string {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(rootDirectory)
  
  return files
    .filter((file) => path.extname(file) === '.mdx')
    .map((file) => {
      const filePath = path.join(rootDirectory, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContent)
      
      return {
        slug: path.basename(file, '.mdx'),
        title: data.title,
        date: data.date,
        formattedDate: formatPostDate(data.date),
        excerpt: data.excerpt,
        content,
        // SEO fields
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords,
        ogTitle: data.ogTitle,
        ogDescription: data.ogDescription,
        ogImage: data.ogImage,
        ogType: data.ogType || 'article',
        twitterCard: data.twitterCard || 'summary_large_image',
        twitterTitle: data.twitterTitle,
        twitterDescription: data.twitterDescription,
        twitterImage: data.twitterImage,
        canonicalUrl: data.canonicalUrl,
        author: data.author,
        category: data.category,
        tags: data.tags,
        readingTime: data.readingTime,
        featured: data.featured || false,
        published: data.published !== false, // Default to true if not specified
      }
    })
    .filter((post) => post.published) // Only return published posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    
    return {
      slug,
      title: data.title,
      date: data.date,
      formattedDate: formatPostDate(data.date),
      excerpt: data.excerpt,
      content,
      // SEO fields
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      keywords: data.keywords,
      ogTitle: data.ogTitle,
      ogDescription: data.ogDescription,
      ogImage: data.ogImage,
      ogType: data.ogType || 'article',
      twitterCard: data.twitterCard || 'summary_large_image',
      twitterTitle: data.twitterTitle,
      twitterDescription: data.twitterDescription,
      twitterImage: data.twitterImage,
      canonicalUrl: data.canonicalUrl,
      author: data.author,
      category: data.category,
      tags: data.tags,
      readingTime: data.readingTime,
      featured: data.featured || false,
      published: data.published !== false, // Default to true if not specified
    }
  } catch {
    return null
  }
} 