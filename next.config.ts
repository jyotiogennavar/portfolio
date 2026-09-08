import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
  // Lighthouse only inspects <head>. Next 15 streams metadata into <body> unless the UA is listed.
  htmlLimitedBots: /.*/,
}

export default withMDX(nextConfig)
