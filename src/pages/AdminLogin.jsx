import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // 👇 Save token to localStorage
      localStorage.setItem("admin_token", data.token);

      // 👇 Go to admin dashboard
      navigate("/admin/dashboard");

    } catch (err) {
      setError("Server error, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0b14",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#1a1a2e",
          padding: "40px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "380px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* Title */}
        <h2
          style={{
            color: "#fff",
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "22px",
            fontWeight: "600",
          }}
        >
          Admin Login
        </h2>

        {/* Error */}
        {error && (
          <p
            style={{
              color: "#ff4d4d",
              textAlign: "center",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "#fff",
            fontSize: "14px",
            marginBottom: "14px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "#fff",
            fontSize: "14px",
            marginBottom: "24px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "999px",
            border: "none",
            background: "linear-gradient(135deg, #833AB4, #E1306C, #FD1D1D)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}