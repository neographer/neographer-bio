export default function Header({ children }) {
  return (
    <>
      <div className="flex flex-row from-neutral-600/20 to-gray-600/50 bg-gradient-to-tr mt-5 mx-5 h-1/5">
        <div className="flex justify-center md:flex-1 flex-col">
          <p className="ml-10 md:text-3xl sm:text-2xl uppercase font-bold opacity-75">Discover my journey through time!</p>
        </div>
        <div className="flex-1"></div>
      </div>
    </>
  );
}
