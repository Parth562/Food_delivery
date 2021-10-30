import React, { useContext, useState } from 'react';
import Modal from './../UI/Modal';
import CartContext from './../../store/cart-context';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
   const [isCheckout, setIsCheckout] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [didSubmit, setDidSubmit] = useState(false);
   const cartCtx = useContext(CartContext);

   const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
   const hasItems = cartCtx.items.length > 0;

   const cartItemRemoveHandler = (id) => {
      cartCtx.removeItem(id);
   };

   const cartItemAddHandler = (item) => {
      cartCtx.addItem({ ...item, amount: 1 });
   };

   const orderHandler = () => {
      setIsCheckout(true);
   };

   const submitOrderHandler = async (userData) => {
      setIsSubmitting(true);
      await fetch(
         'https://react-food-f6369-default-rtdb.firebaseio.com/orders.json',
         {
            method: 'POST',
            body: JSON.stringify({
               user: userData,
               orderedItems: cartCtx.items,
            }),
         }
      );
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
   };

   const cartItems = (
      <ul className={classes['cart-items']}>
         {cartCtx.items.map((item) => (
            <CartItem
               key={item.id}
               name={item.name}
               price={item.price}
               amount={item.amount}
               onRemove={cartItemRemoveHandler.bind(null, item.id)}
               onAdd={cartItemAddHandler.bind(null, item)}
            />
         ))}
      </ul>
   );

   const cartmodal = (
      <div className={classes.actions}>
         <button className={classes['button--alt']} onClick={props.onHideCart}>
            Close
         </button>
         {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
               Order
            </button>
         )}
      </div>
   );

   const cartModalContent = (
      <React.Fragment>
         {cartItems}
         <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
         </div>
         {isCheckout && (
            <Checkout
               onConfirm={submitOrderHandler}
               onCancel={props.onHideCart}
            />
         )}
         {!isCheckout && cartmodal}
      </React.Fragment>
   );

   const didSubmitContent = (
      <React.Fragment>
         <p>Your order is on your way...!!</p>
         <div className={classes.actions}>
            <button className={classes.button} onClick={props.onHideCart}>
               Close
            </button>
         </div>
      </React.Fragment>
   );

   return (
      <Modal onClose={props.onHideCart}>
         {!isSubmitting && !didSubmit && cartModalContent}
         {isSubmitting && !didSubmit && <p>Sending your order...!!</p>}
         {didSubmit && didSubmitContent}
      </Modal>
   );
};

export default Cart;
