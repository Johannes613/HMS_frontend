import { useUserContext } from "../../context/userContext";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EventIcon from "@mui/icons-material/Event";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Logout } from "@mui/icons-material";

function SideNavList() {
  let sideNav = null;
  const { userRole } = useUserContext();

  switch (userRole) {
    case "admin":
      // Render admin components
      sideNav = [
        {
          segment: "admin",
          title: "Main Dashboard",
          icon: <AdminPanelSettingsIcon />,
        },
        {
          segment: "admin-patient",
          title: "Patients",
          icon: <LocalHospitalIcon />,
        },
        {
          segment: "admin-supplier",
          title: "Suppliers",
          icon: <LocalShippingIcon />,
        },

        { segment: "apptList", title: "Appointments", icon: <EventIcon /> },
        { segment: "inventory", title: "Inventory", icon: <InventoryIcon /> },
        { segment: "logout", title: "Logout", icon: <Logout /> },
        // { segment: "doctor", title: "Doctor" },
        // { segment: "patient", title: "Patient" },
        // { segment: "Imagegenerator", title: "Image Generator" },
      ];
      break;
    case "doctor":
      // Render user components
      sideNav = [
        { segment: "doctor", title: "Main Dashboard", icon:<AdminPanelSettingsIcon /> },
        { segment: "doctorAppointment", title: "Appointments",icon: <EventIcon />},
        { segment: "patientList", title: "Patients",icon:<LocalHospitalIcon /> },
        { segment: "medicaRecordList", title: "Medical Records",icon: <InventoryIcon />  },
           { segment: "logout", title: "Logout", icon: <Logout /> },

        // { segment: "patient", title: "Patient" },
        // { segment: "Imagegenerator", title: "Image Generator" },
      ];
      break;
    case "patient":
      // Handle unknown roles or redirect to a default component
      sideNav = [
        {
          segment: "my-dashboard",
          title: "Dashboard",
          icon: <AdminPanelSettingsIcon />,
        },
        { segment: "patient", title: "My Appointments", icon: <EventIcon /> },
        {
          segment: "medical-record",
          title: "Medical Records",
          icon: <EventIcon />,
        },
        {
          segment: "book-appointment",
          title: "Book Appointment",
          icon: <EventIcon />,
        },
        {
          segment: "billing",
          title: "Billing",
          icon: <EventIcon />,
        },
           { segment: "logout", title: "Logout", icon: <Logout />  },
      ];
      break;
    default:
      // Handle unknown roles or redirect to a default component
      sideNav = [
        { segment: "patient", title: "Patient" },
        // { segment: "Imagegenerator", title: "Image Generator" },
      ];
  }

  return sideNav;
}
export default SideNavList;
