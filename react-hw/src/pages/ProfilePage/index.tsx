import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../services/authService";
import Spinner from "../../components/Spinner";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { currentUser, userLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  if (!loading && !userLoggedIn) {
    navigate("/login");
  }

  if (loading) return <Spinner />;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h1>Profile</h1>

        <p><strong>Email:</strong> {currentUser?.email}</p>
        <p><strong>UID:</strong> {currentUser?.uid}</p>

        <button onClick={() => signOut().then(() => navigate("/login"))}>
          Logout
        </button>
      </div>
    </div>
  );
}
