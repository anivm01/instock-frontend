import "./WarehouseInventoryList.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InventoryItem from "../InventoryItem/InventoryItem";
import SortIcon from "../../assets/images/sort-24px.svg";

function WarehouseInventoryList() {
  //State for selected warehouse's inventory data
  const [warehouseInventory, setWarehouseInventory] = useState();
  const [reload, setReload] = useState(1);

  const { id } = useParams();

  //Retrieve data from API
  useEffect(() => {
    axios
      .get(`http://localhost:8080/inventories/warehouse/${id}`)
      .then((response) => {
        const inventories = response.data;
        setWarehouseInventory(inventories);
      });
  }, [id, reload]);

  if (!warehouseInventory) {
    return <p>Loading.....</p>;
  }

  return (
    <div className="inventory-list-container">
      <div className="inventory-list-container__columns columns">
        <div className="columns__column columns__column columns__item">
          <h4 className="columns__title">Inventory item</h4>
          <img className="columns__sort-icon" src={SortIcon} alt="Sort Icon" />
        </div>
        <div className="columns__column columns__column columns__category">
          <h4 className="columns__title">Category</h4>
          <img className="columns__sort-icon" src={SortIcon} alt="Sort Icon" />
        </div>
        <div className="columns__column columns__column columns__status">
          <h4 className="columns__title">Status</h4>
          <img className="columns__sort-icon" src={SortIcon} alt="Sort Icon" />
        </div>
        <div className="columns__column columns__column columns__qty">
          <h4 className="columns__title">Quantity</h4>
          <img className="columns__sort-icon" src={SortIcon} alt="Sort Icon" />
        </div>
        <div className="columns__column columns__column columns__actions">
          <h4 className="columns__title">Actions</h4>
        </div>
      </div>
      {(warehouseInventory.length === 0) && <p className="inventory-list__empty">This warehouse is empty!</p>}
      {warehouseInventory.map((inventory, i) => {
        return (
          <InventoryItem
            key={inventory.id}
            inventoryId={inventory.id}
            i={i}
            inventory={inventory}
            setReload={setReload}
            reload={reload}
          />
        );
      })}
    </div>
  );
}

export default WarehouseInventoryList;
