import React from "react";
import "./AdminInventory.css";
import { Inventory } from "@mui/icons-material";
import InventoryTable from "./InventoryTable";
import DrugSupplyChart from "./DrugSupplyChart";
import BarChartIcon from "@mui/icons-material/BarChart";
function AdminInventory() {
  const [searchItem, setSearchItem] = React.useState("");
  const [year, setYear] = React.useState("2025");
  return (
    <div className="admin-inventory">
      <div className="admin-inventory-content">
    
        <div className="inventory-header">
          <div className="inventory-icon">
            <Inventory />
          </div>
          <h1>Manage Inventory</h1>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by ID..."
            onChange={(e) => setSearchItem(e.target.value)}
          />
          <button>Search</button>
        </div>
      </div>
      <div className="inventory-table">
        <InventoryTable searchItem={searchItem} />
      </div>
      <div className="inventory-chart">
        <div className="chart-header">
          <BarChartIcon className="icon"/>
          <h2>Inventory Supply Chart</h2>
        </div>
        <div className="filter-by-year">
          <label htmlFor="year">Filter by Year:</label>
          <select id="year" onChange={(e) => setYear(e.target.value)}>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025" selected>
              2025
            </option>
          </select>
        </div>
        <DrugSupplyChart year={year} />
        <p>
          This chart shows the supply of drugs over the months. You can see
          which drugs are supplied more frequently.
        </p>
      </div>
    </div>
  );
}

export default AdminInventory;
