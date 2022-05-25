import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoaindg] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoaindg(true);
      const response = await fetch(
        'https://react-meals-c839b-default-rtdb.firebaseio.com/meals.json'
      );
      const data = await response.json();

      const loadedMeals = [];

      for (let [key, val] of Object.entries(data)) {
        loadedMeals.push({
          id: key,
          name: val.name,
          description: val.description,
          price: val.price,
        });
      }
      setMeals(loadedMeals);
      setIsLoaindg(false);
    };

    fetchMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
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
