import Card from '../UI/Card.js';
import MealItem from './MealItem/MealItem.js';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const DB_URL =
  'https://react-http-d3de3-default-rtdb.europe-west1.firebasedatabase.app/meals.json';

const AvailableMeals = () => {
  const [fetchedMeals, setFetchedMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const fetchedData = await fetch(DB_URL);
      const data = await fetchedData.json();
      // console.log(data);

      const meals = [];

      for (const key in data) {
        meals.push({ ...data[key], id: key });
      }

      // console.log(meals);
      setFetchedMeals(meals);
    };
    fetchMeals();
  }, []);

  const mealsList = fetchedMeals.map((meal) => (
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
