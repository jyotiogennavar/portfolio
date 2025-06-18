import Image from "next/image";
// import { Projects } from "@/components/projects"
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/navbar";
import TechStack from "@/components/techstack";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Calendar,
  ExternalLink,
  Sparkles,
  Telescope,
  Sprout,
} from "lucide-react";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="max-w-[700px] mx-auto p-4">
      <Navbar />

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
            both users and businesses. I particularly enjoy building
            pixel-perfect UIs, optimizing for performance, and implementing
            smooth animations.
          </p>
          <p className="text-slate-700 leading-relaxed">
            When I&apos;m not coding, you&apos;ll find me exploring new
            technologies, consuming copious amounts of coffee, or trying to
            share my knowledge through technical writing.
          </p>
        </div>
      </section>

      <Separator />

      {/* Skills Section - Improved responsiveness */}
      <section className="mt-10 mb-8">
        <h2 className="text-sm text-slate-500 uppercase tracking-wide font-medium flex items-center gap-2">
          <Sparkles /> Things I Am Really Good At
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-6">
          <Card className="leading-relaxed p-4 rounded-sm">
            <CardTitle className="text-lg">Responsive UI Development</CardTitle>
            <CardDescription className="mt-3 text-slate-600">
              Creating seamless experiences across all devices and screen sizes
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

      <Separator />

      {/* Experience Section - Enhanced */}
      <section className="mt-10 mb-8">
        <h2 className="text-sm text-slate-500 uppercase tracking-wide font-medium">
          Experience
        </h2>
        <div className="mt-6 space-y-6">
          <div className="border-l-2 border-blue-200 pl-6 relative">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-lg"></div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-lg font-semibold">Web Developer</h3>
              <Badge variant="secondary" className="w-fit">
                <Calendar className="w-3 h-3 mr-1" />
                2022 - Present
              </Badge>
            </div>
            <p className="text-blue-600 font-medium mb-3">miniOrange</p>
            <p className="text-slate-700 leading-relaxed">
              Developed and maintained responsive web applications using React
              and Next.js. Collaborated with cross-functional teams to deliver
              high-quality user experiences. Optimized application performance
              resulting in 40% faster load times.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Projects */}
      <section className="mt-10 mb-8">
        <h2 className="text-sm text-slate-500 uppercase tracking-wide font-medium">
          Projects
        </h2>
        <p className="text-slate-600 mt-4">
          Working on something exciting! Coming soon.
        </p>
        {/* <Projects /> */}
      </section>

      <Separator />

      {/* Writings Section - Added content */}
      <section className="mt-10 mb-8">
        <h2 className="text-sm text-slate-500 uppercase tracking-wide font-medium flex items-center gap-2">
          <Sprout /> Writings
        </h2>
        <div className="mt-6 space-y-4">
          <article className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
            <h3 className="font-semibold text-lg">
              Building Responsive Components with Tailwind CSS
            </h3>
            <p className="text-slate-600 mt-2">
              A deep dive into creating flexible, responsive React components
              using Tailwind&apos;s utility classes.
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-slate-500">Dec 15, 2024</span>
              <Button variant="ghost" size="sm" className="gap-2">
                Read more <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </article>
          <article className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
            <h3 className="font-semibold text-lg">
              Performance Optimization in Next.js Applications
            </h3>
            <p className="text-slate-600 mt-2">
              Tips and techniques for improving your Next.js app&apos;s
              performance and user experience.
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-slate-500">Nov 28, 2024</span>
              <Button variant="ghost" size="sm" className="gap-2">
                Read more <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </article>
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline">View All Articles</Button>
        </div>
      </section>
      <Separator />
      {/* Currently Learning Section - New */}
      <section>
        <h2 className="text-sm text-slate-500 uppercase tracking-wide font-medium flex items-center gap-2">
          <Telescope /> Currently learning
        </h2>
        <p className="text-slate-600 mt-6">Animations of the Web by Emil</p>
        <p className="text-slate-600  mt-2">Road to Next JS by Rob</p>
      </section>
      <Separator />

      {/* Tech Stack */}
      <section className="mt-10 mb-8">
        <TechStack />
      </section>

      <Separator />

      {/* Contact/CTA Section - New */}
      <section className="mt-10 mb-8">
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

      <Separator />
      <Footer />
    </div>
  );
}
