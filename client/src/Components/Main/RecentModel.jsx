import Time from "@iconscout/react-unicons/icons/uil-clock";
import User from "@iconscout/react-unicons/icons/uil-user";
import dayjs from "dayjs";
import "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

import React from "react";

dayjs.extend(relativeTime);

function RecentModel({ cover, title, summery, author, createdAt, _id }) {
  const timeAgo = dayjs(createdAt).locale("en").fromNow();
  return (
    <div className="flex flex-col gap-20">
      <div className="h- hidden rounded-3xl border-r-4 border-primary-200 bg-white p-4 dark:bg-black md:block">
        <div className="flex h-full w-full flex-col gap-6 bg-white dark:bg-black md:flex-row">
          <div className="w-2/6 bg-black">
            <Link to={`/post/${_id}`}>
              <img
                src={"http://localhost:4000/" + cover}
                alt=""
                className=" h-full w-full object-cover"
              />
            </Link>
          </div>
          <div className="flex w-4/6 flex-col gap-4">
            <Link to={`/post/${_id}`}>
              <h1 className="text-3xl font-bold">{title}</h1>
            </Link>
            <div className="text-gray-700 dark:text-gray-300">{summery}...</div>
            <div className=" w-full text-sm text-gray-700 dark:text-gray-400 ">
              <div className="flex justify-between">
                <span className="flex gap-2">
                  <User size="20" />
                  <span>{author.name}</span>
                </span>
                <span className="flex gap-2">
                  <Time size="20" />
                  <span>{timeAgo}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" rounded-3xl border-b-4 border-primary-200 bg-white p-4 dark:bg-black md:hidden">
        <div className=" flex h-[100%] w-[100%] flex-col bg-white dark:bg-black md:h-48 md:flex-row md:gap-6">
          <div className="flex flex-col gap-4 md:relative">
            <Link to={`/post/${_id}`}>
              <h1 className="text-2xl font-bold">{title}</h1>
            </Link>
            <div className="">
              <Link to={`/post/${_id}`}>
                <img
                  src={"http://localhost:4000/" + cover}
                  alt=""
                  className="float-left mr-4 h-24 w-40"
                />
              </Link>
              <span>{summery}....</span>
            </div>

            <div className="bottom-0 w-full text-sm text-gray-700 dark:text-gray-400 md:absolute">
              <div className="flex justify-between">
                <span className="flex gap-2">
                  <span>
                    <User size="20" />
                  </span>
                  <span>{author.name}</span>
                </span>
                <span className="flex gap-2">
                  <span>
                    <Time size="20" />
                  </span>
                  <span>{timeAgo}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentModel;
