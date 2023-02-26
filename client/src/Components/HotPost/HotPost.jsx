import React from "react";
import img2 from "../../img/pic2.jpg";
import img3 from "../../img/pic3.jpeg";
import img4 from "../../img/pic4.jpg";
import Hot from "./Hot";

const HotPost = () => (
  <div className="flex flex-wrap justify-center gap-8">
    <Hot
      image={img2}
      author="Diana Prince"
      time="13 hours ago"
      heading="This Is The Heading Of Our First Hot Post"
    />
    <Hot
      image={img3}
      author="Alexander Luthor"
      time="14 hours ago"
      heading="This Is The Heading Of Our Second Hot Post"
    />
    <Hot
      image={img4}
      author="Bruce Wayne"
      time="3 days ago"
      heading="This Is The Heading Of Our Third Hot Post"
    />
  </div>
);

export default HotPost;
