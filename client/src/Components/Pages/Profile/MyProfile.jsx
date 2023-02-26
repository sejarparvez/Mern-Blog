import Post from "@iconscout/react-unicons/icons/uil-pen";
import Power from "@iconscout/react-unicons/icons/uil-power";
import React, { useContext, useEffect, useState } from "react";

import { Link, Navigate, useParams } from "react-router-dom";
import img1 from "../../../img/pic1.jpg";
import { userContext } from "../../../UserContext";
import UserPost from "./MyPost";

function Profile() {
  const userInfo = useContext(userContext);

  const { id } = useParams();

  const [user, setUser] = useState("");

  console.log(userInfo.userInfo.email); // should return "object"
  console.log(typeof userInfo.userInfo.email); // should return "string" if email exists

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`http://localhost:4000/profile/${id}`);
      const data = await response.json();
      setUser(data);
    }
    fetchUser();
  }, [id]);

  const [redirect, setRedirect] = useState(false);
  async function logout(ev) {
    ev.preventDefault();
    if (window.confirm("Are you sure you want to log out?")) {
      const response = await fetch("http://localhost:4000/logout", {
        credentials: "include",
        method: "POST",
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        alert("wrong credentials");
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <div className="flex flex-col justify-evenly gap-10 py-20 md:m-8 md:flex-row">
        <div className="flex flex-col gap-12 md:flex-row">
          <div className="mx-auto">
            <img src={img1} alt="" className="w-80" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-4xl font-bold">{user.name}</span>
            <span className="text-2xl">{user.email}</span>
          </div>
        </div>

        {user.email === userInfo.userInfo.email && (
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-center">
              <Link to={"/newpost"}>
                <div className="flex h-12 w-36 items-center justify-center gap-2 rounded-md bg-green-600 font-bold text-white">
                  <span>NewPost</span>
                  <span>
                    <Post />
                  </span>
                </div>
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <div
                className="flex h-12 w-36 items-center justify-center gap-2 rounded-md bg-red-600 font-bold text-white"
                onClick={logout}
              >
                <span>Logout</span>
                <span>
                  <Power />
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className=" mt-10 flex">
          <span className="mx-auto px-3 text-2xl font-bold md:px-6 md:text-4xl">
            <span> Every Article Published By </span>
            {user.name}
            <span className="text-3xl font-extrabold md:text-5xl">
              {user.ame}
            </span>
          </span>
        </div>

        <div>
          <UserPost />
        </div>
      </div>
    </div>
  );
}

export default Profile;
