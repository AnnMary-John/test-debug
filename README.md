# Vendor Hub & Fleet Management System

A comprehensive platform for managing vehicle vendors, their fleets, and applications. This project consists of a NestJS backend and two React-based frontend portals.

## 🏗️ Architecture

- **Backend**: NestJS + TypeORM + MySQL
- **Ops Portal (frontend)**: React + Vite + Tailwind CSS (for internal operations)
- **Vendor Portal (vendor-portal)**: React + Vite + Tailwind CSS (for vendors to manage their fleet)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MySQL Database
- npm or yarn

### 1. Database Setup

Create a MySQL database named `myapp` (or your preferred name) and import the schema/data:

```bash
mysql -u root -p myapp < vendor_hub_dump.sql
```

### 2. Backend Configuration

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory (see [.env.example](backend/.env.example)):

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=myapp
JWT_SECRET=your_jwt_secret(can be anything)
PORT=3000
```

Run the backend:

```bash
npm run start:dev
```

### 3. Frontend Configuration

#### Ops Portal

```bash
cd frontend
npm install
npm run dev
```

#### Vendor Portal

```bash
cd vendor-portal
npm install
npm run dev
```

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Port the backend runs on | `3000` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `3306` |
| `DB_USERNAME` | Database username | `root` |
| `DB_PASSWORD` | Database password | - |
| `DB_DATABASE` | Database name | `myapp` |
| `JWT_SECRET` | Secret key for JWT signing | - |

### Frontend (`frontend/.env` / `vendor-portal/.env`)

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base URL for the backend API | `http://localhost:3000` |

## 🛠️ Tech Stack

- **Backend**: [NestJS](https://nestjs.com/)
- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **UI Components**: [Lucide React](https://lucide.dev/) (Icons)
- **Styling**: Tailwind CSS
- **Database**: MySQL / MariaDB

---
&copy; 2026 Fleet Management Systems
