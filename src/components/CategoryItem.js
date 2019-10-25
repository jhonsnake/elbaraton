import React from "react";

const CategoryItem = props => {
  return (
    <li>
      <button
        className="category-button"
        onClick={() => props.getCategory(props.category)}
      >
        {props.category.name}
      </button>
      {props.children}
    </li>
  );
};

export default CategoryItem;
