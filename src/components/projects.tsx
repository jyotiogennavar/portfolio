import Link from "next/link";
import { Card, CardDescription, CardFooter, CardTitle } from "./ui/card";
import { ArrowRightIcon } from "lucide-react";

const Projects = () => {
  return (
    <>
      <h2>Projects</h2>

      <Card className="p-4 mt-4">
        <CardTitle>Project 1</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatibus.
        </CardDescription>
        <CardFooter>
          <Link
            className="text-sm text-muted-foreground flex gap-x-2 justify-center"
            href="#"
          >
            View Project <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>

      <Card className="p-4 mt-4">
        <CardTitle>Project 2</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatibus.
        </CardDescription>
        <CardFooter>
          <Link
            className="text-sm text-muted-foreground flex gap-x-2 justify-center"
            href="#"
          >
            View Project <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export { Projects };
