export default function SectionCard({ section }) {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-lg capitalize m-2 bg-stone-400/10">{section.name}</h1>
        <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
          {section.data.map((item, index) => (
            <div key={index} className="to-neutral-700/95 from-gray-700/95 bg-gradient-to-r m-2 p-2">
              <h1 className="text-sm font-semibold mx-1">{item.name}</h1>
              <h1 className="text-xs font-thin ml-1">{item.location}</h1>
              <h1 className="text-xs font-thin ml-1">
                {item.start}-{item.end}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
