import type React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque, Caveat } from "next/font/google"
import "./globals.css"

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
})

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Jyoti Ogennavar - Frontend Developer",
    template: "%s | Jyoti Ogennavar",
  },
  description:
    "Frontend Developer with 3+ years of experience crafting responsive, accessible web applications. Specializing in React, Next.js, and modern web technologies.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "JavaScript",
    "TypeScript",
    "Web Development",
    "Responsive Design",
    "Accessibility",
    "Pune",
    "India",
  ],
  authors: [{ name: "Jyoti Ogennavar" }],
  creator: "Jyoti Ogennavar",
  publisher: "Jyoti Ogennavar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://jyotiogennavar.com"), 
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jyotiogennavar.com",
    title: "Jyoti Ogennavar - Frontend Developer",
    description:
      "Frontend Developer with 3+ years of experience crafting responsive, accessible web applications. Specializing in React, Next.js, and modern web technologies.",
    siteName: "Jyoti Ogennavar Portfolio",
    images: [
      {
        url: "/og-image.jpg", // You'll need to create this image (1200x630px)
        width: 1200,
        height: 630,
        alt: "Jyoti Ogennavar - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jyoti Ogennavar - Frontend Developer",
    description: "Frontend Developer with 3+ years of experience crafting responsive, accessible web applications.",
    creator: "@jyoti_ogennavar", // Replace with your actual Twitter handle
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${bricolage.variable} ${caveat.variable} antialiased`}>{children}</body>
    </html>
  )
}

export const dynamic = "force-static" // Ensures the layout is static
export const revalidate = 60 // Revalidate every 60 seconds for fresh content

