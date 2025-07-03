"use client";
import { useState } from "react";

const roles = [
  { value: "student", label: "Student" },
  { value: "teaching_staff", label: "Teaching Staff" },
  { value: "non_teaching_staff", label: "Non-Teaching Staff" },
];

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(roles[0].value);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [notRobot, setNotRobot] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!notRobot) {
      setError("Please confirm you are not a robot.");
      return;
    }
    // Simulate registration success
    setSuccess("Registration successful! You can now log in.");
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      backgroundImage: `url('/car-rental-app.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor: "#aaa",
      position: "relative"
    }}>
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(128,128,128,0.7)",
        zIndex: 1
      }} />
      <div style={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        height: "100vh",
        paddingLeft: "500px",
        paddingTop: "120px"
      }}>
        <div style={{
          background: "#f5f5f5",
          borderRadius: 20,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          padding: "40px 40px 24px 40px",
          width: 400,
          maxWidth: "90vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch"
        }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
            <img src="/spartan_logo.png" alt="Sparta Logo" style={{ width: 48, height: 48, marginRight: 10 }} />
            <div>
              <div style={{ fontWeight: 700, color: "#b22222", fontSize: 22, letterSpacing: 1 }}>UNIVERSITY BIKE RENTAL</div>
              <div style={{ fontSize: 14, color: "#444" }}>Rent. Ride. Return. Spartan-style.</div>
            </div>
          </div>
          <h2 style={{ margin: "18px 0 18px 0", fontWeight: 500 }}>Register</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 14 }}>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  fontSize: 16,
                  background: `url('data:image/svg+xml;utf8,<svg fill=\'gray\' height=\'20\' viewBox=\'0 0 24 24\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z\'/></svg>') no-repeat 10px center`,
                  backgroundColor: "#f7f7f7"
                }}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  fontSize: 16,
                  background: `url('data:image/svg+xml;utf8,<svg fill=\'gray\' height=\'20\' viewBox=\'0 0 24 24\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z\'/></svg>') no-repeat 10px center`,
                  backgroundColor: "#f7f7f7"
                }}
              />
            </div>
            <div style={{ marginBottom: 14, position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 40px 12px 40px",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  fontSize: 16,
                  background: `url('data:image/svg+xml;utf8,<svg fill=\'gray\' height=\'20\' viewBox=\'0 0 24 24\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-7V7a6 6 0 0 0-12 0v3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zm-8-3a4 4 0 0 1 8 0v3H6V7z\'/></svg>') no-repeat 10px center`,
                  backgroundColor: "#f7f7f7"
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  color: "#1976d2"
                }}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div style={{ marginBottom: 18 }}>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  fontSize: 16,
                  backgroundColor: "#f7f7f7"
                }}
              >
                {roles.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
            <div style={{
              background: "#f7f7f7",
              borderRadius: 6,
              border: "1px solid #e0e0e0",
              padding: "10px 12px",
              marginBottom: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <label style={{ display: "flex", alignItems: "center", fontSize: 15 }}>
                <input
                  type="checkbox"
                  checked={notRobot}
                  onChange={e => setNotRobot(e.target.checked)}
                  style={{ marginRight: 8, width: 18, height: 18 }}
                />
                I'm not a robot
              </label>
              <span style={{ fontSize: 11, color: "#888" }}>
                reCAPTCHA<br />
                <a href="#" style={{ color: "#888", textDecoration: "underline" }}>Privacy</a> - <a href="#" style={{ color: "#888", textDecoration: "underline" }}>Terms</a>
              </span>
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                background: "#FFD600",
                color: "#222",
                fontWeight: 600,
                fontSize: 18,
                border: "none",
                borderRadius: 8,
                padding: "12px 0",
                marginBottom: 10,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
              }}
            >
              Register
            </button>
          </form>
          {error && <p style={{ color: "#b22222", margin: 0, marginBottom: 8 }}>{error}</p>}
          {success && <p style={{ color: "green", margin: 0, marginBottom: 8 }}>{success}</p>}
          <div style={{ textAlign: "center", fontSize: 15, marginTop: 8 }}>
            Already have an account?{' '}
            <a href="/" style={{ color: "#1976d2", textDecoration: "underline", fontWeight: 500 }}>Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
} 