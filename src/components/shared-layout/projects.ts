export type LabProject = {
  id: string;
  name: string;
  period: string;
  summary: string;
  href?: string;
};

export const labProjects: LabProject[] = [
  {
    id: "travel-blog",
    name: "Travel Blog Site",
    period: "2025",
    summary:
      "A content-driven travel blog built with Next.js and Sanity CMS, designed for fast performance, clean UI, and easy content management with structured schemas and real-time previews.",
    href: "https://github.com/jyotiogennavar/world-wide-wonder",
  },
  {
    id: "financial-dashboard",
    name: "Financial Dashboard",
    period: "2025",
    summary:
      "An interactive financial dashboard that visualizes key metrics and trends using real-time data handling, reusable UI components, and clear data-driven layouts.",
  },
  {
    id: "digital-bookshelf",
    name: "Digital Bookshelf",
    period: "2026",
    summary:
      "An illustrated bookshelf of 169 books, with spine thickness driven by page count, grainy textures, and a quiet cloud-shader background. Built to feel still — not every element needed to move.",
  },
];

