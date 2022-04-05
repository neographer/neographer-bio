import { FaJava, FaJs, FaReact, FaVuejs } from "react-icons/fa";
import { SiNestjs, SiSpringboot, SiTypescript } from "react-icons/si";

export default function Techicons({ items }) {
  const techiconlist = {
    java: <FaJava className="fill-green-500 m-1 w-5 h-5" />,
    javascript: <FaJs className="fill-green-500 m-1 w-5 h-5" />,
    typescript: <SiTypescript className="fill-green-500 m-1 w-5 h-5" />,
    "spring boot": <SiSpringboot className="fill-green-500 m-1 w-5 h-5" />,
    nestjs: <SiNestjs className="fill-green-500 m-1 w-5 h-5" />,
    vuejs: <FaVuejs className="fill-green-500 m-1 w-5 h-5" />,
    reactjs: <FaReact className="fill-green-500 m-1 w-5 h-5" />,
  };
  return (
    <>
      <div className="grid grid-flow-col justify-start">{items.map(tech => techiconlist[tech])}</div>
    </>
  );
}
