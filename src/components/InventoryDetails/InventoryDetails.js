import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./InventoryDetails.scss";
import BackArrowIcon from "../../assets/images/arrow_back-24px.svg";

function InventoryDetails() {
  //State for selected inventory data
  const [inventoryDetails, setInventoryDetails] = useState();

  //State to track size of browser window for styling
  const [width, setWidth] = useState(window.innerWidth);

  const { id } = useParams();

  //useNavigate to set up backward navigation
  const navigate = useNavigate();

  //Retrieve data from API
  useEffect(() => {
    axios
      .get(`http://localhost:8080/inventories/inventory/${id}`)
      .then((response) => {
        const selectedInventory = response.data;
        setInventoryDetails(selectedInventory);
      });
  }, [id]);

  //Function that tracks window resizing
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  // useEffect to track the size of browser window
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  if (!inventoryDetails) {
    return <p>Loading.....</p>;
  }

  return (
    <>
      <div className="inventory-details__top">
        <div className="inventory-details__left">
          <img
            className="inventory-details__icon"
            src={BackArrowIcon}
            alt="Back arrow"
            onClick={() => navigate(-1)}
          />
          <h1 className="inventory-details__title">
            {inventoryDetails.itemName}
          </h1>
        </div>
        <Link to={`/inventory/edit/${id}`}>
          <button className="inventory-details__edit-button">
            {width < 767 ? null : "Edit"}
          </button>
        </Link>
      </div>

      <div className="inventory-details__bottom">
        <div className="inventory-details__info-left">
          <div className="inventory-details__description">
            <h4 className="inventory-details__label">Item Description:</h4>
            <p className="inventory-details__content inventory-details__description-text">
              {inventoryDetails.description}
            </p>
          </div>
          <div className="inventory-details__category">
            <h4 className="inventory-details__label">Category:</h4>
            <p className="inventory-details__content">
              {inventoryDetails.category}
            </p>
          </div>
        </div>

        <div className="inventory-details__info-right">
          <div className="inventory-details__status">
            <h4 className="inventory-details__label">Status:</h4>
            <p
              className={`${
                inventoryDetails.status === "In Stock"
                  ? "inventory-details__in-stock"
                  : "inventory-details__out-of-stock"
              } inventory-details__content`}
            >
              {inventoryDetails.status}
            </p>
          </div>
          <div className="inventory-details__quantity">
            <h4 className="inventory-details__label">Quantity:</h4>
            <p className="inventory-details__content">
              {inventoryDetails.quantity}
            </p>
          </div>
          <div className="inventory-details__warehouse">
            <h4 className="inventory-details__label">Warehouse:</h4>
            <p className="inventory-details__content">
              {inventoryDetails.warehouseName}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default InventoryDetails;
