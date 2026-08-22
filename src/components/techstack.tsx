import React from "react";
import {
  Nextjs,
  StyledComponents,
  HTML5,
  TailwindCSS,
  CSSNew,
  Motion,
  GitHub,
  Figma,
  JavaScript,
  ReactIcon,
  TypeScript,

} from "@/components/icons";
import { Wrench } from "lucide-react";

const techStack = [
  { icon: <HTML5 />, label: "HTML" },
  { icon: <CSSNew />, label: "CSS" },
  { icon: <JavaScript />, label: "JavaScript" },
  { icon: <ReactIcon />, label: "React" },
  { icon: <Nextjs />, label: "Next.js" },
  { icon: <TailwindCSS />, label: "Tailwind CSS" },
  { icon: <StyledComponents />, label: "Styled Components" },
  { icon: <GitHub />, label: "GitHub" },
  { icon: <Figma />, label: "Figma" },
  { icon: <Motion />, label: "Framer Motion" },
  { icon: <TypeScript />, label: "TypeScript" },

];

const TechStack: React.FC = () => {
  return (
    <>
      <h2 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
        <Wrench size={16} className="pointer-events-none text-stone-500 dark:text-stone-400" />
        Technologies I work with
      </h2>

      <ul className="mt-6 flex list-none flex-wrap gap-2">
        {techStack.map(({ icon, label }) => (
          <li key={label} className="flex items-center gap-x-2 whitespace-nowrap rounded-lg border border-text-card-foreground px-4 py-2">
              {icon} {label}
          </li>
        ))}
      </ul>
    </>
  );
};
export default TechStack;
