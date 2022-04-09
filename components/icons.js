import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Icons({ type }) {
  const iconlist = {
    linkedin: <FaLinkedinIn className="opacity-50" size={20} />,
    twitter: <FaTwitter className="opacity-50" size={20} />,
    github: <FaGithub className="opacity-50" size={20} />,
  };
  return <>{iconlist[type]}</>;
}
