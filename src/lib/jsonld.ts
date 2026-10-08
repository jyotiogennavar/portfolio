import {
  EMAIL,
  POSTAL_ADDRESS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  sameAs,
} from "@/lib/site"

const address = {
  "@type": "PostalAddress",
  addressLocality: POSTAL_ADDRESS.addressLocality,
  addressRegion: POSTAL_ADDRESS.addressRegion,
  addressCountry: POSTAL_ADDRESS.addressCountry,
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  jobTitle: "Frontend Developer",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/jyoti.webp`,
  email: EMAIL,
  address,
  sameAs,
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Accessible web interfaces",
    "Frontend development",
  ],
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  logo: `${SITE_URL}/icon.svg`,
  email: EMAIL,
  sameAs,
  address,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "professional inquiries",
    email: EMAIL,
    areaServed: "IN",
    availableLanguage: ["English"],
  },
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
