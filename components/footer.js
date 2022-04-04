import Container from "./container";
import { FaCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="from-neutral-600/20 to-gray-600/50 bg-gradient-to-tr mx-5 mt-auto">
      <Container>
        <div className="flex justify-end m-1">
          <h1>
            <FaCopyright className="h-full mx-1 opacity-30" />
          </h1>
          <h1 className="text-lg font-thin opacity-30 text-white">Neographer</h1>
        </div>
      </Container>
    </footer>
  );
}
