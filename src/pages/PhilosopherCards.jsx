import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuotesByPhilosopher } from "../api/quotes";
import CardStack from "../components/CardStack";

export default function PhilosopherCards() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 👇 convert url param back to display name
  // "marcus-aurelius" → "Marcus Aurelius"
  const displayName = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        setLoading(true);
        const data = await fetchQuotesByPhilosopher(displayName);
        setQuotes(data);
      } catch (err) {
        setError("Failed to load quotes");
      } finally {
        setLoading(false);
      }
    };

    loadQuotes();
  }, [name]);

  const handleToggleFavorite = (quote) => {
    setFavorites((prev) =>
      prev.some((q) => q._id === quote._id)
        ? prev.filter((q) => q._id !== quote._id)
        : [...prev, quote],
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at top left, rgba(131,58,180,0.25), transparent 35%),
          radial-gradient(circle at bottom right, rgba(253,29,29,0.20), transparent 40%),
          #0b0b14
        `,
        padding: "24px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            borderRadius: "999px",
            padding: "8px 18px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← Back
        </button>

        {/* Philosopher name */}
        <h1
          style={{
            color: "#fff",
            fontSize: "22px",
            fontWeight: "600",
            margin: 0,
            background: "linear-gradient(135deg, #833AB4, #E1306C, #FD1D1D)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {displayName}
        </h1>
      </div>

      {/* Content */}
      {loading ? (
        <p style={{ color: "#fff", textAlign: "center", opacity: 0.6 }}>
          Loading quotes...
        </p>
      ) : error ? (
        <p style={{ color: "#ff4d4d", textAlign: "center" }}>{error}</p>
      ) : quotes.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <p style={{ color: "#fff", fontSize: "18px", opacity: 0.7 }}>
            No quotes yet for {displayName}
          </p>
          <p
            style={{
              color: "#fff",
              fontSize: "14px",
              opacity: 0.4,
              marginTop: "8px",
            }}
          >
            Add quotes from the admin panel
          </p>
        </div>
      ) : (
        <CardStack
          shlokas={quotes}
          language="english"
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
}
