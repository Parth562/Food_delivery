import React from 'react';
import MealsImage from './../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';
import styles from './Header.module.css';

const Header = (props) => {
   return (
      <React.Fragment>
         <header className={styles.header}>
            <h1>ReactFoods</h1>
            <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
         </header>
         <div className={styles['main-image']}>
            <img src={MealsImage} alt="meals-image" />
         </div>
      </React.Fragment>
   );
};

export default Header;
