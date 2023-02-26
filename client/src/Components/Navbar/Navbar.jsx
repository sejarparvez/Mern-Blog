import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Menu from "./Menu";
import NavLinks from "./NavLinks";
import Toggle from "./Toggle";

export default function Navbar() {
  const [prevScrollpos, setPrevScrollpos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollpos > currentScrollPos;

      setPrevScrollpos(currentScrollPos);
      setVisible(visible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollpos]);

  return (
    <div
      className={`fixed top-0 z-50 w-screen items-center justify-center border-b-2 bg-white bg-opacity-30 px-8 py-4 font-bold backdrop-blur-xl dark:border-0 dark:bg-dark-100 dark:bg-opacity-30 dark:backdrop-blur-xl md:px-16 ${
        visible ? "" : "hidden"
      }`}
      id="Home"
    >
      <div className="flex  items-center justify-between">
        <Link to={"/"}>
          <div className="flex cursor-pointer items-center gap-4">
            <div className="font-serif text-3xl">Logo</div>
          </div>
        </Link>

        <NavLinks />
        <div className="mt-2 flex items-center gap-9 md:hidden">
          <div>
            <Toggle />
          </div>
          <Menu />
        </div>
      </div>
    </div>
  );
}
