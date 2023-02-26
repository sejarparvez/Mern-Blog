import React from "react";

const SearchBox = () => {
  return (
    <div className="relative rounded-lg border-b-2 border-primary-200 bg-gray-800 py-4 px-2 shadow-lg">
      <input
        type="text"
        className="w-60 rounded-full bg-gray-700 p-2 pl-10 text-white focus:outline-none"
        placeholder="Search"
      />
      <button className="absolute top-4 right-1 mt-3 mr-4">
        <svg
          className="h-6 w-6 fill-current text-gray-100 "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBox;
