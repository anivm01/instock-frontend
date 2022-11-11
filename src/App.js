import InventoryFormPage from "./pages/InventoryFormPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer.js';
import WarehouseDetailsPage from "./pages/WarehouseDetailsPage";
import WarehouseFormPage from "./pages/WarehouseFormPage";
import InventoryListPage from "./pages/InventoryListPage";
import InventoryDetailsPage from "./pages/InventoryDetailsPage";
import WarehouseListPage from "./pages/WarehouseListPage";


function App() {
  return (
    <BrowserRouter>
        <Header />
          <main className="background">
            <div className="background__card">
              <Routes>
              <Route path="/" element={<WarehouseListPage />}/>
              <Route path="/inventory" element={<InventoryListPage />}/>
              <Route path="/warehouses" element={<WarehouseListPage />}/>
              <Route path="/warehouses/warehouse/:id" element={<WarehouseDetailsPage />}/>
              <Route path="/inventory/inventory/:id" element={<InventoryDetailsPage />} /> 
              <Route path="/inventory/add-new" element={<InventoryFormPage formType={"Add New"} />}/>
              <Route path="/inventory/edit/:id" element={<InventoryFormPage formType={"Edit"}/>} />
              <Route path="/warehouses/add-new" element={<WarehouseFormPage formType={"Add New"}/>}/>
              <Route path="/warehouses/edit/:id" element={<WarehouseFormPage formType={"Edit"} />}/>                   
              </Routes> 
          </div> 
          </main> 
        <Footer />
    </BrowserRouter> 
  )
}

export default App;
