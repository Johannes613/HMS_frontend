import { useUserContext } from "../../../../context/userContext";
import UpdateProfileModal from "../UpdateProfileModal";
import PersonIcon from "@mui/icons-material/Person";
function MyProfile() {
  const { user } = useUserContext();
  console.log(user + " from patient profile");
  return (
    <div className="my_profile">
      <div className="profile-header">
        <PersonIcon className="profile-icon" />
        <h2>Personal Information</h2>
      </div>

      <div className="personal-info-details">
        <p>
          First Name: <span>{user.patient_fname}</span>
        </p>
        <p>
          Last Name: <span>{user.patient_lname}</span>
        </p>
        <p>
          Gender: <span>{user.gender}</span>
        </p>
        <p>
          Date of Birth: <span>{user.birth_date}</span>
        </p>
        <p>
          Age:<span>{user.age}</span>
        </p>
        <p>
          Email: <span>{user.email}</span>
        </p>
        <p>
          Phone: <span>{user.phone_num}</span>
        </p>
        <p>
          Address: <span>123 Main St, City, Country</span>
        </p>
        <p>
          Primary Care Physician: <span>Dr. Smith</span>
        </p>
        <p>
          Physician Contact: <span>555-123-4567</span>
        </p>
        <p>
          Last Visit Date: <span>2023-10-01</span>
        </p>
        <div className="update-prof-btn">
          <UpdateProfileModal />
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
