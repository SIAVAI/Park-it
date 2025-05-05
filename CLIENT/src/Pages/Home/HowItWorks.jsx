import React, { useEffect } from "react";
import "aos/dist/aos.css";
import {
  FaSearchLocation,
  FaCalendarCheck,
  FaParking,
  FaCreditCard,
} from "react-icons/fa";
import AOS from "aos";

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="px-6 py-12 bg-gray-50">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2
          className="text-3xl font-semibold text-gray-800 mb-6"
          data-aos="fade-up"
        >
          How It Works
        </h2>
        <p
          className="text-lg text-gray-600 mb-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          A simple and smooth process to park your car without the hassle.
        </p>

        {/* Steps Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Step 1 */}
          <div
            className="flex items-center space-x-6"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="text-6xl text-primary">
              <FaSearchLocation />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Search for Parking
              </h3>
              <p className="text-gray-600 mt-2">
                Find available parking spots near you with real-time updates.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div
            className="flex items-center space-x-6"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="text-6xl text-primary">
              <FaCalendarCheck />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Reserve Your Spot
              </h3>
              <p className="text-gray-600 mt-2">
                Quickly reserve your parking spot using our easy-to-use app.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div
            className="flex items-center space-x-6"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <div className="text-6xl text-primary">
              <FaParking />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Drive to Your Spot
              </h3>
              <p className="text-gray-600 mt-2">
                Navigate to your reserved spot with ease and park with
                confidence.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div
            className="flex items-center space-x-6"
            data-aos="fade-up"
            data-aos-delay="900"
          >
            <div className="text-6xl text-primary">
              <FaCreditCard />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Pay Securely
              </h3>
              <p className="text-gray-600 mt-2">
                Complete the payment securely via the app and drive away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
