import "aos/dist/aos.css";
import AOS from "aos";

const DiscountSection = () => {
  return (
    <section className="px-6 py-12 bg-gray-50 text-white">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2
          className="text-3xl font-semibold text-gray-800 mb-6"
          data-aos="fade-up"
        >
          Our Pricing Plans
        </h2>
        <p
          className="text-lg text-gray-600 mb-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Choose the best plan for you and enjoy the benefits of Park IT at an
          exclusive discount.
        </p>

        {/* Discount Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Weekly Discount */}
          <div
            className="card w-96 bg-base-100 shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl neon-effect border-2 border-[#00d0b3] p-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="card-body">
              <span className="badge badge-xs badge-warning mb-4">
                Weekly Discount
              </span>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">Weekly</h2>
                <span className="text-xl">7%</span>
              </div>
              <ul className="flex flex-col gap-3 text-sm mb-6">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Quick Search & Reservation</span>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Instant Parking Spot Availability</span>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Secure Payment Methods</span>
                </li>
              </ul>
              <div>
                <button className="btn btn-primary btn-block p-4 text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 transition-all">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>

          {/* Monthly Discount */}
          <div
            className="card w-96 bg-base-100 shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl neon-effect border-2 border-[#00d0b3] p-4"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="card-body">
              <span className="badge badge-xs badge-warning mb-4">
                Monthly Discount
              </span>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">Monthly</h2>
                <span className="text-xl">10%</span>
              </div>
              <ul className="flex flex-col gap-3 text-sm mb-6">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Customizable Parking Preferences</span>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>24/7 Customer Support</span>
                </li>
              </ul>
              <div>
                <button className="btn btn-primary btn-block p-4 text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 transition-all">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>

          {/* Same Spot Booking Discount */}
          <div
            className="card w-96 bg-base-100 shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl neon-effect border-2 border-[#00d0b3] p-4"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <div className="card-body">
              <span className="badge badge-xs badge-warning mb-4">
                Same Spot Booking
              </span>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">Same Spot Booking</h2>
                <span className="text-xl">7%</span>
              </div>
              <ul className="flex flex-col gap-3 text-sm mb-6">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    Earn discounts by booking the same spot over 5 times
                  </span>
                </li>
              </ul>
              <div>
                <button className="btn btn-primary btn-block p-4 text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 transition-all">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>

          {/* Weekend Discount */}
          <div
            className="card w-96 bg-base-100 shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl neon-effect border-2 border-[#00d0b3] p-4"
            data-aos="fade-up"
            data-aos-delay="900"
          >
            <div className="card-body">
              <span className="badge badge-xs badge-warning mb-4">
                Weekend Discount
              </span>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">Weekend</h2>
                <span className="text-xl">6%</span>
              </div>
              <ul className="flex flex-col gap-3 text-sm mb-6">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Special discounts for Friday & Saturday bookings</span>
                </li>
              </ul>
              <div>
                <button className="btn btn-primary btn-block p-4 text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 transition-all">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;
