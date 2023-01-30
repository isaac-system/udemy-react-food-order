import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import { Fragment } from "react";
import ResInfomation from "./ResInfomation";

const Meals = (props) => {
  return (
    <Fragment>
      <MealsSummary />
      <ResInfomation onShowInfo={props.onShowInfo} />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
