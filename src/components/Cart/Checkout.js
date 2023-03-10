import { useState, useRef } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isNotFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsIsValidity, setFormInputsIsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
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
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isNotFiveChars(enteredPostalCode);

    setFormInputsIsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    // Submit the Cart data
    const userData = {
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    };

    props.onConfirm(userData);
  };

  const nameControlClasses = `${classes.control} ${
    formInputsIsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsIsValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsIsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsIsValidity.city ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">??????</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsIsValidity.name && <p>????????? ????????? ???????????????!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">???????????????</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsIsValidity.street && <p>????????? ?????????????????? ???????????????!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">????????????</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsIsValidity.postalCode && (
          <p>????????? ??????????????? ???????????????!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">??????</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsIsValidity.city && <p>????????? ????????? ???????????????!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          ??????
        </button>
        <button className={classes.submit} type="submit">
          ??????
        </button>
      </div>
    </form>
  );
};

export default Checkout;
