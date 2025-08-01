import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import male from "../assets/male.png";
import female from "../assets/female.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
  });
  // const SERVER_URL = import.meta.env.SERVER_URL;

  const [saved, setSaved] = useState(false);

  const getProfile = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/profile`, {
        withCredentials: true,
      });
      const { firstName, lastName, age, gender } = res.data.data;
      setFormData({ firstName, lastName, age, gender });
    } catch (error) {
      toast.error("Failed to load profile data");
      console.error(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [saved]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `${SERVER_URL}/profile/update`,
        { ...formData },
        { withCredentials: true }
      );

      setSaved(true);
      toast.success("Profile updated successfully!");
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      toast.error("Error updating profile");
      console.error(error);
    }
  };

  const avatar = formData.gender === "male" ? male : female;

  return (
    <div className="flex flex-col items-center gap-5 p-6 lg:w-1/4 md:w-1/2 my-8 border-2 border-purple-500 shadow-lg bg-purple-50 rounded-xl">
      <h1 className="text-2xl font-bold text-blue-600">My Profile</h1>

      <img
        src={avatar}
        alt="User avatar"
        className="w-40 h-40 object-cover border-4 border-black rounded-full"
      />

      <div className="flex flex-col w-[80%] gap-4">
        {["firstName", "lastName", "age", "gender"].map((field) => (
          <div className="flex flex-col" key={field}>
            <label htmlFor={field} className="font-semibold text-lg capitalize">
              {field === "firstName"
                ? "First Name"
                : field === "lastName"
                ? "Last Name"
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <TextField
              id={field}
              name={field}
              variant="filled"
              size="small"
              type={field === "age" ? "number" : "text"}
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <button
        className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold text-lg px-6 py-2 rounded-lg shadow-lg transition-colors"
        onClick={handleUpdate}
      >
        {saved ? "Saved!" : "Save Profile"}
      </button>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default ProfileForm;
