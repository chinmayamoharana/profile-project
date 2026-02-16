# MERN Profile Project

A full-stack profile page application built with the MERN stack (MongoDB, Express, React, Node.js).
Replicating the Gidy.ai profile UI with innovative features.

## 🚀 Features

- **Profile Management**: View and edit profile details (Name, Bio, Social Links).
- **Skill Endorsements**: Interactive "Heart" button to endorse skills in real-time.
- **Dark Mode**: Persistent theme toggle (Light/Dark).
- **Responsive Design**: Fully responsive UI using Tailwind CSS.
- **REST API**: robust backend architecture.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Axios, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)

## 📂 Project Structure

```
profile-project/
├── client/           # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── tailwind.config.js
└── server/           # Node/Express Backend
    ├── models/
    ├── routes/
    ├── controllers/
    └── server.js
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on port 27017

### 1. Clone & Install
```bash
git clone <repo_url>
cd profile-project
```

### 2. Backend Setup
```bash
cd server
npm install
# Create .env file with:
# MONGO_URI=mongodb://localhost:27017/profile-project
# PORT=5000
npm start
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

## ✨ Innovation Features

1.  **Skill Endorsement System**: A gamified way to valid skills. Clicking the heart icon instantly updates the endorsement count, backed by the database.
2.  **Dark Mode**: A sleek dark theme that adheres to system preferences and persists across sessions.
3.  **Experience Timeline**: An animated vertical timeline showcasing work history.

## 📝 API Endpoints

- `GET /api/profile` - Fetch profile
- `PUT /api/profile` - Update profile
- `POST /api/skills/:name/endorse` - Endorse a skill
- `PUT /api/theme` - Update theme preference

---
Built for the Profile Project Assessment.
