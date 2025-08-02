import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useEffect } from "react";

const HeroBanner = () => {
  useEffect(() => {
    gsap.fromTo(
      ".hero2",
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    );
    gsap.fromTo(
      ".hero1",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 2, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="flex flex-col lg:flex-row bg-purple-400 w-full lg:h-[40vh] md:h-[17rem] px-4 py-6 md:py-0">
      {/* Text Section */}
      <div className="w-full lg:w-[60%] flex flex-col justify-center">
        <h1 className="text-white font-bold lg:text-7xl md:text-3xl text-2xl ml-4 my-2 drop-shadow-[0px_0px_1px_black]">
          <span className="text-red-500">THEY</span> BUILT CAGES, <br />
          SHE GREW <span className="text-blue-600">WINGS...</span>
        </h1>
        <p className="text-white font-bold ml-4 mt-2 md:text-sm text-xs drop-shadow-[0px_0px_1px_black]">
          Protection at your fingertips, <br />
          because every woman deserves to feel secure!
        </p>
        <div className="w-fit bg-white font-semibold px-4 py-2 mt-4 ml-4 rounded-3xl shadow-lg transition-all duration-300 hover:text-white hover:bg-black">
          <Link to="/login" className="text-sm md:text-base">
            <button>JOIN NOW</button>
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-[40%] flex justify-center items-center relative mt-6 lg:mt-0">
        <img
          src={hero2}
          alt="hero2"
          className="hero2 absolute lg:top-[11rem] lg:left-[7rem] w-[20rem] md:w-[18rem] sm:w-[16rem] h-auto"
        />
        <img
          src={hero1}
          alt="hero1"
          className="hero1 relative lg:bottom-[1rem] lg:h-[32rem] md:h-[22rem] h-[18rem] lg:left-[10rem]"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
