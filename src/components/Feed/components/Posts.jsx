import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisQuery } from "react-moralis";
import Post from "./Post";

const Posts = () => {
  const { selectedCategory } = useMoralisDapp();

  const queryPost = useMoralisQuery(
    "Posts",
    (query) => query.equalTo("categoryId", selectedCategory["categoryId"]),
    [selectedCategory],
    { live: true }
  );
  const fetchedPosts = JSON.parse(
    JSON.stringify(queryPost.data, ["postId", "contentId", "postOwner"])
  ).reverse(); //the newer one on top!

  const havePosts = fetchedPosts.length > 0 ? true : false;
  const emptyResult = (
    <div>
      <h3>Be the first person to post here!</h3>
      <h3>{selectedCategory["category"]}</h3>
    </div>
  );

  const postResult = (
    <div>
      {fetchedPosts.map((post) => (
        <Post key={post["postId"]} post={post} />
      ))}
    </div>
  );

  return havePosts ? postResult : emptyResult;
};

export default Posts;
