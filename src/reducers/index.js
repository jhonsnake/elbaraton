import { combineReducers } from "redux";

import PRODUCTS from "../data/products.json";
import CATEGORIES from "../data/categories.json";

const LoadProductReducer = () => PRODUCTS;
const LoadCategoryReducer = () => CATEGORIES;

const selectedCategoryReducer = (selectedCategory = null, action) => {
  if (action.type === "SELECTED_CATEGORY") {
    return action.payload.id;
  }

  return selectedCategory;
};

//

const checkLocalStorage = () => {
  if (!JSON.parse(localStorage.getItem("Cart"))) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("Cart"));
  }
};

const addToCartReducer = (state = checkLocalStorage(), action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const findDuplicate = state.find(duplicado => {
        return duplicado.id === action.payload.id;
      });

      if (findDuplicate) {
        state[state.indexOf(findDuplicate)].unidades += 1;
        localStorage.setItem("Cart", JSON.stringify(state));
        function updateState() {
          return state;
        }
        return updateState();
      } else {
        localStorage.setItem(
          "Cart",
          JSON.stringify([...state, action.payload])
        );

        return [...state, action.payload];
      }

    case "DELETE_UNIT":
      const findProduct = state.find(product => {
        return product.id === action.payload.id;
      });

      if (findProduct) {
        state[state.indexOf(findDuplicate)].unidades -= 1;
        localStorage.setItem("Cart", JSON.stringify(state));

        return state;
      } else {
        localStorage.setItem(
          "Cart",
          JSON.stringify([...state, action.payload])
        );

        return [...state, action.payload];
      }

    default:
      localStorage.setItem("Cart", JSON.stringify(state));
      return state;
  }
};

export default combineReducers({
  productos: LoadProductReducer,
  categorias: LoadCategoryReducer,
  selectedCategory: selectedCategoryReducer,
  addToCartReducer
});
