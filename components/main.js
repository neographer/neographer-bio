import Footer from "./footer";
import Header from "./header";

export default function Main({ children }) {
  return (
    <>
      <main className="grow from-neutral-500/20 to-gray-500/20 bg-gradient-to-tr m-5 overflow-y-auto">{children}</main>
    </>
  );
}
