import React, { useState } from "react";
import "./AdminSupplier.css";
import LongestStayedItemTable from "./LongestStayedTable";
function SupplierWhoseItemStayedLongest() {
  const [limit, setLimit] = useState(1);
  const [order, setOrder] = useState("asc");
  return (
    <div className="longest-stayed-supplier-container">
      <h2>Supplier Whose Item Stayed Longest</h2>
      <div className="longest-stayed-supplier-filters">
        <label htmlFor="" className="label-date">
          Order by
        </label>
        <select
          className="filter-select"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <label htmlFor="" className="label-top">
          Select top
        </label>
        <select
          className="filter-select"
          onChange={(e) => setLimit(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <LongestStayedItemTable limit={limit} order={order} />
    </div>
  );
}

export default SupplierWhoseItemStayedLongest;
