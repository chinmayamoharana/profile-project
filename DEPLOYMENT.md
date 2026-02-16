# Deployment Guide

This guide will help you deploy your MERN Profile Project to make it live.

## Prerequisites
1.  **GitHub Account**: You need to push your code to a GitHub repository.
2.  **Vercel Account**: for Frontend deployment.
3.  **Render Account**: for Backend deployment.
4.  **MongoDB Atlas Account**: for the cloud database.

---

## 1️⃣ Database (MongoDB Atlas)

1.  Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a **New Cluster** (Free Tier).
3.  In **Database Access**, create a user (e.g., `admin`) and password.
4.  In **Network Access**, allow access from anywhere (`0.0.0.0/0`).
5.  Go to **Connect** -> **Drivers** -> Copy the connection string.
    - Replace `<password>` with your actual password.
    - Save this string; you'll need it for the Backend.

---

## 2️⃣ Backend (Render or Railway)

We will use **Render** (easiest for Node.js).

1.  Push your `profile-project` references to GitHub.
2.  Log in to [Render](https://render.com/).
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  **Root Directory**: `server` (Important!)
6.  **Build Command**: `npm install`
7.  **Start Command**: `node server.js`
8.  **Environment Variables**:
    - Add `MONGO_URI`: Paste your MongoDB Atlas connection string.
    - Add `PORT`: `5000` (or leave default, Render usually provides a PORT env).
9.  Click **Deploy**.
10. Copy the **Service URL** (e.g., `https://profile-project-api.onrender.com`).

---

## 3️⃣ Frontend (Vercel)

1.  Go to your local code `client/src/services/api.js`.
2.  Update the `baseURL` to your new Render Backend URL:
    ```javascript
    const api = axios.create({
      baseURL: 'https://profile-project-api.onrender.com/api', // YOUR RENDER URL
    });
    ```
    *(Tip: Use environment variables for this in a real pro setup, e.g., `import.meta.env.VITE_API_URL`)*
3.  Commit and Push the change to GitHub.
4.  Log in to [Vercel](https://vercel.com/).
5.  Click **Add New** -> **Project**.
6.  Import your GitHub repository.
7.  **Root Directory**: Edit and select `client`.
8.  **Build Command**: `npm run build` (Default).
9.  **Output Directory**: `dist` (Default).
10. Click **Deploy**.

---

## 4️⃣ Submission

Once deployed, you will have:
1.  **Live Link**: Your Vercel URL (e.g., `https://profile-project.vercel.app`).
2.  **Code Link**: Your GitHub Repository URL.
3.  **README**: Already created in your project folder!

Good luck! 🚀
