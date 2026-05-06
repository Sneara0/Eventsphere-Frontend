# 🎟️ EventSphere — Full-Stack Event Management & Ticketing Platform

> A scalable and robust solution for organizing events, managing dynamic ticketing, and ensuring secure transactions.

---

## 📌 Problem Statement
Organizing events often involves complex challenges like managing real-time ticket availability, preventing coupon fraud, and ensuring secure payment processing. Small to medium event organizers need a centralized system that handles these technicalities seamlessly.

## 💡 Solution Overview
**EventSphere** addresses these issues by providing a unified dashboard for organizers and a smooth booking experience for attendees. Built with **Next.js** for performance and **Prisma/PostgreSQL** for data integrity, it features a custom logic for coupon validation and automated ticket generation.

## 🛠️ Tech Stack

| Category | Tools |
| :--- | :--- |
| **Frontend** | `Next.js` • `TypeScript` • `Tailwind CSS` • `Lucide React` |
| **Backend** | `Next.js API Routes` • `Prisma ORM` • `PostgreSQL` |
| **Payments** | `Stripe Integration` |
| **Deployment** | `Vercel` • `Neon Console` |

## ✨ Key Features
- **🎫 Dynamic Ticketing:** Real-time updates on ticket availability and types.
- **🏷️ Coupon System:** Intelligent coupon validation logic to prevent misuse.
- **💳 Secure Payments:** Integrated with Stripe for seamless and safe transactions.
- **📱 Responsive Dashboard:** Fully optimized for mobile, tablet, and desktop views.
- **🛡️ Role-Based Access:** Secure routes for event admins and customers.

## 📸 Project Preview
<p align="center">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/your-screenshot-link-here" width="90%" alt="EventSphere Preview" />
</p>

## ⚙️ Setup Instructions
## Installation ⚙️

Clone the repo and install dependencies:

```bash
git clone https://github.com/Sneara0/EventSphere-Frontend.git
cd EventSphere-Frontend
npm install

Set up environment variables by creating a .env file in the root directory:
DATABASE_URL=your_database_url
STRIPE_SECRET_KEY=your_stripe_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_public_key

