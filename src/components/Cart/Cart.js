import { useContext } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import { AiOutlineDelete } from "react-icons/ai";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const minOrderAmount = `$${cartCtx.orderAmount[0].orderAmount.toFixed(2)}`;

  // 최소 주문 넘었는가?
  const isMinOrderAmountOver =
    cartCtx.totalAmount >= cartCtx.orderAmount[0].orderAmount;

  // 배달비용
  const deliveryAmount = `$${cartCtx.deliveryAmount.toFixed(2)}`;
  // 주문 리스트가 있는가?
  const hasItems = cartCtx.items.length > 0;
  // 최종 주문 금액
  const totalOrderAmount = `$${cartCtx.totalOrderAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartAllItemRemoveHandler = (id) => {
    cartCtx.removeAllItem(id);
  };

  const cartRemoveHandler = () => {
    if (window.confirm("정말 모두 삭제하시겠습니까?")) {
      cartCtx.removeCart();
    }
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item, "CART");
  };

  const deliveryAmountDiv = hasItems && (
    <div className={classes["delevery-cost"]}>
      <span>배달비용</span>
      <span>{deliveryAmount}</span>
    </div>
  );

  const minOrderAmountDiv = !isMinOrderAmountOver && (
    <div className={classes["delevery-cost"]}>
      <span>최소주문금액</span>
      <span>{minOrderAmount}</span>
    </div>
  );

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
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

  return (
    <Modal onClose={props.onClose}>
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
        <span>{totalOrderAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && isMinOrderAmountOver && (
          <button className={classes.button}>Order</button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
