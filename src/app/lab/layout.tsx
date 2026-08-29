import type { Metadata } from "next";
import type React from "react";

const title = "Lab";
const description =
  "Interactive experiments and motion studies — small builds I use to learn.";
const url = "https://jyotiogennavar.com/lab";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "UI experiments",
    "motion design",
    "CSS animation",
    "interaction design",
    "React",
    "Next.js",
    "frontend",
  ],
  authors: [{ name: "Jyoti Ogennavar" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url,
    title,
    description,
    siteName: "Jyoti Ogennavar Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Labs — Jyoti Ogennavar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@JOgennavar",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/lab",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LabLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

export const dynamic = "force-static";
export const revalidate = 60;
