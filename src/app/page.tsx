import Image from "next/image"
import { Projects } from "@/components/projects"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/navbar"
import TechStack from "@/components/techstack"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Calendar, ExternalLink, Github, Linkedin, Twitter } from "lucide-react"

export default function Home() {
  return (
    <div className="max-w-[700px] mx-auto p-4">
      <Navbar />

      {/* Hero Section - Improved responsiveness */}
      <main className="mt-16 mb-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
          <div className="flex-shrink-0">
            <div className="relative">
              <Image src="/pic.png" alt="Jyoti Ogennavar" width={200} height={200} className="rounded-lg" />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
            </div>
          </div>
          <div className="flex flex-col justify-center text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold">
              Hey, I&apos;m <span className="text-blue-600">Jyoti Ogennavar</span>
            </h1>
            <h3 className="text-lg mt-2 text-slate-600 flex items-center justify-center md:justify-start gap-2">
              <MapPin className="w-4 h-4" />
              Frontend Developer based in Pune
            </h3>
            <p className="mt-4 text-slate-600 max-w-md">
              Passionate about creating beautiful, functional web experiences that make a difference.
            </p>
            <div className="flex gap-3 mt-6 justify-center md:justify-start">
              <Button size="sm" className="gap-2">
                <Mail className="w-4 h-4" />
                Get in touch
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                View Resume
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Separator />

      {/* About Section - Enhanced */}
      <section className="mt-10 mb-8">
        <h2 className="text-sm text-slate-500 uppercase tracking-wide font-medium">About Me</h2>
        <div className="mt-4 space-y-4">
          <p className="text-slate-700 leading-relaxed">
            Hi, I&apos;m Jyoti! As a Web Developer with 3+ years experience, I love crafting solutions that benefit the user
            and the business. I get excited about building pixel-perfect UI, performance optimizations, and smooth
            animations.
          </p>
          <p className="text-slate-700 leading-relaxed">
            When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open source projects, or
            sharing my knowledge through technical writing.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">3+</div>
            <div className="text-sm text-slate-600">Years Experience</div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">20+</div>
            <div className="text-sm text-slate-600">Projects Completed</div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">5+</div>
            <div className="text-sm text-slate-600">Technologies</div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Tech Stack */}
      <section className="mt-10 mb-8">
        <TechStack />
      </section>

      <Separator />

      {/* Skills Section - Improved responsiveness */}
      <section className="mt-10 mb-8">
        <h2 className="text-sm text-slate-500 uppercase tracking-wide font-medium">Things I Am Really Good At</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="p-6 hover:bg-slate-50 transition-colors rounded-lg">
            <CardTitle className="text-lg">Web Development</CardTitle>
            <CardDescription className="mt-3 text-slate-600">
              Building responsive and user-friendly websites using modern frameworks like React, Next.js, and
              TypeScript.
            </CardDescription>
          </Card>
          <Card className="p-6 hover:bg-slate-50 transition-colors rounded-lg">
            <CardTitle className="text-lg">UI/UX Design</CardTitle>
            <CardDescription className="mt-3 text-slate-600">
              Creating intuitive user interfaces and seamless user experiences using Figma and design systems.
            </CardDescription>
          </Card>
          <Card className="p-6 hover:bg-slate-50 transition-colors rounded-lg">
            <CardTitle className="text-lg">Problem Solving</CardTitle>
            <CardDescription className="mt-3 text-slate-600">
              Tackling complex challenges with clean, efficient code and algorithmic thinking.
            </CardDescription>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Experience Section - Enhanced */}
      <section className="mt-10 mb-8">
        <h2 className="text-sm text-slate-500 uppercase tracking-wide font-medium">Experience</h2>
        <div className="mt-6 space-y-6">
          <div className="border-l-2 border-blue-200 pl-6 relative">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-lg"></div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-lg font-semibold">Web Developer</h3>
              <Badge variant="secondary" className="w-fit">
                <Calendar className="w-3 h-3 mr-1" />
                2021 - Present
              </Badge>
            </div>
            <p className="text-blue-600 font-medium mb-3">miniOrange</p>
            <p className="text-slate-700 leading-relaxed">
              Developed and maintained responsive web applications using React and Next.js. Collaborated with
              cross-functional teams to deliver high-quality user experiences. Optimized application performance
              resulting in 40% faster load times.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">Next.js</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">Tailwind CSS</Badge>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Projects */}
      <section className="mt-10 mb-8">
        <Projects />
      </section>

      <Separator />

      {/* Writings Section - Added content */}
      <section className="mt-10 mb-8">
        <h2 className="text-sm text-slate-500 uppercase tracking-wide font-medium">Latest Writings</h2>
        <div className="mt-6 space-y-4">
          <article className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
            <h3 className="font-semibold text-lg">Building Responsive Components with Tailwind CSS</h3>
            <p className="text-slate-600 mt-2">
              A deep dive into creating flexible, responsive React components using Tailwind&apos;s utility classes.
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-slate-500">Dec 15, 2024</span>
              <Button variant="ghost" size="sm" className="gap-2">
                Read more <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </article>
          <article className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
            <h3 className="font-semibold text-lg">Performance Optimization in Next.js Applications</h3>
            <p className="text-slate-600 mt-2">
              Tips and techniques for improving your Next.js app&apos;s performance and user experience.
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

      {/* Contact/CTA Section - New */}
      <section className="mt-10 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            I&apos;m always interested in new opportunities and exciting projects. Let&apos;s discuss how we can bring your ideas
            to life.
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

      {/* Footer - Enhanced */}
      <footer className="mt-10 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">© 2024 Jyoti Ogennavar. All rights reserved.</p>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <Github className="w-4 h-4" />
              GitHub
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Twitter className="w-4 h-4" />
              Twitter
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
