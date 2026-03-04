import logo from "./assets/logo.png";
import { fetchAllShlokas } from "./api/shlokas";
import { useState, useEffect } from "react";
import AdSlot from "./layout/AdSlot";
import CardStack from "./components/CardStack";
import PageLayout from "./layout/PageLayout";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("gita_language") || "hinglish";
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("gita_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (shloka) => {
    setFavorites((prev) => {
      const exists = prev.find((s) => s._id === shloka._id);
      const updated = exists
        ? prev.filter((s) => s._id !== shloka._id)
        : [...prev, shloka];

      localStorage.setItem("gita_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const [shlokasData, setShlokasData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Persist language
  useEffect(() => {
    localStorage.setItem("gita_language", language);
  }, [language]);

  // Fetch shlokas from backend
  useEffect(() => {
    const loadShlokas = async () => {
      try {
        const data = await fetchAllShlokas();
        setShlokasData(data);
      } catch (error) {
        console.error("Failed to load shlokas", error);
      } finally {
        setLoading(false);
      }
    };

    loadShlokas();
  }, []);

  const normalizedSearch = searchValue.trim();

  const filteredShlokas = normalizedSearch
    ? shlokasData.filter((shloka) =>
        `${shloka.chapter}.${shloka.verse}`.startsWith(normalizedSearch),
      )
    : shlokasData;

  const displayedShlokas = showFavorites ? favorites : filteredShlokas;

  // ✅ LOADING STATE (THIS IS WHAT YOU ASKED)
  if (loading) {
    return (
      <PageLayout>
        <p style={{ textAlign: "center", opacity: 0.6 }}>Loading shlokas...</p>
      </PageLayout>
    );
  }

  return (
    <>
      <PageLayout>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "20px",
          }}
        >
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "60px", // display size
              height: "60px",
              objectFit: "contain",
            }}
          />

          {/* Title + Language */}
          <div>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "600",
                margin: 0,
              }}
            >
              Cards
            </h1>

            <div style={{ fontSize: "14px", marginTop: "6px" }}>
              <span
                onClick={() => setLanguage("hinglish")}
                style={{
                  cursor: "pointer",
                  opacity: language === "hinglish" ? 1 : 0.5,
                  marginRight: "8px",
                }}
              >
                HING
              </span>
              |
              <span
                onClick={() => setLanguage("english")}
                style={{
                  cursor: "pointer",
                  opacity: language === "english" ? 1 : 0.5,
                  marginLeft: "8px",
                }}
              >
                EN
              </span>
            </div>
          </div>
        </div>

        {/* Search + Buttons */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "24px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Shloka number (e.g. 2.47)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: "999px",
              border: "none",
              outline: "none",
              fontSize: "14px",
            }}
          />

          {/* Global Search */}
          <button
            onClick={() => setShowGlobalSearch(true)}
            style={{
              padding: "12px 18px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              background: "linear-gradient(135deg, #fd1d1d, #fcb045)",
              color: "#ffffff",
              boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
              whiteSpace: "nowrap",
            }}
          >
            Global
          </button>

          {/* Favorites */}
          <button
            onClick={() => setShowFavorites((prev) => !prev)}
            style={{
              padding: "12px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(0,0,0,0.15)",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              backgroundColor: showFavorites ? "#111111" : "#ffffff",
              color: showFavorites ? "#ffffff" : "#111111",
              boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
              whiteSpace: "nowrap",
            }}
          >
            Favorites
          </button>
        </div>

        {/* Cards */}
        {displayedShlokas.length > 0 ? (
          <CardStack
            shlokas={displayedShlokas}
            language={language}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        ) : (
          <p style={{ opacity: 0.6, textAlign: "center" }}>No shloka found</p>
        )}
      </PageLayout>

      {/* Ad */}
      <AdSlot />

      {/* Global Search Popup */}
      {showGlobalSearch && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowGlobalSearch(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              width: "90%",
              maxWidth: "420px",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="Search across Cards..."
              autoFocus
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: "999px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "15px",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
