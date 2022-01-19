import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { createElement, useEffect, useState } from "react";
import { useMoralisQuery, useWeb3ExecuteFunction } from "react-moralis"; //to fetch content URI from content database.
import Text from "antd/lib/typography/Text";
import Blockie from "components/Blockie";
import { Avatar, Comment, Divider, message, Tooltip } from "antd";
import glStyles from "components/gstyles";
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import Votes from "./Votes";

const Post = ({ post }) => {
  const { contentId, postId, postOwner } = post;
  const { walletAddress } = useMoralisDapp();
  const [postContent, setPostContent] = useState({
    title: "Loading...",
    content: "Your content will be fetched right away....",
  });
  const { data } = useMoralisQuery("Contents", (query) =>
    query.equalTo("contentId", contentId)
  );
  const [voteStatus, setVoteStatus] = useState();
  const { data: votes } = useMoralisQuery(
    "Votes",
    (query) => query.equalTo("postId", postId),
    [],
    { live: true }
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

  useEffect(() => {
    if (!votes?.length) return null;
  });

  function vote(input) {
    message.success(input);
  }
  const actions = [
    <Tooltip key="comment-basic-like" title="Vote Up">
      <span
        style={{
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          marginRight: "16px",
        }}
      >
        {createElement(voteStatus === "liked" ? LikeFilled : LikeOutlined)}
      </span>
    </Tooltip>,
    <span style={{ fontSize: "15px" }}>
      {/* <Votes postId={postId} /> */} 0
    </span>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span
        style={{
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          marginLeft: "8px",
        }}
        onClick={() => vote("voteDown")}
      >
        {createElement(
          voteStatus === "disliked" ? DislikeFilled : DislikeOutlined
        )}{" "}
        {/* Vote Down */}
      </span>
    </Tooltip>,
  ];

  const loading = "";
  const result = (
    <Comment
      style={{ ...glStyles.card, padding: "0px 15px", marginBottom: "10px" }}
      actions={actions}
      author={<Text strong>{post["postOwner"]}</Text>}
      avatar={
        <Avatar src={<Blockie address={post["postOwner"]} scale="4" />} />
      }
      content={
        <>
          <Text strong style={{ fontSize: "20px", color: "#333" }}>
            {postContent["title"]}
          </Text>
          <p style={{ fontSize: "15px", color: "#111" }}>
            {postContent["content"]}
          </p>
          <Divider style={{ margin: "15px 0px" }} />
        </>
      }
    />
  );
  return postContent["title"] === "default" ? loading : result;
};

export default Post;
