import Techicons from "./techicons";

export default function TechStack({ data }) {
  return (
    <>
      <div className="flex flex-col m-1">
        {data.map((tech, index) => (
          <div key={index} className="m-1">
            <h1 className="text-sm font-bold capitalize opacity-40">{tech.type}</h1>
            <Techicons items={tech.items} />
          </div>
        ))}
      </div>
    </>
  );
}
