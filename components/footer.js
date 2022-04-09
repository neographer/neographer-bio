export default function Footer() {
  return (
    <footer className="ml-2">
      <div className="flex justify-end m-2">
        <h1 className="text-xs font-thin opacity-30">© {new Date().getFullYear()} Neographer. All Rights Reserved.</h1>
      </div>
    </footer>
  );
}
