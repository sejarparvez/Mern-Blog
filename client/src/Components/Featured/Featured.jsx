import React from "react";
import pic1 from "../../img/pic1.jpg";

function Featured() {
  return (
    <div className="flex flex-col gap-8 rounded-3xl border-b-4 border-primary-200 bg-white p-2 shadow-2xl dark:bg-dark-100 md:p-6 lg:flex-row">
      <div className="flex-1">
        <img
          className="w-full object-cover md:h-64 lg:h-full"
          src={pic1}
          alt=""
        />
      </div>
      <div className="relative flex flex-1 flex-col gap-5">
        <div className="-mt-2 text-3xl font-bold md:text-5xl">
          Does usage-based pricing call for a new growth infrastructure stack?
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          Anna Heim || February 5, 2023
        </div>

        <div className="bottom-5 flex justify-end text-dark-300 dark:text-gray-300">
          As we learned earlier this week from OpenView's latest report,
          usage-based pricing is rising, but not replacing other models. Sure,
          more SaaS companies are billing their customers based on how they are
          using the service. But this often comes in combination with other
          pricing approaches, such as tiered subscriptions.
        </div>
        <div className="flex justify-end">
          <button className="rounded-full bg-black py-2 px-8 font-bold text-white shadow-2xl shadow-primary-200 ring-2 ring-primary-200 focus:ring-4">
            See More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
