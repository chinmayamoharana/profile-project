const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const profileRoutes = require('./routes/profileRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ===========================
   CORS CONFIGURATION
   =========================== */

const allowedOrigins = [
    "http://localhost:5173",
    "https://profile-project-rosy.vercel.app"
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            if (
                allowedOrigins.includes(origin) ||
                origin.endsWith(".vercel.app")
            ) {
                return callback(null, true);
            } else {
                return callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true
    })
);


/* ===========================
   MIDDLEWARE
   =========================== */

app.use(express.json());

/* ===========================
   ROUTES
   =========================== */

app.get("/", (req, res) => {
    res.send("API Running...");
});

app.use('/api', profileRoutes);

/* ===========================
   DATABASE CONNECTION
   =========================== */

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB Error:", err));

/* ===========================
   START SERVER
   =========================== */

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
