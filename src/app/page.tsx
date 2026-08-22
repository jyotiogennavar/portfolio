"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, easeOut, useReducedMotion } from "framer-motion";
import TechStack from "@/components/techstack";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  File,
  Telescope,
  Sprout,
  Sparkle,
  Puzzle,
  Github,
  ArrowRight,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
// import { ThemeToggle } from "@/components/theme-toggle";

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

  const handleContactClick = () => {
    window.location.href =
      "mailto:hey@jyotiogennavar.com?subject=Project Inquiry&body=Hi Jyoti, I'd like to discuss a project opportunity with you.";
  };

  const handleResumeDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = "/resume-jyoti-ogennavar.pdf";
    link.download = "Jyoti-Ogennavar-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            <h1 className="text-2xl md:text-4xl ">
              Hey, I&apos;m <span className="font-bold">Jyoti Ogennavar</span>
            </h1>
            <p className="mt-2 text-stone-600 dark:text-stone-400 flex items-center justify-center md:justify-start md:text-lg gap-2">
              Frontend Developer based in Pune
            </p>
          </div>
        </div>
      </motion.main>

      {/* About Section*/}
      <motion.section className="mt-8 mb-8" variants={itemVariants}>
        <div className="mt-4 space-y-4">
          <p className="max-w-[65ch] leading-relaxed text-stone-700 dark:text-stone-300">
            Hi, as a Web Developer with 3+ years of experience, I&apos;m
            passionate about crafting effective solutions that benefit both
            users and businesses. When I&apos;m not coding, you&apos;ll find me
            exploring new technologies, consuming copious amounts of coffee, or
            trying to share my knowledge through technical writing.
          </p>
        </div>
      </motion.section>
      {/* Skills Section - Improved responsiveness */}
      <motion.section className="mt-10" variants={itemVariants}>
        <h2 className="text-sm text-stone-500 dark:text-stone-400 uppercase tracking-wide font-medium flex items-center gap-2">
          <Sparkle size={16} className="pointer-events-none text-stone-500 dark:text-stone-400" />{" "}
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
      {/* Projects */}
      <motion.section className="mt-10" variants={itemVariants}>
        <h2 className="text-sm text-stone-500 dark:text-stone-400 uppercase tracking-wide font-medium flex items-center gap-2">
          <Puzzle size={16} className="pointer-events-none text-stone-500 dark:text-stone-400" />
          Projects
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="flex h-full flex-col rounded-xl p-4">
            <div className="flex-1">
              <CardTitle className="mb-3 text-lg">Travel Blog Site</CardTitle>
              <CardDescription className="mb-4 text-pretty text-stone-600 dark:text-stone-400">
                A content-driven travel blog built with Next.js and Sanity CMS,
                designed for fast performance, clean UI, and easy content
                management with structured schemas and real-time previews.
              </CardDescription>
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2" asChild>
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
                Financial Dashboard
              </CardTitle>
              <CardDescription className="mb-4 text-pretty text-stone-600 dark:text-stone-400">
                An interactive financial dashboard that visualizes key metrics
                and trends using real-time data handling, reusable UI
                components, and clear data-driven layouts.
              </CardDescription>
            </div>
            <p className="mt-auto text-sm text-stone-500 dark:text-stone-400">
              Links will be available when this project ships.
            </p>
          </Card>
        </div>
      </motion.section>

      {/* Blogs Section - Added content */}
      <motion.section className="mt-10" variants={itemVariants}>
        <h2 className="text-sm text-stone-500 dark:text-stone-400 uppercase tracking-wide font-medium flex items-center gap-2">
          <Sprout size={16} className="pointer-events-none text-stone-500 dark:text-stone-400" />{" "}
          Blogs
        </h2>

        <div className="mt-6 space-y-6">
          <Link
            href="https://medium.com/design-bootcamp/boosting-website-visibility-a-complete-guide-to-on-page-seo-for-web-developers-7da71d5f95d2"
            target="_blank"
            title="Boosting Website Visibility: A Complete Guide to On-Page SEO for Web Developers"
            className="block"
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
            className="block"
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
            className="mt-2 hover:underline flex items-center gap-2"
          >
            Read more articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.section>

      {/* Currently Learning Section - New */}
      <motion.section className="mt-10" variants={itemVariants}>
        <h2 className="text-sm text-stone-500 dark:text-stone-400 uppercase tracking-wide font-medium flex items-center gap-2">
          <Telescope size={16} className="pointer-events-none text-stone-500 dark:text-stone-400" />{" "}
          Currently learning
        </h2>
        <Link
          href="https://animations.dev/"
          target="_blank"
          title="Animations of the Web by Emil"
          className="hover:underline block"
        >
          <p className="text-stone-600 dark:text-stone-400 mt-6">
            Animations on the Web by Emil Kowalskil
          </p>
        </Link>
        <Link
          href="https://www.road-to-next.com/"
          target="_blank"
          title="Road to Next JS by Rob"
          className="hover:underline block mt-2"
        >
          <p className="text-stone-600 dark:text-stone-400 mt-2">
            Road to Next JS by Robin Wieruch
          </p>
        </Link>
        <Link
          href="https://animations.dev/"
          target="_blank"
          title="Whimsical Animations by Josh Comeau"
          className="hover:underline block mt-2"
        >
          <p className="text-stone-600 dark:text-stone-400 mt-2">
            Whimsical Animations by Josh Comeau
          </p>
        </Link>
      </motion.section>

      {/* Tech Stack */}
      <motion.section className="mt-10" variants={itemVariants}>
        <TechStack />
      </motion.section>

      {/* Contact/CTA Section - New */}
      <motion.section className="mt-10">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-200 to-stone-100 p-8 text-center dark:from-stone-800 dark:to-stone-700">
          <h2 className="mb-4 text-2xl font-bold">Let&apos;s work together</h2>
          <p className="mx-auto mb-6 max-w-md text-pretty text-stone-600 dark:text-stone-300">
            I&apos;m always interested in new opportunities and exciting
            projects. Let&apos;s discuss how we can bring your ideas to life.
          </p>
          <div className="flex justify-center gap-3">
            <Button className="gap-2" onClick={handleContactClick}>
              <Mail className="h-4 w-4" />
              Send an email
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleResumeDownload}
            >
              <File className="w-4 h-4" />
              Resume
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-stone-200 shadow-lg will-change-transform transition-[transform,background-color] duration-200 ease-out hoverable:hover:scale-[1.04] hoverable:hover:bg-stone-300 dark:bg-stone-800 dark:hoverable:hover:bg-stone-600"
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
