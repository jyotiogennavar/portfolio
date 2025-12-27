"use client"

import Link from "next/link"

export const Navbar = () => {
  const navItems = [
    // { name: "Home", href: "/" },
    // { name: "About me", href: "/about-me" },
    // { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blog" },
    // { name: "Lab", href: "/lab" },
    // { name: "Contact", href: "#contact"},
  ]

  return (
    <nav className="flex items-center justify-between px-6 py-6">
      <Link
        href="/"
        className="text-sm font-semibold text-stone-800 transition-colors hover:text-stone-600 dark:text-stone-100 dark:hover:text-stone-300"
      >
        JO
      </Link>

      <div className="flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}
