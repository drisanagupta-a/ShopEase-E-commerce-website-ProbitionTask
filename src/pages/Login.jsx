import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useAuth } from "../context/useAuth";
import "./Auth.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      login(form);

      const destination = location.state?.from || "/profile";
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || "Unable to log in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="authPage">
      <section className="authCard">
        <div className="authBrand">SHOP EASE</div>

        <span className="authEyebrow">WELCOME BACK</span>

        <h1>Sign in to your account</h1>

        <p className="authDescription">
          Sign in to manage your profile and keep track of your shopping.
        </p>

        <form className="authForm" onSubmit={handleSubmit}>
          <label htmlFor="loginEmail">Email address</label>

          <div className="authInputWrap">
            <Mail size={19} />

            <input
              id="loginEmail"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <label htmlFor="loginPassword">Password</label>

          <div className="authInputWrap">
            <LockKeyhole size={19} />

            <input
              id="loginPassword"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="passwordToggle"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          {error && (
            <p className="authError" role="alert">
              {error}
            </p>
          )}

          <button className="authSubmit" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="authSwitch">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>

        <Link className="authBack" to="/">
          Back to shopping
        </Link>
      </section>
    </main>
  );
}

export default Login;