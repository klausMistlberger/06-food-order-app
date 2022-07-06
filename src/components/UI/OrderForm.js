import React, { useState, useContext } from 'react';

import classes from './OrderForm.module.css';
import CartContext from '../../store/cart-context';

const DB_URL =
  'https://react-http-d3de3-default-rtdb.europe-west1.firebasedatabase.app/meals-order.json';

const OrderForm = (props) => {
  const cartCtx = useContext(CartContext);
  const [orderSuccessful, setOrderSuccessful] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    zip: '',
    city: '',
  });

  const [isValid, setIsValid] = useState({
    firstName: false,
    lastName: false,
    email: false,
    address: false,
    zip: false,
    city: false,
  });

  const [isTouched, setIsTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    address: false,
    zip: false,
    city: false,
  });

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setIsValid((prevState) => ({ ...prevState, [name]: true }));
    if (formData.email.includes('@')) {
      setIsValid((prevState) => ({ ...prevState, email: true }));
    }
  };

  const inputBlurHandler = (event) => {
    const { name } = event.target;

    setIsTouched((prevState) => ({ ...prevState, [name]: true }));

    if (formData[name] !== '') {
      setIsValid((prevState) => ({ ...prevState, [name]: true }));
    }

    if (!formData.email.includes('@')) {
      setIsValid((prevState) => ({ ...prevState, email: false }));
    }
  };

  const formIsValid =
    isValid.firstName &&
    isValid.lastName &&
    isValid.email &&
    isValid.address &&
    isValid.zip &&
    isValid.city;

  const submitOrderHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const order = cartCtx.items.map((meal) => ({
      amount: meal.amount,
      meal: meal.name,
    }));

    order.unshift(formData);
    // console.log(order);

    const placingOrder = await fetch(DB_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    // console.log(placingOrder.ok);

    if (placingOrder.ok) {
      setOrderSuccessful(true);
    }
  };

  const orderSuccessfulHandler = () => {
    setOrderSuccessful(false);
    props.onClose();
  };

  return (
    <React.Fragment>
      {!orderSuccessful && (
        <div>
          <h2>Deliver to:</h2>
          <form onSubmit={submitOrderHandler} className={classes.form}>
            <div className={classes['control-group']}>
              <label htmlFor="firstName" className={classes['oder-label']}>
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={classes['order-input']}
                value={formData.firstData}
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
              {!isValid.firstName && isTouched.firstName && (
                <p className={classes['error-text']}>
                  Please enter your first name.
                </p>
              )}
            </div>
            <div className={classes['control-group']}>
              <label htmlFor="lastName" className={classes['oder-label']}>
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={classes['order-input']}
                value={formData.lastName}
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
              {!isValid.lastName && isTouched.lastName && (
                <p className={classes['error-text']}>
                  Please enter your last name.
                </p>
              )}
            </div>
            <div className={classes['control-group']}>
              <label htmlFor="email" className={classes['oder-label']}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={classes['order-input']}
                value={formData.email}
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
              {!isValid.email && isTouched.email && (
                <p className={classes['error-text']}>
                  Please enter a valid email address.
                </p>
              )}
            </div>
            <div className={classes['control-group']}>
              <label htmlFor="address" className={classes['oder-label']}>
                Adress
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className={classes['order-input']}
                value={formData.address}
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
              {!isValid.address && isTouched.address && (
                <p className={classes['error-text']}>
                  Please enter your address.
                </p>
              )}
            </div>
            <div className={classes['control-group']}>
              <label htmlFor="zip" className={classes['oder-label']}>
                ZIP
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                className={classes['order-input']}
                value={formData.zip}
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
              {!isValid.zip && isTouched.zip && (
                <p className={classes['error-text']}>Please enter your ZIP.</p>
              )}
            </div>
            <div className={classes['control-group']}>
              <label htmlFor="city" className={classes['oder-label']}>
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className={classes['order-input']}
                value={formData.city}
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
              {!isValid.city && isTouched.city && (
                <p className={classes['error-text']}>Please enter your city.</p>
              )}
            </div>
            <div>
              <button className={classes['btn-order']} onClick={props.onClose}>
                Close
              </button>
              <button className={classes['btn-order']} disabled={!formIsValid}>
                Order now
              </button>
            </div>
          </form>
        </div>
      )}
      {orderSuccessful && (
        <div className={classes['oder-successful']}>
          <h3>Your order has been placed.</h3>
          <button
            className={classes['btn-order']}
            onClick={orderSuccessfulHandler}
          >
            Close
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default OrderForm;
