import "./WarehouseForm.scss";
import backArrow from "../../assets/images/arrow_back-24px.svg";
import errorImg from "../../assets/images/error-24px.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const API_URL = "http://localhost:8080";

function NewWarehouse() {
  //useNavigate to set up backward navigation
  const navigate = useNavigate();

  // Set State
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerPosition, setManagerPosition] = useState("");
  const [managerPhone, setManagerPhone] = useState("");
  const [managerEmail, setManagerEmail] = useState("");

  //States to generate error messages
  const [nameError, setNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [managerNameError, setManagerNameError] = useState(false);
  const [managerPositionError, setManagerPositionError] = useState(false);
  const [managerPhoneError, setManagerPhoneError] = useState(false);
  const [managerEmailError, setManagerEmailError] = useState(false);

  //create state generate success message
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState("");

  //handle change to control the form elements
  const handleChangeName = (event) => {
    if (nameError) {
      setNameError(false);
    }
    setIsError("");

    setName(event.target.value);
  };

  const handleChangeAddress = (event) => {
    if (addressError) {
      setAddressError(false);
    }
    setIsError("");

    setAddress(event.target.value);
  };

  const handleChangeCity = (event) => {
    if (cityError) {
      setCityError(false);
    }
    setIsError("");

    setCity(event.target.value);
  };

  const handleChangeCountry = (event) => {
    if (countryError) {
      setCountryError(false);
    }
    setIsError("");

    setCountry(event.target.value);
  };

  const handleChangeContactName = (event) => {
    if (managerNameError) {
      setManagerNameError(false);
    }
    setIsError("");

    setManagerName(event.target.value);
  };

  const handleChangePosition = (event) => {
    if (managerPositionError) {
      setManagerPositionError(false);
    }
    setIsError("");

    setManagerPosition(event.target.value);
  };

  const handleChangePhone = (event) => {
    if (managerPhoneError) {
      setManagerPhoneError(false);
    }
    setIsError("");

    setManagerPhone(event.target.value);
  };

  const handleChangeEmail = (event) => {
    if (managerEmailError) {
      setManagerEmailError(false);
    }
    setIsError("");

    setManagerEmail(event.target.value);
  };

  //created new warehouse object to send back to the backend
  const newWarehouse = {
    name: name,
    address: address,
    city: city,
    country: country,
    contact: {
      name: managerName,
      position: managerPosition,
      phone: managerPhone,
      email: managerEmail,
    },
  };

  //function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name) {
      setNameError(true);
    }
    if (!address) {
      setAddressError(true);
    }
    if (!city) {
      setCityError(true);
    }
    if (!country) {
      setCountryError(true);
    }
    if (!managerName) {
      setManagerNameError(true);
    }
    if (!managerPhone) {
      setManagerPhoneError(true);
    }
    if (!managerEmail) {
      setManagerEmailError(true);
    }
    if (!managerPosition) {
      setManagerPositionError(true);
    }

    axios
      .post(API_URL + "/warehouses", newWarehouse)
      .then((response) => {
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setIsError(error.response.data.error);
        if (error.response.data.error.length === 0) {
          setIsError("Something went wrong. Try again!");
        }
      });
  };

  return (
    <div className="newWarehouse-form">
      <header className="newWarehouse-form__header">
        <img
          className="newWarehouse-form__back"
          src={backArrow}
          alt="arrow to navigate back"
          onClick={() => navigate(-1)}
        />
        <h1 className="newWarehouse-form__title"> Add New Warehouse</h1>
      </header>
      <form onSubmit={handleSubmit} className="newWarehouse-form__form">
        <div className="newWarehouse-form__section newWarehouse-form__section--left">
          <h2 className="newWarehouse-form__subtitle">Warehouse Details</h2>
          <label className="newWarehouse-form__label">
            Warehouse Name
            <input
              className={`newWarehouse-form__input ${
                nameError ? "newWarehouse-form__input--error" : ""
              }`}
              type="text"
              placeholder="Warehouse Name"
              onChange={handleChangeName}
              value={name}
            />
            {nameError && (
              <p className="error">
                <img src={errorImg} alt="error icon" className="error__icon" />
                This field is required
              </p>
            )}
          </label>
          <label className="newWarehouse-form__label">
            Street Address
            <input
              className={`newWarehouse-form__input ${
                addressError ? "newWarehouse-form__input--error" : ""
              }`}
              type="text"
              placeholder="Street Address"
              onChange={handleChangeAddress}
              value={address}
            />
            {addressError && (
              <p className="error">
                <img src={errorImg} alt="error icon" className="error__icon" />
                This field is required
              </p>
            )}
          </label>
          <label className="newWarehouse-form__label">
            City
            <input
              className={`newWarehouse-form__input ${
                cityError ? "newWarehouse-form__input--error" : ""
              }`}
              type="text"
              placeholder="City"
              onChange={handleChangeCity}
              value={city}
            />
            {cityError && (
              <p className="error">
                <img src={errorImg} alt="error icon" className="error__icon" />
                This field is required
              </p>
            )}
          </label>
          <label className="newWarehouse-form__label">
            Country
            <input
              className={`newWarehouse-form__input ${
                countryError ? "newWarehouse-form__input--error" : ""
              }`}
              type="text"
              placeholder="Country"
              onChange={handleChangeCountry}
              value={country}
            />
            {countryError && (
              <p className="error">
                <img src={errorImg} alt="error icon" className="error__icon" />
                This field is required
              </p>
            )}
          </label>
        </div>
        <div className="newWarehouse-form__section">
          <h2 className="newWarehouse-form__subtitle">Contact Details</h2>
          <label className="newWarehouse-form__label">
            Contact Name
            <input
              className={`newWarehouse-form__input ${
                managerNameError ? "newWarehouse-form__input--error" : ""
              }`}
              type="text"
              placeholder="Contact Name"
              onChange={handleChangeContactName}
              value={managerName}
            />
            {managerNameError && (
              <p className="error">
                <img src={errorImg} alt="error icon" className="error__icon" />
                This field is required
              </p>
            )}
          </label>
          <label className="newWarehouse-form__label">
            Position
            <input
              className={`newWarehouse-form__input ${
                managerPositionError ? "newWarehouse-form__input--error" : ""
              }`}
              type="text"
              placeholder="Position"
              onChange={handleChangePosition}
              value={managerPosition}
            />
            {managerPositionError && (
              <p className="error">
                <img src={errorImg} alt="error icon" className="error__icon" />
                This field is required
              </p>
            )}
          </label>
          <label className="newWarehouse-form__label">
            Phone Number
            <input
              className={`newWarehouse-form__input ${
                managerPhoneError ? "newWarehouse-form__input--error" : ""
              }`}
              type="tel"
              placeholder="Phone Number"
              onChange={handleChangePhone}
              value={managerPhone}
            />
            {managerPhoneError && (
              <p className="error">
                <img src={errorImg} alt="error icon" className="error__icon" />
                This field is required
              </p>
            )}
          </label>
          <label className="newWarehouse-form__label">
            Email
            <input
              className={`newWarehouse-form__input ${
                managerEmailError ? "newWarehouse-form__input--error" : ""
              }`}
              type="text"
              placeholder="Email"
              onChange={handleChangeEmail}
              value={managerEmail}
            />
            {managerEmailError && (
              <p className="error">
                <img src={errorImg} alt="error icon" className="error__icon" />
                This field is required
              </p>
            )}
          </label>
        </div>
        <footer className="newWarehouse-form__footer">
          <p className="newWarehouse-form__error">{isError}</p>
          {success && (
            <p className="newWarehouse-form__error newWarehouse-form__error--success">
              Warehouse Added
            </p>
          )}
          <Link
            to="/"
            className="newWarehouse-form__button button button--cancel"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="newWarehouse-form__button button button--primary"
          >
            + Add Warehouse
          </button>
        </footer>
      </form>
    </div>
  );
}

export default NewWarehouse;
