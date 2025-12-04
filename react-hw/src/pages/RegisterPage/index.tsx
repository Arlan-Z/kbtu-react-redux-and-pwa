import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../services/authService";
import { useAuth } from "../../contexts/authContext";
import Spinner from "../../components/Spinner";

import "./RegisterPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { loading, userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loadingForm, setLoadingForm] = useState(false);

  if (userLoggedIn) navigate("/profile");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoadingForm(true);
      setError("");

      await createUser(email, password);

      navigate("/profile");
    } catch (err: any) {
      setError(err?.message ?? "Signup failed");
    } finally {
      setLoadingForm(false);
    }
  }

  if (loading) return <Spinner />;

  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Signup</h1>

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
          {loadingForm ? "Loading..." : "Create Account"}
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
