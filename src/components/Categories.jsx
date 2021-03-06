import { Menu } from "antd";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import React from "react";
import glStyles from "./gstyles";

const Categories = ({ categories }) => {
  const { setSelectedCategory } = useMoralisDapp();

  function selectCategory(categoryId) {
    const selectedCategory = categories.filter(
      (category) => category["categoryId"] === categoryId
    );
    setSelectedCategory(selectedCategory[0]);
  }

  return (
    <div className="col-lg-3">
      <Menu
        onClick={(e) => selectCategory(e.key)}
        mode="inline"
        style={{ ...glStyles.card, padding: "10px 0" }}
      >
        <Menu.ItemGroup key="categories" title="Categories">
          {categories.map((category) => (
            <Menu.Item key={category["categoryId"]}>
              {category["category"]}
            </Menu.Item>
          ))}
        </Menu.ItemGroup>
      </Menu>
    </div>
  );
};

export default Categories;
