import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  orderAmount: [
    { orderAmount: 20, deliveryAmount: 3 },
    { orderAmount: 50, deliveryAmount: 1.5 },
    { orderAmount: 100, deliveryAmount: 0 },
  ],
  deliveryAmount: 0,
  totalAmount: 0,
  totalOrderAmount: 0,
};

const cartReducer = (state, action) => {
  const calDeliveryAmount = (updatedTotalAmount) => {
    let deliveryAmount = defaultCartState.deliveryAmount;
    defaultCartState.orderAmount.forEach((item) => {
      if (updatedTotalAmount >= item.orderAmount) {
        deliveryAmount = item.deliveryAmount;
      }
    });

    return deliveryAmount;
  };

  if (action.type === "ADD") {
    const amountType = action.reference === "CART" ? 1 : action.item.amount;

    const updatedTotalAmount =
      state.totalAmount + action.item.price * amountType;

    const existingCartIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + amountType,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      ...state,
      deliveryAmount: calDeliveryAmount(updatedTotalAmount),
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartIndex] = updatedItem;
    }

    return {
      ...state,
      deliveryAmount: calDeliveryAmount(updatedTotalAmount),
      items: updatedItems,
      totalAmount: updatedTotalAmount > 0 ? updatedTotalAmount : 0,
    };
  }

  if (action.type === "REMOVE_ITEMS") {
    const existingCartIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartIndex];
    const updatedTotalAmount =
      state.totalAmount - existingItem.price * existingItem.amount;
    let updatedItems;

    updatedItems = state.items.filter((item) => item.id !== action.id);

    return {
      ...state,
      deliveryAmount: calDeliveryAmount(updatedTotalAmount),
      items: updatedItems,
      totalAmount: updatedTotalAmount > 0 ? updatedTotalAmount : 0,
    };
  }

  if (action.type === "REMOVE_CART") {
    return {
      ...defaultCartState,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item, reference) => {
    dispatchCartAction({
      type: "ADD",
      reference: reference,
      item: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  };

  const removeAllItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE_ITEMS",
      id: id,
    });
  };

  const removeCartHandler = () => {
    dispatchCartAction({
      type: "REMOVE_CART",
    });
  };
  const cartContext = {
    items: cartState.items,
    orderAmount: defaultCartState.orderAmount,
    deliveryAmount: cartState.deliveryAmount,
    totalAmount: cartState.totalAmount,
    totalOrderAmount:
      cartState.totalAmount > 0
        ? cartState.totalAmount + cartState.deliveryAmount
        : 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    removeAllItem: removeAllItemFromCartHandler,
    removeCart: removeCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
