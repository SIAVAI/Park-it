import { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FaMapMarkerAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { LiaStarSolid } from "react-icons/lia";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router-dom";

const cities = {
  Dhaka: [23.8103, 90.4125],
  Chittagong: [22.3569, 91.7832],
  Rajshahi: [24.3694, 88.6295],
  Sylhet: [24.8998, 91.8687],
  Rangpur: [25.7493, 89.2757],
  Khulna: [22.8456, 89.5407],
  Barishal: [22.701, 90.3535],
  Dinajpur: [25.6264, 88.6327],
};

const Map = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [customer, setCustomer] = useState({});
  const [selectedCity, setSelectedCity] = useState("Dhaka");
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:9000/users/${email}`
        );
        setCustomer(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
    const fetchSpots = async () => {
      try {
        const response = await axios.get("http://localhost:9000/parking");

        setSpots(response.data);
      } catch (error) {
        console.error("Error fetching parking spots:", error);
      }
    };
    fetchSpots();
  }, [email]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [availability, setAvailability] = useState(true);
  const [minReviews, setMinReviews] = useState(0);

  const filteredSpots = spots.filter(
    (spot) =>
      spot.city === selectedCity &&
      spot.hourlyRate >= minPrice &&
      spot.hourlyRate <= maxPrice &&
      spot.isAvailable === availability &&
      (spot.reviews.length >= minReviews || spot.reviews.length === 0)
  );

  const handleFilterChange = () => {
    if (filteredSpots.length === 0) {
      toast.error("No spots found with the selected filters.");
    }
  };

  const handleReset = () => {
    setMinPrice(0);
    setMaxPrice(1000);
    setAvailability(true);
    setMinReviews(0);
    toast.success("Filters reset successfully.");
  };

  const handleBookMark = (id) => {
    const bookmarks = customer?.bookMark;
    if (customer?.bookMark?.includes(id)) {
      toast.error("Already Bookmarked!");
    } else {
      const updatedBookmarks = [...bookmarks, id];
      axios
        .put(`http://localhost:9000/users/${email}`, {
          bookMark: updatedBookmarks,
        })
        .then(() => {
          setCustomer((prev) => ({ ...prev, bookMark: updatedBookmarks }));
          toast.success("Spot Bookmarked Successfully!");
        })
        .catch((error) => {
          console.error("Error updating bookmarks:", error);
          toast.error("Failed to bookmark the spot.");
        });
    }
  };

  //   spots[0].reviews[0].rating

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce(
      (sum, review) => sum + parseFloat(review.rating),
      0
    );
    return (totalRating / reviews.length).toFixed(2);
  };

  const getReviewText = (reviews) => {
    return reviews.map((review, index) => (
      <div key={index} className="text-sm text-gray-600 mt-1">
        <p>"{review.reviewText}"</p>
        <p className="text-xs text-gray-500">- {review.name}</p>
      </div>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-center text-3xl font-bold mb-4">
        Parking Map - Bangladesh
      </h1>

      {/* Tabs for Cities */}
      <Tabs>
        <TabList className="flex justify-center gap-4 mb-8 flex-wrap">
          {Object.keys(cities).map((city, index) => (
            <Tab
              key={index}
              onClick={() => setSelectedCity(city)}
              className="cursor-pointer px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-all flex items-center gap-2"
              selectedClassName="bg-blue-500 text-white"
            >
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-xl" />
                {city}
              </div>
            </Tab>
          ))}
        </TabList>

        {Object.keys(cities).map((city, index) => (
          <TabPanel key={index}>
            <div className="filters mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      min="0"
                      className="w-full px-4 py-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    -
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      max="1500"
                      className="w-full px-4 py-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Availability
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value === "true")}
                    className="w-full p-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value={true}>Available</option>
                    <option value={false}>Not Available</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Minimum Reviews
                  </label>
                  <input
                    type="number"
                    value={minReviews}
                    onChange={(e) => setMinReviews(e.target.value)}
                    min="0"
                    max="5"
                    className="w-full p-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div className="col-span-3 text-center mt-4">
                  <button
                    onClick={handleFilterChange}
                    className="btn btn-primary px-6 py-2 rounded-md shadow-md"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={handleReset}
                    className="btn btn-primary px-6 py-2 rounded-md shadow-md"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Map */}
            <MapContainer
              center={cities[city]}
              zoom={13}
              style={{ height: "500px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {filteredSpots.map((spot) => (
                <Marker key={spot._id} position={[spot.lat, spot.lng]}>
                  <Popup>
                    <h3 className="font-bold">{spot.name}</h3>
                    <p>
                      USD {spot.hourlyRate}/hr || {spot.dailyRate}/Day ||{" "}
                      {spot.weeklyRate}/Week || {spot.monthlyRate}/Month
                    </p>
                    <p className="font-bold">
                      {spot.isAvailable ? "Available" : "Not Available"}
                    </p>
                    {spot.reviews.length === 0 ? (
                      <div className="w-[50%] text-sm text-gray-600">
                        <p>Sorry!! No Reviews yet. Be the first one!!😃</p>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-start items-start">
                        <p className="text-sm text-gray-600">Avg Rating</p>
                        <div className="flex items-center">
                          <p className="text-lg font-semibold">
                            {calculateAverageRating(spot.reviews)}{" "}
                          </p>
                          <LiaStarSolid className="text-yellow-500 inline  text-lg" />
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <Link
                        to={`/spot-details/${spot._id}`}
                        className="btn btn-sm btn-primary hover:scale-105 transition-transform duration-200"
                      >
                        Book
                      </Link>
                      <button
                        onClick={() => handleBookMark(spot._id)}
                        className="btn btn-sm btn-secondary hover:scale-105 transition-transform duration-200"
                      >
                        Bookmark
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Parking Spots List */}
            <div className="mt-10">
              <hr />
              <h2 className="mt-10 text-xl font-semibold flex items-center justify-center py-4">
                Available Parking Spots
              </h2>
              <ul className="mt-4">
                {filteredSpots.length === 0 ? (
                  <li className="text-red-500 flex items-center justify-center py-4">
                    No spots found with the selected filters.
                  </li>
                ) : (
                  filteredSpots.map((spot) => (
                    <li
                      key={spot._id}
                      className="border-b py-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 bg-white p-4 rounded-md shadow-md mb-4"
                      style={{ borderBottom: "1px solid #ccc" }}
                    >
                      <h3 className="font-bold ">{spot.name}</h3>
                      <p className="font-bold">
                        Price: USD {spot.hourlyRate}/hr || {spot.dailyRate}/Day
                        || {spot.weeklyRate}/Week || {spot.monthlyRate}/Month
                      </p>
                      <p className="font-bold">
                        {spot.isAvailable ? "Available" : "Not Available"}
                      </p>
                      {/* Reviews Calculation */}
                      {spot.reviews.length === 0 ? (
                        <div className="w-[50%] text-sm text-gray-600">
                          <p>Sorry!! No Reviews yet. Be the first one!!😃</p>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col justify-center items-center gap-2">
                            <p className="text-sm text-gray-600">Avg Rating</p>
                            <div className="flex items-center">
                              <p className="text-lg font-semibold">
                                {calculateAverageRating(spot.reviews)}{" "}
                              </p>
                              <LiaStarSolid className="text-yellow-500 inline ml-2" />
                            </div>
                          </div>
                          <div className="m-2 space-y-2 flex flex-col flex-wrap justify-around items-start">
                            {getReviewText(spot.reviews)}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <Link
                          to={`/spot-details/${spot._id}`}
                          className="btn btn-sm btn-primary hover:scale-105 transition-transform duration-200"
                        >
                          Book
                        </Link>
                        <button
                          onClick={() => handleBookMark(spot._id)}
                          className="btn btn-sm btn-secondary hover:scale-105 transition-transform duration-200"
                        >
                          Bookmark
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default Map;
