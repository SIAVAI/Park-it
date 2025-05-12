import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const Navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const { data } = await axios.get(
            `https://parkit-one.vercel.app/users/${user?.email}`,
            {
              withCredentials: true,
            }
          );

          setIsLoggedIn(true);
          setIsAdmin(data?.role === "admin");
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Handle Logout
  const handleLogout = () => {
    logOut();
    setIsLoggedIn(false);
    setIsAdmin(false);
    Navigate("/");
    toast.success("Successfully Logged Out!");
  };

  return (
    <div>
      <div className="navbar  shadow-sm">
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm bg-[#00d0b3] dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/book-a-spot">Book a Spot</Link>
              </li>

              {isLoggedIn && (
                <>
                  {isAdmin && (
                    <>
                      <li>
                        <Link to="/add-spot">Add Spots</Link>
                      </li>
                      <li>
                        <Link to="/users">Users</Link>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl">Park IT</Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/" className="hover:text-secondary transition-all">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="hover:text-secondary transition-all"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/book-a-spot"
                className="hover:text-secondary transition-all"
              >
                Book a Spot
              </Link>
            </li>

            {isLoggedIn && (
              <>
                {isAdmin && (
                  <>
                    <li>
                      <Link
                        to="/add-spot"
                        className="hover:text-secondary transition-all"
                      >
                        Add Spots
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/users"
                        className="hover:text-secondary transition-all"
                      >
                        Users
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>

        {/* Right-aligned Login/Logout */}
        <div className="navbar-end">
          {!isLoggedIn ? (
            <Link to="/login" className="btn hover:bg-gray-500 transition-all">
              Login
            </Link>
          ) : loading ? (
            <span className="loading loading-spinner text-accent"></span>
          ) : (
            <span className="flex justify-center items-center gap-4">
              <div className="mt-4  tooltip  tooltip-left w-full avatar avatar-online  hover:scale-110 transition-transform duration-300 ease-in-out">
                <div className="tooltip-content">
                  <div className="animate-bounce text-orange-400 -rotate-10 text-xl font-black">
                    {isAdmin ? "Admin" : "User"}
                  </div>
                </div>
                <div className="w-12 rounded-full">
                  <Link
                    to={`/users/${user?.email}`}
                    className="tooltip tooltip-left"
                  >
                    <img
                      src={
                        user?.photoURL ||
                        "https://img.daisyui.com/images/profile/demo/gordon@192.webp"
                      }
                      alt="User Avatar"
                      className="rounded-full hover:ring-2 hover:ring-blue-500 transition-all duration-300"
                    />
                  </Link>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn hover:bg-gray-500 transition-all"
              >
                Logout
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
