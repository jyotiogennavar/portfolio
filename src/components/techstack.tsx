import React from "react";
import  { Nextjs, StyledComponents, HTML5, TailwindCSS, CSSNew, Motion, GitHub, Figma, JavaScript, ReactIcon}  from "@/components/icons";


const TechStack: React.FC = () => {
  return (
    <>
      <h2 className="text-sm text-slate-500">Technologies I Work With </h2>
      <ul className="list-none flex flex-wrap gap-2 mt-3">
        <li className="border-2 border-slate-200 rounded-lg px-4 py-2 flex items-center gap-x-2"><HTML5/> HTML</li>
        <li className="border-2 border-slate-200 rounded-lg px-4 py-2 flex items-center gap-x-2"><CSSNew/> CSS</li>
        <li className="border-2 border-slate-200 rounded-lg px-4 py-2 flex items-center gap-x-2"><JavaScript/> JavaScript</li>
        <li className="border-2 border-slate-200 rounded-lg px-4 py-2 flex items-center gap-x-2"><ReactIcon /> React</li>
        <li className="border-2 border-slate-200 rounded-lg px-4 py-2 flex items-center gap-x-2"><Nextjs /> Next.js</li>
        <li className="border-2 border-slate-200 rounded-lg px-4 py-2 flex items-center gap-x-2"><TailwindCSS /> Tailwind CSS</li>
        <li className="border-2 border-slate-200 rounded-lg px-4 py-2 flex items-center gap-x-2"><StyledComponents /> Styled Components</li>
        <li className="border-2 border-slate-200 rounded-lg px-4 py-2 flex items-center gap-x-2"><GitHub /> GitHub</li>
        <li className="border-2 border-slate-200 rounded-lg px-4 py-2 flex items-center gap-x-2"><Figma /> Figma</li>
        <li className="border-2 border-slate-200 rounded-lg px-4 py-2 flex items-center gap-x-2"><Motion /> Framer Motion</li>
      </ul>
    </>
  );
};
export default TechStack;
