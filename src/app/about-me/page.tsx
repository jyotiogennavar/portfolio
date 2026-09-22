import Link from "next/link";
import { Button } from "@/components/ui/button";

const AboutMePage = () => {
  return (
    <div className="bg-background text-foreground">
      <div className="mb-8 mt-20">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex min-h-[300px] w-full max-w-[500px] flex-col items-center justify-center rounded-xl border-4 border-dashed bg-card p-8 text-center transition-[border-color] duration-150 ease-out hoverable:hover:border-pink-500">
            <h1 className="mb-4 text-4xl font-bold">About Me</h1>
            <p className="max-w-[36ch] text-pretty text-lg text-stone-800 dark:text-stone-200">
              Still under construction — like most good things in life.
            </p>
            <Button asChild className="mt-6">
              <Link href="/lab">See the lab instead</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
