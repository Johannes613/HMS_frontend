
import { useUserContext } from "../../context/userContext";
import React from 'react'

function SideNavList() {

let sideNav=null;
const {user}=useUserContext();

switch (user) {
  case "admin":
    // Render admin components
    sideNav = [
      { segment: "admin", title: "Admin" },
      // { segment: "doctor", title: "Doctor" },
      // { segment: "patient", title: "Patient" },
      // { segment: "Imagegenerator", title: "Image Generator" },
    ];
    break;
  case "doctor":
    // Render user components
    sideNav = [
      { segment: "doctor", title: "Doctor" },
      // { segment: "patient", title: "Patient" },
      // { segment: "Imagegenerator", title: "Image Generator" },
    ];
    break;
  case "patient":
    // Handle unknown roles or redirect to a default component
    sideNav = [
      { segment: "patient", title: "Patient" },
      // { segment: "Imagegenerator", title: "Image Generator" },
    ];
    break;
  default:
    // Handle unknown roles or redirect to a default component
    sideNav = [
      { segment: "patient", title: "Patient" },
      // { segment: "Imagegenerator", title: "Image Generator" },
    ];
    break;
}
// Default to MainDashboard if path is empty or unrecognized
  return sideNav
}
export default SideNavList
