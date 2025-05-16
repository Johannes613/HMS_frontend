import * as React from "react";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AppProvider } from "@toolpad/core/AppProvider";
import { useDemoRouter } from "@toolpad/core/internal";
import "./Dashboard.css";
import SideNavList from "./SideNavList";
import { customTheme } from "./DashboardTheme";
import ComponentContainer from "./ComponentContainer";
import { Badge, IconButton } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

function DashboardSetUp() {
  const router = useDemoRouter("/dashboard");
  const sideNav = SideNavList();
  return (
    <AppProvider navigation={sideNav} router={router} theme={customTheme}>
      <DashboardLayout
        title="Tali"
        sx={{
          "& .MuiDrawer-paper": {
            width: 290, // Mini sidebar width
            overflowX: "hidden",
            transition: "width 0.3s ease",
          },
        }}
        headerProps={{
          sx: {
            backgroundColor: "black",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "0 16px",
          },
        }}
        headerContent={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              ml: "auto",
              color: "white",
            }}
          >
            <h1 style={{ fontSize: "24px", margin: 0 }}>
              Hospital Management System
            </h1>
          </Box>
        }

        // toolbarContent={
        //   <Box
        //     sx={{ display: "flex", alignItems: "center", gap: 2, ml: "auto" }}
        //   >
        //     <IconButton color="inherit">
        //       <Badge badgeContent={3} color="error">
        //         <MailIcon />
        //       </Badge>
        //     </IconButton>
        //     <IconButton color="inherit">
        //       <Badge badgeContent={5} color="error">
        //         <NotificationsIcon />
        //       </Badge>
        //     </IconButton>
        //     <Avatar alt="User" src="/user.jpg" />
        //   </Box>
        // }
      >
        <ComponentContainer pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardSetUp;
