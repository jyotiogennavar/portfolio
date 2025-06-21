"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, ExternalLink } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/jyotiogennavar",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jyoti-ogennavar/",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/jyoti_ogennavar",
    icon: Twitter,
  },
  {
    name: "Peerlist",
    href: "https://peerlist.io/jyotiogennavar",
    icon: ExternalLink,
  },
]

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
  hover: {
    y: -2,
    transition: {
      duration: 0.2,
    },
  },
}

const Footer = () => {
  return (
    <motion.footer
      className="mt-16 mb-8 pt-8 border-t border-slate-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="flex flex-col items-center space-y-6">
        <motion.div className="flex gap-2 flex-wrap justify-center" variants={containerVariants}>
          {socialLinks.map(({ name, href, icon: Icon }) => (
            <motion.div key={name} variants={itemVariants} whileHover="hover">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                asChild
              >
                <Link href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="w-4 h-4" />
                  {name}
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="text-center space-y-2" variants={itemVariants}>
          <p className="text-slate-600 text-sm">© {new Date().getFullYear()} Jyoti Ogennavar. All rights reserved.</p>
          <p className="text-slate-500 text-xs">Built with Next.js, Tailwind CSS, and Framer Motion ✨</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
