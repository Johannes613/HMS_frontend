import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import "../../patient-component/patient-main/DataTable.css";

const columns = [
  {
    field: "supplierName",
    headerName: "Supplier Name",
    width: 160,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "drugName",
    headerName: "Drug Name",
    width: 160,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "suppliedDate",
    headerName: "Supplied Date",

    width: 160,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "expiryDate",
    headerName: "Expiry Date",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "quantity",
    headerName: "Quantity",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
    headerClassName: "super-app-theme--header",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function InventoryTable() {
  const [inventory, setInventory] = React.useState([]);
  const [selectedRowIds, setSelectedRowIds] = React.useState([]);
  const [inventId, setInventId] = React.useState(null);

  const handleRowSelection = (ids) => {
    setSelectedRowIds(ids);
    // setPatientId(ids.length > 0 ? ids[0] : null); // assuming single selection
  };

  // handle patient update
  const handleUpdate = () => {
    // if (patientId) {
    //   // Perform update logic here
    //   console.log("Updating patient with ID:", patientId);
    // }
  };
  // handle patient delete
  const handleDelete = () => {
    // if (patientId) {
    //   // Perform delete logic here
    //   console.log("Deleting patient with ID:", patientId);
    // }
  };
  // handle patient add
  const handleAdd = () => {
    // Perform add logic here
    console.log("Adding new patient");
  };

  //   fetch data from the server

  const fetchInventoryData = async () => {
    try {
      const response = await fetch("http://localhost:5000/four-six/inventory");
      const data = await response.json();

      const formattedData = data.map((item) => ({
        id: item.invent_id,
        supplierName: item.supplier_name,
        drugName: item.drug_name,
        suppliedDate: item.supplied_date.split("T")[0],
        expiryDate: item.expiration_date.split("T")[0],
        quantity: item.quantity,
      }));
      setInventory(formattedData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchInventoryData();
  }, []);

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={inventory}
        onCellClick={(row) => setInventId(row.id)}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelection}
        rowSelectionModel={selectedRowIds}
        sx={{
          border: 0,
          borderRadius: "10px",
          backgroundColor: "#fff",

          width: "100%",
        }}
      />
      <div className="action-buttons">
        <button className=" btn btn-primary action-btn" onClick={handleAdd}>
          Add Patient
        </button>
        <button
          className=" btn btn-primary action-btn"
          onClick={handleUpdate}
          //   disabled={!patientId}
        >
          Update
        </button>
        <button
          className=" btn btn-danger action-btn"
          //   disabled={!patientId}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </Paper>
  );
}
