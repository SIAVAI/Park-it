/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { LiaUserSolid } from "react-icons/lia";
import { useLoaderData } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BsBookmarkDashFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components of ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Profile = () => {
  const user = useLoaderData();

  const [spots, setSpots] = useState([]);
  const [bookMarked, setBookMarked] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [photoURL, setPhotoURL] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);

  //Ratings
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [id, setId] = useState();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please fill in your name.");
      return;
    }

    try {
      const updatedUser = {
        name: name,
        phone: phone,
        email: email,
        photoURL: photoURL,
      };
      const res = await axios.put(
        `http://localhost:9000/users/${user?.email}`,
        updatedUser
      );
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile. Please try again.");
    }
  };

  // Handle review submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !reviewText) {
      toast.error("Please fill in all fields.");
      return;
    }
    const reviewData = {
      rating: rating,
      reviewText: reviewText,
      name: user?.name,
      photoURL: user?.photoURL,
      email: user?.email,
    };

    try {
      const res = await axios.put(
        `http://localhost:9000/parking/${id}`,
        reviewData
      );
      toast.success("Review submitted successfully!");
      setId();
      setRating(0);
      setReviewText("");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error submitting review. Please try again.");
    }
  };

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/parking`);
        setSpots(response.data);
      } catch (error) {
        console.error("Error fetching spots:", error);
      }
    };

    const fetchBookMark = () => {
      if (user?.bookMark && user.bookMark.length > 0) {
        const bookedMarkList = spots.filter((spot) =>
          user.bookMark.includes(spot._id)
        );
        setBookMarked(bookedMarkList);
      }
    };
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/payment-history"
        );
        setPaymentHistory(response.data);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/bookings/${user?.email}`
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (user) {
      setEmail(user.email);
      setPhotoURL(user.photoURL);
      fetchSpots();
      fetchPaymentHistory();
      fetchBookings();
    }

    if (spots.length > 0) {
      fetchBookMark();
    }
  }, [user, spots]);

  const handleDelete = async (id) => {
    try {
      const updatedBookMark = user.bookMark.filter((spotId) => spotId !== id);
      const res = await axios.put(
        `http://localhost:9000/users/${user?.email}`,
        { bookMark: updatedBookMark }
      );
      if (res.status === 200) {
        setBookMarked((prev) => prev.filter((spot) => spot._id !== id));
        user.bookMark = updatedBookMark;

        toast.success("Spot deleted successfully!");
      } else if (res.status === 404) {
        toast.error("Spot not found");
      } else {
        throw new Error("Failed to delete spot");
      }
    } catch (error) {
      console.error("Error deleting spot:", error);
      toast.error("Error deleting spot. Please try again.");
    }
  };

  const paymentData = {
    labels: paymentHistory.map((payment) =>
      new Date(payment.createdAt).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Payment Amount ($)",
        data: paymentHistory.map((payment) => payment.amount / 100),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 1000,
    },
    plugins: {
      title: {
        display: true,
        text: "Payment History",
        font: {
          size: 25,
          family: "Arial",
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `$${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `$${value}`;
          },
        },
      },
    },
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Update */}
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>

          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <LiaUserSolid className="w-24 h-24 rounded-full object-cover border "></LiaUserSolid>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={user?.name}
                  className="w-full px-4 py-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-600"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={user?.phone}
                  className="w-full px-4 py-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="photoURL"
                  className="block text-sm font-medium text-gray-600"
                >
                  Profile Photo URL
                </label>
                <input
                  type="text"
                  id="photoURL"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!isEditing}
                />
              </div>

              <div className="flex justify-center gap-4">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="w-full px-6 py-3 text-sm font-medium text-white bg-[#00d0b3] rounded-md hover:bg-[#000000] transition-all"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium text-white bg-[#00d0b3] rounded-md hover:bg-green-600 transition-all"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </form>

            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="w-full px-6 py-3 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 transition-all mt-4"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Bookmarked spots List */}
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-8">
          <h1 className="text-2xl font-bold m-6 text-center flex justify-center items-center">
            <span className="text-[#00d0b3] px-4 text-4xl">
              Bookmarked List
            </span>{" "}
            <br /> <BsBookmarkDashFill className="text-[#00d0b3]" />
          </h1>
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            {bookMarked.length > 0 ? (
              <ul className="border-t border-gray-300 pt-4">
                {bookMarked.map((spot) => (
                  <li
                    key={spot._id} // Updated to use _id
                    className="text-gray-600 mb-2 border-b border-gray-300 py-2 flex justify-between items-center"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-sm  ">
                        {spot.name} - {spot.city}
                      </p>
                      <p className="text-sm text-gray-500">
                        Latitude: {spot.lat}, Longitude: {spot.lng}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <button
                        onClick={() => handleDelete(spot._id)} // Updated to use _id
                        className="btn text-2xl border-0 hover:bg-red-100 transition-all duration-300 ease-in-out"
                      >
                        <MdDelete className="text-red-500" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No bookmarked spots available.</p>
            )}
          </div>
        </div>

        {/* Bookings History */}
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center flex justify-center items-center">
            <span className="text-[#00d0b3] px-4 text-4xl">History</span> <br />
          </h1>
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
            {bookings.length > 0 ? (
              <ul className="border-t border-gray-300 pt-4 ">
                {bookings.map((payment) => (
                  <li
                    key={payment._id}
                    className="text-gray-600 mb-2 border-b border-gray-300 py-2 "
                  >
                    <div className="flex justify-between items-center flex-col md:flex-row gap-4">
                      <div>
                        <p className="font-bold text-sm">
                          Spot Name: {payment.spotName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Location: {payment.spotLocation}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold text-sm">
                          Rate: ${payment.rate}
                        </p>
                        <p className="text-sm text-gray-500">
                          Time Slot: {payment.timeSlot}
                        </p>
                        <p className="text-sm text-gray-500">
                          Date: {new Date(payment.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <form
                          onSubmit={handleReviewSubmit}
                          className="flex flex-col gap-4"
                        >
                          <label htmlFor="count">
                            <p className="font-bold text-sm">Rating</p>
                            <input
                              type="number"
                              id="count"
                              value={rating}
                              placeholder="Rate 1-5"
                              onChange={(e) => setRating(e.target.value)}
                              min="1"
                              max="5"
                              className="w-full px-4 py-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </label>
                          <label htmlFor="review">
                            <textarea
                              id="review"
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              placeholder="Write a review..."
                              className="w-full px-4 py-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                            <button
                              onClick={() => setId(payment.spotId)}
                              type="submit"
                              className="w-full px-6 py-3 text-sm font-medium text-white bg-[#00d0b3] rounded-md hover:bg-green-600 transition-all mt-2"
                            >
                              Submit Review
                            </button>
                          </label>
                        </form>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No booking history available.</p>
            )}
          </div>
        </div>
      </div>
      {/* Payment History Chart */}
      {user.role === "admin" && (
        <div className="w-full max-w-md max-h-screen bg-white p-6 rounded-lg shadow-md mt-8">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-8">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Previous Bookings
            </h1>
            <Line data={paymentData} options={options} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
