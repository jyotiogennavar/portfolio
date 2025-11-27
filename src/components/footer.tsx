"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

const PeerlistIcon = ({ className }: { className?: string }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    strokeWidth="1.5" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <path 
      d="M8.87026 3H15.1297C18.187 3 20.7554 5.29881 21.093 8.33741L21.3037 10.2331C21.4342 11.4074 21.4342 12.5926 21.3037 13.7669L21.093 15.6626C20.7554 18.7012 18.187 21 15.1297 21H8.87026C5.81296 21 3.24458 18.7012 2.90695 15.6626L2.69632 13.7669C2.56584 12.5926 2.56584 11.4074 2.69632 10.2331L2.90695 8.33741C3.24458 5.29881 5.81296 3 8.87026 3Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 17L9 13M9 13L9 7L13 7C14.6569 7 16 8.34315 16 10V10C16 11.6569 14.6569 13 13 13L9 13Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

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
    href: "https://x.com/JOgennavar",
    icon: Twitter,
  },
  {
    name: "Peerlist",
    href: "https://peerlist.io/jyotiogennavar",
    icon: PeerlistIcon,
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
      className="mt-16 mb-8 pt-8 border-t border-stone-200"
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
                className="gap-2 hover:bg-stone-50 hover:text-stone-600 transition-colors"
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
          <p className="text-stone-600 text-sm">© {new Date().getFullYear()} Jyoti Ogennavar. All rights reserved.</p>
          <p className="text-stone-500 text-xs">Built with Next.js, Tailwind CSS, and Framer Motion ✨</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer