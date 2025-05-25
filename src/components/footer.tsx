import { Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"


const Footer = () => {
  return (
    <footer className="mt-10 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Jyoti Ogennavar. All rights reserved.
            </p>
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
  )
}
export default Footer