import React, { useEffect } from "react";
import BG from "../../assets/About us/about-us-bg.jpg";
import bg2 from "../../assets/About us/about-us-bg2.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section
        className="relative w-full h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url(${BG})`,
        }}
        data-aos="fade-in"
        data-aos-duration="1500"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
          <h1 className="text-4xl font-bold sm:text-5xl animate__animated animate__fadeInUp">
            Welcome to Park IT
          </h1>
          <p className="mt-4 text-lg sm:text-xl animate__animated animate__fadeInUp animate__delay-1s">
            Our mission is to provide safe and convenient parking solutions for
            all.
          </p>
        </div>
      </section>

      {/* About Us */}
      <section className="px-6 py-12 bg-gray-100">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2
            className="text-3xl font-semibold text-gray-800 mb-6"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            Who We Are
          </h2>
          <p
            className="text-lg text-gray-600 mb-8"
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="2000"
          >
            At Park IT, we are committed to making parking easier for everyone.
            We provide smart parking solutions that reduce the hassle of finding
            a parking spot.
          </p>

          {/* Team Section with Hover Effects */}
          <div className="flex flex-wrap justify-center gap-6">
            <div
              className="w-full sm:w-1/3"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all">
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Team Member"
                  className="w-24 h-24 rounded-full mx-auto"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  Mahin Sikder
                </h3>
                <p className="text-gray-600">CEO & Founder</p>
              </div>
            </div>
            <div
              className="w-full sm:w-1/3"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="700"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all">
                <img
                  src="https://randomuser.me/api/portraits/women/2.jpg"
                  alt="Team Member"
                  className="w-24 h-24 rounded-full mx-auto"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  Anika Nawar
                </h3>
                <p className="text-gray-600">Marketing Director</p>
              </div>
            </div>
            <div
              className="w-full sm:w-1/3"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="900"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all">
                <img
                  src="https://randomuser.me/api/portraits/men/3.jpg"
                  alt="Team Member"
                  className="w-24 h-24 rounded-full mx-auto"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  Sajidur Rahman Siam
                </h3>
                <p className="text-gray-600">Lead Developer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section
        className="relative w-full py-24 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg2})`,
        }}
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Join Us in Our Mission
          </h2>
          <p className="mt-4 text-lg sm:text-xl">
            Together, we are creating an easier way to park, everywhere.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
