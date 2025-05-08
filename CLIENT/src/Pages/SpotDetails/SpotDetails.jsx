/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LiaStarSolid } from "react-icons/lia";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaCreditCard } from "react-icons/fa6";

const SpotDetails = () => {
  const spot = useLoaderData();
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("8:00 AM");
  const [selectedRateType, setSelectedRateType] = useState("hourly");
  const [bookingDetails, setBookingDetails] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    setBookingDetails({
      spotId: spot._id,
      userEmail: userEmail,
      spotName: spot.name,
      spotLocation: spot.city,
      rate: spot[`${selectedRateType}Rate`],
      date: selectedDate,
      timeSlot: selectedTime,
    });
  }, [spot, selectedDate, selectedTime, selectedRateType, userEmail]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleRateChange = (event) => {
    setSelectedRateType(event.target.value);
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);

    try {
      const rate = spot[`${selectedRateType}Rate`];
      if (!rate) {
        toast.error("Invalid rate. Please check the selected rate type.");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:9000/create-payment-intent",
        {
          amount: rate,
          spotId: spot._id,
          userEmail: userEmail,
          spotName: spot.name,
        }
      );

      const { clientSecret } = response.data;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
          },
        }
      );

      if (error) {
        console.error(error.message);
        toast.error("Payment failed. Please try again.");
        setIsSubmitting(false);
      } else {
        if (paymentIntent.status === "succeeded") {
          toast.success("Payment succeeded! Booking confirmed.");
          setPaymentSuccess(true);

          try {
            await axios.post("http://localhost:9000/bookings", bookingDetails);
          } catch (error) {
            console.error("Booking Error:", error);
            toast.error("Error confirming booking. Please try again.");
          }
        }
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error during payment process:", error.message);
      toast.error("Error processing payment. Please try again.");
      setIsSubmitting(false);
    }
  };

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold text-center mb-10 text-blue-600">
        Spot Details
      </h1>

      {/* Spot Details Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-8 shadow-md p-6 bg-white rounded-lg">
        {/* Spot Info */}
        <div className="lg:w-1/2 p-6 space-y-4 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-4xl font-semibold text-gray-700 ">{spot.name}</h2>
          <div className="text-gray-500 flex items-center gap-2">
            <FaMapMarkerAlt className="text-4xl text-black" />
            <p className="text-4xl">{spot.city}</p>
          </div>

          <div className="text-gray-500 flex items-center gap-2 my-4">
            <p>Price: </p>
            <span className="font-bold text-xl">
              TK {spot[`${selectedRateType}Rate`]}/{selectedRateType}
            </span>
          </div>

          <div className="flex items-center gap-2">
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
              </div>
            )}
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Select Date
            </label>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="react-calendar w-full p-2 border rounded-md shadow-md"
            />
          </div>

          {/* Time Slot Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Select Time Slot
            </label>
            <select
              value={selectedTime}
              onChange={handleTimeChange}
              className="w-full p-2 border rounded-md shadow-md focus:ring-2 focus:ring-[#00d0b3]"
            >
              {[...Array(13)].map((_, index) => {
                const hour = 8 + index;
                const suffix = hour >= 12 ? "PM" : "AM";
                const displayHour = hour > 12 ? hour - 12 : hour;
                return (
                  <option key={index} value={`${displayHour}:00 ${suffix}`}>
                    {`${displayHour}:00 ${suffix}`}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Rate Type Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Select Rate Type
            </label>
            <select
              value={selectedRateType}
              onChange={handleRateChange}
              className="w-full p-2 border rounded-md shadow-md focus:ring-2 focus:ring-[#00d0b3]"
            >
              <option value="hourly">Hourly</option>
              {/* <option value="daily">Daily</option> */}
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Card Details Input */}
          <div className="form-field">
            <FaCreditCard className="mt-10 mb-4 text-4xl " />
            <label className="input-label">Card Number</label>
            <CardNumberElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Arial, sans-serif",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>

          <div className="form-field">
            <label className="input-label">Expiry Date</label>
            <CardExpiryElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Arial, sans-serif",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>

          <div className="form-field">
            <label className="input-label">CVC</label>
            <CardCvcElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Arial, sans-serif",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>

          {/* Confirm Booking Button */}
          <div className="mt-4">
            <button
              onClick={handleConfirmBooking}
              className={`w-full px-6 py-3 text-white rounded-md ${
                isSubmitting ? "bg-gray-400" : "bg-[#00d0b3] hover:bg-[#000000]"
              } transition-all`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>

        {/* Map Section */}
        <div className="lg:w-1/2 p-6">
          <MapContainer
            center={[spot.lat, spot.lng]}
            zoom={16}
            style={{ height: "500px", width: "100%" }}
            className="rounded-lg shadow-md"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[spot.lat, spot.lng]}>
              <Popup>
                <h3 className="font-bold">{spot.name}</h3>
                <p>{spot.city}</p>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default SpotDetails;
