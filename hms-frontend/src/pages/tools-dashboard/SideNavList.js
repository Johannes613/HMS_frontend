import { useUserContext } from "../../context/userContext";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EventIcon from "@mui/icons-material/Event";
import InventoryIcon from "@mui/icons-material/Inventory";

function SideNavList() {
  let sideNav = null;
  const { user } = useUserContext();

  switch (user) {
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
        // { segment: "doctor", title: "Doctor" },
        // { segment: "patient", title: "Patient" },
        // { segment: "Imagegenerator", title: "Image Generator" },
      ];
      break;
    case "doctor":
      // Render user components
      sideNav = [
        { segment: "doctor", title: "Main Dashboard" },
        { segment: "doctorAppointment", title: "Appointments" },
        { segment: "patientList", title: "Patients" },
        { segment: "medicaRecordList", title: "Medical Records" },
        // { segment: "patient", title: "Patient" },
        // { segment: "Imagegenerator", title: "Image Generator" },
      ];
      break;
    case "patient":
      // Handle unknown roles or redirect to a default component
      sideNav = [
<<<<<<< HEAD
        { segment: "my-dashboard", title: "Dashboard" },
        { segment: "patient", title: "My Appointments" },
        { segment: "medical-record", title: "Medical Records" },
        { segment: "billing-interface", title: "Billing" },
=======
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
>>>>>>> myBranch
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
