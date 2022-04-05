export default function Header({ children }) {
  return (
    <>
      <div className="flex flex-row from-neutral-800/95 to-gray-800/95 bg-gradient-to-l ml-2 h-1/5">
        <div className="flex justify-center md:flex-1 flex-col">
          <p className="ml-10 text-sm md:text-3xl sm:text-2xl uppercase font-bold opacity-75">Discover my journey through time!</p>
        </div>
        <div className="flex-1"></div>
      </div>
    </>
  );
}
