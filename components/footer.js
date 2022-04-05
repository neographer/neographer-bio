export default function Footer() {
  return (
    <footer className="from-neutral-800/95 to-gray-800/95 bg-gradient-to-l ml-2 mt-auto">
      <div className="flex flex-col md:flex-row w-full">
        <div className="justify-start grow m-2">
          <p className="text-xs font-thin opacity-30 text-white">Designed & Developed by Neographer.</p>
        </div>
        <div className="flex justify-end m-2">
          <h1 className="text-xs font-thin opacity-30 text-white">© {new Date().getFullYear()} Neographer. All Rights Reserved.</h1>
        </div>
      </div>
    </footer>
  );
}
