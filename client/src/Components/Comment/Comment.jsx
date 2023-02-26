import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../UserContext";
import CommentsList from "./CommentsList";

function CommentForm({ postId }) {
  const { userInfo } = useContext(userContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch the comments for the post from the backend
    fetch(`http://localhost:4000/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the comment to the backend API
    fetch(`http://localhost:4000/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
        user_id: id,
        name: userInfo.name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the new comment to the comments state
        setComments([...comments, data.comment]);

        // Fetch the updated comments from the server and update the comments state
        fetch(`http://localhost:4000/posts/${postId}/comments`)
          .then((response) => response.json())
          .then((data) => setComments(data))
          .catch((error) => console.error("Error fetching comments:", error));
      })
      .catch((error) => console.error(error));

    setComment("");
  };

  const name = userInfo?.name;
  const id = userInfo?.id;

  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-lg">
      <div className="flex flex-col gap-4 bg-white  p-4 dark:bg-black">
        <span className=" text-2xl font-semibold ">Leave A Reply</span>

        {name && (
          <>
            <div className="flex flex-col gap-6">
              <span className=" items-baseline">
                <span className="pr-2 text-xl">
                  {" "}
                  You Are Loged In As{" "}
                  <Link to={`/users/${id}`}>
                    <span className="font-bold">{name}</span>{" "}
                  </Link>
                </span>
                <span className="text-3xl font-bold">{}</span>
              </span>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="mb-2 block font-bold text-gray-700 dark:text-gray-300"
                    htmlFor="comment"
                  >
                    Comment
                  </label>
                  <textarea
                    className="focus:shadow-outline h-32 w-full appearance-none rounded border py-2 px-3 leading-tight  focus:outline-none dark:bg-slate-800 md:h-40"
                    id="comment"
                    rows="3"
                    placeholder="Enter your comment here"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    className="focus:shadow-outline m-4 rounded bg-black py-2 px-6 font-bold text-white focus:outline-none dark:bg-dark-400"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        {!name && (
          <>
            <div className="text-xl">
              You Need To{" "}
              <Link to={"/login"}>
                <span className="font-bold">Log In</span>
              </Link>
            </div>
          </>
        )}
      </div>

      <CommentsList comments={comments} />
    </div>
  );
}

export default CommentForm;
