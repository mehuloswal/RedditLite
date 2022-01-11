import { useMoralisQuery } from "react-moralis";
import Categories from "./Categories";

const Main = () => {
  const queryCategories = useMoralisQuery("Categories");
  const fetchedCategories = JSON.parse(
    JSON.stringify(queryCategories.data, ["categoryId", "category"])
  );

  console.log("Categories: ", fetchedCategories);
  return (
    <div className="container">
      <h3>This is Main</h3>
      <div className="row">
        <div className="col-lg-3">
          <Categories categories={fetchedCategories} />
        </div>
        <div className="col-lg-9">
          <h3> This is Feed</h3>
        </div>
      </div>
    </div>
  );
};

export default Main;
