import Link from "next/link";
import fa, { FaIcons, FaLinkedinIn } from "react-icons/fa";
import Icons from "./icons";
export default function Social({ data }) {
  return (
    <>
      <div className="flex flex-row w-full justify-center p-1 mt-auto bg-neutral-900">
        {data.map((item, index) => (
          <div key={index} className="m-1">
            <a href={item.profileUrl} target="_blank" rel="noreferrer">
              <Icons type={item.type} />
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
