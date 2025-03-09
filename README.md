This is a Car Auction application created with Next js

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Features
a. User Roles:
Buyers: Can browse cars, place bids, track the auction process, and complete purchases.
Sellers: Can upload car details and set starting bids.
Admins: Manage the platform, approve car listings, and monitor transactions.
b. Buyer Features:
User Registration/Login (OAuth or Email/Password).
Browse/Search/Filter Cars.
Place Bids on Cars.
Real-time Auction Updates.
Track Auction Progress.
Payment Processing.
Notifications (Email/SMS/Push) for bid updates and auction outcomes.
c. Seller Features:
Car Listing Upload (with images, descriptions, starting price).
Track Auction Results.
Manage Listings (Edit/Delete).
Payments for sold cars.
d. Admin Features:
Dashboard for managing users, auctions, and reports.
Approve/Reject Car Listings.
Monitor Platform Activity.
Manage disputes.
e. API Integration:
Handle car uploads (images, specs, pricing).
Payment Gateway (Stripe, Paystack, or Flutterwave).
Notification System API (e.g., Twilio for SMS or SendGrid for emails).
Auction Updates (WebSocket for real-time data).
f. Auction Tracking:
Timeline for buyers to track the progress from winning a bid to car delivery.
Statuses: “Bidding”, “Won”, “Payment Pending”, “In Transit”, “Delivered”.

## Tech Stack

Frontend: Next.js, Tailwind CSS.
Backend: Next.js API Routes or Node.js/Express.
Database: Firebase.
API Integration: REST/GraphQL for communication with external services.
Real-time: WebSockets, Pusher, or Firebase.
Authentication: Firebase Auth.
Payments: Stripe, Paystack, or Flutterwave.
Hosting: Vercel for frontend, Railway or AWS for backend.
