"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter } from "lucide-react"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import Image from "next/image"

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
  { name: "GitHub", href: "https://github.com/jyotiogennavar", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jyoti-ogennavar/", icon: Linkedin },
  { name: "Twitter", href: "https://x.com/JOgennavar", icon: Twitter },
  { name: "Peerlist", href: "https://peerlist.io/jyotiogennavar", icon: PeerlistIcon },
]

const Footer = () => {
  return (
    <div className="mb-10 mt-20 border-t border-stone-200 pt-12 dark:border-stone-800">
      <div className="flex flex-col items-center gap-8">
        <Image
          src="/sign-1.svg"
          alt="Jyoti Ogennavar"
          width={791}
          height={168}
          className="pointer-events-none h-auto w-[min(100%,21rem)] select-none outline-none dark:invert"
        />



        <div className="flex w-full flex-wrap items-center justify-between gap-4 pt-1 text-sm text-stone-500 max-[425px]:flex-col max-[425px]:justify-center dark:text-stone-400">
        <nav aria-label="Social links" className="flex items-center gap-1">
          {socialLinks.map(({ name, href, icon: Icon }) => (
            <Button
              key={name}
              variant="ghost"
              size="icon"
              className="rounded-full text-stone-400 hoverable:hover:bg-stone-100 hoverable:hover:text-stone-800 dark:text-stone-400 dark:hoverable:hover:bg-stone-800 dark:hoverable:hover:text-stone-50"
              asChild
            >
              <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                <Icon className="h-4 w-4" />
              </Link>
            </Button>
          ))}
        </nav>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default Footer
