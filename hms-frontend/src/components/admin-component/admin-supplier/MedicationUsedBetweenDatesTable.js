import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import "../../patient-component/patient-main/DataTable.css";
import axoios from "axios";

const columns = [
  {
    field: "drugId",
    headerName: "Drug ID",
    width: 130,
    headerClassName: "super-app-theme--header",
  },

  {
    field: "drugName",
    headerName: "Drug Name",
    width: 130,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "supplierName",
    headerName: "Supplier Name",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "patientName",
    headerName: "Patient Name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "prescripedDate",
    headerName: "Prescriped Date",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    headerClassName: "super-app-theme--header",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function MedicationBetweenDatesTable({
  supplierName,
  startDate,
  endDate,
}) {
  const [selectedRowIds, setSelectedRowIds] = React.useState([]);
  const [patientId, setPatientId] = React.useState(null);
  const [medicatons, setMedications] = React.useState([]);
  //   const [startDate, setStartDate] = React.useState("");
  //   const [endDate, setEndDate] = React.useState("");

  const handleRowSelection = (ids) => {
    setSelectedRowIds(ids);
    setPatientId(ids.length > 0 ? ids[0] : null); // assuming single selection
  };


  const fetchMedications = async () => {
    try {
      const response = await axoios(
        `http://localhost:5000/four-six/medication-used-between`,
        {
          params: {
            startDate: startDate,
            endDate: endDate,
            supplierName: supplierName,
          },
        }
      );
      const data = response.data;
      const formattedData = data.map((item, index) => ({
        id: index + 1,
        drugId: item.drug_id,
        drugName: item.drug_name,
        supplierName: item.supplier_name,
        patientName: item.patient_name,
        prescripedDate: item.date.split("T")[0],
      }));
      console.log("Fetched medications:", data);
      setMedications(formattedData);
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };
  useEffect(() => {
    fetchMedications();
  }, [supplierName, startDate, endDate]);
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={medicatons}
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
