import { Link } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../contexts/authContext";
import { signOut } from "../../services/authService";

export default function Header() {
  const { userLoggedIn } = useAuth();

  return (
    <header className="header-wrapper">
      <div className="header-title">
        <Link to="/" className="logo">
          <h1>Rick and Morty</h1>
          <h2>Wiki</h2>
        </Link>
      </div>

      <nav>
        <ul className="header-routing">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/items">Wiki</Link>
          </li>

          {!userLoggedIn && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>

              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}

          {userLoggedIn && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>

              <li>
                <button
                  className="logout-btn"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
