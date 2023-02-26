import React from "react";
import Featured from "../../Featured/Featured";
import HotPost from "../../HotPost/HotPost";
import Main from "../../Main/Main";
function HomePage() {
  return (
    <div className="flex flex-col gap-24 px-4">
      <div>
        <Featured />
      </div>
      <div>
        <HotPost />
      </div>

      <div>
        <Main />
      </div>
    </div>
  );
}

export default HomePage;
