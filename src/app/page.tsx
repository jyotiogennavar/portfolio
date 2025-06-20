import Image from "next/image";

// import { Navbar } from "@/components/navbar";
import TechStack from "@/components/techstack";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Calendar,
  Telescope,
  Sprout,
  Sparkle,
} from "lucide-react";
import Footer from "@/components/footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[700px] mx-auto p-4">
      {/* <Navbar /> */}

      {/* Hero Section - Improved responsiveness */}
      <main className="mt-20 mb-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-center">
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                src="/jyoti-pic.webp"
                alt="Jyoti Ogennavar"
                width={100}
                height={100}
                className="rounded-xl"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center text-center md:text-left h-full md:justify-center">
            <h1 className="text-2xl md:text-4xl ">
              Hey, I&apos;m <span className="font-bold">Jyoti Ogennavar</span>
            </h1>
            <h3 className="mt-2 text-slate-600 flex items-center justify-center md:justify-start md:text-lg gap-2">
              Frontend Developer based in Pune
            </h3>
          </div>
        </div>
      </main>

      {/* About Section - Enhanced */}
      <section className="mt-8 mb-8">
        <div className="mt-4 space-y-4">
          <p className="text-slate-700 leading-relaxed">
            Hi, I&apos;m Jyoti! As a Web Developer with 3+ years of experience,
            I&apos;m passionate about crafting effective solutions that benefit
            both users and businesses. When I&apos;m not coding, you&apos;ll
            find me exploring new technologies, consuming copious amounts of
            coffee, or trying to share my knowledge through technical writing.
          </p>
        </div>
      </section>
      {/* Skills Section - Improved responsiveness */}
      <section className="mt-10">
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
      </section>
      {/* Projects */}
      <section className="mt-10">
        <h2 className="text-sm text-slate-500 uppercase tracking-wide font-medium">
          Projects
        </h2>
        <p className="text-slate-600 mt-4">
          Working on something exciting! Coming soon.
        </p>
        {/* <Projects /> */}
      </section>

      {/* Writings Section - Added content */}
      <section className="mt-10">
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
      </section>

      {/* Currently Learning Section - New */}
      <section className="mt-10">
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
      </section>

      {/* Tech Stack */}
      <section className="mt-10">
        <TechStack />
      </section>

      {/* Contact/CTA Section - New */}
      <section className="mt-10">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            I&apos;m always interested in new opportunities and exciting
            projects. Let&apos;s discuss how we can bring your ideas to life.
          </p>
          <div className="flex gap-3 justify-center">
            <Button className="gap-2">
              <Mail className="w-4 h-4" />
              Contact Me
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Schedule Call
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
