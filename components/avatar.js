import Image from "next/image";
import profilePic from "../public/images/me.jpg";
import data from "../data/data.json";
export default function Avatar() {
  return (
    <>
      <div>
        <div className="flex justify-center mt-5">
          <Image src={profilePic} alt="Picture of Owner" className="rounded-full" width={100} height={100} objectFit="cover" />
        </div>
        <h1 className="flex justify-center text-lg tracking-widest mt-3">{data.name}</h1>
        {!!data.taglines ? (
          data.taglines.map((tagline, index) => (
            <h1 key={index} className="flex justify-center text-xs tracking-tight opacity-60">
              {tagline}
            </h1>
          ))
        ) : (
          <h1 className="flex justify-center text-red-400">{"<Set taglines>"}</h1>
        )}
      </div>
    </>
  );
}
