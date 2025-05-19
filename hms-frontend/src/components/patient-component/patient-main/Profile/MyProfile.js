import UpdateProfileModal from "../UpdateProfileModal";
import PersonIcon from "@mui/icons-material/Person";
function MyProfile() {
  return (
    <div className="my_profile">
      <div className="profile-header">
        <PersonIcon className="profile-icon" />
        <h2>Personal Information</h2>
      </div>

      <div className="personal-info-details">
        <p>
          First Name: <span>Indalu</span>
        </p>
        <p>
          Last Name: <span>Kelbesa</span>
        </p>
        <p>
          Gender: <span>Male</span>
        </p>
        <p>
          Date of Birth: <span>1990-01-01</span>
        </p>
        <p>
          Age:<span>21</span>
        </p>
        <p>
          Email: <span>indalu@gmail.com</span>
        </p>
        <p>
          Phone: <span>123-456-7890</span>
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
