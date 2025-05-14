import { Box } from "@mui/material";
import { useUserContext } from "../../context/userContext";
import AdminMain from "../../components/admin-component/admin-main/AdminMain";
import DoctorMain from "../../components/doctor-component/doctor-main/DoctorMain";
import PatientMain from "../../components/patient-component/patient-main/PatientMain";

const adminComponentList = {
  "/admin": <AdminMain />,
};
const doctorComponentList = {
  "/doctor": <DoctorMain />,
};
const patientComponentList = {
  "/patient": <PatientMain />,
};
function Componentcontainer({ pathname }) {
  const { user } = useUserContext();
  let componentList = null;
  switch (user) {
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
  const componentToRender = componentList[pathname];
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
