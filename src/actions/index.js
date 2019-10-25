export const selectCategory = category => {
  return { type: "SELECTED_CATEGORY", payload: category };
};

export const addToCart = product => {
  return { type: "ADD_PRODUCT", payload: product };
};
