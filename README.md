# Bhagavad Gita Cards 🕉️

A full-stack MERN application that presents Bhagavad Gita shlokas and philosopher quotes as beautiful, swipeable cards — inspired by Tinder-style card stacks. Explore timeless wisdom from Krishna and history's greatest philosophers, one swipe at a time.

## ✨ Features

- **Swipeable Card Stack** — Browse shlokas and quotes with intuitive drag/swipe gestures (mouse + touch support)
- **Philosopher Grid** — Explore 40+ philosophers including Krishna, Socrates, Plato, Nietzsche, Confucius, and more
- **Bilingual Support** — Toggle between Hinglish and English translations
- **Text-to-Speech** — Listen to Sanskrit shlokas and quotes read aloud
- **Favorites** — Save favorite shlokas/quotes per philosopher (persisted in localStorage)
- **Global Search** — Search across all shlokas and philosopher quotes at once
- **Admin Panel** — Secure, JWT-authenticated dashboard to add/edit/delete shlokas and quotes
- **Fully Responsive** — Optimized layouts for mobile, tablet, and desktop

## 🛠️ Tech Stack

**Frontend**
- React + Vite
- React Router v6
- Inline CSS-in-JS styling
- Web Speech API (text-to-speech)

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JWT authentication
- bcryptjs (password hashing)
- CORS

## 📂 Project Structure

```
bhagavad-gita-cards/
├── src/
│   ├── components/        # ShlokaCard, CardStack, WisdomWall, etc.
│   ├── pages/              # AdminLogin, AdminDashboard
│   ├── api/                 # API call functions
│   ├── hooks/               # useScreenSize (responsive hook)
│   ├── layout/              # PageLayout, AdSlot
│   └── App.jsx
├── backend/
│   ├── src/
│   │   ├── models/         # Shloka, Quote, Admin schemas
│   │   ├── controllers/    # Admin auth logic
│   │   ├── middleware/     # JWT auth protection
│   │   ├── routes/         # API routes
│   │   └── app.js
│   └── server.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally or a MongoDB Atlas URI

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

Run the backend:
```bash
npm run dev
```

### Frontend Setup
```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to view the app.

## 🔐 Admin Panel

Access the admin panel at `/admin/login` to manage shlokas and philosopher quotes.

> Admin registration is disabled after initial setup for security. Create your admin account once via the `/api/admin/register` endpoint, then disable that route.

## 📱 Routes

| Route | Description |
|-------|-------------|
| `/` | Philosopher grid (homepage) |
| `/shlokas` | Krishna's Bhagavad Gita shlokas |
| `/philosopher/:name` | Quotes for a specific philosopher |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Admin dashboard (protected) |

## 🎯 Roadmap

- [ ] Daily shloka/quote feature
- [ ] Share card as image
- [ ] User accounts with synced favorites
- [ ] Multi-language support (Kannada)
- [ ] Category-based filtering

## 👤 Author

Built by Basavaraj Annigeri

## 📄 License

This project is open source and available for personal and educational use.
