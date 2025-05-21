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
import HomePage from "../home/HomePage";
import { useUserContext } from "../../context/userContext";


function DashboardSetUp() {
  const router = useDemoRouter("/dashboard");
  const {user}=useUserContext();
  console.log(user)
  const sideNav = SideNavList();
  return (
    <AppProvider navigation={sideNav} router={router} theme={customTheme} >
      <DashboardLayout
        title="Tali"
        sx={{
          "& .MuiDrawer-paper": {
            width: 290, // Mini sidebar width
            overflowX: "hidden",
            transition: "width 0.3s ease",
            "&.MuiDrawer-open": {
              width: 290, // Expanded sidebar width
            },
            //  style the sidebar links
          },

        }}
  
      >
        <ComponentContainer pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardSetUp;
