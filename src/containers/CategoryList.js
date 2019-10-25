import React, { Component } from "react";
import CategoryItem from "../components/CategoryItem";
import { connect } from "react-redux";
import { selectCategory } from "../actions";

class CategoryList extends Component {
  getCategory = category => {
    this.props.selectCategory(category);
  };
  renderCatergories(data) {
    const renderSublevels = sublevels => {
      if (sublevels) {
        return <ul>{this.renderCatergories(sublevels)}</ul>;
      }
    };
    const CATEGORY_LIST = data.map((category, i) => {
      return (
        <CategoryItem
          key={category.name}
          getCategory={this.getCategory}
          category={category}
        >
          {renderSublevels(category.sublevels)}
        </CategoryItem>
      );
    });
    return CATEGORY_LIST;
  }

  render() {
    return (
      <div>
        <ul>{this.renderCatergories(this.props.categorias)}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categorias: state.categorias.categories,
    productos: state.productos.products,
    selectedCategory: state.selectedCategory
  };
};

export default connect(
  mapStateToProps,
  {
    selectCategory
  }
)(CategoryList);
