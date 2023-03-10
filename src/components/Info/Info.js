import React from "react";
import { useSelector } from "react-redux";

import Modal from "../UI/Modal";
import classes from "./Info.module.css";

const Info = (props) => {
  const { orderAmount } = useSelector((state) => state.cart);

  const forOrder = () => {
    let array = [];
    for (let i = 0; i < orderAmount.length; i++) {
      const item = orderAmount[i];

      array.push(
        <div className={classes.contents} key={item.id}>
          {orderAmount.length > i + 1 ? (
            <span>{`$${item.amount.toFixed(2)} 이상 $${orderAmount[
              i + 1
            ].amount.toFixed(2)} 미만`}</span>
          ) : (
            <span>{`$${item.amount.toFixed(2)} 이상`}</span>
          )}
          <span>{`$${item.deliveryAmount.toFixed(2)}`}</span>
        </div>
      );
    }
    return array;
  };

  return (
    <Modal onClose={props.onClose}>
      <div>
        <h3>배달팁 안내</h3>
      </div>
      <ul>
        <li>배달팁은 가게에서 책정한 금액입니다.</li>
        <li>결제 대행입니다. 금액은 가게로 전달됩니다.</li>
      </ul>
      <div className={classes.table}>
        <div className={classes.title}>
          <span>주문금액</span>
          <span>배달팁</span>
        </div>
        {forOrder()}
      </div>
    </Modal>
  );
};

export default Info;
