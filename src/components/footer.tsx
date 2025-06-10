import { Button } from "@/components/ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-10 mb-8">
      <div className="flex flex-col items-center">
        <div className="flex gap-4 mb-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <Link
              href="https://github.com/jyotiogennavar"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Link
              href="https://www.linkedin.com/in/jyoti-ogennavar/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Link
              href="https://twitter.com/jyoti_ogennavar"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Link
              href="https://peerlist.io/jyotiogennavar"
              target="_blank"
              rel="noopener noreferrer"
            >
              Peerlist
            </Link>
          </Button>
        </div>
        <p className="text-slate-600 text-sm">
          © {new Date().getFullYear()} Jyoti Ogennavar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
