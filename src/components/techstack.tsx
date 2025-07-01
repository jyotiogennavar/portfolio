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
      <h2 className="text-sm text-stone-500 dark:text-stone-400 uppercase flex items-center gap-2"><Wrench  size={16} className="text-stone-500 dark:text-stone-400" />TECHNOLOGIES I WORK WITH</h2>

      <ul className="list-none flex flex-wrap gap-2 mt-6">
        {techStack.map(({ icon, label }) => (
          <li key={label} className="border border-text-card-foreground rounded-lg px-4 py-2 flex items-center gap-x-2 ">
              {icon} {label}
          </li>
        ))}
      </ul>
    </>
  );
};
export default TechStack;
