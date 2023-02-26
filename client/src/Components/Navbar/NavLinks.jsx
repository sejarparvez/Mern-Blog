import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../UserContext";

import Toggle from "./Toggle";

function NavLinks() {
  const { setUserInfo, userInfo } = useContext(userContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  const email = userInfo?.email;
  const id = userInfo?.id;

  

  return (
    <div className="hidden items-center gap-12 lg:flex [&>*]:cursor-pointer">
      <li className=" hover:text-pink">Service</li>

      <li className=" hover:text-pink">Featured Work</li>

      <li className=" hover:text-pink">Pricing</li>

      <li className=" hover:text-pink">About Us</li>

      <li className=" hover:text-pink">Contact Us</li>
      <span>
        <Toggle />
      </span>

      <span className="text-pink">||</span>
      <div className="flex gap-2">
        {email && (
          <>
          
            <Link to={`/users/${id}`}>
              <button className="rounded-md bg-black py-2 px-6 text-white dark:bg-gray-700">
                Profile
              </button>
            </Link>
          </>
        )}

        {!email && (
          <>
            <Link to="/login">
              <button className="rounded-md bg-black py-2 px-6 text-white dark:bg-gray-700">
                Log In
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default NavLinks;
