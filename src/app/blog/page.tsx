import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { Metadata } from "next";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - Web Development Insights and Tutorials",
  description:
    "Explore my collection of articles on web development, React, Next.js, and modern frontend technologies. Stay updated with the latest trends and best practices.",
  keywords: [
    "web development",
    "react",
    "nextjs",
    "frontend",
    "javascript",
    "typescript",
    "blog",
    "tutorials",
  ],
  openGraph: {
    title: "Blog - Web Development Insights and Tutorials",
    description:
      "Explore my collection of articles on web development, React, Next.js, and modern frontend technologies.",
    type: "website",
    url: "https://your-domain.com/blog",
    images: [
      {
        url: "https://your-domain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blog - Web Development Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Web Development Insights and Tutorials",
    description:
      "Explore my collection of articles on web development, React, Next.js, and modern frontend technologies.",
    images: ["https://jyotiogennavar/og-image.png"],
  },
  alternates: {
    canonical: "https://jyotiogennavar/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="bg-background text-foreground">
      <div className="mt-2 mb-8">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-base text-stone-600 dark:text-stone-400 mb-6">
          Welcome to my blog! Here, I share my thoughts on web development,
          design, and technology.
        </p>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border border-border rounded-lg p-6 bg-card transition-colors"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold mb-2 hover:underline decoration-pink-500 decoration-wavy transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              {post.excerpt}
            </p>
            <time
              className="text-sm text-stone-500 dark:text-stone-400 block"
              dateTime={post.date}
            >
              {post.formattedDate}
            </time>
          </article>
        ))}
        
        {/* External Medium Articles */}
        <article className="border border-border rounded-lg p-6 bg-card transition-colors">
          <Link
            href="https://medium.com/design-bootcamp/boosting-website-visibility-a-complete-guide-to-on-page-seo-for-web-developers-7da71d5f95d2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 group"
          >
            <h2 className="text-xl font-semibold mb-2 hover:underline decoration-pink-500 decoration-wavy transition-colors flex-1">
              Boosting Website Visibility: A Complete Guide to On-Page SEO for Web Developers
            </h2>
            <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-1" />
          </Link>
          <p className="text-stone-600 dark:text-stone-400 mb-4">
            Learn how to optimize your website&apos;s on-page SEO to improve visibility and ranking on search engines.
          </p>
          <span className="text-sm text-stone-500 dark:text-stone-400 block">Medium</span>
        </article>

        <article className="border border-border rounded-lg p-6 bg-card transition-colors">
          <Link
            href="https://medium.com/design-bootcamp/website-sitemaps-101-your-websites-guide-to-success-3bf7c04129ce"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 group"
          >
            <h2 className="text-xl font-semibold mb-2 hover:underline decoration-pink-500 decoration-wavy transition-colors flex-1">
              Website Sitemaps 101: your website&apos;s guide to success
            </h2>
            <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-1" />
          </Link>
          <p className="text-stone-600 dark:text-stone-400 mb-4">
            Discover the importance of sitemaps for SEO and user experience, and learn how to create and submit them effectively.
          </p>
          <span className="text-sm text-stone-500 dark:text-stone-400 block">Medium</span>
        </article>
      </div>
    </div>
  );
}
