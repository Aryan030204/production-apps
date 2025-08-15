import { Link } from "react-router-dom";
import ProfileForm from "../components/ProfileForm";

const ProfilePage = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <ProfileForm />
      <div className="flex items-center">
        <Link to={"/routes"}>
          <button className="bg-purple-900 rounded-lg p-2 text-white font-semibold transition-all ease-in-out duration-300 hover:bg-purple-800 text-xl hover:underline mb-[2rem]">
            My saved routes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
