import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from './../../../store/cart-context';
import { useContext } from 'react';

const MealItem = (props) => {
   const price = `₹ ${props.price.toFixed(2)}`;

   const CartCtx = useContext(CartContext);

   const addToCartHandler = (amount) => {
      CartCtx.addItem({
         id: props.id,
         name: props.name,
         price: props.price,
         amount: amount,
      });
   };

   return (
      <li className={styles.meal}>
         <div>
            <div>
               <h3>{props.name}</h3>
            </div>
            <div className={styles.description}>{props.description}</div>
            <div className={styles.price}>{price}</div>
         </div>
         <div>
            <MealItemForm onAddToCart={addToCartHandler} />
         </div>
      </li>
   );
};

export default MealItem;
