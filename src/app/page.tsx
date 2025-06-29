"use client";

import Image from "next/image";
import { motion, easeOut } from "framer-motion";
// import { Navbar } from "@/components/navbar";
import TechStack from "@/components/techstack";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, File, Telescope, Sprout, Sparkle } from "lucide-react";
import Footer from "@/components/footer";
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
  const handleContactClick = () => {
    window.location.href =
      "mailto:jyotiogennavar31@gmail.com?subject=Project Inquiry&body=Hi Jyoti, I'd like to discuss a project opportunity with you.";
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

  return (
    <motion.div
      className="max-w-[700px] mx-auto p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* <Navbar /> */}

      {/* Hero Section */}
      <motion.main className="mt-20 mb-8" variants={itemVariants}>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-center">
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                src="/jyoti.webp"
                alt="Jyoti Ogennavar"
                width={150}
                height={150}
                className="rounded-xl"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center text-center md:text-left h-full md:justify-center">
            <h1 className="text-2xl md:text-4xl ">
              Hey, I&apos;m <span className="font-bold">Jyoti Ogennavar</span>
            </h1>
            <p className="mt-2 text-slate-600 flex items-center justify-center md:justify-start md:text-lg gap-2">
              Frontend Developer based in Pune
            </p>
          </div>
        </div>
      </motion.main>

      {/* About Section*/}
      <motion.section className="mt-8 mb-8" variants={itemVariants}>
        <div className="mt-4 space-y-4">
          <p className="text-slate-700 leading-relaxed">
            Hi, as a Web Developer with 3+ years of experience,
            I&apos;m passionate about crafting effective solutions that benefit
            both users and businesses. When I&apos;m not coding, you&apos;ll
            find me exploring new technologies, consuming copious amounts of
            coffee, or trying to share my knowledge through technical writing.
          </p>
        </div>
      </motion.section>
      {/* Skills Section - Improved responsiveness */}
      <motion.section className="mt-10" variants={itemVariants}>
        <h2 className="text-sm text-slate-500 uppercase tracking-wide font-medium flex items-center gap-2">
          <Sparkle size={16} color="#64748b" /> Things I Am Really Good At
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-6">
          <Card className="leading-relaxed p-4 rounded-sm">
            <CardTitle className="text-lg">
              Responsive & Accessible Design
            </CardTitle>
            <CardDescription className="mt-3 text-slate-600">
              Crafting intuitive user interfaces that adapt across all devices
              while prioritizing accessibility.
            </CardDescription>
          </Card>
          <Card className="leading-relaxed p-4 rounded-sm">
            <CardTitle className="text-lg">
              Pixel-Perfect Implementation
            </CardTitle>
            <CardDescription className="mt-3 text-slate-600">
              Bringing designs to life with precision and attention to detail
            </CardDescription>
          </Card>
          <Card className="leading-relaxed p-4 rounded-sm">
            <CardTitle className="text-lg">
              Performance & UX Optimization
            </CardTitle>
            <CardDescription className="mt-3 text-slate-600">
              Optimizing for accessibility, speed, and exceptional user
              experience
            </CardDescription>
          </Card>
        </div>
      </motion.section>
      {/* Projects */}
      <motion.section className="mt-10" variants={itemVariants}>
        <h2 className="text-sm text-slate-500 uppercase tracking-wide font-medium">
          Projects
        </h2>
        <motion.div
          className="mt-6 p-6 border-2 border-dashed border-slate-200 rounded-lg text-center"
          whileHover={{ borderColor: "#3b82f6" }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-slate-600">
            🚀 Working on something exciting! Coming soon.
          </p>
        </motion.div>
        {/* <Projects /> */}
      </motion.section>

      {/* Writings Section - Added content */}
      <motion.section className="mt-10" variants={itemVariants}>
        <h2 className="text-sm text-slate-500 uppercase tracking-wide font-medium flex items-center gap-2">
          <Sprout size={16} color="#64748b" /> Writings
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
              <p className="text-sm text-slate-600 mt-2">
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
              <p className="text-sm text-slate-600 mt-2">
                Discover the importance of sitemaps for SEO and user experience,
                and learn how to create and submit them effectively.
              </p>
            </article>
          </Link>

          <p className="text-slate-600">
            More articles coming soon! Stay tuned.
          </p>
        </div>
      </motion.section>

      {/* Currently Learning Section - New */}
      <motion.section className="mt-10" variants={itemVariants}>
        <h2 className="text-sm text-slate-500 uppercase tracking-wide font-medium flex items-center gap-2">
          <Telescope size={16} color="#64748b" /> Currently learning
        </h2>
        <Link
          href="https://animations.dev/"
          target="_blank"
          title="Animations of the Web by Emil"
          className="hover:underline block"
        >
          <p className="text-slate-600 mt-6">
            Animations on the Web by Emil Kowalskil
          </p>
        </Link>
        <Link
          href="https://www.road-to-next.com/"
          target="_blank"
          title="Road to Next JS by Rob"
          className="hover:underline block mt-2"
        >
          <p className="text-slate-600 mt-2">
            Road to Next JS by Robin Wieruch
          </p>
        </Link>
      </motion.section>

      {/* Tech Stack */}
      <motion.section className="mt-10" variants={itemVariants}>
        <TechStack />
      </motion.section>

      {/* Contact/CTA Section - New */}
      <motion.section className="mt-10">
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            I&apos;m always interested in new opportunities and exciting
            projects. Let&apos;s discuss how we can bring your ideas to life.
          </p>
          <div className="flex gap-3 justify-center">
            <Button className="gap-2" onClick={handleContactClick}>
              <Mail className="w-3 h-3" />
              Contact Me
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

      <Footer />
    </motion.div>
  );
}
