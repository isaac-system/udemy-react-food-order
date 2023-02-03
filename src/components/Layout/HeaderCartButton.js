import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const { items } = useSelector((state) => state.cart);

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const numberOfCartItems = items?.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    // clean up function
    // why? 타이머 또는 실행중일 수도 있는 기타 사이드 이펙트는 정리하는 것은 useEffect 사용시 default로 해놔도 좋은 습관
    // 이 경우 300 ms 안에 여러번 빠르게 눌릴 때 새 timer를 만들고 이전 timer를 삭제되도록 해야한다.
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
