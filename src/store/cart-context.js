import React from "react";

const CartContext = React.createContext({
  items: [],
  orderAmount: [
    { orderAmount: 20, deliveryAmount: 3 },
    { orderAmount: 50, deliveryAmount: 1.5 },
    { orderAmount: 100, deliveryAmount: 0 },
  ],
  deliveryAmount: 0,
  totalAmount: 0,
  totalOrderAmount: 0,
  addItem: (item, reference) => {},
  removeItem: (id) => {},
  removeAllItem: (id) => {},
  removeCart: () => {},
});

export default CartContext;
