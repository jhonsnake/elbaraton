import React, { Component } from "react";
import { connect } from "react-redux";

class Cart extends Component {
  state = { cart: [] };

  renderCartItems = () => {
    const cartItems = this.props.cart.map(producto => {
      return (
        <li className="cart-item">
          <ul>
            <li> Nombre: {producto.name}</li>
            <li> Cantidad: {producto.quantity}</li>
            <li> Precio: {producto.price}</li>
            <li> Subnivel: {producto.sublevel_id}</li>
            <li>Unidades: {producto.unidades}</li>
          </ul>
        </li>
      );
    });

    return cartItems;
  };
  render() {
    console.log(this.props);
    return <div>{this.renderCartItems()}</div>;
  }
}

const mapStateToProps = state => {
  return { cart: state.addToCartReducer };
};

export default connect(mapStateToProps)(Cart);
