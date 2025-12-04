import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithCredentials } from "../../services/authService";
import { useAuth } from "../../contexts/authContext";
import Spinner from "../../components/Spinner";

export default function LoginPage() {
  const navigate = useNavigate();
  const { loading, userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loadingForm, setLoadingForm] = useState(false);

  useEffect(() => {
    if (!loading && userLoggedIn) {
      navigate("/profile");
    }
  }, [loading, userLoggedIn, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoadingForm(true);
      setError("");

      await signInWithCredentials(email, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingForm(false);
    }
  }

  if (loading) return <Spinner />;

  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        {error && <p className="error-text">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loadingForm}>
          {loadingForm ? "Loading..." : "Login"}
        </button>

        <p>
          No account? <Link to="/signup">Create one</Link>
        </p>
      </form>
    </div>
  );
}
