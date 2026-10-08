import type { Metadata } from "next"
import { TextPage } from "@/components/text-page"
import { contactBlocks, pageDescriptions } from "@/lib/site-pages"

export const metadata: Metadata = {
  title: "Contact",
  description: pageDescriptions.contact,
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return <TextPage title="Contact" blocks={contactBlocks} />
}
