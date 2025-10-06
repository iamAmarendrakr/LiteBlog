// Navbar.jsx
import { FaHome } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import SearchBar from "./SearchBar";

const Navbar = ({ onSearchResults }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const openDropdown = () => setToggle((t) => !t);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md h-20 w-full px-8 flex items-center justify-between sticky top-0 z-50">
      <figure className="text-lg md:text-3xl font-extrabold tracking-wide">
        <span className="text-orange-500">Q</span>
        <span className="text-gray-800">-Blogs</span>
      </figure>

      <ul className="flex items-center gap-2 md:gap-6 font-medium text-gray-700">
        <li className="w-full md:w-auto">
          <SearchBar onResults={onSearchResults} />
        </li>

        <li className="cursor-pointer hover:text-orange-500">
          <Link to={"/"}>
            <FaHome size={22} />
          </Link>
        </li>

        <li
          onClick={() => {
            navigate(`/userDashbord/${localStorage.getItem("userId")}`);
            setToggle(false);
          }}
          className="px-5 py-3 hover:bg-gray-100 cursor-pointer">
          Dashboard
        </li>

        {token ? (
          <li className="relative">
            <button
              onClick={openDropdown}
              className="border border-blue-500 px-5 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all">
              Profile{" "}
            </button>

            {toggle && (
              <ul className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg border">
                <li
                  onClick={handleLogout}
                  className="px-5 py-3 hover:bg-red-100 text-red-600 cursor-pointer">
                  Logout
                </li>
              </ul>
            )}
          </li>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="px-5 py-2 rounded-full border border-blue-500 text-blue-500 font-semibold hover:bg-blue-50">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600">
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
