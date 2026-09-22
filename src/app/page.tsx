"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, easeOut, useReducedMotion } from "framer-motion";
import TechStack from "@/components/techstack";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sprout,
  Sparkle,
  Puzzle,
  Github,
  ArrowRight,
  ChevronUp,
  Eye,
} from "lucide-react";
import Link from "next/link";


// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down more than 300px
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      className="bg-background text-foreground"
      variants={containerVariants}
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
    >
      {/* Hero Section */}
      <motion.main className="mt-8 mb-8" variants={itemVariants}>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-center">
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                src="/jyoti.webp"
                alt="Jyoti Ogennavar"
                width={150}
                height={150}
                className="rounded-xl"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col justify-center text-center md:text-left h-full md:justify-center">
            <h1 className="text-2xl tracking-tight md:text-4xl">
              Hey, I&apos;m <span className="font-bold">Jyoti Ogennavar</span>
            </h1>
            <p className="mx-auto mt-2 max-w-prose text-pretty leading-relaxed text-stone-600 dark:text-stone-400 md:mx-0 md:text-start">
             A frontend developer with a passion for building user-friendly and efficient web applications.
            </p>
          </div>
        </div>
      </motion.main>


      {/* Projects */}
      <motion.section className="mt-10" variants={itemVariants}>
        <h2 className="text-sm text-stone-500 dark:text-stone-400 uppercase tracking-wide font-medium flex items-center gap-2">
          <Puzzle size={16} className="pointer-events-none select-none text-stone-500 dark:text-stone-400" />
          Projects
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="flex h-full flex-col rounded-xl p-4">
            <div className="flex-1">
              <CardTitle className="mb-3 text-lg">World Wide Wonder</CardTitle>
              <CardDescription className="mb-4 text-pretty text-stone-600 dark:text-stone-400">
                A content-driven travel blog built with Next.js and Sanity CMS,
                designed for fast performance, clean UI, and easy content
                management with structured schemas and real-time previews.
              </CardDescription>
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="https://github.com/jyotiogennavar/world-wide-wonder" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  View on GitHub
                </Link>
              </Button>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Live site coming soon
              </p>
            </div>
          </Card>
          <Card className="flex h-full flex-col rounded-xl p-4">
            <div className="flex-1">
              <CardTitle className="mb-3 text-lg">
                Dreamfund 
              </CardTitle>
              <CardDescription className="mb-4 text-pretty text-stone-600 dark:text-stone-400">
                A goal-based savings tracker that helps you set a target, track contributions, understand what&apos;s left, and know how much you need to save each month to reach your goal.
              </CardDescription>
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="https://github.com/jyotiogennavar/dreamfund" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  View on GitHub
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="https://dreamfund-rose.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <Eye className="h-4 w-4" />
                  View Live
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* Blogs Section - Added content */}
      <motion.section className="mt-10" variants={itemVariants}>
        <h2 className="text-sm text-stone-500 dark:text-stone-400 uppercase tracking-wide font-medium flex items-center gap-2">
          <Sprout size={16} className="pointer-events-none select-none text-stone-500 dark:text-stone-400" />{" "}
          Blogs
        </h2>

        <div className="mt-6 space-y-6">
          <Link
            href="https://medium.com/design-bootcamp/boosting-website-visibility-a-complete-guide-to-on-page-seo-for-web-developers-7da71d5f95d2"
            target="_blank"
            title="Boosting Website Visibility: A Complete Guide to On-Page SEO for Web Developers"
            className="block rounded-md transition-[color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <article>
              <h3 className="font-semibold">
                Boosting Website Visibility: A Complete Guide to On-Page SEO for
                Web Developers
              </h3>
              <p className="mt-2 text-pretty text-sm text-stone-600 dark:text-stone-400">
                Learn how to optimize your website&apos;s on-page SEO to improve
                visibility and ranking on search engines.
              </p>
            </article>
          </Link>

          <Link
            href="https://medium.com/design-bootcamp/website-sitemaps-101-your-websites-guide-to-success-3bf7c04129ce"
            target="_blank"
            title="Website Sitemaps 101: your website’s guide to success"
            className="block rounded-md transition-[color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <article>
              <h3 className="font-semibold">
                Website Sitemaps 101: your website’s guide to success
              </h3>
              <p className="mt-2 text-pretty text-sm text-stone-600 dark:text-stone-400">
                Discover the importance of sitemaps for SEO and user experience,
                and learn how to create and submit them effectively.
              </p>
            </article>
          </Link>

          <Link
            href="/blog"
            className="mt-2 inline-flex min-h-10 items-center gap-2 rounded-md transition-[color] duration-150 ease-out hoverable:hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Read more articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.section>
            {/* Skills Section - Improved responsiveness */}
            <motion.section className="mt-10" variants={itemVariants}>
        <h2 className="text-sm text-stone-500 dark:text-stone-400 uppercase tracking-wide font-medium flex items-center gap-2">
          <Sparkle size={16} className="pointer-events-none select-none text-stone-500 dark:text-stone-400" />{" "}
          Things I Am Really Good At
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-2">
          <Card className="rounded-xl p-4 leading-relaxed">
            <CardTitle className="text-lg">
              Responsive & Accessible Design
            </CardTitle>
            <CardDescription className="mt-3 text-pretty text-stone-600 dark:text-stone-400">
              Crafting intuitive user interfaces that adapt across all devices
              while prioritizing accessibility.
            </CardDescription>
          </Card>
          <Card className="rounded-xl p-4 leading-relaxed">
            <CardTitle className="text-lg">
              Pixel-Perfect Implementation
            </CardTitle>
            <CardDescription className="mt-3 text-pretty text-stone-600 dark:text-stone-400">
              Bringing designs to life with precision and attention to detail
            </CardDescription>
          </Card>
          <Card className="rounded-xl p-4 leading-relaxed">
            <CardTitle className="text-lg">
              Performance & UX Optimization
            </CardTitle>
            <CardDescription className="mt-3 text-pretty text-stone-600 dark:text-stone-400">
              Optimizing for accessibility, speed, and exceptional user
              experience
            </CardDescription>
          </Card>
        </div>
      </motion.section>

      {/* Tech Stack */}
      <motion.section className="mt-10" variants={itemVariants}>
        <TechStack />
      </motion.section>

 
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 z-toast flex h-11 w-11 items-center justify-center rounded-full bg-stone-200 shadow-raised transition-[transform,background-color] duration-150 ease-out active:scale-[0.96] hoverable:hover:bg-stone-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-stone-800 dark:hoverable:hover:bg-stone-600"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 text-stone-700 dark:text-stone-100" />
        </motion.button>
      )}
    </motion.div>
  );
}
