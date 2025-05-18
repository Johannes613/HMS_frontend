import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import "../../patient-component/patient-main/DataTable.css";
import axios from "axios";

const columns = [
  {
    field: "supplierId",
    headerName: "Supplier ID",
    width: 100,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "supplierName",
    headerName: "Supplier Name",
    width: 130,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "drugName",
    headerName: "Drug Name",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "suppliedDate",
    headerName: "Supplied Date",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "duration",
    headerName: "Duration(Months)",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 200,
    headerClassName: "super-app-theme--header",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function LongestStayedItemTable({ limit, order }) {
  const [selectedRowIds, setSelectedRowIds] = React.useState([]);
  const [patientId, setPatientId] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const handleRowSelection = (ids) => {
    setSelectedRowIds(ids);
    setPatientId(ids.length > 0 ? ids[0] : null); // assuming single selection
  };

  //   fetch data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/four-six/longest-inventory`,
        {
          params: {
            limit: limit,
            order: order,
          },
        }
      );
      const data = response.data;
      console.log(data);
      const formattedData = data.map((item, index) => ({
        id: index + 1,
        supplierId: item.supp_id,
        supplierName: item.supplier_name,
        drugName: item.drug_name,
        suppliedDate: item.supplied_date.split("T")[0],
        duration: item.duration,
      }));
      console.log(formattedData)
      setItems(formattedData);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, [limit, order]);
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={items}
        onCellClick={(row) => setPatientId(row.id)}
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
    </Paper>
  );
}
