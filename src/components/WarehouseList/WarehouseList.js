import "./WarehouseList.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import deleteIcon from "../../assets/images/delete_outline-24px.svg";
import editIcon from "../../assets/images/edit-24px.svg";
import chevronRight from "../../assets/images/chevron_right-24px.svg";
import { Link } from "react-router-dom";
import sortArrows from "../../assets/images/sort-24px.svg";
import DeleteWarehouse from "../DeleteModal/DeleteWarehouse";

function WarehouseList() {
  const [allWarehouses, setAllWarehouses] = useState([]);
  // state to conditionally open the modal
  const [isOpen, setIsOpen] = useState(false);
  // state to reload component after delete
  const [reload, setReload] = useState(1);
  const [sorted, setSorted] = useState(false);
  const URL = "http://localhost:8080/warehouses";

  // -----states with info from the warehouse card------------
  const [warehouseToDelete, setWarehouseToDelete] = useState("");
  const [warehouseName, setWarehouseName] = useState("");

  function handleClick(warehouseName, warehouseToDelete) {
    setIsOpen(true);
    // collects the info from the card to send to the modal
    setWarehouseName(warehouseName);
    setWarehouseToDelete(warehouseToDelete);
  }

  // this event handler is passed down as a prop to the modal
  function handleCloseModal() {
    setIsOpen(false);
    setReload(reload + 1);
  }

  // --------------------trying to sort--------------------

  function upOrDown() {
    setSorted((current) => !current);
  }

  function handleSortWarehouse() {
    upOrDown();
    if (sorted) {
      const sortedByName = allWarehouses.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setAllWarehouses(sortedByName);
    }

    if (!sorted) {
      const sortedByName = allWarehouses.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
      setAllWarehouses(sortedByName);
    }
  }

  function handleSortAddress() {
    const sortedByName = allWarehouses.sort((a, b) => {
      if (a.address < b.address) {
        return -1;
      }
      if (a.address > b.address) {
        return 1;
      }
      return 0;
    });

    setAllWarehouses(sortedByName);
    setSorted(sorted + 1);
  }

  function handleSortContactName() {
    const sortedByName = allWarehouses.sort((a, b) => {
      if (a.contact.name < b.contact.name) {
        return -1;
      }
      if (a.contact.name > b.contact.name) {
        return 1;
      }
      return 0;
    });

    setAllWarehouses(sortedByName);
    setSorted(sorted + 1);
  }

  function handleSortContactPhone() {
    const sortedByName = allWarehouses.sort((a, b) => {
      if (a.contact.email < b.contact.email) {
        return -1;
      }
      if (a.contact.email > b.contact.email) {
        return 1;
      }
      return 0;
    });
    setAllWarehouses(sortedByName);
    setSorted(sorted + 1);
 
  }

  // -----------------------------------------------------

  useEffect(() => {
    axios.get(URL).then((response) => {
      setAllWarehouses(response.data);
    });
  }, [reload]);

  return (
    <div className="warehouse">
      <header className="warehouse__header">
        <h1 className="warehouse__title">Warehouses</h1>
        <div className="warehouse__header-formbtn">
          <form className="warehouse__form" action="">
            <input
              type="text"
              placeholder="Search..."
              className="warehouse__header-input"
            />
          </form>

          <Link to="/warehouses/add-new" className="warehouse__link">
            <button className="warehouse__header-button inventory-form__button--before">
              + Add New Warehouse
            </button>
          </Link>
        </div>
      </header>
      <div className="warehouse__subheaders">
        <div className="warehouse__subheader  warehouse__name">
          <h4 className="warehouse__subheader-text">
            WAREHOUSE{" "}
            <img
              onClick={handleSortWarehouse}
              className="warehouse__subheader-arrows"
              src={sortArrows}
              alt="sorting arrows"
            />
          </h4>
        </div>
        <div className="warehouse__subheader warehouse__address">
          <h4 className="warehouse__subheader-text">
            ADDRESS{" "}
            <img
              onClick={handleSortAddress}
              className="warehouse__subheader-arrows"
              src={sortArrows}
              alt="sorting arrows"
            />
          </h4>
        </div>
        <div className="warehouse__subheader warehouse__contact-name">
          <h4 className="warehouse__subheader-text">
            CONTACT NAME{" "}
            <img
              onClick={handleSortContactName}
              className="warehouse__subheader-arrows"
              src={sortArrows}
              alt="sorting arrows"
            />
          </h4>
        </div>
        <div className="warehouse__subheader warehouse__subheader--info warehouse__contact-info">
          <h4 className="warehouse__subheader-text">
            CONTACT INFORMATION{" "}
            <img
              onClick={handleSortContactPhone}
              className="warehouse__subheader-arrows"
              src={sortArrows}
              alt="sorting arrows"
            />
          </h4>
        </div>
        <div className="warehouse__subheader warehouse__subheader-icons warehouse__actions">
          <h4 className="warehouse__subheader-text warehouse__actions-tex">
            ACTIONS
          </h4>
        </div>
      </div>
      {isOpen && (
        <DeleteWarehouse
          handleCloseModal={handleCloseModal}
          warehouseName={warehouseName}
          warehouseId={warehouseToDelete}
        />
      )}
      {allWarehouses.map((warehouse) => {
        return (
            <div key={warehouse.id} className="warehouse__card">
              <div className="warehouse__card-item warehouse__card-item--warehouse">
                <h4 className="warehouse__card-title warehouse__card-title--name">
                  WAREHOUSE
                </h4>
                <Link
                  to={`/warehouses/warehouse/${warehouse.id}`}
                  className="warehouse__card-link warehouse__card-info"
                >
                  {warehouse.name}
                  {
                    <img
                      className="warehouse__card-arrow"
                      src={chevronRight}
                      alt="right arrow"
                    />
                  }
                </Link>
              </div>

              <div className="warehouse__card-item warehouse__card-item--contact">
                <h4 className="warehouse__card-title">CONTACT NAME</h4>
                <p className="warehouse__card-info">{warehouse.contact.name}</p>
              </div>

              <div className="warehouse__card-item warehouse__card-item--address">
                <h4 className="warehouse__card-title ">ADDRESS</h4>
                <p className="warehouse__card-info">
                  {warehouse.address}, {warehouse.city}, {warehouse.country}
                </p>
              </div>

              <div className="warehouse__card-item warehouse__card-item--info">
                <h4 className="warehouse__card-title">CONTACT INFORMATION</h4>
                <p className="warehouse__card-info">
                  {warehouse.contact.phone}
                </p>
                <p className="warehouse__card-info">
                  {warehouse.contact.email}
                </p>
              </div>
              <div className="warehouse__card-icons warehouse__card-item--icons">
                <img
                  onClick={() => {
                    handleClick(warehouse.name, warehouse.id);
                  }}
                  className="warehouse__card-icon"
                  src={deleteIcon}
                  alt="delete button"
                />
                <Link to={`/warehouses/edit/${warehouse.id}`}>
                  <img
                    className="warehouse__card-icon"
                    src={editIcon}
                    alt="edit button"
                  />
                </Link>
              </div>
            </div>
        );
      })}
    </div>
  );
}

export default WarehouseList;
