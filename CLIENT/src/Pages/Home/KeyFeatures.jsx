import "aos/dist/aos.css";
import AOS from "aos";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useEffect } from "react";
import { FaClock } from "react-icons/fa6";
import { MdCreditScore } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import { MdHeadsetMic } from "react-icons/md";

const KeyFeatures = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="px-6 py-12 bg-gray-100">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2
          className="text-3xl font-semibold text-gray-800 mb-6"
          data-aos="fade-up"
        >
          Key Features & Benefits
        </h2>
        <p
          className="text-lg text-gray-600 mb-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Explore the amazing features that make parking easy and stress-free.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 scroll-smooth flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="text-4xl text-primary mb-4  ">
              <FaMapMarkedAlt />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Find Parking Spots Easily
            </h3>
            <p className="text-gray-600 mt-2">
              Locate parking spots near you with just a few taps, ensuring a
              smooth and convenient experience.
            </p>
          </div>

          {/* Feature 2 */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="text-4xl text-primary mb-4">
              <FaClock />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Real-Time Availability
            </h3>
            <p className="text-gray-600 mt-2">
              View real-time availability and ensure your parking spot is always
              available when you need it.
            </p>
          </div>

          {/* Feature 3 */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <div className="text-4xl text-primary mb-4">
              <MdCreditScore />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Easy Payment Options
            </h3>
            <p className="text-gray-600 mt-2">
              Pay for your parking spot securely through the app, using your
              preferred payment method.
            </p>
          </div>

          {/* Feature 4 */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="900"
          >
            <div className="text-4xl text-primary mb-4">
              <FaUserCheck />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Personalized Experience
            </h3>
            <p className="text-gray-600 mt-2">
              Customize your parking preferences and have the app recommend the
              best parking spots for you.
            </p>
          </div>

          {/* Feature 5 */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="1100"
          >
            <div className="text-4xl text-primary mb-4">
              <CiMobile3 />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Mobile-First Approach
            </h3>
            <p className="text-gray-600 mt-2">
              Our app is designed for mobile devices, making it easy for you to
              find and reserve parking on the go.
            </p>
          </div>

          {/* Feature 6 */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="1300"
          >
            <div className="text-4xl text-primary mb-4">
              <MdHeadsetMic />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              24/7 Customer Support
            </h3>
            <p className="text-gray-600 mt-2">
              Need help? Our dedicated customer support team is available 24/7
              to assist you with any parking issue.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
