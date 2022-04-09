export default function SectionCard({ section }) {
  return (
    <div className="flex flex-col">
      <h1 className="text-lg uppercase tracking-widest border-b-2 m-2 text-lightred/80">{section.name}</h1>
      <div className="grid lg:grid-flow-row grid-cols-2 lg:grid-cols-4 lg:gap-2">
        {section.data.map((item, index) => (
          <div key={index} className="m-2 p-2 hover:bg-lightred/5">
            <h1 className="font-semibold mx-1">{item.name}</h1>
            <h1 className="font-thin ml-1">{item.location}</h1>
            <h1 className="font-thin ml-1">
              {item.start}-{item.end}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
