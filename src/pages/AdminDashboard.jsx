import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("shlokas");
  const [shlokas, setShlokas] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedPhilosopher, setSelectedPhilosopher] = useState("all");
  const navigate = useNavigate();

  const token = localStorage.getItem("admin_token");
  // 👇 get unique philosopher names from quotes
  const philosopherNames = [
    "all",
    ...new Set(quotes.map((q) => q.philosopher)),
  ];

  // ─── Redirect if not logged in ───
  useEffect(() => {
    if (!token) navigate("/admin/login");
  }, []);

  // ─── Fetch data on tab change ───
  useEffect(() => {
    if (activeTab === "shlokas") fetchShlokas();
    if (activeTab === "quotes") fetchQuotes();
  }, [activeTab]);

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // ─── SHLOKAS ───
  const fetchShlokas = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/admin/shlokas", {
      headers: authHeaders,
    });
    const data = await res.json();
    setShlokas(data);
    setLoading(false);
  };

  const deleteShloka = async (id) => {
    if (!confirm("Delete this shloka?")) return;
    await fetch(`http://localhost:5000/api/admin/shlokas/${id}`, {
      method: "DELETE",
      headers: authHeaders,
    });
    fetchShlokas();
  };

  // ─── QUOTES ───
  const fetchQuotes = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/admin/quotes", {
      headers: authHeaders,
    });
    const data = await res.json();
    setQuotes(data);
    setLoading(false);
  };

  const deleteQuote = async (id) => {
    if (!confirm("Delete this quote?")) return;
    await fetch(`http://localhost:5000/api/admin/quotes/${id}`, {
      method: "DELETE",
      headers: authHeaders,
    });
    fetchQuotes();
  };

  // ─── LOGOUT ───
  const handleLogout = () => {
    const confirmed = confirm("Are you sure you want to logout?");
    if (!confirmed) return;
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0b0b14", color: "#fff" }}>
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 30px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: "600" }}>Admin Dashboard</h1>

        <button
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.target.style.background = "#fff";
            e.target.style.color = "#0b0b14";
            e.target.style.boxShadow =
              "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "none";
            e.target.style.color = "#fff";
            e.target.style.boxShadow = "none";
          }}
          style={{
            padding: "8px 20px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "14px",
            transition: "all 0.3s ease",
          }}
        >
          Logout
        </button>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: "flex", gap: "12px", padding: "20px 30px" }}>
        {["shlokas", "quotes"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setShowForm(false);
              setEditItem(null);
            }}
            style={{
              padding: "10px 24px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              background:
                activeTab === tab
                  ? "linear-gradient(135deg, #833AB4, #E1306C)"
                  : "rgba(255,255,255,0.08)",
              color: "#fff",
            }}
          >
            {tab === "shlokas" ? "Shlokas" : "Philosopher Quotes"}
          </button>
        ))}
      </div>

      {/* ── Philosopher Dropdown ── */}
      {activeTab === "quotes" && ( // 👈 add this block here
        <div style={{ padding: "0 30px" }}>
          <select
            value={selectedPhilosopher}
            onChange={(e) => setSelectedPhilosopher(e.target.value)}
            style={{
              padding: "10px 20px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "#1a1a2e",
              color: "#fff",
              fontSize: "14px",
              marginBottom: "20px",
              outline: "none",
              cursor: "pointer",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            <option value="all">All Philosophers</option>
            {[...new Set(quotes.map((q) => q.philosopher))]
              .sort()
              .map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* ── Content ── */}
      <div style={{ padding: "0 30px 30px" }}>
        {/* Add Button */}
        <button
          onClick={() => {
            setEditItem(null);
            setShowForm(true);
          }}
          style={{
            padding: "10px 24px",
            borderRadius: "999px",
            border: "none",
            background: "linear-gradient(135deg, #FD1D1D, #fcb045)",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          + Add {activeTab === "shlokas" ? "Shloka" : "Quote"}
        </button>

        {/* Form */}
        {showForm && (
          <ItemForm
            type={activeTab}
            editItem={editItem}
            token={token}
            onSuccess={() => {
              setShowForm(false);
              setEditItem(null);
              activeTab === "shlokas" ? fetchShlokas() : fetchQuotes();
            }}
            onCancel={() => {
              setShowForm(false);
              setEditItem(null);
            }}
          />
        )}

        {/* List */}
        {loading ? (
          <p style={{ opacity: 0.5 }}>Loading...</p>
        ) : activeTab === "shlokas" ? (
          shlokas.map((s) => (
            <div key={s._id} style={cardStyle}>
              <div>
                <strong style={{ color: "#fcb045" }}>
                  {s.chapter}.{s.verse}
                </strong>
                <p style={{ fontSize: "13px", margin: "6px 0", opacity: 0.8 }}>
                  {s.sanskrit}
                </p>
                <p style={{ fontSize: "12px", opacity: 0.5 }}>
                  {s.translations?.hinglish?.slice(0, 80)}...
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button
                  onClick={() => {
                    setEditItem(s);
                    setShowForm(true);
                  }}
                  style={editBtnStyle}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteShloka(s._id)}
                  style={deleteBtnStyle}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          quotes
            .filter((q) =>
              selectedPhilosopher === "all"
                ? true
                : q.philosopher === selectedPhilosopher,
            )
            .map((q) => (
              <div key={q._id} style={cardStyle}>
                <div>
                  <strong style={{ color: "#fcb045" }}>{q.philosopher}</strong>
                  <p
                    style={{ fontSize: "13px", margin: "6px 0", opacity: 0.8 }}
                  >
                    {q.quote}
                  </p>
                  <p style={{ fontSize: "12px", opacity: 0.5 }}>
                    {q.translations?.hinglish?.slice(0, 80)}...
                  </p>
                </div>
                <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                  <button
                    onClick={() => {
                      setEditItem(q);
                      setShowForm(true);
                    }}
                    style={editBtnStyle}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteQuote(q._id)}
                    style={deleteBtnStyle}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

// ─── Item Form Component ───
function ItemForm({ type, editItem, token, onSuccess, onCancel }) {
  const isEdit = !!editItem;

  const [form, setForm] = useState(
    editItem || {
      chapter: "",
      verse: "",
      sanskrit: "",
      philosopher: "",
      quote: "",
      translations: { hinglish: "", english: "" },
      category: "wisdom",
    },
  );

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTranslation = (lang, value) => {
    setForm((prev) => ({
      ...prev,
      translations: { ...prev.translations, [lang]: value },
    }));
  };

  const handleSubmit = async () => {
    const payload =
      type === "shlokas"
        ? {
            chapter: Number(form.chapter),
            verse: Number(form.verse),
            sanskrit: form.sanskrit,
            translations: form.translations,
          }
        : {
            philosopher: form.philosopher,
            quote: form.quote,
            category: form.category,
            translations: form.translations,
          };

    const url =
      type === "shlokas"
        ? isEdit
          ? `http://localhost:5000/api/admin/shlokas/${editItem._id}`
          : "http://localhost:5000/api/admin/shlokas"
        : isEdit
          ? `http://localhost:5000/api/admin/quotes/${editItem._id}`
          : "http://localhost:5000/api/admin/quotes";

    const method = isEdit ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    onSuccess();
  };

  return (
    <div
      style={{
        background: "#1a1a2e",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "24px",
      }}
    >
      <h3 style={{ marginBottom: "16px", fontSize: "16px" }}>
        {isEdit ? "Edit" : "Add"} {type === "shlokas" ? "Shloka" : "Quote"}
      </h3>

      {/* Shloka fields */}
      {type === "shlokas" && (
        <>
          <input
            placeholder="Chapter (e.g. 2)"
            value={form.chapter}
            onChange={(e) => handleChange("chapter", e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Verse (e.g. 47)"
            value={form.verse}
            onChange={(e) => handleChange("verse", e.target.value)}
            style={inputStyle}
          />
          <textarea
            placeholder="Sanskrit text"
            value={form.sanskrit}
            onChange={(e) => handleChange("sanskrit", e.target.value)}
            style={{ ...inputStyle, borderRadius: "12px", height: "80px" }}
          />
        </>
      )}

      {/* Quote fields */}
      {type === "quotes" && (
        <>
          <input
            placeholder="Philosopher name (e.g. Socrates)"
            value={form.philosopher}
            onChange={(e) => handleChange("philosopher", e.target.value)}
            style={inputStyle}
          />
          <textarea
            placeholder="Quote text"
            value={form.quote}
            onChange={(e) => handleChange("quote", e.target.value)}
            style={{ ...inputStyle, borderRadius: "12px", height: "80px" }}
          />
          <input
            placeholder="Category (e.g. wisdom)"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            style={inputStyle}
          />
        </>
      )}

      {/* Translations (common) */}
      <textarea
        placeholder="Hinglish translation"
        value={form.translations.hinglish}
        onChange={(e) => handleTranslation("hinglish", e.target.value)}
        style={{ ...inputStyle, borderRadius: "12px", height: "70px" }}
      />
      <textarea
        placeholder="English translation"
        value={form.translations.english}
        onChange={(e) => handleTranslation("english", e.target.value)}
        style={{ ...inputStyle, borderRadius: "12px", height: "70px" }}
      />

      {/* Buttons */}
      <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
        <button onClick={handleSubmit} style={editBtnStyle}>
          {isEdit ? "Update" : "Save"}
        </button>
        <button onClick={onCancel} style={deleteBtnStyle}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Shared Styles ───
const cardStyle = {
  background: "#1a1a2e",
  borderRadius: "12px",
  padding: "16px",
  marginBottom: "12px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "#fff",
  fontSize: "14px",
  marginBottom: "12px",
  outline: "none",
  boxSizing: "border-box",
};

const editBtnStyle = {
  padding: "8px 20px",
  borderRadius: "999px",
  border: "none",
  background: "linear-gradient(135deg, #833AB4, #E1306C)",
  color: "#fff",
  cursor: "pointer",
  fontSize: "13px",
};

const deleteBtnStyle = {
  padding: "8px 20px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "none",
  color: "#fff",
  cursor: "pointer",
  fontSize: "13px",
};
