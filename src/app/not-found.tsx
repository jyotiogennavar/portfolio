import Link from "next/link"

const linkClassName =
  "underline decoration-stone-300 underline-offset-4 hoverable:hover:decoration-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:decoration-stone-600"

export default function NotFound() {
  return (
    <article className="mb-16 mt-20">
      <h1 className="mb-4 text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="max-w-[65ch] text-pretty leading-relaxed text-stone-600 dark:text-stone-400">
        Nothing on this site lives at this address. The link may be out of date, or the path may be mistyped.
      </p>
      <ul className="mt-6 space-y-2 text-base text-stone-600 dark:text-stone-400">
        <li>
          <Link href="/" className={linkClassName}>
            Homepage
          </Link>
        </li>
        <li>
          <Link href="/sitemap.xml" className={linkClassName}>
            Sitemap
          </Link>
        </li>
        <li>
          <Link href="/llms.txt" className={linkClassName}>
            Agent guide
          </Link>
        </li>
      </ul>
    </article>
  )
}
