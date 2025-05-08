import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { LiaUserSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://parkit-one.vercel.app/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `https://parkit-one.vercel.app/users/${id}`
        );
        if (response.status === 200) {
          setUsers(users.filter((user) => user._id !== id));
          toast.success("User deleted successfully.");
        } else {
          toast.error("Failed to delete user.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">All Users</h1>

      {/* Users List */}
      <div className="flex justify-center items-center flex-wrap gap-8">
        {users.map((user) => (
          <div
            key={user._id}
            className="card w-96 shadow-2xl"
            data-aos="fade-up"
          >
            <figure className="px-10 pt-10">
              <div className="text-4xl border-4 border-primary rounded-full p-4 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out">
                <LiaUserSolid />
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <p className="font-bold">{user.role.toUpperCase()}</p>
              <p>{user.phone}</p>
              <p className="text-amber-500">{user.name}</p>
              <p>{user.email}</p>

              <div className="card-actions mt-4 hover:scale-105 transition-transform duration-300 ease-in-out">
                <button className="btn bg-gray-500">
                  <Link to={`/users/${user.email}`} className="text-white">
                    update
                  </Link>
                </button>
              </div>
              <div className="card-actions mt-4 hover:scale-105 transition-transform duration-300 ease-in-out">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="btn bg-red-500 border-0"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
