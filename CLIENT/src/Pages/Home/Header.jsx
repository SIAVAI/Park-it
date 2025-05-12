import { Link } from "react-router-dom";
import bg from "../../assets/home/header.jpg";
import "animate.css";
import { FaSearchLocation } from "react-icons/fa";

const Header = () => {
  return (
    <header
      className="relative w-full bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 py-20 sm:py-32">
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold animate__animated animate__fadeInUp">
            Find a Parking Spot, Anytime, Anywhere
          </h1>
          <p className="text-base sm:text-xl animate__animated animate__fadeInUp animate__delay-1s">
            Say goodbye to parking struggles. Explore easy and convenient
            parking solutions near you.
          </p>
          <Link
            to="/book-a-spot"
            className="inline-flex items-center gap-2 justify-center bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-6 py-3 text-lg rounded-full transition transform hover:scale-105 animate__animated animate__fadeInUp animate__delay-2s"
          >
            <FaSearchLocation className="text-xl" />
            Explore Parking Spots
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
