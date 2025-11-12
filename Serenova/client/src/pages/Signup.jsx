import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // fixed from "react-router-dom"
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // fixed path
import QuoteBox from "../components/QuoteBox";

const Signup = () => {
  const [hidden, setHidden] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid =
    firstName &&
    lastName &&
    age &&
    gender &&
    email &&
    password &&
    isEmailValid(email);

  const handleSignup = async () => {
    if (!isEmailValid(email)) {
      toast.error("Invalid email format");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        SERVER_URL + "/signup",
        {
          firstName,
          lastName,
          age: Number(age),
          gender,
          email,
          password,
        },
        { withCredentials: true }
      );
      toast.success("Account created successfully");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 p-6">
        <div className="hidden lg:block">
          <div className="mb-6">
            <QuoteBox
              quote="No one can limit a woman who believes in her potential and takes action to achieve her goals."
              bcolor="border-red-500"
              bgcolor="bg-red-100"
            />
          </div>
          <QuoteBox
            quote="You are powerful, brilliant, and enough—never let the world convince you otherwise."
            bcolor="border-blue-500"
            bgcolor="bg-blue-100"
          />
        </div>

        <div className="flex flex-col justify-evenly items-center shadow-lg bg-white border-0 rounded-lg w-full max-w-[35rem] h-fit py-10 px-6">
          <h1 className="font-bold text-2xl mb-4">Create a new Account</h1>
          <form
            className="flex flex-col gap-6 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
          >
            <div className="flex flex-col items-end sm:flex-row gap-6">
              <div className="flex flex-col gap-6 w-full">
                <TextField
                  label="First Name"
                  size="small"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  label="Last Name"
                  size="small"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  label="Age"
                  size="small"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-6 w-full">
                <div>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full"
                    size="small"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="not to say">Not to say</MenuItem>
                  </Select>
                </div>
                <TextField
                  label="Email"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="relative">
                  <TextField
                    label="Password"
                    type={hidden ? "text" : "password"}
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                  />
                  <div
                    className="absolute top-2.5 right-3 cursor-pointer"
                    onClick={() => setHidden((prev) => !prev)}
                  >
                    {hidden ? <EyeOff color="grey" /> : <Eye color="grey" />}
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={!isFormValid || loading}
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </form>
          <div className="w-full my-2 text-sm">
            <ul className="list-disc ml-4">
              <li>Password must be of minimum 8 characters</li>
              <li>contains atleast 1 symbol</li>
              <li>contains atleast 1 capital letter</li>
            </ul>
          </div>

          <p className="mt-6 font-semibold">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>

        <div className="hidden lg:block">
          <div className="mb-6">
            <QuoteBox
              quote="A woman’s strength lies in her ability to rise every time she falls and keep moving forward."
              bcolor="border-red-500"
              bgcolor="bg-red-100"
            />
          </div>
          <QuoteBox
            quote="Women are not meant to fit into boxes, they are born to create new paths and rewrite history."
            bcolor="border-blue-500"
            bgcolor="bg-blue-100"
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
