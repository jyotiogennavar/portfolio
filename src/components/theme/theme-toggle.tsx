"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light")
  }

  const isDark = resolvedTheme === "dark"

  if (!mounted) {
    return <span className="inline-flex h-10 w-10" aria-hidden="true" />
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-md text-sm text-stone-900 will-change-transform transition-[transform,background-color] duration-200 ease-out active:scale-[0.97] hoverable:hover:bg-stone-50 dark:text-stone-100 dark:hoverable:hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-pressed={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="relative h-4 w-4">
        <Sun
          aria-hidden="true"
          className={`absolute inset-0 h-4 w-4 transition-[transform,opacity,filter] duration-200 ease-out ${
            isDark
              ? "scale-[0.25] opacity-0 blur-[4px]"
              : "scale-100 opacity-100 blur-0"
          }`}
        />
        <Moon
          aria-hidden="true"
          className={`absolute inset-0 h-4 w-4 transition-[transform,opacity,filter] duration-200 ease-out ${
            isDark
              ? "scale-100 opacity-100 blur-0"
              : "scale-[0.25] opacity-0 blur-[4px]"
          }`}
        />
      </span>
    </button>
  )
}
