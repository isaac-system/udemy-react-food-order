import React from "react";

const CartContext = React.createContext({
  items: [],
  orderAmount: [],
  deliveryAmount: 0,
  totalAmount: 0,
  totalOrderAmount: 0,
  addItem: (item, reference) => {},
  removeItem: (id) => {},
  removeAllItem: (id) => {},
  removeCart: () => {},
});

export default CartContext;
