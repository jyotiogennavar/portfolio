// HTTP checks. Skipped unless BASE_URL points at `next start`.
import assert from "node:assert/strict"
import { test } from "node:test"
import { contentStats, headingsAreSequential } from "./content-stats.ts"
import { EMAIL } from "./site.ts"

const base = process.env.BASE_URL

async function request(path: string, accept: string) {
  const response = await fetch(new URL(path, base), {
    headers: { Accept: accept },
    redirect: "follow",
  })
  const body = await response.text()
  return { response, body }
}

test("markdown and html negotiation", { skip: !base }, async () => {
  const markdown = await request("/", "text/markdown")
  assert.equal(markdown.response.status, 200)
  assert.match(markdown.response.headers.get("content-type") ?? "", /text\/markdown/)
  assert.match(markdown.response.headers.get("vary") ?? "", /\baccept\b/i)
  assert.ok(markdown.body.trim().length > 0)
  assert.match(markdown.body, /^# /)

  const html = await request("/", "text/html")
  assert.equal(html.response.status, 200)
  assert.match(html.response.headers.get("content-type") ?? "", /text\/html/)
  assert.match(html.body, /<h1[\s>]/i)
  assert.equal(html.body.includes("text/markdown"), false)

  const sibling = await request("/index.md", "text/html")
  assert.equal(sibling.response.status, 200)
  assert.match(sibling.response.headers.get("content-type") ?? "", /text\/markdown/)
})

test("markdown 404 keeps status 404 and explains the miss", { skip: !base }, async () => {
  const missing = await request("/__ora-404-probe-local", "text/markdown")
  assert.equal(missing.response.status, 404)
  assert.match(missing.response.headers.get("content-type") ?? "", /text\/markdown/)
  assert.match(missing.response.headers.get("vary") ?? "", /\baccept\b/i)
  assert.ok(missing.body.length >= 20)
  assert.match(missing.body, /llms\.txt/)
  assert.match(missing.body, /sitemap\.xml/)

  const htmlMissing = await request("/__ora-404-probe-html", "text/html")
  assert.equal(htmlMissing.response.status, 404)
  assert.match(htmlMissing.response.headers.get("content-type") ?? "", /text\/html/)
})

test("machine-readable files and trust pages", { skip: !base }, async () => {
  const sitemap = await request("/sitemap.xml", "application/xml")
  assert.equal(sitemap.response.status, 200)
  assert.match(sitemap.response.headers.get("content-type") ?? "", /xml/)
  assert.match(sitemap.body, /<urlset/)
  assert.match(sitemap.body, /<lastmod>/)
  assert.match(sitemap.body, /<loc>https:\/\/jyotiogennavar\.com\/about<\/loc>/)
  assert.match(sitemap.body, /<loc>https:\/\/jyotiogennavar\.com\/contact<\/loc>/)
  assert.match(sitemap.body, /<loc>https:\/\/jyotiogennavar\.com\/privacy<\/loc>/)
  assert.ok(sitemap.body.length < 50 * 1024 * 1024)

  const llms = await request("/llms.txt", "text/plain")
  assert.equal(llms.response.status, 200)
  const firstHeading = llms.body.indexOf("\n## ")
  assert.match(llms.body.slice(0, firstHeading), /When to use this/)
  assert.match(llms.body, /Accept: text\/markdown/)

  const robots = await request("/robots.txt", "text/plain")
  assert.equal(robots.response.status, 200)
  assert.match(robots.body, /Sitemap: https:\/\/jyotiogennavar\.com\/sitemap\.xml/)

  for (const path of ["/about", "/contact", "/privacy"]) {
    const page = await request(path, "text/html")
    assert.equal(page.response.status, 200, path)
    const stats = contentStats(page.body)
    assert.match(page.body, /<h1[\s>]/i)
    assert.ok(stats.characters >= 500, `${path} text is ${stats.characters}`)
  }

  const aboutRedirect = await fetch(new URL("/about-me", base), { redirect: "manual" })
  assert.ok(aboutRedirect.status === 308 || aboutRedirect.status === 301)
  assert.match(aboutRedirect.headers.get("location") ?? "", /\/about$/)
})

test("homepage HTML has structured data and an H1", { skip: !base }, async () => {
  const html = await request("/", "text/html")
  assert.match(html.body, /"@type":"Person"/)
  assert.match(html.body, /"@type":"Organization"/)
  assert.match(html.body, /"@type":"ContactPoint"/)
  assert.match(html.body, /"@type":"PostalAddress"/)
  assert.match(html.body, new RegExp(EMAIL.replace(/[.]/g, "\\.")))
  assert.equal(html.body.includes("This portfolio is not Dreamfund support"), false)

  const stats = contentStats(html.body)
  assert.equal(stats.headings[0], 1)
  assert.equal(headingsAreSequential(stats.headings), true, stats.headings.join(","))
  assert.ok(stats.characters >= 500, `characters ${stats.characters}`)
})

test("a browser Accept header still receives HTML", { skip: !base }, async () => {
  const html = await request(
    "/",
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  )
  assert.equal(html.response.status, 200)
  assert.match(html.response.headers.get("content-type") ?? "", /text\/html/)
})
