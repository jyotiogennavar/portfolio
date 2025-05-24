import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "E-commerce Dashboard",
    description:
      "A comprehensive admin dashboard for managing online stores with real-time analytics and inventory management.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Weather Forecast App",
    description: "A beautiful weather application with location-based forecasts and interactive maps.",
    technologies: ["React", "API Integration", "CSS3", "JavaScript"],
    liveUrl: "#",
    githubUrl: "#",
  },
]

export const Projects = () => {
  return (
    <div>
      <h2 className="text-sm text-slate-500 uppercase tracking-wide font-medium">Featured Projects</h2>
      <div className="mt-6 space-y-4">
        {projects.map((project, index) => (
          <article key={index} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
            <h3 className="font-semibold text-lg">{project.title}</h3>
            <p className="text-slate-600 mt-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs rounded-lg">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ExternalLink className="w-3 h-3" />
                  Live Demo
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Github className="w-3 h-3" />
                  Code
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button variant="outline">View All Projects</Button>
      </div>
    </div>
  )
}
