import { useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(
    () => {
      const fetchMeals = async () => {
        const mealsResponse = await fetch(
          "https://your-firebase-address/meals.json"
        );

        if (!mealsResponse.ok) {
          throw new Error("Something went wrong!");
        }

        const mealsResponseData = await mealsResponse.json();

        const loadedMeals = [];

        for (const key in mealsResponseData) {
          loadedMeals.push({
            id: key,
            name: mealsResponseData[key].name,
            description: mealsResponseData[key].description,
            price: mealsResponseData[key].price,
          });
        }

        setMeals(loadedMeals);

        setIsLoading(false);
      };

      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    }, // 처음 실행시에만 1번! 실행
    []
  );

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
