import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../UserContext";

function MenuLinks() {
  const { userInfo } = useContext(userContext);

  const email = userInfo?.email;
  const id = userInfo?.id;

  return (
    <div className="flex flex-col gap-4 bg-white text-xl dark:bg-dark-100 dark:text-white [&>*]:cursor-pointer">
      <li className=" hover:text-pink font-bold">Service</li>

      <li className=" hover:text-pink">Featured Work</li>

      <li className=" hover:text-pink">Pricing</li>

      <li className=" hover:text-pink">About Us</li>

      <li className=" hover:text-pink">Contact Us</li>
      {email && (
        <>
          <Link to={`/users/${id}`}>Profile</Link>
        </>
      )}

      {!email && (
        <>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}

export default MenuLinks;
