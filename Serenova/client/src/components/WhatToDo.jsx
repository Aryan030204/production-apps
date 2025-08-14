import guide1 from "../assets/guide1.png";
import guide2 from "../assets/guide2.png";
import CustomButton from "./CustomButton";

const tipData = [
  "Stick to well-lit, busy streets and avoid isolated shortcuts.",
  "Share your route with a friend or family member.",
  "Keep your phone accessible and fully charged.",
  "Trust your instincts and seek help if you feel unsafe.",
];

const WhatToDo = () => {
  return (
    <div className="flex flex-col w-full items-center bg-purple-950 px-4 py-10 relative overflow-hidden">
      <h1 className="text-center text-white font-bold text-3xl md:text-4xl lg:text-5xl mb-8">
        What you can do...
      </h1>

      {/* Main Flex Area */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 w-full relative z-10">
        {/* Left: Tips with Guide Image */}
        <div className="flex flex-col lg:flex-row items-center gap-6 relative">
          <img
            src={guide1}
            alt="guide1"
            className="w-[18rem] md:w-[22rem] lg:w-[26rem] h-auto drop-shadow-md"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            {tipData.map((tip, idx) => (
              <div
                key={idx}
                className="bg-red-200 p-4 rounded-xl font-sans text-sm md:text-base shadow-md"
              >
                <h2 className="font-bold text-lg mb-1">
                  Stay Safe Tip #{idx + 1}
                </h2>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* OR Divider */}
        <div className="text-4xl font-extrabold font-mono text-white hidden lg:block">
          OR
        </div>

        {/* Right: CTA with App Image */}
        <div className="flex flex-col items-center gap-6 lg:ml-10">
          <div className="hover:scale-110 transition-transform">
            <CustomButton title="Download Our App" color="red" />
          </div>
          <img
            src={guide2}
            alt="guide2"
            className="w-[14rem] md:w-[16rem] hidden lg:block drop-shadow-[2px_2px_1px_black]"
          />
        </div>
      </div>
    </div>
  );
};

export default WhatToDo;
