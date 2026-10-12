import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useAuth } from "../context/useAuth";
import "./Auth.css";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

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

    if (form.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (form.password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    try {
      signup(form);
      navigate("/profile", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to create your account.");
    }
  }

  return (
    <main className="authPage">
      <section className="authCard">
        <div className="authBrand">SHOP EASE</div>

        <span className="authEyebrow">JOIN SHOP EASE</span>

        <h1>Create your account</h1>

        <p className="authDescription">
          Create an account to keep your shopping details together.
        </p>

        <form className="authForm" onSubmit={handleSubmit}>
          <label htmlFor="signupName">Full name</label>

          <div className="authInputWrap">
            <UserRound size={19} />

            <input
              id="signupName"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          <label htmlFor="signupEmail">Email address</label>

          <div className="authInputWrap">
            <Mail size={19} />

            <input
              id="signupEmail"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <label htmlFor="signupPassword">Password</label>

          <div className="authInputWrap">
            <LockKeyhole size={19} />

            <input
              id="signupPassword"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={8}
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

          <label htmlFor="confirmPassword">Confirm password</label>

          <div className="authInputWrap">
            <LockKeyhole size={19} />

            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

            <button
              type="button"
              className="passwordToggle"
              onClick={() => setShowConfirmPassword((value) => !value)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          {error && (
            <p className="authError" role="alert">
              {error}
            </p>
          )}

          <button className="authSubmit" type="submit">
            Create Account
          </button>
        </form>

        <p className="authSwitch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

        <Link className="authBack" to="/">
          Back to shopping
        </Link>
      </section>
    </main>
  );
}

export default Signup;