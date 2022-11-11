import NewWarehouse from "../components/WarehouseFrom/NewWarehouse"
import EditWarehouse from "../components/WarehouseFrom/EditWarehouse"


function WarehouseFormPage({formType}) {
    if (formType === "Add New"){
        return <NewWarehouse />
    }
    if (formType === "Edit") {
        return <EditWarehouse />
    }
    }

export default WarehouseFormPage