import { useState, useEffect } from 'react';
import classes from './AvailableMeals.module.css';
import Card from './../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
   const [meals, setMeals] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [httpError, setHttpError] = useState();

   useEffect(() => {
      const fetchMeals = async () => {
         const response = await fetch(
            'https://react-food-f6369-default-rtdb.firebaseio.com/meals.json'
         );

         if (!response.ok) {
            throw new Error('Something went wrong...');
         }

         const mealsData = await response.json();

         let uploadedMeals = [];

         for (let key in mealsData) {
            uploadedMeals.push({
               id: key,
               ...mealsData[key],
            });
         }
         setMeals(uploadedMeals);
         setIsLoading(false);
      };

      fetchMeals().catch((error) => {
         setIsLoading(false);
         setHttpError(error.message);
      });
   }, []);

   if (isLoading) {
      return (
         <section className={classes.loading}>
            <h2>Loading...</h2>
         </section>
      );
   }

   if (httpError) {
      return (
         <section className={classes.httpError}>
            <h2>{httpError}</h2>
         </section>
      );
   }

   const mealsList = meals.map((meal) => (
      <MealItem
         name={meal.name}
         price={meal.price}
         description={meal.description}
         key={meal.id}
         id={meal.id}
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
