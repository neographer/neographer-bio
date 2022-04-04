export default function Sidebar({ children }) {
  return (
    <>
      <nav className="flex flex-col z-10 from-neutral-800/95 to-gray-800/95 bg-gradient-to-tr md:w-64">{children}</nav>
    </>
  );
}
