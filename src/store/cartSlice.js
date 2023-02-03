import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const defaultCartState = {
  items: [],
  orderAmount: [{ amount: 0, deliveryAmount: 0 }],
  deliveryAmount: 0,
  totalAmount: 0,
  totalOrderAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: defaultCartState,
  reducers: {
    add(state, action) {
      const amountType =
        action.payload.reference === "CART" ? 1 : action.payload.item.amount;

      const existingCartIndex = state.items.findIndex(
        (item) => item.id === action.payload.item.id
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
        updatedItems = state.items.concat(action.payload.item);
      }

      state.items = updatedItems;
      state.totalAmount =
        state.totalAmount + amountType * action.payload.item.price;
      state.orderAmount.forEach((item) => {
        if (state.totalAmount >= item.amount) {
          state.deliveryAmount = item.deliveryAmount;
        }
      });
      state.totalOrderAmount = state.totalAmount + state.deliveryAmount;
    },
    removeItem(state, action) {
      const existingCartIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      const existingItem = state.items[existingCartIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.payload);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartIndex] = updatedItem;
      }

      state.items = updatedItems;
      state.totalAmount = updatedTotalAmount;
      state.orderAmount.forEach((item) => {
        if (state.totalAmount >= item.amount) {
          state.deliveryAmount = item.deliveryAmount;
        }
      });
      state.totalOrderAmount = updatedTotalAmount;
    },
    removeItems(state, action) {
      const existingCartIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      const existingItem = state.items[existingCartIndex];

      const updatedTotalAmount =
        state.totalAmount - existingItem.amount * existingItem.price;

      let updatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );

      state.items = updatedItems;
      state.totalAmount = updatedTotalAmount;
      state.orderAmount.forEach((item) => {
        if (state.totalAmount >= item.amount) {
          state.deliveryAmount = item.deliveryAmount;
        }
      });
      state.totalOrderAmount = updatedTotalAmount > 0 ? updatedTotalAmount : 0;
    },
    removeCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalOrderAmount = 0;
      state.deliveryAmount = 0;
    },
    getInfo(state, action) {
      state.orderAmount = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

/*
const cartReducer = (state, action) => {
  const calDeliveryAmount = (updatedTotalAmount) => {
    let deliveryAmount = defaultCartState.deliveryAmount;

    state.orderAmount.forEach((item) => {
      if (updatedTotalAmount >= item.amount) {
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

  if (action.type === "GET_INFO") {
    return {
      ...state,
      orderAmount: action.data,
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
    return defaultCartState;
  }

  return defaultCartState;
};
*/
/*
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const getInfo = (data) => {
    dispatchCartAction({
      type: "GET_INFO",
      data: data,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const Response = await fetch(
        "https://your-firebase-address/orderAmount.json"
      );

      if (!Response.ok) {
        throw new Error("Something went wrong!");
      }

      const ResponseData = await Response.json();

      const loadedData = [];

      for (const key in ResponseData) {
        loadedData.push({
          id: key,
          amount: ResponseData[key].amount,
          deliveryAmount: ResponseData[key].deliveryAmount,
        });
      }

      getInfo(loadedData);
    };

    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);

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
    orderAmount: cartState.orderAmount,
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
*/
