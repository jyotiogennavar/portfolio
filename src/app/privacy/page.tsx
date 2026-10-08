import type { Metadata } from "next"
import { TextPage } from "@/components/text-page"
import { pageDescriptions, privacyBlocks } from "@/lib/site-pages"

export const metadata: Metadata = {
  title: "Privacy",
  description: pageDescriptions.privacy,
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return <TextPage title="Privacy" blocks={privacyBlocks} />
}
