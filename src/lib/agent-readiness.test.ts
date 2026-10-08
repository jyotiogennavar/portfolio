import assert from "node:assert/strict"
import { test } from "node:test"
import { preferredType } from "./accept.ts"
import { contentStats, headingsAreSequential } from "./content-stats.ts"
import { buildLlmsTxt } from "./llms.ts"
import {
  MARKDOWN_MEDIA_TYPE,
  markdownForPath,
  markdownHeaders,
  notFoundMarkdown,
} from "./markdown-doc.ts"
import { planNegotiation } from "./negotiate.ts"
import { blocksPlainText } from "./prose.ts"
import { aboutBlocks, contactBlocks, privacyBlocks } from "./site-pages.ts"
import { homeAboutParagraphs } from "./home-content.ts"
import { organizationJsonLd, personJsonLd, serializeJsonLd } from "./jsonld.ts"
import { sitemapEntries } from "./sitemap-entries.ts"
import { EMAIL, SITE_URL } from "./site.ts"

const CHROME_ACCEPT =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"

test("Accept negotiation follows the published q-value table", () => {
  assert.equal(preferredType("text/markdown"), "text/markdown")
  assert.equal(preferredType("text/markdown, text/html;q=0.8"), "text/markdown")
  assert.equal(preferredType("text/html"), "text/html")
  assert.equal(preferredType("text/markdown;q=0, text/html"), "text/html")
  assert.equal(preferredType("text/markdown;q=0"), null)
  assert.equal(preferredType(null), "text/html")
  assert.equal(preferredType("*/*"), "text/html")
  assert.equal(preferredType(CHROME_ACCEPT), "text/html")
  assert.equal(preferredType("text/html;q=0, */*;q=1"), "text/markdown")
})

test("homepage Markdown is negotiated and HTML stays the default", () => {
  assert.deepEqual(planNegotiation("/", "text/markdown"), {
    action: "markdown",
    pathname: "/api/markdown",
  })
  assert.equal(planNegotiation("/", "text/html").action, "html")
  assert.equal(planNegotiation("/", CHROME_ACCEPT).action, "html")
  assert.equal(planNegotiation("/", null).action, "html")
  assert.deepEqual(planNegotiation("/about.md", null), {
    action: "markdown",
    pathname: "/api/markdown/about",
  })
  assert.deepEqual(planNegotiation("/index.md", "text/html"), {
    action: "markdown",
    pathname: "/api/markdown",
  })
  assert.equal(planNegotiation("/llms.txt", "text/markdown").action, "passthrough")
  assert.equal(planNegotiation("/sitemap.xml", "text/markdown").action, "passthrough")
  assert.equal(planNegotiation("/nope", "application/pdf").action, "not-acceptable")
  assert.deepEqual(planNegotiation("/about-me", "text/markdown"), {
    action: "markdown",
    pathname: "/api/markdown/about",
  })
})

test("Markdown responses name the media type and vary on Accept", () => {
  const headers = markdownHeaders(200)
  assert.equal(headers.get("Content-Type"), MARKDOWN_MEDIA_TYPE)
  assert.match(headers.get("Vary") ?? "", /\bAccept\b/)
  const missing = markdownForPath("/__ora-404-probe")
  assert.equal(missing.status, 404)
  assert.ok(missing.body.length >= 20)
  assert.match(missing.body, /llms\.txt/)
  assert.match(missing.body, /sitemap\.xml/)
  assert.match(notFoundMarkdown("/missing"), /No page exists at `\/missing`/)
})

