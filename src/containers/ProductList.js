import React, { Component } from "react";
import Product from "./Product";
import { connect } from "react-redux";

class ProductList extends Component {
  state = {
    disponibilidad: "todos",
    min: 0,
    max: 1000000,
    cantidad: 100,
    orden: "precio"
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };
  renderProductList() {
    const renderProducts = this.renderFilteredProducts().map(producto => {
      return <Product key={producto.id} producto={producto} />;
    });

    if (renderProducts) {
      return renderProducts;
    }
  }

  renderFilteredProducts = (options = this.state) => {
    const sortProduct = noSorted => {
      const Sorted = noSorted.sort((a, b) => {
        if (options.orden === "precio") {
          if (
            Number(a.price.slice(1).replace(",", "")) >
            Number(b.price.slice(1).replace(",", ""))
          ) {
            return -1;
          }

          if (
            Number(b.price.slice(1).replace(",", "")) >
            Number(a.price.slice(1).replace(",", ""))
          ) {
            return 1;
          }

          return 0;
        }

        if (options.orden === "disponibilidad") {
          if (a.available > b.available) {
            return -1;
          }

          if (b.available > a.available) {
            return 1;
          }

          return 0;
        }

        if (options.orden === "cantidad") {
          if (a.quantity > b.quantity) {
            return -1;
          }

          if (b.quantity > a.quantity) {
            return 1;
          }

          return 0;
        }

        return null;
      });
      return Sorted;
    };

    const filtered = this.props.productos.filter(producto => {
      if (
        producto.sublevel_id === this.props.selectedCategory &&
        producto.available.toString() === options.disponibilidad &&
        Number(producto.price.slice(1).replace(",", "")) > options.min &&
        Number(producto.price.slice(1).replace(",", "")) < options.max &&
        producto.quantity >= options.cantidad
      ) {
        return producto;
      } else if (
        producto.sublevel_id === this.props.selectedCategory &&
        options.disponibilidad === "todos" &&
        Number(producto.price.slice(1).replace(",", "")) > options.min &&
        Number(producto.price.slice(1).replace(",", "")) < options.max &&
        producto.quantity >= options.cantidad
      ) {
        return producto;
      }

      return null;
    });

    return sortProduct(filtered);
  };

  render() {
    return (
      <ul>
        {this.props.selectedCategory ? (
          <div>
            <form>
              <ul>
                <li>
                  <label>Disponibilidad: </label>
                  <select
                    name="disponibilidad"
                    onChange={this.handleChange}
                    value={this.state.disponibilidad}
                  >
                    <option value="todos">Todos</option>
                    <option value={true}>Disponible</option>
                    <option value={false}>No Disponible</option>
                  </select>
                </li>
                <li>
                  <label>Rango de precios:</label>
                  <input
                    onChange={this.handleChange}
                    value={this.state.min}
                    name="min"
                    type="number"
                    placeholder={this.state.min}
                  />
                  a
                  <input
                    onChange={this.handleChange}
                    value={this.state.max}
                    name="max"
                    type="number"
                    placeholder={this.state.max}
                  />
                </li>
                <li>
                  <label>Cantidad min en stock:</label>
                  <input
                    onChange={this.handleChange}
                    value={this.state.cantidad}
                    name="cantidad"
                    type="number"
                    placeholder="1000"
                  />
                </li>
              </ul>

              <ul>
                <li>
                  <label>Orden: </label>
                  <select
                    name="orden"
                    onChange={this.handleChange}
                    value={this.state.orden}
                  >
                    <option value="precio">Precio</option>
                    <option value="disponibilidad">Disponibilidad</option>
                    <option value="cantidad">Cantidad</option>
                  </select>
                </li>
              </ul>
            </form>
            {this.renderProductList()}
          </div>
        ) : (
          <p>Por favor seleccione una categoría</p>
        )}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    productos: state.productos.products,
    selectedCategory: state.selectedCategory
  };
};

export default connect(mapStateToProps)(ProductList);
