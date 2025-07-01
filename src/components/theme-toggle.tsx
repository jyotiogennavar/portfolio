"use client";

import * as motion from "motion/react-client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isDark = theme === "dark";

  return (
    <button
      className="w-16 h-8 bg-stone-200 dark:bg-stone-700 rounded-full cursor-pointer flex p-1 transition-colors duration-200"
      style={{
        justifyContent: isDark ? "flex-end" : "flex-start",
      }}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className="w-6 h-6 bg-white dark:bg-stone-900 rounded-full flex items-center justify-center"
        layout
        transition={{
          type: "spring",
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      >
        {/* Conditionally render icon based on theme */}
        {isDark ? (
          <Moon className="w-4 h-4 text-blue-400" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500" />
        )}
      </motion.div>
    </button>
  );
} 






