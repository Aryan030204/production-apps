import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import { Link } from "react-router";
import gsap from "gsap";
import { useEffect } from "react";

const HeroBanner = () => {
  const user = JSON.parse(localStorage.getItem("user"));
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
    <div className="relative overflow-visible flex flex-col lg:flex-row bg-purple-950 w-full min-h-[16rem] lg:min-h-[40vh] px-4 py-6 md:py-8">
      {/* Text Section */}
      <div className="w-full lg:w-[60%] flex flex-col justify-center">
        <h1 className="text-white font-bold lg:text-7xl md:text-4xl text-2xl ml-2 sm:ml-4 my-2 drop-shadow-[3px_3px_3px_black] leading-tight">
          <span className="text-red-500">THEY</span> BUILT CAGES, <br />
          SHE GREW <span className="text-blue-600">WINGS...</span>
        </h1>
        <p className="text-white font-bold ml-2 sm:ml-4 mt-2 md:text-base text-sm drop-shadow-[1px_2px_1px_black]">
          Protection at your fingertips, <br />
          because every woman deserves to feel secure!
        </p>
        {!user && (
          <div className="w-fit bg-white font-semibold px-4 py-2 mt-4 ml-2 sm:ml-4 rounded-3xl shadow-lg transition-all duration-300 hover:text-white hover:bg-black">
            <Link to="/login" className="text-base md:text-lg">
              <button>JOIN NOW</button>
            </Link>
          </div>
        )}
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-[40%] flex justify-center items-center relative mt-6 lg:mt-0 z-10 pointer-events-none">
        <img
          src={hero2}
          alt="hero2"
          className="hero2 absolute hidden md:block z-20 w-[11rem] md:w-[16rem] lg:w-[20rem] h-auto md:left-[32rem] lg:left-36 md:bottom-[-3rem] lg:-bottom-8 drop-shadow-[0_12px_20px_rgba(0,0,0,0.55)]"
        />
        <img
          src={hero1}
          alt="hero1"
          className="hero1 absolute hidden md:block z-10 h-[14rem] md:h-[22rem] lg:h-[32rem] md:left-[42rem] lg:left-[22rem] md:-bottom-[4rem] lg:-bottom-16 drop-shadow-[0_16px_28px_rgba(0,0,0,0.6)]"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
