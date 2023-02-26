import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summery, setSummery] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummery(postInfo.summery);
      });
    });
  }, [id]);

  async function UpdatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summery", summery);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: 'include'
    });
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <div className="mx-auto max-w-2xl p-4 dark:bg-gray-800">
      <form
        className="rounded-lg bg-white p-6 shadow-lg dark:bg-black"
        onSubmit={UpdatePost}
      >
        <div className="mb-4">
          <label
            className="mb-2 block font-bold text-gray-700 dark:text-gray-300"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-black shadow focus:outline-none "
            id="title"
            maxLength={70}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block font-bold text-gray-700 dark:text-gray-300"
            htmlFor="summary"
          >
            Summary
          </label>
          <input
            className="focus:shadow-outline h-20 w-full appearance-none rounded border py-2 px-3 leading-tight text-black shadow focus:outline-none "
            id="summary"
            type="text"
            maxLength={200}
            placeholder="Summary"
            value={summery}
            onChange={(ev) => setSummery(ev.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block font-bold text-gray-700 dark:text-gray-300"
            htmlFor="image"
          >
            Image
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none dark:text-gray-200"
            id="image"
            type="file"
            onChange={(ev) => setFiles(ev.target.files)}
          />
        </div>
        <div className="mb-4 h-[30rem]">
          <label
            className="mb-2 block font-bold text-gray-700 dark:text-gray-300"
            htmlFor="content"
          >
            Content
          </label>
          <div className="rounded">
            <ReactQuill
              className="h-96 w-full"
              value={content}
              onChange={(newValue) => setContent(newValue)}
              modules={modules}
              formats={formats}
            />
          </div>
        </div>
        <button className="rounded bg-black py-2 px-4 font-bold text-white dark:bg-gray-700 ">
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
