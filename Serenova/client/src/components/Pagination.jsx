/* eslint-disable react/prop-types */
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ fetchStories, page, totalPages }) => {
  return (
    <div className="flex justify-center mt-5">
      <button
        onClick={() => fetchStories(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-purple-600 font-semibold rounded-md mx-2 text-white"
      >
        <ChevronLeft />
      </button>

      <span className="px-4 py-2">
        {page} / {totalPages}
      </span>

      <button
        onClick={() => fetchStories(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 bg-purple-600 font-semibold rounded-md mx-2 text-white"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
