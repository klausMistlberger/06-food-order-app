import Card from '../UI/Card.js';
import MealItem from './MealItem/MealItem.js';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const DB_URL =
  'https://react-http-d3de3-default-rtdb.europe-west1.firebasedatabase.app/meals.json';

const AvailableMeals = () => {
  const [fetchedMeals, setFetchedMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchingError, setFetchingError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      // setIsLoading(true);
      // setFetchingError(false);
      const fetchedData = await fetch(DB_URL);

      if (!fetchedData.ok) {
        throw new Error("something's not cookin...");
      }

      const data = await fetchedData.json();
      const meals = [];
      for (const key in data) {
        meals.push({ ...data[key], id: key });
      }

      setFetchedMeals(meals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      console.log(error);
      setIsLoading(false);
      setFetchingError(error.message);
    });
  }, [fetchingError]);

  const retryHandler = () => {
    setFetchingError(null);
  };

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
        {isLoading && <h3 className={classes.info}>cooking meals list...</h3>}
        {fetchingError && (
          <div className={classes.info}>
            <h3>something's not cookin' right...</h3>
            <button onClick={retryHandler}>Try again</button>
          </div>
        )}
        {!isLoading && !fetchingError && <ul>{mealsList}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
