import { Box } from "@mui/material";
import { useUserContext } from "../../context/userContext";

  const adminComponentList = {
 
  };
    const doctorComponentList = {

  };
    const patientComponentList = {

  };

function Componentcontainer({ pathname }) {
  const {user}=useUserContext();
  let componentList=null;
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
  const componentToRender = componentList[pathname] ;
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
