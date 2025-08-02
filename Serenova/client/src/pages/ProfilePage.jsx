import { Link } from "react-router-dom";
import ProfileForm from "../components/ProfileForm";

const ProfilePage = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <ProfileForm />
      <div className="flex items-center">
        <Link to={"/routes"}>
          <button className="bg-blue-500 p-2 text-white font-semibold text-xl hover:underline mb-[2rem]">
            My saved routes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
