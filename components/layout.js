import Avatar from "./avatar";
import Footer from "./footer";
import Header from "./header";
import Main from "./main";
import Sidebar from "./sidebar";
import data from "../data/data.json";
import Sections from "./sections";
import Social from "./social";
import TechStack from "./techstack";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex min-h-screen font-sans text-white overflow-hidden">
        <div className="z-10 flex flex-row grow m-2 bg-neutral-900/70">
          {children}
          <Sidebar>
            <Avatar />
            <TechStack data={data.techstack} />
            <Social data={data.social} />
          </Sidebar>
          <div className="flex flex-col grow max-h-screen z-10">
            <Header />
            <Main>
              <Sections data={data.sections} />
            </Main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
