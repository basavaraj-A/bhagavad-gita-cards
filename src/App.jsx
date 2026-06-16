import logo from "./assets/logo.png";
import { fetchAllShlokas } from "./api/shlokas";
import { fetchQuotesByPhilosopher } from "./api/quotes";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdSlot from "./layout/AdSlot";
import CardStack from "./components/CardStack";
import PageLayout from "./layout/PageLayout";

function App() {
  const { name } = useParams();
  const navigate = useNavigate();

  const displayName = name
    ? name
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Krishna";

  const isPhilosopher = !!name;

  const [searchValue, setSearchValue] = useState("");
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("gita_language") || "hinglish";
  });

  const favKey = isPhilosopher ? `favorites_${displayName}` : "gita_favorites"; // 👈 add this

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(favKey); // 👈 use favKey
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const saved = localStorage.getItem(favKey);
    setFavorites(saved ? JSON.parse(saved) : []);
  }, [favKey]);

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.find((s) => s._id === item._id);
      const updated = exists
        ? prev.filter((s) => s._id !== item._id)
        : [...prev, item];
      localStorage.setItem(favKey, JSON.stringify(updated)); // 👈 use favKey
      return updated;
    });
  };

  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalSearchValue, setGlobalSearchValue] = useState("");
  const [allQuotes, setAllQuotes] = useState([]); // 👈 add this

  useEffect(() => {
    localStorage.setItem("gita_language", language);
  }, [language]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (isPhilosopher) {
          const data = await fetchQuotesByPhilosopher(displayName);
          setCardsData(data);
        } else {
          const data = await fetchAllShlokas();
          setCardsData(data);
        }
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [name]);

  useEffect(() => {
    const loadAllQuotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/quotes");
        const data = await res.json();
        console.log("All quotes loaded:", data);
        setAllQuotes(data);
      } catch (error) {
        console.error("Failed to load all quotes", error);
      }
    };
    loadAllQuotes();
  }, []);

  const normalizedSearch = searchValue.trim();

  const filteredCards = normalizedSearch
    ? cardsData.filter((item) => {
        if (isPhilosopher) {
          return item.quote
            ?.toLowerCase()
            .includes(normalizedSearch.toLowerCase());
        } else {
          return `${item.chapter}.${item.verse}`.startsWith(normalizedSearch);
        }
      })
    : cardsData;

  const displayedCards = showFavorites ? favorites : filteredCards;

  const globalFilteredCards = globalSearchValue.trim()
    ? [
        // 👇 search shlokas
        ...cardsData.filter((item) => {
          if (!isPhilosopher) {
            const text =
              (item.translations?.hinglish || "") +
              " " +
              (item.translations?.english || "");
            return text.toLowerCase().includes(globalSearchValue.toLowerCase());
          }
          return false;
        }),
        // 👇 search ALL quotes across all philosophers
        ...allQuotes.filter((item) => {
          const text =
            (item.philosopher || "") +
            " " +
            (item.quote || "") +
            " " +
            (item.translations?.hinglish || "") +
            " " +
            (item.translations?.english || "");
          return text.toLowerCase().includes(globalSearchValue.toLowerCase());
        }),
      ]
    : [];

  if (loading) {
    return (
      <PageLayout>
        <p style={{ textAlign: "center", opacity: 0.6 }}>Loading...</p>
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
          {/* Logo — always visible */}
          <img
            src={logo}
            alt="Logo"
            style={{ width: "60px", height: "60px", objectFit: "contain" }}
          />

          <div>
            {/* Cards name — always visible */}
            <h1 style={{ fontSize: "22px", fontWeight: "600", margin: 0 }}>
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

          {/* Philosopher name + Back button — only on philosopher pages */}
          {isPhilosopher && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginLeft: "auto",
              }}
            >
              <button
                onClick={() => navigate("/")}
                style={{
                  background: "none",
                  border: "1px solid rgba(0,0,0,0.15)",
                  borderRadius: "999px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                ← Back
              </button>
              <h2 style={{ fontSize: "20px", fontWeight: "600", margin: 0 }}>
                {displayName}
              </h2>
            </div>
          )}
        </div>

        {/* Search + Buttons */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "24px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder={
              isPhilosopher ? "Search quotes..." : "Shloka number (e.g. 2.47)"
            }
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
            }}
          >
            Global
          </button>

          <button
            onClick={() => setShowFavorites((prev) => !prev)}
            style={{
              padding: "12px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(0,0,0,0.15)",
              cursor: "pointer",
              fontSize: "14px",
              backgroundColor: showFavorites ? "#111" : "#fff",
              color: showFavorites ? "#fff" : "#111",
            }}
          >
            Favorites
          </button>
        </div>

        {/* Cards */}
        {displayedCards.length > 0 ? (
          <CardStack
            shlokas={displayedCards}
            language={language}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        ) : (
          <p style={{ opacity: 0.6, textAlign: "center" }}>
            {isPhilosopher
              ? `No quotes yet for ${displayName}. Add from admin panel.`
              : "No shloka found"}
          </p>
        )}
      </PageLayout>

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
              backgroundColor: "#fff",
              width: "90%",
              maxWidth: "420px",
              borderRadius: "20px",
              padding: "24px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              value={globalSearchValue}
              onChange={(e) => setGlobalSearchValue(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "999px",
                border: "1px solid #ddd",
              }}
            />

            {globalSearchValue && (
              <div
                style={{
                  marginTop: "20px",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {globalFilteredCards.length > 0 ? (
                  globalFilteredCards.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => {
                        setShowGlobalSearch(false);
                        if (item.philosopher) {
                          navigate(
                            `/philosopher/${item.philosopher.toLowerCase().replace(" ", "-")}`,
                          );
                        } else {
                          setSearchValue(`${item.chapter}.${item.verse}`);
                        }
                      }}
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #eee",
                        cursor: "pointer",
                      }}
                    >
                      <strong>
                        {item.philosopher
                          ? item.philosopher
                          : `${item.chapter}.${item.verse}`}
                      </strong>
                      <p style={{ fontSize: "12px", opacity: 0.7 }}>
                        {item.philosopher
                          ? item.quote?.slice(0, 60)
                          : item.translations?.[language]?.slice(0, 60)}
                        ...
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={{ opacity: 0.6 }}>No results found</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
