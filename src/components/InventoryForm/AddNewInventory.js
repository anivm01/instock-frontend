import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backArrow from "../../assets/images/arrow_back-24px.svg";
import errorImg from "../../assets/images/error-24px.svg";
import "./InventoryForm.scss";

function AddNewInventory() {
  //create states to dynamically generate warehouse names list and categories list
  const [warehouseNames, setWarehouseNames] = useState([]);
  const [inventoryCategories, setInventoryCategories] = useState([]);

  //create states to control the form elements
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [inStock, setInStock] = useState(true);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);

  //create states to dynamically generate error messages
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [warehouseError, setWarehouseError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //create state generate success message
  const [success, setSuccess] = useState(false);

  //call the warehouse names and the inventory categories from the api
  useEffect(() => {
    axios
      .get("http://localhost:8080/warehouses/names")
      .then((response) => {
        setWarehouseNames(response.data);
        return axios.get("http://localhost:8080/inventories/categories");
      })
      .then((response) => {
        setInventoryCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //handle change functions to control the form elements
  const handleChangeSelectedWarehouse = (event) => {
    if (warehouseError) {
      setWarehouseError(false);
    }
    if (errorMessage.length > 0) {
      setErrorMessage("");
    }
    setSelectedWarehouse(event.target.value);
  };

  const handleChangeSelectedCategory = (event) => {
    if (categoryError) {
      setCategoryError(false);
    }
    if (errorMessage.length > 0) {
      setErrorMessage("");
    }
    setSelectedCategory(event.target.value);
  };

  const handleChangeInStock = () => {
    if (statusError) {
      setStatusError(false);
    }
    if (errorMessage.length > 0) {
      setErrorMessage("");
    }
    setInStock(true);
  };

  const handleChangeOutOfStock = () => {
    if (statusError) {
      setStatusError(false);
    }
    if (errorMessage.length > 0) {
      setErrorMessage("");
    }
    setInStock(false);
  };

  const handleChangeItemName = (event) => {
    if (nameError) {
      setNameError(false);
    }
    if (errorMessage.length > 0) {
      setErrorMessage("");
    }
    setItemName(event.target.value);
  };

  const handleChangeItemDescription = (event) => {
    if (descriptionError) {
      setDescriptionError(false);
    }
    if (errorMessage.length > 0) {
      setErrorMessage("");
    }
    setItemDescription(event.target.value);
  };

  const handleChangeItemQuantity = (event) => {
    if (quantityError) {
      setQuantityError(false);
    }
    if (errorMessage.length > 0) {
      setErrorMessage("");
    }
    setItemQuantity(event.target.value);
  };

  //useNavigate to set up backward navigation
  const navigate = useNavigate();

  //function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const itemName = event.target.itemName.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const warehouse = event.target.warehouse.value;
    let status = null;
    if (inStock) {
      status = "In Stock";
    }
    if (!inStock) {
      status = "Out of Stock";
    }
    const quantity = itemQuantity;
    if (
      !itemName ||
      !description ||
      category.length <= 0 ||
      warehouse.length <= 0 ||
      !status ||
      (quantity === 0 && status === "In Stock")
    ) {
      if (!itemName) {
        setNameError(true);
      }
      if (!description) {
        setDescriptionError(true);
      }
      if (category.length <= 0) {
        setCategoryError(true);
      }
      if (warehouse.length <= 0) {
        setWarehouseError(true);
      }
      if (!status) {
        setStatusError(true);
      }
      if (quantity === 0 && status === "In Stock") {
        setQuantityError(true);
      }
      return;
    }

    const newInventoryItem = {
      itemName: itemName,
      description: description,
      warehouseName: warehouse,
      category: category,
      status: status,
      quantity: quantity,
    };
    axios
      .post("http://localhost:8080/inventories/", newInventoryItem)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        if (errorMessage.length === 0) {
          setErrorMessage("Something went wrong. Try again!");
        }
      });
  };

  //early return to wait for api call to come back
  if (warehouseNames.length === 0 || inventoryCategories === 0) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="inventory-form">
      <header className="inventory-form__header">
        <img
          className="inventory-form__back"
          src={backArrow}
          alt="arrow to navigate back"
          onClick={() => navigate(-1)}
        />
        <h1 className="inventory-form__title">Add New Inventory Item</h1>
      </header>
      <form onSubmit={handleSubmit} className="inventory-form__form">
        <div className="inventory-form__section inventory-form__section--left">
          <h2 className="inventory-form__subtitle">Item Details</h2>
          <label className="inventory-form__label">
            Item Name
            <input
              name="itemName"
              id="itemName"
              value={itemName}
              type="text"
              placeholder="Item Name"
              onChange={handleChangeItemName}
              className={`inventory-form__input ${
                nameError ? "inventory-form__input--error" : ""
              }`}
            />
            {nameError && (
              <p className="error">
                <img src={errorImg} alt="error icon" className="error__icon" />
                This field is required
              </p>
            )}
          </label>
          <label className="inventory-form__label">
            Description
            <textarea
              name="description"
              id="description"
              value={itemDescription}
              onChange={handleChangeItemDescription}
              className={`inventory-form__input inventory-form__input--textarea ${
                descriptionError ? "inventory-form__input--error" : ""
              }`}
              placeholder="Please enter a brief item description..."
            ></textarea>
            {descriptionError && (
              <p className="error">
                <img src={errorImg} alt="error icon" className="error__icon" />
                This field is required
              </p>
            )}
          </label>
          <label className="inventory-form__label">
            Category
            <select
              name="category"
              id="category"
              onChange={handleChangeSelectedCategory}
              value={selectedCategory}
              className={`inventory-form__input inventory-form__input--select ${
                categoryError ? "inventory-form__input--error" : ""
              }`}
            >
              <option className="inventory-form__default" value="">
                Please Select
              </option>
              {inventoryCategories.map((inventoryCategory) => (
                <option key={inventoryCategory} value={inventoryCategory}>
                  {inventoryCategory}
                </option>
              ))}
            </select>
            {categoryError && (
              <p className="error">
                <img src={errorImg} alt="error icon" className="error__icon" />
                This field is required
              </p>
            )}
          </label>
        </div>
        <div className="inventory-form__section">
          <h2 className="inventory-form__subtitle">Item Availability</h2>
          <label className="inventory-form__label">
            Status
            <div>
              <input
                className="inventory-form__radio"
                type="radio"
                id="inStock"
                name="inStock"
                value="In Stock"
                checked={inStock}
                onChange={handleChangeInStock}
              />
              <label htmlFor="inStock" className="inventory-form__radio-label">
                In Stock
              </label>
              <input
                className="inventory-form__radio"
                type="radio"
                id="outOfStock"
                name="outOfStock"
                value="Out of Stock"
                checked={!inStock}
                onChange={handleChangeOutOfStock}
              />
              <label
                htmlFor="outOfStock"
                className="inventory-form__radio-label"
              >
                Out of stock
              </label>
              {statusError && (
                <p className="error">
                  <img
                    src={errorImg}
                    alt="error icon"
                    className="error__icon"
                  />
                  This field is required
                </p>
              )}
            </div>
          </label>
          {inStock && (
            <label className="inventory-form__label">
              Quantity
              <input
                value={itemQuantity}
                onChange={handleChangeItemQuantity}
                className={`inventory-form__input inventory-form__input--quantity ${
                  quantityError ? "inventory-form__input--error" : ""
                }`}
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                placeholder="0"
              />
              {quantityError && (
                <p className="error">
                  <img
                    src={errorImg}
                    alt="error icon"
                    className="error__icon"
                  />
                  This field is required
                </p>
              )}
            </label>
          )}
          <label className="inventory-form__label">
            Warehouse
            <select
              name="warehouse"
              id="warehouse"
              onChange={handleChangeSelectedWarehouse}
              value={selectedWarehouse}
              className={`inventory-form__input inventory-form__input--select ${
                warehouseError ? "inventory-form__input--error" : ""
              }`}
            >
              <option className="inventory-form__default" value="">
                Please Select
              </option>
              {warehouseNames.map((warehouseName) => (
                <option key={warehouseName} value={warehouseName}>
                  {warehouseName}
                </option>
              ))}
            </select>
            {warehouseError && (
              <p className="error">
                <img src={errorImg} alt="error icon" className="error__icon" />
                This field is required
              </p>
            )}
          </label>
        </div>
        <footer className="inventory-form__footer">
          {success && <p className="inventory-form__success">Item Added</p>}
          {errorMessage.length > 0 && (
            <p className="inventory-form__success inventory-form__success--error">
              {errorMessage}
            </p>
          )}
          <Link to="/" className="inventory-form__button button button--cancel">
            Cancel
          </Link>
          <button
            type="submit"
            className="inventory-form__button button button--primary"
          >
            + Add Item
          </button>
        </footer>
      </form>
    </div>
  );
}

export default AddNewInventory;
