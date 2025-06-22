// import Link from 'next/link'
import { Navbar } from '@/components/navbar'
// import { getAllPosts } from '@/lib/mdx'

export default function BlogPage() {
  // const posts = getAllPosts()

  return (
    <div className="max-w-[700px] mx-auto p-4">
      <Navbar />

      {/* Blog Header */}
      <header className="mt-20 mb-8">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to my blog! Here, I share my thoughts on web development, design,
          and technology. Feel free to explore the articles below.
        </p>
      </header>

      <p>The blog site is currently under construction.</p>

      {/* <div className="grid gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
            </Link>
            <time className="text-gray-600 text-sm">{post.date}</time>
            <p className="mt-4 text-gray-700">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-block mt-4 text-blue-600 hover:text-blue-800"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div> */}
    </div>
  )
} 