test("known pages have nonempty Markdown and unknown blog slugs 404", () => {
  for (const path of ["/", "/about", "/contact", "/privacy", "/blog", "/lab"]) {
    const result = markdownForPath(path)
    assert.equal(result.status, 200, path)
    assert.ok(result.body.trim().length > 0, path)
    assert.match(result.body, /^# /)
  }
  assert.equal(markdownForPath("/blog/seven-petal-rose").status, 200)
  assert.match(markdownForPath("/blog/seven-petal-rose").body, /seven-petal rose|CSS/i)
  assert.equal(markdownForPath("/blog/not-a-real-post").status, 404)
  assert.match(markdownForPath("/").body, /Dreamfund/)
  assert.match(markdownForPath("/").body, /World Wide Wonder/)
})

test("homepage raw copy is long enough to lift the content ratio", () => {
  const about = homeAboutParagraphs.join(" ")
  assert.ok(about.length >= 1800, `about copy is ${about.length} characters`)
  assert.match(about, /Pune/)
  assert.match(about, /Dreamfund/)
})

test("trust pages each carry at least 500 characters", () => {
  for (const [name, blocks] of [
    ["about", aboutBlocks],
    ["contact", contactBlocks],
    ["privacy", privacyBlocks],
  ] as const) {
    const length = blocksPlainText(blocks).length
    assert.ok(length >= 500, `${name} is ${length} characters`)
  }
  assert.match(blocksPlainText(contactBlocks), new RegExp(EMAIL.replace(".", "\\.")))
})

test("llms.txt states when to use the site before the first file list", () => {
  const body = buildLlmsTxt([
    {
      title: "I Tried Drawing a Rose with CSS",
      slug: "seven-petal-rose",
      excerpt: "A rose drawn with CSS trigonometry.",
    },
  ])
  assert.match(body, /^# Jyoti Ogennavar\n\n> /)
  const firstHeading = body.indexOf("\n## ")
  const guidance = body.slice(0, firstHeading)
  assert.match(guidance, /When to use this/)
  assert.match(guidance, /How an agent should call this site/)
  assert.match(guidance, /Accept: text\/markdown/)
  assert.match(guidance, /Dreamfund/)
  assert.match(guidance, /Do not use this site/)
  assert.match(guidance, new RegExp(EMAIL))
  assert.match(body, /\[I Tried Drawing a Rose with CSS\]\(https:\/\/jyotiogennavar\.com\/blog\/seven-petal-rose\.md\)/)

  const sections = body.split(/^## /m).slice(1)
  for (const section of sections) {
    const items = section.split("\n").filter((line) => line.startsWith("- "))
    assert.ok(items.length > 0, section.slice(0, 40))
    for (const item of items) {
      assert.match(item, /^- \[[^\]]+\]\(https?:\/\/[^)]+\)/)
    }
  }
})

test("JSON-LD identifies a person and an organization with contact and address", () => {
  const person = JSON.parse(serializeJsonLd(personJsonLd)) as typeof personJsonLd
  const organization = JSON.parse(serializeJsonLd(organizationJsonLd)) as typeof organizationJsonLd

  assert.equal(person["@type"], "Person")
  assert.equal(person.name, "Jyoti Ogennavar")
  assert.ok(person.description.length > 20)
  assert.equal(person.url, SITE_URL)
  assert.ok(person.sameAs.length >= 3)

  assert.equal(organization["@type"], "Organization")
  assert.equal(organization.contactPoint["@type"], "ContactPoint")
  assert.equal(organization.contactPoint.email, EMAIL)
  assert.ok(organization.contactPoint.contactType.length > 0)
  assert.equal(organization.address["@type"], "PostalAddress")
  assert.equal(organization.address.addressLocality, "Pune")
  assert.equal(organization.address.addressCountry, "IN")
})

test("sitemap lists indexable URLs with lastmod dates", () => {
  const entries = sitemapEntries()
  const urls = entries.map((entry) => entry.url)
  for (const path of ["/", "/about", "/contact", "/privacy", "/blog", "/lab"]) {
    assert.ok(urls.includes(`${SITE_URL}${path === "/" ? "/" : path}`), path)
  }
  assert.ok(urls.includes(`${SITE_URL}/blog/seven-petal-rose`))
  assert.ok(urls.includes(`${SITE_URL}/blog/how-i-vibe-coded-my-digital-bookshelf`))
  assert.equal(urls.includes(`${SITE_URL}/about-me`), false)
  for (const entry of entries) {
    assert.equal(Number.isNaN(entry.lastModified.getTime()), false, entry.url)
    assert.match(entry.url, /^https:\/\/jyotiogennavar\.com/)
  }
})

test("heading levels cannot skip and content stats ignore scripts", () => {
  assert.equal(headingsAreSequential([1, 2, 2, 3, 2]), true)
  assert.equal(headingsAreSequential([2]), false)
  assert.equal(headingsAreSequential([1, 3]), false)
  const stats = contentStats(
    "<html><h1>Hello</h1><p>Visible words here.</p><script>secret secret secret</script></html>",
  )
  assert.equal(stats.headings[0], 1)
  assert.match(stats.text, /Visible words here/)
  assert.equal(stats.text.includes("secret"), false)
  assert.ok(stats.characters >= 20)
})
