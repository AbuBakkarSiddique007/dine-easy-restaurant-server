# DineEasy Restaurant

A full-stack restaurant management and food ordering web application. Built with React, Express, MongoDB, Stripe, and Firebase. Includes admin and user dashboards, menu management, cart, reviews, and secure payment integration.

---

## Features

- **User Dashboard**: Browse menu, add to cart, make reservations, view payment history, add reviews, and manage bookings.
- **Admin Dashboard**: Manage menu items, bookings, users, and view analytics.
- **Authentication**: Firebase-based login/register, protected routes, admin/user roles.
- **Payment Integration**: Secure payments via Stripe.
- **Responsive UI**: Built with Tailwind CSS and DaisyUI for modern, mobile-friendly design.
- **Reviews & Ratings**: Users can review and rate menu items.
- **Real-time Data**: Uses React Query for fast, up-to-date data fetching.

---
## 🚀 Live Demo

- **Client:** [https://dineeasyrestaurant.web.app](https://dineeasyrestaurant.web.app)
- **Server:** [https://dine-easy-restaurant-server.vercel.app](https://dine-easy-restaurant-server.vercel.app)

---

## Tech Stack

### Client
- React
- React Query
- Axios
- Firebase
- Stripe (react-stripe-js)
- Tailwind CSS

### Server
- Express
- MongoDB
- JWT


---

## Setup Instructions

### 1. Clone the Repositories

```bash
git clone https://github.com/AbuBakkarSiddique007/dine-easy-restaurant-client.git
git clone https://github.com/AbuBakkarSiddique007/dine-easy-restaurant-server.git
```

### 2. Server Setup

- Go to the server folder:
  ```bash
  cd dine-easy-restaurant-server
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Create a `.env` file with your MongoDB, JWT, and Stripe credentials:
  ```env
  DB_USER=your_mongodb_user
  DB_PASSWORD=your_mongodb_password
  ACCESS_TOKEN_SECRET=your_jwt_secret
  STRIPE_SECRET_KEY=your_stripe_secret_key
  PORT=5000
  ```
- Start the server:
  ```bash
  npm run dev
  ```

### 3. Client Setup

- Go to the client folder:
  ```bash
  cd dine-easy-restaurant-client
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Create a `.env.local` file with your Firebase and API credentials:
  ```env
  VITE_API_BASE_URL=https://your-server-url.com
  VITE_IMG_HOSTING_KEY=your_imgbb_key
  VITE_PAYMENT_GATEWAY_PK=your_stripe_publishable_key
  # Firebase keys...
  ```
- Start the client:
  ```bash
  npm run dev
  ```

---

## Stripe Payment Integration
- Stripe is used for secure payment processing.
- You need both secret and publishable keys in your server and client `.env` files.

---

## Folder Structure

- **Client**: React app in `dine-easy-restaurant-client/`
- **Server**: Express API in `dine-easy-restaurant-server/`

