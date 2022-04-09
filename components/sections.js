import SectionCard from "./section-card";

export default function Sections({ data }) {
  return (
    <div className="grow lg:min-h-screen lg:-mb-10">
      {data.map((section, index) => (
        <SectionCard section={section} key={index} />
      ))}
    </div>
  );
}
