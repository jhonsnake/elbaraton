import React, { Component } from "react";
import CategoryList from "../containers/CategoryList";
import ProductList from "../containers/ProductList";
import Cart from "../containers/Cart";

export default class MainComponent extends Component {
  render() {
    return (
      <div className="main">
        <header>
          <h1>El Baratón</h1>
        </header>
        <div className="wrapper">
          <div className="category">
            <h4>Categorías</h4>
            <CategoryList />
          </div>

          <div className="products">
            <ProductList />
          </div>
          <div className="cart">
            <h4>Carrito</h4>
            <Cart />
          </div>
        </div>
      </div>
    );
  }
}
