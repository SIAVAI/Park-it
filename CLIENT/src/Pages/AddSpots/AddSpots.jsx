/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

const cities = {
  Dhaka: { name: "Dhaka", lat: 23.8103, lng: 90.4125 },
  Chittagong: { name: "Chittagong", lat: 22.3569, lng: 91.7832 },
  Rajshahi: { name: "Rajshahi", lat: 24.3694, lng: 88.6295 },
  Sylhet: { name: "Sylhet", lat: 24.8998, lng: 91.8687 },
  Rangpur: { name: "Rangpur", lat: 25.7493, lng: 89.2757 },
  Khulna: { name: "Khulna", lat: 22.8456, lng: 89.5407 },
  Barishal: { name: "Barishal", lat: 22.701, lng: 90.3535 },
  Dinajpur: { name: "Dinajpur", lat: 25.6264, lng: 88.6327 },
};

const LocationMarker = ({ setLat, setLng }) => {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      setLat(lat);
      setLng(lng);
    },
  });
  return null;
};

const MapWrapper = ({ lat, lng }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    map.setView([lat, lng], map.getZoom());

    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup("Selected Location").openPopup();

    return () => {
      if (marker) {
        map.removeLayer(marker);
      }
    };
  }, [lat, lng]);

  return null;
};

const AddSpots = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [lat, setLat] = useState(23.8103);
  const [lng, setLng] = useState(90.4125);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [dailyRate, setDailyRate] = useState(0);
  const [weeklyRate, setWeeklyRate] = useState(0);
  const [monthlyRate, setMonthlyRate] = useState(0);
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await axios.get(
          "https://parkit-one.vercel.app/parking",
          { withCredentials: true }
        );
        setSpots(response.data);
      } catch (error) {
        console.error("Error fetching parking spots:", error);
      }
    };
    fetchSpots();
  }, [spots]);

  useEffect(() => {
    if (city && cities[city]) {
      const { lat, lng } = cities[city];
      setLat(lat);
      setLng(lng);
    }
  }, [city]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !city ||
      !lat ||
      !lng ||
      !hourlyRate ||
      !dailyRate ||
      !weeklyRate ||
      !monthlyRate
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const newParkingSpot = {
        name,
        city,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        hourlyRate: parseFloat(hourlyRate),
        dailyRate: parseFloat(dailyRate),
        weeklyRate: parseFloat(weeklyRate),
        monthlyRate: parseFloat(monthlyRate),
      };
      const res = await axios.post(
        "https://parkit-one.vercel.app/parking",
        newParkingSpot,
        {
          headers: { "Content-Type": "application/json" },
        },
        {
          withCredentials: true,
        }
      );
      if (res.status !== 201) throw new Error("Failed to add parking spot");
      toast.success("Parking spot added successfully!");
      setName("");
      setCity("");
      setLat(23.8103);
      setLng(90.4125);
      setHourlyRate(0);
      setDailyRate(0);
      setWeeklyRate(0);
      setMonthlyRate(0);
      setSpots([...spots, res.data]);
    } catch (error) {
      toast.error("Failed to add parking spot.");
    }
  };

  const handleReset = () => {
    setName("");
    setCity("");
    setLat(23.8103);
    setLng(90.4125);
    setHourlyRate(0);
    setDailyRate(0);
    setWeeklyRate(0);
    setMonthlyRate(0);
    setSpots([]);
    toast.success("Form reset.");
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://parkit-one.vercel.app/parking/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res.status !== 200) throw new Error("Failed to delete parking spot");
      toast.success("Parking spot deleted successfully!");
      setSpots(spots.filter((spot) => spot._id !== id));
    } catch (error) {
      toast.error("Failed to delete parking spot.", error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Form Start */}
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md w-full"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">
            Add New Parking Spot
          </h1>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Parking Spot Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              City
            </label>
            <div className="flex flex-wrap gap-4">
              {Object.keys(cities).map((cityKey) => (
                <div key={cityKey} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={cityKey}
                    value={cityKey}
                    checked={city === cityKey}
                    onChange={() => setCity(cityKey)}
                    className="mr-2"
                  />
                  <label htmlFor={cityKey}>{cities[cityKey].name}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="hourlyRate"
              className="block text-sm font-medium text-gray-600"
            >
              Hourly Rate (BDT)
            </label>
            <input
              type="number"
              id="hourlyRate"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="dailyRate"
              className="block text-sm font-medium text-gray-600 mt-2"
            >
              Daily Rate (BDT)
            </label>
            <input
              type="number"
              id="dailyRate"
              value={dailyRate}
              onChange={(e) => setDailyRate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="weeklyRate"
              className="block text-sm font-medium text-gray-600 mt-2"
            >
              Weekly Rate (BDT)
            </label>
            <input
              type="number"
              id="weeklyRate"
              value={weeklyRate}
              onChange={(e) => setWeeklyRate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="monthlyRate"
              className="block text-sm font-medium text-gray-600 mt-2"
            >
              Monthly Rate (BDT)
            </label>
            <input
              type="number"
              id="monthlyRate"
              value={monthlyRate}
              onChange={(e) => setMonthlyRate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lat"
              className="block text-sm font-medium text-gray-600 mt-2"
            >
              Latitude
            </label>
            <input
              type="text"
              id="lat"
              value={lat}
              readOnly
              className="w-full px-4 py-2 border rounded-md shadow-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lng"
              className="block text-sm font-medium text-gray-600 mt-2"
            >
              Longitude
            </label>
            <input
              type="text"
              id="lng"
              value={lng}
              readOnly
              className="w-full px-4 py-2 border rounded-md shadow-md"
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium text-white bg-[#121212] rounded-md"
            >
              Add Parking Spot
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={handleReset}
              className="w-full px-6 py-3 text-sm font-medium text-white bg-red-500 rounded-md"
            >
              Reset Form
            </button>
          </div>
        </form>
        {/* Form End */}
        {/* Map Start */}
        <div className="w-full h-full rounded-lg shadow-md overflow-hidden">
          <MapContainer
            center={[lat, lng]}
            zoom={14}
            style={{ height: "800px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker setLat={setLat} setLng={setLng} />
            <MapWrapper lat={lat} lng={lng} />
            <Marker position={[lat, lng]}>
              <Popup>
                <p>Selected Location</p>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        {/* Map End */}
      </div>
      {/* Parking Spots List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold flex justify-center items-center">
          All Parking Spots in DB
        </h2>
        <ul className="mt-4">
          {spots.map((spot) => (
            <li
              key={spot._id}
              className="flex justify-between items-center py-2 px-4 border-b-0 bg-white rounded-md shadow-md mb-4"
            >
              <span className="font-bold">{spot.name}</span>
              <div className="flex gap-2 ">
                <button className="btn btn-sm btn-primary hover:scale-105 transition-transform duration-200">
                  Book
                </button>
                <button
                  onClick={() => handleDelete(spot._id)}
                  className="btn btn-sm bg-red-500 hover:scale-105 hover:bg-red-300 transition-transform duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddSpots;
