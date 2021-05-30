import CartContext from './cart-context';
import { useReducer } from 'react';

const defaultCartState = {
   items: [],
   totalAmount: 0,
};

const cartReducer = (state, action) => {
   if (action.type === 'ADD') {
      const updatedTotalAmount =
         state.totalAmount + action.item.amount * action.item.price;
      const existingCartItemIndex = state.items.findIndex(
         (item) => item.id === action.item.id
      );

      const existingCartItem = state.items[existingCartItemIndex];
      let updatedCartItems;
      if (existingCartItem) {
         const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount,
         };

         state.items[existingCartItemIndex] = updatedItem;
         updatedCartItems = [...state.items];
      } else {
         updatedCartItems = state.items.concat(action.item);
      }

      return {
         items: updatedCartItems,
         totalAmount: updatedTotalAmount,
      };
   }

   if (action.type === 'REMOVE') {
      const existingCartItemIndex = state.items.findIndex(
         (item) => item.id === action.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingCartItem.price;

      if (existingCartItem.amount === 1) {
         const updatedItems = state.items.filter(
            (item) => item.id != existingCartItem.id
         );
         return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
         };
      } else {
         state.items[existingCartItemIndex] = {
            ...existingCartItem,
            amount: existingCartItem.amount - 1,
         };

         return {
            items: [...state.items],
            totalAmount: updatedTotalAmount,
         };
      }
   }

   if (action.type === 'CLEAR') {
      return defaultCartState;
   }

   return defaultCartState;
};

const CartProvider = (props) => {
   const [cartState, dispatchCartAction] = useReducer(
      cartReducer,
      defaultCartState
   );

   const addItemToCartHandler = (item) => {
      dispatchCartAction({ type: 'ADD', item: item });
   };
   const removeItemFromCartHandler = (id) => {
      dispatchCartAction({ type: 'REMOVE', id: id });
   };

   const clearCartHandler = () => {
      dispatchCartAction({ type: 'CLEAR' });
   };

   const context = {
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: addItemToCartHandler,
      removeItem: removeItemFromCartHandler,
      clearCart: clearCartHandler,
   };

   return (
      <CartContext.Provider value={context}>
         {props.children}
      </CartContext.Provider>
   );
};

export default CartProvider;
