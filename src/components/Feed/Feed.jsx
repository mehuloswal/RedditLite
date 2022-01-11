import { useState } from "react";
import { Avatar, Button } from "antd";
import Blockie from "components/Blockie";
import glStyles from "components/gstyles";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import AddPost from "./components/AddPost";

const Feed = () => {
  const { selectedCategory } = useMoralisDapp();
  const [showAddPost, setShowAddPost] = useState(false);
  console.log("Selected Category", selectedCategory);
  let result = null;

  const toggleShowAddPost = () => {
    setShowAddPost(!showAddPost);
  };

  if (selectedCategory["category"] === "default") {
    result = (
      <div className="col-lg-9">
        <h3>Choose a Category</h3>
      </div>
    );
  } else {
    result = (
      <div className="col-lg-9">
        <div
          style={{
            ...glStyles.card,
            padding: "10px 13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar src={<Blockie currentWallet />} />
          <h4>
            Your Reputation in {selectedCategory["category"]} is {""}{" "}
          </h4>
          <Button shape="round" onClick={toggleShowAddPost}>
            Post
          </Button>
        </div>
        {showAddPost ? <AddPost /> : ""}
        <h3>Posts will go here</h3>
      </div>
    );
  }

  return <>{result}</>;
};

export default Feed;
