/* eslint-disable react/prop-types */
import { useState } from "react";

const EmergencyNums = ({ nums }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyNumber = (number, index) => {
    if (copiedIndex === index) return;

    navigator.clipboard.writeText(number);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 justify-center items-start">
      {nums.map(([title, number], index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-purple-300 rounded-2xl p-5 shadow-md"
        >
          <h1 className="font-bold text-xl text-center">{title}</h1>
          <h2 className="text-red-600 font-semibold mt-1 text-lg">{number}</h2>

          <button
            onClick={() => copyNumber(number, index)}
            className={`mt-3 px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
              copiedIndex === index
                ? "bg-green-600 text-white cursor-default"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
            aria-live="polite"
          >
            {copiedIndex === index ? "Copied!" : "Copy"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default EmergencyNums;
