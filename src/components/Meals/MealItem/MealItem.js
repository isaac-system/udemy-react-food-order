import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const dispatch = useDispatch();

  const addToCartHandler = (amount) => {
    const data = {
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    };

    dispatch(cartActions.add({ item: data }));
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
