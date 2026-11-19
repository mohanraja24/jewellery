# AURELIA JEWELLERS — Premium Multi-Category Jewellery E-Commerce Platform

A production-grade, full-stack MERN (MongoDB, Express, React, Node.js) luxury jewellery e-commerce platform built for an existing jewellery house, featuring an **Authoritative Live Gold & Silver Rate-Based Dynamic Pricing Engine**.

---

## 💎 Key Highlights & Architectural Features

1. **Live Bullion Benchmark Pricing Engine**:
   - Computes retail prices dynamically using live per-gram rates for **Gold (24K, 22K, 18K, 14K)**, **Silver (999, 925)**, and **Platinum (950)**.
   - Purity-based formula:
     $$\text{Metal Value} = \text{Net Metal Weight (g)} \times \text{Applicable Purity Rate (₹/g)}$$
     $$\text{Final Price} = \text{Metal Value} + \text{Making Charges} + \text{Wastage} + \text{Stone Value} + 3\% \text{ GST}$$
   - **Decimal-Safe Calculations**: All internal monetary calculations in the backend are conducted in integer **Paise** to prevent IEEE 754 floating-point rounding errors.
   - **15-Minute Price Quote Lock**: Locks live rates during checkout to prevent intraday bullion fluctuations from disrupting patron orders.

2. **Luxury Brand Design System**:
   - Custom palette: Deep Burgundy (`#5A1825`), Champagne Gold (`#C6A15B`), Warm Ivory (`#FAF7F0`), Charcoal (`#252525`), and Border Luxury (`#E8E1D7`).
   - Typography: **Playfair Display** (Headings) + **Inter** (Body).
   - Micro-interactions, bullion ticker, BIS Hallmarked assurance, and IGI diamond certified badges.

3. **Complete Dual Panels**:
   - **Customer Portal**: Catalog with live metal recalculation, smart filters, transparent price breakdown, bespoke shopping bag with quote lock timer, wishlist, customer account, order tracking, and invoice download.
   - **Admin Management Portal**: Real-time bullion board overrides with audit logging, product catalog CRUD, business migration & brand settings editor, CSV product & stock import template.

---

## 🛠️ Required API Credentials & Setup Guide

To connect live production services, provide the following credentials in `backend/.env`:

| Service | Purpose | Where to Obtain |
| :--- | :--- | :--- |
| **MongoDB Atlas** | Cloud NoSQL Database | Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), create a cluster, and copy the Connection String (`MONGODB_URI`). |
| **GoldAPI.io** | Live Gold & Silver Bullion Rates | Get a free API key at [GoldAPI.io](https://www.goldapi.io/) (`GOLDAPI_KEY`). Defaults to verified Indian Bullion & Jewellers Association (IBJA) benchmark if omitted. |
| **Razorpay** | Online Payment Gateway (UPI, Cards, NetBanking) | Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/) and generate Test API Keys (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`). |
| **Cloudinary** | High-Res Product & Banner CDN | Create a free account at [Cloudinary Console](https://cloudinary.com/console) (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`). |
| **Nodemailer / SMTP** | Transactional Order & Rate Emails | Use your Gmail App Password or SendGrid credentials (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`). |

---

## 🚀 Running the Platform Locally

### 1. Run the Frontend (React + Vite + Tailwind)
```bash
cd frontend
npm install
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 2. Run the Backend API (Node.js + Express)
```bash
cd backend
npm install
npm run dev # or npm start
```
The backend API starts on **[http://localhost:5000](http://localhost:5000)**.
Health check endpoint: `http://localhost:5000/api/health`
Live rates endpoint: `http://localhost:5000/api/rates/current`
