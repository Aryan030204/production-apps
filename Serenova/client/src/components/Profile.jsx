/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { logout } from "../utils/userSlice";
import { SERVER_URL } from "../utils/config";

import male from "../assets/male.png";
import female from "../assets/female.png";
import "react-toastify/dist/ReactToastify.css";

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await axios.post(`${SERVER_URL}/logout`);
      dispatch(logout());
      toast.success("Logged out successfully!");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const avatar =
    user.gender === "male" ? male : user.gender === "female" ? female : male;

  return (
    <div className="flex items-center justify-center gap-2 w-fit px-3 py-2 bg-white rounded-xl shadow-sm">
      <Link to="/profile" aria-label="Go to profile">
        <img
          src={avatar}
          alt={`${user.firstName}'s avatar`}
          className="w-9 h-9 rounded-full object-cover"
        />
      </Link>

      <h1 className="whitespace-nowrap font-bold">
        Hello, <span className="text-blue-600 font-bold">{user.firstName}</span>
      </h1>

      <button
        onClick={handleLogout}
        className="ml-3 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-lg transition-colors"
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
