import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import classes from "./Cart.module.css";
import { AiOutlineDelete } from "react-icons/ai";

const Cart = (props) => {
  const { items, orderAmount, deliveryAmount, totalAmount, totalOrderAmount } =
    useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  //console.log(orderAmount);
  const minOrderAmount = `$${orderAmount[0].amount.toFixed(2)}`;

  // 최소 주문 넘었는가?
  const isMinOrderAmountOver = totalAmount >= orderAmount[0].amount;

  // 배달비용
  //  const deliveryAmount = `$${deliveryAmount.toFixed(2)}`;
  // 주문 리스트가 있는가?
  const hasItems = items.length > 0;
  // 최종 주문 금액

  const cartItemRemoveHandler = (id) => {
    //cartCtx.removeItem(id);
    dispatch(cartActions.removeItem(id));
  };

  const cartAllItemRemoveHandler = (id) => {
    //cartCtx.removeAllItem(id);
    dispatch(cartActions.removeItems(id));
  };

  const cartRemoveHandler = () => {
    if (window.confirm("정말 모두 삭제하시겠습니까?")) {
      dispatch(cartActions.removeCart());
      //cartCtx.removeCart();
    }
  };

  const cartItemAddHandler = (item) => {
    dispatch(cartActions.add({ item: item, reference: "CART" }));
    //cartCtx.addItem(item, "CART");
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("https://your-firebase-address/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    //cartCtx.removeCart();
  };

  const deliveryAmountDiv = isMinOrderAmountOver && (
    <div className={classes["delivery-cost"]}>
      <span>배달비용</span>
      <span>${deliveryAmount.toFixed(2)}</span>
    </div>
  );

  const minOrderAmountDiv = !isMinOrderAmountOver && (
    <div className={classes["delivery-cost"]}>
      <span>최소주문금액</span>
      <span>{minOrderAmount}</span>
    </div>
  );

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onRemoveAll={cartAllItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        취소
      </button>
      {isMinOrderAmountOver && (
        <button className={classes.button} onClick={orderHandler}>
          주문
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      <div className={classes.header}>
        <h2>주문표</h2>
        <button
          onClick={cartRemoveHandler}
          disabled={!hasItems ? "disabled" : ""}
        >
          <AiOutlineDelete size={24} />
        </button>
      </div>
      {minOrderAmountDiv}
      {cartItems}
      {deliveryAmountDiv}

      <div className={classes.total}>
        <span>총 비용</span>
        <span>${totalOrderAmount.toFixed(2)}</span>
      </div>
      {isCheckout && isMinOrderAmountOver && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending Order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>successfully sent the order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          취소
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
