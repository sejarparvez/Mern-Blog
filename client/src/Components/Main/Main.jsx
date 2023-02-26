import React from "react";
import Catagorires from "../Catagorires/Catagorires";
import Recent from "./Recent";

function Main() {
  return (
    <div className="flex flex-col-reverse gap-60 md:mx-24 md:grid md:grid-cols-4 md:gap-8">
      <div className="md:sticky md:top-20 md:col-span-1 md:row-span-1 md:scroll-auto">
        <Catagorires />
      </div>

      <div className="md:col-span-3 md:row-span-2">
        <Recent />
      </div>
    </div>
  );
}

export default Main;
