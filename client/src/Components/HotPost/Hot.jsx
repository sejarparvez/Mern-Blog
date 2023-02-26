import React from "react";

const Hot = ({ image, author, time, heading }) => (
  <div className="flex w-96 flex-col rounded-3xl border-b-4 border-primary-200 bg-white shadow-2xl dark:bg-black">
    <img src={image} alt="" className="h-52 w-96 rounded-3xl" />
    <div className="flex flex-col gap-3 p-4">
      <div className=" flex justify-between text-gray-700 dark:text-gray-300">
        <span>{author}</span>
        <span>{time}</span>
      </div>
      <span className="text-3xl font-bold">{heading}</span>
    </div>
  </div>
);

export default Hot;
