import { Link } from "react-router-dom";
import bg from "../../assets/home/header.jpg";
import "animate.css";
import { FaSearchLocation } from "react-icons/fa";

const Header = () => {
  return (
    <header
      className="relative w-full h-screen bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
        <div className="space-y-8 max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-6xl animate__animated animate__fadeInUp animate__delay-1s">
            Find a Parking Spot, Anytime, Anywhere
          </h1>
          <p className="mt-4 text-lg sm:text-2xl animate__animated animate__fadeInUp animate__delay-1.5s">
            Say goodbye to parking struggles. Explore easy and convenient
            parking solutions near you.
          </p>
          <Link
            to="/book-a-spot"
            className="btn btn-primary border-0 rounded-3xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-10 py-5 text-xl transition-all transform hover:scale-105 animate__animated animate__fadeInUp animate__delay-2s"
          >
            <FaSearchLocation className="inline-block mr-2 text-2xl" />
            Explore Parking Spots
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
