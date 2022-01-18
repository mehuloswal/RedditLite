import { useEffect, useState } from "react";
import { useMoralisQuery, useWeb3ExecuteFunction } from "react-moralis"; //to fetch content URI from content database.

const Post = ({ post }) => {
  const { contentId, postId, postOwner } = post;
  const [postContent, setPostContent] = useState({
    title: "Loading...",
    content: "Your content will be fetched right away....",
  });
  const { data } = useMoralisQuery("Contents", (query) =>
    query.equalTo("contentId", contentId)
  );

  useEffect(() => {
    function extractUri(data) {
      const fetchedContent = JSON.parse(JSON.stringify(data, ["contentUri"]));
      const contentUri = fetchedContent[0]["contentUri"];
      return contentUri;
    }
    async function fetchIPFSDoc(ipfshash) {
      const url = ipfshash;
      const response = await fetch(url);
      return await response.json();
    }
    async function processContent() {
      const content = await fetchIPFSDoc(extractUri(data));
      setPostContent(content);
    }
    if (data.length > 0) {
      processContent();
    }
  }, [data]);

  console.log("Post: ", post);
  return (
    <pre>
      <h4>{postContent["title"]}</h4>
      <p>{postContent["content"]}</p>
    </pre>
  );
};

export default Post;
