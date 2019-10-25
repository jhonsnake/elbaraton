import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../actions/index";

class Product extends Component {
  handleButton = () => {
    const producto = { ...this.props.producto, unidades: 1 };
    this.props.addToCart(producto);
    window.location.reload(false);
  };
  render() {
    return (
      <li className="producto">
        <ul>
          <li> Nombre: {this.props.producto.name}</li>
          <li> Cantidad: {this.props.producto.quantity}</li>
          <li> Precio: {this.props.producto.price}</li>
          <li> Subnivel: {this.props.producto.sublevel_id}</li>
          <li> Disponible: {this.props.producto.available.toString()}</li>
          <li>
            {this.props.producto.available ? (
              <button onClick={this.handleButton}>Agregar al carrito</button>
            ) : (
              <button disabled>Sin Stock</button>
            )}
          </li>
        </ul>
      </li>
    );
  }
}

export default connect(
  null,
  {
    addToCart
  }
)(Product);
