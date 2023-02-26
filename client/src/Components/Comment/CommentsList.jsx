import React from "react";

function CommentsList({ comments }) {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const twelveHourFormat = hours % 12 || 12;
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year} ${twelveHourFormat}:${minutes} ${ampm}`;
  };

  return (
    <div className="mt-4 flex flex-col gap-6">
      {comments.map((comment) => (
        <div
          key={`comment-${comment._id}`}
          className="flex flex-col gap-2 bg-white p-4 dark:bg-black"
        >
          <span className="text-xl font-semibold">{comment.name}</span>
          <div className="flex flex-col gap-4">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              {formatTimestamp(comment.createdAt)}
            </span>
            <span>{comment.comment}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentsList;
