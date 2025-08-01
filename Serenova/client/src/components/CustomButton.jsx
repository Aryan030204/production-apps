/* eslint-disable react/prop-types */

const CustomButton = ({ title, color, size }) => {
  return (
    <>
      <button className={`bg-${color}-500 p-[1rem] text-white border-none rounded-2xl text-${size} font-semibold`}>
        {title}
      </button>
    </>
  );
};

export default CustomButton;
