import React from "react";
import Typewriter from "react-typewriter-effect";

const Statistics = () => {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-500 to-green-400">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">
          Amazing Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1 */}
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col justify-center items-center gap-2 sm:gap-4">
            <Typewriter
              textStyle={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "1.5rem", // smaller on mobile
                color: "#4CAF50",
                fontWeight: "bold",
              }}
              startDelay={500}
              cursorColor="black"
              text="1500+ Users"
            />
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Users who love our app!
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col justify-center items-center gap-2 sm:gap-4">
            <Typewriter
              textStyle={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "1.5rem",
                color: "#4CAF50",
                fontWeight: "bold",
              }}
              startDelay={1000}
              cursorColor="black"
              text="500+ Parking Spots"
            />
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Available across the country.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col justify-center items-center gap-2 sm:gap-4">
            <Typewriter
              textStyle={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "1.5rem",
                color: "#4CAF50",
                fontWeight: "bold",
              }}
              startDelay={1500}
              cursorColor="black"
              text="100+ Locations"
            />
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Convenient locations to park!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
