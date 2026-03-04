import favoritesIcon from "../assets/icons/heart.jpg";
import likeIcon from "../assets/icons/like.jpg";
import { useState } from "react";

function ShlokaCard({
  shloka,
  language = "hinglish",
  isFavorite,
  onToggleFavorite,
}) {
  const [hovered, setHovered] = useState(false);
  const meaning = shloka.translations[language];

  const pronounceShloka = () => {
    const utterance = new SpeechSynthesisUtterance(shloka.sanskrit);
    utterance.lang = "sa-IN";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        maxWidth: "420px",
        aspectRatio: "1 / 1",
        margin: "0 auto 24px",
        position: "relative",
        padding: "26px",
        borderRadius: "20px",
        boxShadow:
          "0 20px 40px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.6)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* 🔹 Shloka Number */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          left: "16px",
          fontSize: "12px",
          fontWeight: "600",
          color: "#666",
          letterSpacing: "0.4px",
        }}
      >
        {shloka.chapter}.{shloka.verse}
      </div>

      {/* Top-right actions */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          display: "flex",
          gap: "10px",
          zIndex: 20,
        }}
      >
        <img
          src={favoritesIcon}
          alt="Favorites"
          title="Add to Favorites"
          onClick={() => onToggleFavorite(shloka)}
          style={{
            width: "22px",
            height: "22px",
            cursor: "pointer",
            opacity: isFavorite ? 1 : 0.6,
            filter: isFavorite ? "none" : "grayscale(1)",
          }}
        />

        <img
          src={likeIcon}
          alt="Like"
          style={{
            width: "22px",
            height: "22px",
            cursor: "pointer",
            opacity: 0.6,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Sanskrit */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "20px",
              lineHeight: "1.8",
              fontWeight: "600",
              color: "#111111",
              marginBottom: "10px",
            }}
          >
            {shloka.sanskrit}
          </p>

          <button
            onClick={pronounceShloka}
            style={{
              backgroundColor: "rgba(0,0,0,0.05)",
              border: "none",
              borderRadius: "999px",
              padding: "6px 10px",
              cursor: "pointer",
              fontSize: "16px",
              opacity: 0.8,
            }}
          >
            🔊
          </button>
        </div>

        {/* Meaning */}
        <p
          style={{
            fontSize: "15px",
            lineHeight: "1.75",
            color: "#444444",
            textAlign: "center",
            maxWidth: "90%",
            margin: "0 auto",
          }}
        >
          {meaning}
        </p>
      </div>

      {/* Center dot */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "8px",
          height: "8px",
          background:
            "radial-gradient(circle, rgba(0,0,0,0.25), rgba(0,0,0,0.05))",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default ShlokaCard;
