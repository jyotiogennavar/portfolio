import Image from "next/image";
import { Projects } from "@/components/projects";

import { Separator } from "@/components/ui/separator";

import { Navbar } from "@/components/navbar";
import TechStack from "@/components/techstack";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="max-w-[700px] mx-auto p-4">
      <Navbar />
      <main className="mt-16 mb-8 flex gap-x-8">
        <div className="">
          <Image
            src="/pic.png"
            alt="Jyoti Ogennavar"
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl">
            Hey, I’m <strong>Jyoti Ogennavar</strong>
          </h1>
          <h3 className="text-lg mt-2 text-slate-500">
            Frontend Developer based in Pune
          </h3>
        </div>
      </main>
      <Separator />
      <section className="mt-10 mb-8">
        <h2 className="text-sm text-slate-500">About Me</h2>
        <p className="mt-2">
          Hi, I&apos;m Jyoti! As a Web Developer with 3+ years experience, I
          love crafting solutions that benefit the user and the business. I get
          excited about building pixel-perfect UI, performance optimizations,
          and smooth animations.
        </p>
      </section>
      <Separator />
      <section className="mt-10 mb-8">
        <TechStack />
      </section>
      <Separator />
      <section className="mt-10 mb-8">
        <h2 className="text-sm text-slate-500">Things I Am Really Good At</h2>
        <div className="flex gap-x-5 mt-4">
          <Card className="w-1/3 p-4">
            <CardTitle>Web Development</CardTitle>
            <CardDescription className="mt-2">
              I have experience in building responsive and user-friendly
              websites using HTML, CSS, JavaScript, and React.
            </CardDescription>
          </Card>
          <Card className="w-1/3 p-4">
            <CardTitle>UI/UX Design</CardTitle>
            <CardDescription className="mt-2">
              I have experience in designing user interfaces and user
              experiences using Figma.
            </CardDescription>
          </Card>
          <Card className="w-1/3 p-4">
            <CardTitle>Problem Solving</CardTitle>
            <CardDescription className="mt-2">
              I have experience in solving complex problems using algorithms and
              data structures.
            </CardDescription>
          </Card>
        </div>
      </section>
      <Separator />
      <section className="mt-10 mb-8">
        <h2 className="text-sm text-slate-500">Experience</h2>
        <p className="text-lg mt-2">
          <strong>Web Developer</strong> at miniOrange
        </p>
        <p className="mt-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          id error debitis vero eveniet autem dolores quisquam voluptatum nobis
          earum quia maiores voluptatem magni, fugit nulla soluta non cum at?
        </p>
      </section>

      <Separator />
      <section className="mt-10 mb-8">
        <Projects />
      </section>

      <Separator />
      <section className="mt-10 mb-8">
        <h2>Writings</h2>
      </section>

      <Separator />
      <footer className="mt-10 mb-8"></footer>
    </div>
  );
}
