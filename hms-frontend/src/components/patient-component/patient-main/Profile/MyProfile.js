import { useEffect, useState } from "react";
import UpdateProfileModal from "../UpdateProfileModal";
import PersonIcon from "@mui/icons-material/Person";
function MyProfile({isUpdated,setIsUpdated}) {
  // const [isUpdated,setIsUpdated] = useState(false);
  const [patientInfo,setPatientInfo] = useState(JSON.parse(localStorage.getItem("user")))

  useEffect(()=>{
   setPatientInfo(JSON.parse(localStorage.getItem("user")));
  },[isUpdated])
  return (
    <div className="my_profile">
      <div className="profile-header">
        <PersonIcon className="profile-icon" />
        <h2>Personal Information</h2>
      </div>

      <div className="personal-info-details">
        <p>
          First Name: <span>{patientInfo?.patient_fname}</span>
        </p>
        <p>
          Last Name: <span>{patientInfo?.patient_lname}</span>
        </p>
        <p>
          Gender: <span>{patientInfo?.gender}</span>
        </p>
        <p>
          Date of Birth: <span>{patientInfo?.birth_date}</span>
        </p>
        <p>
          Age:<span>{patientInfo?.age}</span>
        </p>
        <p>
          Email: <span>{patientInfo?.email}</span>
        </p>
        <p>
          Phone: <span>{patientInfo?.phone_num}</span>
        </p>
        <div className="update-prof-btn">
          <UpdateProfileModal isUpdated= {isUpdated} setIsUpdated = {setIsUpdated} />
        </div>
      </div>
    </div>
  );
}

export default MyProfile;