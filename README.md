# VentureConnect — Multi-Role Startup & Investor Platform

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-emerald.svg)](https://www.mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-v4-black.svg)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3-cyan.svg)](https://tailwindcss.com/)

VentureConnect is an enterprise fundraising, mentorship, and acceleration platform built on the MERN stack with a decoupled **Repository Pattern** backend architecture.

---

## Key Features

- **7 Role-Based Ecosystem**: Workspaces for Founder, Investor, Mentor, Super Admin, Team Member, Incubator Manager, and Legal Advisor.
- **Weighted Matching Engine**: Multi-factor matching scoring Industry (30%), Funding (25%), Stage (20%), Location (15%), and Risk Profile (10%).
- **AI Intelligence Suite**: Automated SWOT Analysis, risk score metrics, and pitch deck readiness scores.
- **Real-Time Infrastructure**: WebSockets (Socket.IO) powering 1-on-1 messaging, typing indicators, user online status, and push notification bell.
- **Fundraising CRM**: 5-stage Kanban deal tracking (`Contacted → Meeting Scheduled → Interested → Due Diligence → Funded`).
- **Community Social Platform**: LinkedIn-style feed with post creation, likes, comments, and user follow actions.

---

## Tech Stack & Architecture

### Backend Layering
```text
Route → Auth Middleware → Request Validator → Controller → Service → Repository → MongoDB
```

- **Runtime**: Node.js & Express
- **Database**: MongoDB & Mongoose (18 Collections)
- **Real-Time**: Socket.IO
- **Validation & Auth**: JWT & Custom Middleware
- **Storage**: Cloudinary & Multer

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS & Lucide Icons
- **State Management**: Zustand
- **Charts**: Recharts
- **Router**: React Router v6

---

## Quick Start

### 1. Prerequisites
- Node.js (v18 or higher)
- MongoDB instance (local or MongoDB Atlas)

### 2. Environment Setup

Create `.env` file inside `server`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ventureconnect
JWT_SECRET=ventureconnect_secret_key_2026
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Installation & Database Seed

```bash
# Install Server Dependencies
cd server
npm install

# Seed Database with 35+ Records (Startups, Investors, Mentors, Deals)
npm run seed

# Start Backend API Server
npm run dev
```

In a new terminal window:

```bash
# Install Client Dependencies
cd client
npm install

# Start Frontend Dev Server
npm run dev
```

App will run locally at: `http://localhost:5173`

---

## Demo Test Accounts

| Role | Email | Password |
|------|-------|----------|
| **Super Admin** | `admin@ventureconnect.com` | `password123` |
| **Founder** | `aarav@nexusai.io` | `password123` |
| **Investor** | `rahul@venturecap.com` | `password123` |
| **Mentor** | `vikram@growthmentors.com` | `password123` |

---

