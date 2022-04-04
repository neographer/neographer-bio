import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Icons({ type }) {
  const iconlist = {
    linkedin: <FaLinkedinIn className="fill-green-500 opacity-50" />,
    twitter: <FaTwitter className="fill-green-500 opacity-50" />,
    github: <FaGithub className="fill-green-500 opacity-50" />,
  };
  return <>{iconlist[type]}</>;
}
