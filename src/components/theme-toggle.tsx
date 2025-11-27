"use client"

import { useTheme } from "./theme-provider"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative px-2 py-2 rounded-md border border-stone-300 dark:border-stone-600 text-sm bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors active:scale-90"
      aria-pressed={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative w-4 h-4">
        <Sun
          aria-hidden="true"
          className={`h-4 w-4 absolute inset-0 transition-all duration-500 ${
            isDark
              ? "scale-0 opacity-0 rotate-180"
              : "scale-100 opacity-100 rotate-0 animate-in spin-in-180 zoom-in-50 duration-500"
          }`}
        />
        <Moon
          aria-hidden="true"
          className={`h-4 w-4 absolute inset-0 transition-all duration-500 ${
            isDark
              ? "scale-100 opacity-100 rotate-0 animate-in spin-in-180 zoom-in-50 duration-500"
              : "scale-0 opacity-0 -rotate-180"
          }`}
        />
      </div>
    </button>
  )
}
