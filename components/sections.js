import SectionCard from "./section-card";

export default function Sections({ data }) {
  return (
    <>
      {data.map((section, index) => (
        <SectionCard section={section} key={index} />
      ))}
    </>
  );
}
