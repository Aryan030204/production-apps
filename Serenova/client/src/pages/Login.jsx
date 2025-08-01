/* eslint-disable react/no-unescaped-entities */
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../utils/userSlice";
import QuoteBox from "../components/QuoteBox";

const Login = () => {
  const [hidden, setHidden] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // const SERVER_URL = import.meta.env.SERVER_URL;
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    try {
      const res = await axios.post(
        `${SERVER_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      toast.success("Logged in successfully");

      setTimeout(() => {
        dispatch(login(res.data.data));
        localStorage.setItem("user", JSON.stringify(res.data.data));
        navigate("/");
      }, 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div>
          <div className="relative right-[22rem] top-10">
            <QuoteBox
              quote="Empowered women empower the world—rise, lead, and inspire change with courage, confidence, and resilience."
              bcolor="border-red-500"
              bgcolor="bg-red-100"
            />
          </div>
          <div className="relative right-[2rem]">
            <QuoteBox
              quote="Break barriers, shatter ceilings, and redefine limits—because nothing is impossible when a woman decides to rise."
              bcolor="border-blue-500"
              bgcolor="bg-blue-100"
            />
          </div>
        </div>

        <div className="relative flex flex-col justify-evenly items-center mt-[5rem] shadow-lg bg-white border-0 rounded-lg w-[30rem] h-[35rem]">
          <h1 className="font-bold text-2xl">Login to your Account</h1>

          <div className="flex flex-col justify-center items-center w-full relative bottom-[3rem]">
            <form className="flex flex-col gap-4">
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                variant="filled"
                className="w-[20rem]"
              />

              <div className="relative">
                <TextField
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={hidden ? "text" : "password"}
                  variant="filled"
                  className="w-[20rem]"
                />
                <div
                  className="absolute right-4 top-3 cursor-pointer"
                  onClick={() => setHidden(!hidden)}
                >
                  {hidden ? <EyeOff /> : <Eye />}
                </div>
              </div>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleLogin()}
              >
                Login
              </Button>
            </form>

            <h1 className="relative top-4 font-semibold">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Signup
              </Link>
            </h1>

            <ToastContainer />
          </div>
        </div>

        <div>
          <div className="relative left-[18rem]">
            <QuoteBox
              quote="Empowered women empower the world—rise, lead, and inspire change with courage, confidence, and resilience."
              bcolor="border-red-500"
              bgcolor="bg-red-100"
            />
          </div>
          <div className="relative left-[2rem] top-12">
            <QuoteBox
              quote="Break barriers, shatter ceilings, and redefine limits—because nothing is impossible when a woman decides to rise."
              bcolor="border-blue-500"
              bgcolor="bg-blue-100"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
