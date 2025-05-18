import React from "react";
import  { Nextjs, StyledComponents, HTML5, TailwindCSS, CSSNew, Motion, GitHub, Figma, JavaScript, ReactIcon}  from "@/components/icons";


const TechStack: React.FC = () => {
  return (
    <>
      <h2 className="text-sm text-slate-500">Technologies I Work With </h2>
      <ul className="list-none flex flex-wrap gap-2 mt-3">
        <li className="tech-item"><HTML5/> HTML</li>
        <li className="tech-item"><CSSNew/> CSS</li>
        <li className="tech-item"><JavaScript/> JavaScript</li>
        <li className="tech-item"><ReactIcon /> React</li>
        <li className="tech-item"><Nextjs /> Next.js</li>
        <li className="tech-item"><TailwindCSS /> Tailwind CSS</li>
        <li className="tech-item"><StyledComponents /> Styled Components</li>
        <li className="tech-item"><GitHub /> GitHub</li>
        <li className="tech-item"><Figma /> Figma</li>
        <li className="tech-item"><Motion /> Framer Motion</li>
      </ul>
    </>
  );
};
export default TechStack;
