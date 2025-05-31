import { Box } from "@mui/material";
import { useUserContext } from "../../context/userContext";
import AdminMain from "../../components/admin-component/admin-main/AdminMain";
import DoctorMain from "../../components/doctor-component/doctor-main/DoctorMain";
import PatientMain from "../../components/patient-component/patient-main/PatientMain";
import AppointmentList from "../../components/doctor-component/appointment-list/AppointmentList";
import PatientList from "../../components/doctor-component/patient-list/PatientList";
import MedicalRecordList from "../../components/doctor-component/medical-record-list/MedicalRecordList";
import MedicalRecord from "../../components/patient-component/patient-main/MedicalRecord";
import MyDashboard from "../../components/patient-component/patient-main/MyDashboard";
import AdminPatient from "../../components/admin-component/adminPatient/AdminPatient";
import AdminSupplier from "../../components/admin-component/admin-supplier/AdminSupplier";
import MainDashboard from "../../components/admin-component/main-dashboard/MainDashboard";
import ApptList from "../../components/admin-component/appointment-list/ApptList";

import AdminInventory from "../../components/admin-component/admin-inventory/AdminInventory";
import BillingInterface from "../../components/patient-component/patient-main/BillingInterface";
import BookAppt from "../../components/patient-component/patient-main/BookAppointment/BookAppt";
import LogOut from "../../components/home-components/LogOut.js";

const adminComponentList = {
  "/admin": <MainDashboard />,
  "/apptList": <ApptList />,
  "/admin-patient": <AdminPatient />,
  "/admin-supplier": <AdminSupplier />,
  "/inventory": <AdminInventory />,
  "/logout": <LogOut/>,
};

const doctorComponentList = {
  "/doctor": <DoctorMain />,
  "/doctorAppointment": <AppointmentList />,
  "/patientList": <PatientList />,
  "/medicaRecordList": <MedicalRecordList />,
    "/logout": <LogOut/>,

};
const patientComponentList = {
  "/my-dashboard": <MyDashboard />,
  "/patient": <PatientMain />,
  "/medical-record": <MedicalRecord />,
  "/billing-interface": <BillingInterface/>,
  "/book-appointment": <BookAppt/>,
    "/logout": <LogOut/>,

};
function Componentcontainer({ pathname }) {
  const { userRole } = useUserContext();
  // console.log("userRole from comp container " + userRole)
  let componentList = null;
  switch (userRole) {
    case "admin":
      // Render admin components
      componentList = adminComponentList;
      break;
    case "doctor":
      // Render user components
      componentList = doctorComponentList;
      break;
    case "patient":
      // Handle unknown roles or redirect to a default component
      componentList = patientComponentList;
      break;
    default:
      // Handle unknown roles or redirect to a default component
      componentList = patientComponentList;
      break;
  }

  // Default to MainDashboard if path is empty or unrecognized
  const componentToRender =
    componentList[pathname] || componentList[`/${userRole}`];
  // const componentToRender = componentList[pathname] || <MainDashboard />;

  return (
    <Box
      sx={{
        background: "#111827",
        height: "100vh",
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {componentToRender}
    </Box>
  );
}

export default Componentcontainer;
