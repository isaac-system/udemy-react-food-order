import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import { Fragment } from "react";
import ResInfomation from "./ResInfomation";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <ResInfomation />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
