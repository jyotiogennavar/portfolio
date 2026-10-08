"use client"

import Link from "next/link"

export const Navbar = () => {
  const navItems = [
    // { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blog" },
    { name: "Lab", href: "/lab" },
    // { name: "Contact", href: "#contact"},
  ]

  return (
    <nav className="flex items-center justify-between px-6 py-6">
      <Link
        href="/"
        className="inline-flex min-h-10 items-center rounded-md text-base font-semibold text-stone-800 transition-[color] duration-150 ease-out hoverable:hover:text-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-stone-100 dark:hoverable:hover:text-stone-300"
      >
        JO
      </Link>

      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="inline-flex min-h-10 items-center rounded-md text-sm font-medium text-stone-600 transition-[color] duration-150 ease-out hoverable:hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-stone-300 dark:hoverable:hover:text-stone-100"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}
