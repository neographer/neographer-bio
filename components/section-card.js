export default function SectionCard({ section }) {
  return (
    <div className="flex flex-col">
      <h1 className="text-lg uppercase tracking-widest border-b-2 m-2 text-lightred/80">{section.name}</h1>
      <div className="grid lg:grid-flow-row grid-cols-1 lg:grid-cols-3 lg:gap-1">
        {section.data.map((item, index) => (
          <div key={index} className="shadow-lg m-2 p-2 hover:bg-lightred/5">
            <h1 className="font-bold text-lightred/50 mx-1">{item.position}</h1>
            {item.course ? <h1 className="font-bold text-lightred/50 mx-1">{item.course}</h1> : ""}
            {item.location && item.start && item.end ? (
              <h1 className="font-normal ml-1">
                {item.name}, {item.location}, {item.start}-{item.end}
              </h1>
            ) : (
              <h1 className="font-normal ml-1">{item.name}</h1>
            )}
            <ul className="list-disc list-inside ml-1">
              {item.desc
                ? item.desc.map((val, i) => (
                    <li key={i}>
                      <span className="font-thin">{val}</span>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
