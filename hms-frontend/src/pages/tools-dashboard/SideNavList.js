import { useUserContext } from "../../context/userContext";

function SideNavList() {
  let sideNav = null;
  const { user } = useUserContext();


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
       { segment: "my-dashboard", title: "Dashboard" },
        { segment: "patient", title: "My Appointments" },
        { segment: "medical-record", title: "Medical Records" },
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
return sideNav;
}
export default SideNavList;
