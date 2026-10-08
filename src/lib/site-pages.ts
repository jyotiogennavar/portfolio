import { link, text, type Block } from "@/lib/prose"
import { EMAIL, MAILTO, socialProfiles } from "@/lib/site"

export const aboutBlocks: Block[] = [
  {
    type: "p",
    content: [
      text(
        "Jyoti Ogennavar is a frontend developer based in Pune, India. She designs and builds the interface layer of web applications: the layout, the states, and the details that decide whether a product feels finished. This page is the longer version of the introduction on the homepage.",
      ),
    ],
  },
  {
    type: "p",
    content: [
      text(
        "She has more than four years of experience with responsive, accessible interfaces. The stack she uses most is React, Next.js, TypeScript, and Tailwind CSS. Keyboard access, a visible focus state, reduced motion, and performance on everyday phones are part of the build, not a pass she runs after the screens are already considered done. She also writes about the work, including CSS trigonometry, motion studies, and on-page SEO.",
      ),
    ],
  },
  {
    type: "h2",
    text: "Work on this site",
  },
  {
    type: "p",
    content: [
      text(
        "World Wide Wonder is a content-driven travel blog built with Next.js and Sanity CMS, with structured content and real-time previews. The live site is not launched. Dreamfund is a goal-based savings tracker for setting a target, logging contributions, and seeing the monthly amount still required. Smaller studies live in the ",
      ),
      link("/lab", "lab"),
      text(
        ", where she tests how an interaction should feel before it belongs in a product. The ",
      ),
      link("/blog", "blog"),
      text(" holds the write-ups, and two longer SEO guides are published on Medium."),
    ],
  },
  {
    type: "h2",
    text: "What this site is for",
  },
  {
    type: "p",
    content: [
      text(
        "Use this site to check who she is, which interfaces she has shipped, and how to reach her. It is a personal portfolio, not a company with a support team. She does not take Dreamfund account questions here, and World Wide Wonder does not have a live magazine yet. For a frontend role, a contract, or a question about a project on this site, write from the ",
      ),
      link("/contact", "contact page"),
      text("."),
    ],
  },
]

export const contactBlocks: Block[] = [
  {
    type: "p",
    content: [
      text("The way to reach Jyoti Ogennavar is email: "),
      link(MAILTO, EMAIL),
      text(
        ". There is no phone number and no contact form on this site. Write to that address for a frontend role, a contract, a collaboration, or a question about a project published here.",
      ),
    ],
  },
  {
    type: "p",
    content: [
      text(
        "Include what you want built or reviewed, the timeline, and any links that matter. She reads the mail herself. This page does not promise a response time. Messages sent to any other address are not a channel she maintains for jyotiogennavar.com.",
      ),
    ],
  },
  {
    type: "h2",
    text: "Profiles",
  },
  {
    type: "p",
    content: [
      text(
        "These are the public profiles linked from the footer. Use them to confirm you have the right person before you write.",
      ),
    ],
  },
  {
    type: "ul",
    items: socialProfiles.map((profile) => [link(profile.href, profile.name)]),
  },
  {
    type: "h2",
    text: "Where she is",
  },
  {
    type: "p",
    content: [
      text(
        "Jyoti is based in Pune, Maharashtra, India. She does not publish a street address. If you need a mailing address, ask by email first. Do not send account passwords, payment details, or Dreamfund support issues to this address. Dreamfund product questions belong with that app. World Wide Wonder does not have a live site yet.",
      ),
    ],
  },
]

export const privacyBlocks: Block[] = [
  {
    type: "p",
    content: [
      text(
        "This is the privacy notice for jyotiogennavar.com, the personal portfolio of Jyoti Ogennavar, a frontend developer in Pune, India. It describes what this website does with information about the people who read it.",
      ),
    ],
  },
  {
    type: "h2",
    text: "What you can do here",
  },
  {
    type: "p",
    content: [
      text(
        "The site is a set of pages about her work, writing, and experiments. You can read it without creating an account. There is no login, no shopping cart, and no newsletter signup. The contact page asks you to email ",
      ),
      link(MAILTO, EMAIL),
      text(
        " yourself. That message is ordinary email between you and her. This website does not store a copy of it in a form database, because there is no form.",
      ),
    ],
  },
  {
    type: "h2",
    text: "Scripts, cookies, and logs",
  },
  {
    type: "p",
    content: [
      text(
        "These pages do not run a third-party analytics script, advertising pixel, or cookie banner. The site does not set its own tracking cookies. Your browser will still request the page, its images, and its fonts from the host. Fonts are delivered with the site rather than fetched from a separate font service at view time. The company that hosts the site may keep standard server logs, such as IP address, user agent, and the URL requested, for security and operations. Those logs are not a product she sells, and she does not use them to build an advertising profile.",
      ),
    ],
  },
  {
    type: "h2",
    text: "Other sites",
  },
  {
    type: "p",
    content: [
      text(
        "Links to GitHub, LinkedIn, X, Peerlist, Medium, and project demos leave this site. Those sites have their own privacy notices. Embedded or linked content is not covered here. If you email her about information on this site, she will use the message to reply. She does not share that correspondence for marketing. Questions about this notice go to the same email address.",
      ),
    ],
  },
]

export const pageDescriptions = {
  about:
    "Who Jyoti Ogennavar is, the frontend work she does from Pune, and what this portfolio is for.",
  contact:
    "How to email Jyoti Ogennavar about frontend work, and the public profiles she actually uses.",
  privacy:
    "What jyotiogennavar.com collects: no accounts, no analytics scripts, and email that stays email.",
} as const
