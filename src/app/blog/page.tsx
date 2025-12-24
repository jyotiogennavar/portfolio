import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { Metadata } from "next";

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
        <p className="text-base text-muted-foreground mb-6">
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
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {post.excerpt}
            </p>
            <time
              className="text-sm text-muted-foreground block"
              dateTime={post.date}
            >
              {post.formattedDate}
            </time>
          </article>
        ))}
      </div>
    </div>
  );
}
