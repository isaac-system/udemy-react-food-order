import React from "react";
import { useSelector } from "react-redux";

import Badge from "../UI/Badge";
import Card from "../UI/Card";
import classes from "./ResInfomation.module.css";

const ResInfomation = (props) => {
  const { orderAmount } = useSelector((state) => state.cart);

  const deliveryAmount = `$${orderAmount[
    orderAmount?.length - 1
  ]?.deliveryAmount.toFixed(2)} 
  ~ $${orderAmount[0]?.deliveryAmount.toFixed(2)}`;

  const minOrderAmount = `$${orderAmount[0]?.amount.toFixed(2)}`;

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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <span>{deliveryAmount}</span>
              <Badge onClick={props.onShowInfo}>자세히</Badge>
            </div>
          </li>
        </ul>
      </Card>
    </section>
  );
};

export default ResInfomation;
