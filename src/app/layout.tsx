import type React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import { organizationJsonLd, personJsonLd, serializeJsonLd } from "@/lib/jsonld"
import { SITE_DESCRIPTION } from "@/lib/site"

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Jyoti Ogennavar - Frontend Developer",
    template: "%s | Jyoti Ogennavar",
  },
  description: SITE_DESCRIPTION,
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
    description: SITE_DESCRIPTION,
    siteName: "Jyoti Ogennavar Portfolio",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Jyoti Ogennavar - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jyoti Ogennavar - Frontend Developer",
    description: SITE_DESCRIPTION,
    creator: "@JOgennavar", // Replace with your actual Twitter handle
    images: ["/og-image.png"],
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const containerClasses = "max-w-[800px] mx-auto px-4"

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="describedby" href="/llms.txt" />
      </head>
      <body className={`${bricolage.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd) }}
        />
        <ThemeProvider>
          <a
            href="#content"
            className="fixed start-4 top-4 z-toast -translate-y-16 rounded-md bg-background px-3 py-2 text-sm font-medium text-foreground shadow-raised transition-transform duration-150 ease-out focus:translate-y-0 focus-visible:translate-y-0"
          >
            Skip to content
          </a>
          <div className="flex min-h-screen flex-col">
            <header className="w-full">
              <div className={containerClasses}>
                <Navbar />
              </div>
            </header>

            <main id="content" tabIndex={-1} className="w-full flex-1 outline-none">
              <div className={containerClasses}>{children}</div>
            </main>

            <footer className="mt-auto w-full pb-[env(safe-area-inset-bottom)]">
              <div className={containerClasses}>
                <Footer />
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const dynamic = "force-static" // Ensures the layout is static
export const revalidate = 60 // Revalidate every 60 seconds for fresh content

