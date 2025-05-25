"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Briefcase, PenTool, Mail } from "lucide-react"

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navItems = [

    { name: "Projects", href: "#projects", icon: Briefcase },
    { name: "Writing", href: "#writing", icon: PenTool },
    { name: "Contact", href: "#contact", icon: Mail },
  ]

  return (
    <nav
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-4 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-lg px-6 py-3">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-lg p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-lg hover:bg-slate-50"
                onClick={() => setIsOpen(false)}
              >
                {item.icon({ className: "w-4 h-4" })}
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
