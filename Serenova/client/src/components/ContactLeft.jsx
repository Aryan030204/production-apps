/* eslint-disable react/no-unescaped-entities */
import rightArrow from "../assets/rightArrow.png";

const ContactLeft = () => {
  return (
    <div className="flex flex-col w-full md:w-1/2 gap-8 px-4">
      <div className="flex flex-col gap-12">
        {/* Section 1 */}
        <div className="w-full">
          <h1 className="text-2xl sm:text-3xl mb-3 font-semibold text-purple-700">
            CONTACT
          </h1>
          <p className="font-bold text-3xl sm:text-5xl mb-2 leading-tight">
            REACH OUT AND <br />{" "}
            <span className="text-purple-800">CONNECT</span>
          </p>
          <p className="font-semibold text-base sm:text-xl">
            Let's collaborate to make your journeys safer and smarter!
          </p>
        </div>

        {/* Section 2 */}
        <div className="w-full">
          <h1 className="font-bold text-lg sm:text-xl leading-snug">
            Don't hesitate—discover how we <br /> can enhance your travel safety
            and efficiency:
          </h1>

          <ul className="flex flex-col mt-6 gap-4 text-base sm:text-lg font-semibold">
            <li className="flex items-center gap-3 sm:gap-4">
              <img src={rightArrow} alt="arrow" className="w-4 sm:w-5" />
              <p>Schedule a call or demo</p>
            </li>
            <li className="flex items-center gap-3 sm:gap-4">
              <img src={rightArrow} alt="arrow" className="w-4 sm:w-5" />
              <p>Learn more about careers</p>
            </li>
            <li className="flex items-center gap-3 sm:gap-4">
              <img src={rightArrow} alt="arrow" className="w-4 sm:w-5" />
              <p>Ask general questions</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactLeft;
