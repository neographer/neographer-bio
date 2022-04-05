import Footer from "./footer";
import Header from "./header";

export default function Main({ children }) {
  return (
    <>
      <main className="grow from-neutral-800/95 to-gray-800/95 bg-gradient-to-br ml-2 my-1 overflow-y-auto">{children}</main>
    </>
  );
}
