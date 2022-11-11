import AddNewInventory from "../components/InventoryForm/AddNewInventory";
import EditInventory from "../components/InventoryForm/EditInventory";

function InventoryFormPage({formType}) {
    
    if (formType === "Add New"){
        return <AddNewInventory />
    }
    if (formType === "Edit") {
        return <EditInventory />
    }
    }

export default InventoryFormPage