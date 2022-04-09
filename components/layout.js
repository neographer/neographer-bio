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
    <div className="flex flex-col lg:flex-row">
      {children}
      <Sidebar>
        <Avatar />
        <Social data={data.social} />
      </Sidebar>
      <Main>
        <Sections data={data.sections} />
        <Footer />
      </Main>
    </div>
  );
}
