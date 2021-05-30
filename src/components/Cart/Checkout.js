import React, { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (val) => val.trim() === '';
const isSixChars = (val) => val.trim().length === 6;

const Checkout = (props) => {
   const [formInputsValidity, setFormInputsValidity] = useState({
      name: true,
      street: true,
      postalCode: true,
      city: true,
   });

   const nameInputRef = useRef();
   const streetInputRef = useRef();
   const postalCodeInputRef = useRef();
   const cityInputRef = useRef();

   const confirmHandler = (event) => {
      event.preventDefault();

      const enteredName = nameInputRef.current.value;
      const enteredStreet = streetInputRef.current.value;
      const enteredPostalCode = postalCodeInputRef.current.value;
      const enteredCity = cityInputRef.current.value;

      const enteredNameIsValid = !isEmpty(enteredName);
      const enteredStreetIsValid = !isEmpty(enteredStreet);
      const enteredPostalCodeIsValid = isSixChars(enteredPostalCode);
      const enteredCityIsValid = !isEmpty(enteredCity);

      setFormInputsValidity({
         name: enteredNameIsValid,
         street: enteredStreetIsValid,
         postalCode: enteredPostalCodeIsValid,
         city: enteredCityIsValid,
      });

      const formIsValid =
         enteredNameIsValid &&
         enteredStreetIsValid &&
         enteredPostalCodeIsValid &&
         enteredCityIsValid;

      if (!formIsValid) {
         return;
      }

      props.onConfirm({
         name: enteredName,
         street: enteredStreet,
         postalCode: enteredPostalCode,
         city: enteredCity,
      });
   };

   const nameControlClass = `${classes.control} ${
      formInputsValidity.name ? '' : classes.invalid
   }`;

   const streetControlClass = `${classes.control} ${
      formInputsValidity.street ? '' : classes.invalid
   }`;
   const postalCodeControlClass = `${classes.control} ${
      formInputsValidity.postalCode ? '' : classes.invalid
   }`;
   const cityControlClass = `${classes.control} ${
      formInputsValidity.city ? '' : classes.invalid
   }`;

   return (
      <form className={classes.form} onSubmit={confirmHandler}>
         <div className={nameControlClass}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" ref={nameInputRef} />
            {!formInputsValidity.name && <p>Please enter a valid name</p>}
         </div>
         <div className={streetControlClass}>
            <label htmlFor="street">Street</label>
            <input type="text" id="street" ref={streetInputRef} />
            {!formInputsValidity.street && <p>please enter a valid street</p>}
         </div>
         <div className={postalCodeControlClass}>
            <label htmlFor="postal">Postal Code</label>
            <input type="text" id="postal" ref={postalCodeInputRef} />
            {!formInputsValidity.postalCode && (
               <p>please enter a valid postal code</p>
            )}
         </div>
         <div className={cityControlClass}>
            <label htmlFor="city">City</label>
            <input type="text" id="city" ref={cityInputRef} />
            {!formInputsValidity.city && <p>Please enter a valid city name</p>}
         </div>
         <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>
               Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
         </div>
      </form>
   );
};

export default Checkout;
