import React from "react";
import "./AdminInventory.css";
import { Inventory } from "@mui/icons-material";
import InventoryTable from "./InventoryTable";
function AdminInventory() {
  return (
    <div className="admin-inventory">
      <div className="admin-inventory-content">
        {/* Add your inventory management components here */}
        <div className="inventory-header">
          <div className="inventory-icon">
            <Inventory />
          </div>
          <h1>Manage Inventory</h1>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search inventory..." />
          <button>Search</button>
        </div>
      </div>
      <div className="inventory-table">
        <InventoryTable />
      </div>
    </div>
  );
}

export default AdminInventory;
