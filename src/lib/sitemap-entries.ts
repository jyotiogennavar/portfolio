import { getAllPosts } from "@/lib/mdx"
import { SITE_URL } from "@/lib/site"

export type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"

export type SitemapEntry = {
  url: string
  lastModified: Date
  changeFrequency: ChangeFrequency
  priority: number
}

const PUBLISHED = new Date("2026-10-08T00:00:00.000Z")
const LAB_UPDATED = new Date("2026-09-22T00:00:00.000Z")

export function parseSiteDate(value: string): Date {
  const dayMonthYear = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value)
  if (dayMonthYear) {
    const parsed = new Date(
      Date.UTC(Number(dayMonthYear[3]), Number(dayMonthYear[2]) - 1, Number(dayMonthYear[1])),
    )
    if (!Number.isNaN(parsed.getTime())) return parsed
  }
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Unparseable date: ${value}`)
  }
  return parsed
}

export function sitemapEntries(): SitemapEntry[] {
  const posts = getAllPosts()
  const postEntries = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: parseSiteDate(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }))
  const latestPost = postEntries.reduce<Date | null>((latest, entry) => {
    if (!latest || entry.lastModified > latest) return entry.lastModified
    return latest
  }, null)

  return [
    { url: `${SITE_URL}/`, lastModified: PUBLISHED, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: PUBLISHED, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${SITE_URL}/contact`,
      lastModified: PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestPost ?? PUBLISHED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${SITE_URL}/lab`, lastModified: LAB_UPDATED, changeFrequency: "monthly", priority: 0.5 },
    ...postEntries,
  ]
}
