export default function Footer() {
  return (
    <footer className="from-neutral-600/20 to-gray-600/50 bg-gradient-to-tr mx-5 mt-auto">
      <div className="flex flex-row w-full">
        <div className="justify-start grow m-2">
          <p className="text-sm font-thin opacity-30 text-white">Designed & Developed by Neographer.</p>
        </div>
        <div className="flex justify-end m-2">
          <h1 className="text-sm font-thin opacity-30 text-white">© {new Date().getFullYear()} Neographer. All Rights Reserved.</h1>
        </div>
      </div>
    </footer>
  );
}
