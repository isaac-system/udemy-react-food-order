import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Card from "../UI/Card";
import classes from "./ResInfomation.module.css";

const ResInfomation = () => {
  const cartCtx = useContext(CartContext);
  const minOrderAmount = `$${cartCtx.orderAmount[0].orderAmount.toFixed(2)}`;
  const deleveryAmount = `$${cartCtx.orderAmount[0].deliveryAmount.toFixed(
    2
  )} ~ $${cartCtx.orderAmount[
    cartCtx.orderAmount.length - 1
  ].deliveryAmount.toFixed(2)}`;

  return (
    <section className={classes["default-infomation"]}>
      <Card>
        <ul>
          <li>
            <span>최소주문금액</span>
            <span>{minOrderAmount}</span>
          </li>
          <li>
            <span>배달팁</span>
            <span>{deleveryAmount}</span>
          </li>
        </ul>
      </Card>
    </section>
  );
};

export default ResInfomation;
