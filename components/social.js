import Icons from "./icons";
export default function Social({ data }) {
  return (
    <div className="flex flex-row m-4 pt-2 lg:mt-auto border-t-2 border-gray-400/20">
      {data.map((item, index) => (
        <div key={index} className="m-1">
          <a href={item.profileUrl} target="_blank" rel="noreferrer">
            <Icons type={item.type} />
          </a>
        </div>
      ))}
    </div>
  );
}
