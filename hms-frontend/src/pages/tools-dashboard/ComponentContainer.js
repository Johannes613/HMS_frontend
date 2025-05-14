import { Box } from "@mui/material";


function Componentcontainer({ pathname }) {
  const componentList = {
    
  };

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
