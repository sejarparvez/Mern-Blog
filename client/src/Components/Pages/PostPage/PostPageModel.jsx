import Edit from "@iconscout/react-unicons/icons/uil-edit";
import Trash from "@iconscout/react-unicons/icons/uil-trash-alt";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../../UserContext";
import Catagorires from "../../Catagorires/Catagorires";
import CommentForm from "../../Comment/Comment";

function PostPageModel() {
  const { userInfo } = useContext(userContext);
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, [id]);

  if (!postInfo) return <div>Loading...</div>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    const day = formattedDate.split(" ")[0];
    const month = formattedDate.split(" ")[1];
    const year = formattedDate.split(" ")[2];
    return `${day}${daySuffix(day)} ${month} ${year}`;
  };

  const daySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      fetch(`http://localhost:4000/post/${postInfo._id}`, {
        method: "DELETE",
      }).then(() => {
        navigate("/");
      });
    }
  };

  const postId = postInfo._id;

  return (
    <div className="mx-0 flex flex-col-reverse gap-60 md:grid md:grid-cols-8 md:gap-12">
      <div className="px-6 md:sticky md:top-20 md:col-span-2 md:row-span-1 md:scroll-auto">
        <Catagorires />
      </div>
      <div className="rounded-2xl py-1 px-2 md:col-span-6 md:row-span-2">
        <div className="mb-10  rounded-lg bg-white px-2 py-4 dark:bg-black">
          <h1 className="text-4xl font-extrabold ">{postInfo.title}</h1>
          <div className="mt-6 flex flex-col items-center gap-6 bg-white dark:bg-black md:flex-row">
            <span className="mx-2 flex text-sm md:w-2/4">
              <span className="text-sm ">
                This Post Last Was Updated By{" "}
                <Link to={`/users/${postInfo.author._id}`}>
                  <span className="px-1 text-lg font-medium ">
                    {postInfo.author.name}
                  </span>{" "}
                </Link>
                At{" "}
                <span className="text-lg font-medium">
                  {formatDate(postInfo.updatedAt)}
                </span>
              </span>
            </span>

            {userInfo.id === postInfo.author._id && (
              <div className="mx-auto flex items-center justify-center md:justify-end">
                <div>
                  <Link to={`/edit/${postInfo._id}`}>
                    <span className="mr-4 flex gap-1 rounded-lg bg-black px-3 py-2 font-bold text-white hover:bg-red-700 dark:bg-gray-600">
                      <span>
                        <Edit />
                      </span>
                      <span>Edit Post</span>
                    </span>
                  </Link>
                </div>
                <div>
                  <span
                    className=" flex gap-1 rounded-lg bg-red-600 px-3 py-2 font-bold text-white hover:bg-red-700"
                    onClick={handleDelete}
                  >
                    <span>
                      <Trash />
                    </span>

                    <span>Delete Post</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <img
          className="h-52 w-full rounded-lg object-cover shadow-lg md:h-96"
          src={`http://localhost:4000/${postInfo.cover}`}
          alt=""
        />
        <div
          className=" mt-10 mb-12 max-w-none rounded-lg bg-white p-3 dark:bg-black  md:mt-16 md:text-lg"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
        <div>
          <CommentForm postId={postId} />
        </div>
      </div>
    </div>
  );
}

export default PostPageModel;
