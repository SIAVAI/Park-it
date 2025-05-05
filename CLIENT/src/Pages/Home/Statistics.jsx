import React from "react";
import Typewriter from "react-typewriter-effect";

const Statistics = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-500 to-green-400">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-8">
          Amazing Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
            <Typewriter
              textStyle={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "2rem",
                color: "#4CAF50",
                fontWeight: "bold",
              }}
              startDelay={500}
              cursorColor="black"
              text="1500+ Users"
            />
            <p className="text-gray-600 mt-4">Users who love our app!</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
            <Typewriter
              textStyle={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "2rem",
                color: "#4CAF50",
                fontWeight: "bold",
              }}
              startDelay={1000}
              cursorColor="black"
              text="500+ Parking Spots"
            />
            <p className="text-gray-600 mt-4">Available across the country.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
            <Typewriter
              textStyle={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "2rem",
                color: "#4CAF50",
                fontWeight: "bold",
              }}
              startDelay={1500}
              cursorColor="black"
              text="100+ Locations"
            />
            <p className="text-gray-600 mt-4">Convenient locations to park!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
