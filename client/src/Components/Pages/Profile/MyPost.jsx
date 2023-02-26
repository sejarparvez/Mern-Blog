import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import RecentModel from "../../Main/RecentModel";

function UserPost() {
  const { id } = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(`http://localhost:4000/userpost/${id}`);
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, [id]);

  return (
    <div className=" mx-auto mt-20 md:w-8/12 p-2">
      <div className="flex flex-col gap-16">
        {posts.length > 0 &&
          posts.map((post) => <RecentModel key={post._id} {...post} />)}
      </div>
    </div>
  );
}

export default UserPost;
