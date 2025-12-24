"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setHasInteracted(true)
    setTheme(resolvedTheme === "light" ? "dark" : "light")
  }

  const isDark = resolvedTheme === "dark"

  if (!mounted) {
    return (
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        className="relative px-2 py-2 rounded-md text-sm opacity-0 pointer-events-none"
        suppressHydrationWarning
      >
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative px-2 py-2 rounded-md text-sm text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors active:scale-90"
      aria-pressed={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative w-4 h-4">
        <Sun
          aria-hidden="true"
          className={`h-4 w-4 absolute inset-0 transition-all duration-500 ${
            isDark
              ? "scale-0 opacity-0 rotate-180"
              : `scale-100 opacity-100 rotate-0 ${
                  hasInteracted ? "animate-in spin-in-180 zoom-in-50 duration-500" : ""
                }`
          }`}
        />
        <Moon
          aria-hidden="true"
          className={`h-4 w-4 absolute inset-0 transition-all duration-500 ${
            isDark
              ? `scale-100 opacity-100 rotate-0 ${
                  hasInteracted ? "animate-in spin-in-180 zoom-in-50 duration-500" : ""
                }`
              : "scale-0 opacity-0 -rotate-180"
          }`}
        />
      </div>
    </button>
  )
}
