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
} from "@/components/icons";

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
];

const TechStack: React.FC = () => {
  return (
    <>
      <h2 className="text-sm text-slate-500">Technologies I Work With </h2>

      <ul className="list-none flex flex-wrap gap-2 mt-3">
        {techStack.map(({ icon, label }) => (
          <li key={label} className="tech-item">
              {icon} {label}
          </li>
        ))}
      </ul>
    </>
  );
};
export default TechStack;
