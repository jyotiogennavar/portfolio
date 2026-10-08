import type { Metadata } from "next"
import { TextPage } from "@/components/text-page"
import { aboutBlocks, pageDescriptions } from "@/lib/site-pages"

export const metadata: Metadata = {
  title: "About",
  description: pageDescriptions.about,
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return <TextPage title="About" blocks={aboutBlocks} />
}
