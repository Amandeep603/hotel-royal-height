# Architecture & Design Decisions (DECISIONS.md)

1. **Design System & Palette**:
   - Primary: Deep Navy `#23225C` for main CTAs, headers, and active nav states.
   - Accent: Soft Lavender `#EEF0FC` and `#6B6FEA` for badges, icon chips, and subtle glows.
   - Background: Light off-white `#F8F9FC` with radial gradients (`.bg-hotel-glow`) matching reference screenshot.
   - Cards: 16–24px border radius with fine borders (`rgba(226, 232, 240, 0.8)`) and soft depth shadows.

2. **Centralized Hotel Configuration**:
   - All hotel variables (name, address, phone, email, timings, rates, amenities) reside in `/client/src/config/hotel.ts`.
   - All image URLs reside in `/client/src/data/images.js`.
   - The hotel name dynamically falls back to `process.env.NEXT_PUBLIC_HOTEL_NAME || "Hotel Royal Heights"`.

3. **Concurrency & Double Booking Prevention**:
   - Availability calculation queries active bookings where `checkInDate < reqCheckOut` AND `checkOutDate > reqCheckIn` and status is NOT cancelled.
   - Bookings are verified before insert: if `bookedUnits + requestedRoomsCount > totalUnits`, API returns a 409 Conflict error with a user-friendly message.

4. **Payment Strategy**:
   - Razorpay test keys with feature flag (`RAZORPAY_ENABLED=false`).
   - "Pay at Hotel" supported out-of-the-box as reliable fallback.

5. **In-Memory / Local DB Fallback**:
   - Express server attempts MongoDB connection; if MongoDB is not locally running, it provides a resilient in-memory mock store so all frontend flows (browsing, filtering, booking, admin view) execute without crashing.
