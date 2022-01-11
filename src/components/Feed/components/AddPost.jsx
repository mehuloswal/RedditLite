import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisFile } from "react-moralis";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useState } from "react";
import { message } from "antd";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const validateForm = () => {
    let result = !title || !content ? false : true;
    return result;
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
  };

  function onSubmit(e) {
    e.preventDefault();
    if (!validateForm())
      return message.error("Remember to add the title and content of the post");
    message.success("Post Added to the RedditLite Chain");
    clearForm();
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="form-group">
          <input
            type="text"
            className="mb-2 mt-2 form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            className="mb-2 form-control"
            placeholder="Post away"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-dark ">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddPost;
