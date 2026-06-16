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

  // 👇 render image card for philosopher
  if (shloka.isImageCard) {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          maxWidth: "320px",
          aspectRatio: "1 / 1",
          margin: "0 auto 24px",
          position: "relative",
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.6)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background blur image */}
        {shloka.image && (
          <img
            src={shloka.image}
            alt={shloka.philosopher}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(8px) brightness(0.4)",
              transform: "scale(1.1)",
            }}
          />
        )}

        {/* Foreground content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Philosopher image */}
          {shloka.image ? (
            <img
              src={shloka.image}
              alt={shloka.philosopher}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid rgba(255,255,255,0.8)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
              }}
            />
          ) : (
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #833AB4, #E1306C, #FD1D1D)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
                color: "#fff",
              }}
            >
              {shloka.philosopher?.charAt(0)}
            </div>
          )}

          {/* Philosopher name */}
          <h2
            style={{
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: "700",
              margin: 0,
              textAlign: "center",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              letterSpacing: "0.5px",
            }}
          >
            {shloka.philosopher}
          </h2>

          {/* Swipe hint */}
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "12px",
              margin: 0,
            }}
          >
            Swipe to read quotes →
          </p>
        </div>
      </div>
    );
  }

  // 👇 normal shloka/quote card below
  const meaning = shloka.translations?.[language] || shloka.quote || "";

  const pronounceShloka = () => {
    const utterance = new SpeechSynthesisUtterance(shloka.sanskrit || shloka.quote);
    utterance.lang = shloka.sanskrit ? "sa-IN" : "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        maxWidth: "320px",
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
      {/* 🔹 Shloka Number or Philosopher */}
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
        {shloka.chapter && shloka.verse
          ? `${shloka.chapter}.${shloka.verse}`
          : shloka.philosopher || ""}
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
        {/* Sanskrit text — only for shlokas */}
        {shloka.sanskrit && (
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
        )}

        {/* Quote text — only for philosopher quotes */}
        {!shloka.sanskrit && shloka.quote && (
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.8",
                fontWeight: "600",
                color: "#111111",
                marginBottom: "10px",
                fontStyle: "italic",
              }}
            >
              "{shloka.quote}"
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
        )}

        {/* Meaning / Translation */}
        {meaning && (
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
        )}
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