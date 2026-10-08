export const SITE_URL = "https://jyotiogennavar.com"

export const SITE_NAME = "Jyoti Ogennavar"

export const SITE_DESCRIPTION =
  "Frontend Developer with 4+ years of experience crafting responsive, accessible web applications. Specializing in React, Next.js, and modern web technologies."

export const EMAIL = "jyotiogennavar31@gmail.com"

export const MAILTO = `mailto:${EMAIL}`

export const POSTAL_ADDRESS = {
  addressLocality: "Pune",
  addressRegion: "Maharashtra",
  addressCountry: "IN",
} as const

export const socialProfiles = [
  { name: "GitHub", href: "https://github.com/jyotiogennavar" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jyoti-ogennavar/" },
  { name: "Twitter", href: "https://x.com/JOgennavar" },
  { name: "Peerlist", href: "https://peerlist.io/jyotiogennavar" },
] as const

export const sameAs = socialProfiles.map((profile) => profile.href)
