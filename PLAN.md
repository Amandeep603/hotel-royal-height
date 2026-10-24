# Implementation Plan (PLAN.md) — Hotel Royal Heights Rishikesh

## Architecture
- **Monorepo**: Root `package.json` with npm workspaces (`client`, `server`) and `concurrently` for running dev servers simultaneously.
- **Frontend**: Next.js 16+ App Router, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion, Radix UI primitives.
- **Backend**: Node.js + Express REST API (ES modules), MongoDB + Mongoose, JWT in httpOnly cookies, bcryptjs, Helmet, CORS, Rate Limiting, Nodemailer, PDFKit for invoice generation.
- **Payments**: Razorpay test mode behind feature flag (`RAZORPAY_ENABLED=false` fallback to "Pay at Hotel").
- **Configuration**:
  - `/client/src/config/hotel.ts`: Central hotel profile, contact details, policies, room types, pricing defaults, amenities. Reads `NEXT_PUBLIC_HOTEL_NAME`.
  - `/client/src/data/images.js`: Centralized image repository with remote patterns ready for Google image links / Cloudinary.

## Database Schemas (Mongoose)
1. **User**: `name`, `email` (unique), `phone`, `passwordHash`, `role` (`guest` | `admin`), `wishlist` (`[Room]`), `timestamps`.
2. **Room**: `title`, `slug` (unique), `roomType`, `basePrice`, `discountPrice`, `taxesAndFeesPercentage`, `capacity` (`adults`, `children`), `bedType`, `roomSizeSqFt`, `view`, `totalUnits`, `amenities`, `images`, `featured`, `cancellationPolicy`, `ratingAverage`, `ratingQuantity`.
3. **Booking**: `bookingNumber` (unique), `user`, `guestDetails`, `room`, `checkInDate`, `checkOutDate`, `nights`, `roomsCount`, `guests`, `priceBreakdown` (`roomRate`, `baseTotal`, `discount`, `tax`, `grandTotal`), `couponApplied`, `bookingStatus` (`pending`, `confirmed`, `checked-in`, `checked-out`, `cancelled`), `paymentMethod` (`razorpay`, `pay_at_hotel`), `paymentStatus` (`pending`, `paid`, `failed`, `refunded`), `paymentDetails`, `invoiceUrl`.
   - **Double-Booking Prevention**: Concurrency lock via aggregate overlap query: counts active bookings (`checkInDate < reqCheckOut && checkOutDate > reqCheckIn`) plus blocked dates; requires `totalBooked + reqRooms <= totalUnits`.
4. **Review**: `room`, `user`, `authorName`, `rating` (1-5), `title`, `comment`, `travelerType`, `isApproved`.
5. **Coupon**: `code`, `discountType`, `discountValue`, `minBookingAmount`, `validTill`, `usageLimit`, `timesUsed`, `isActive`.
6. **Enquiry**: `name`, `email`, `phone`, `dates`, `subject`, `message`, `status`.
7. **BlockedDate**: `room` (optional), `startDate`, `endDate`, `reason`.
8. **BlogPost**: `title`, `slug`, `content`, `excerpt`, `coverImage`, `author`, `tags`, `isPublished`.
9. **Settings**: `hotelName`, `tagline`, `contactPhone`, `contactEmail`, `address`, `googleMapsEmbedUrl`, `checkInTime`, `checkOutTime`, `cancellationPolicyText`, `razorpayEnabled`.

## Route Map

### Frontend Routes (`/client/src/app`)
- `/` — Homepage with Hero, Floating Search, Feature Strip, Why Us, Featured Rooms, Amenities, Sights, Testimonials, FAQ, Footer.
- `/rooms` — Rooms catalog with filters (type, price, view, capacity), sorting, date check.
- `/rooms/[slug]` — Detailed room page with lightbox gallery, amenities, sticky reservation card, pricing breakdown, reviews.
- `/hotel` — OTA-style single page overview (about, amenities, house rules/policies, Google Maps location, FAQ).
- `/booking` — Checkout flow (guest info, coupon code, price summary, payment method: Razorpay / Pay at Hotel).
- `/booking/confirmation/[id]` — Booking confirmation with booking number, receipt summary, PDF download button.
- `/gallery` — Full visual gallery with category filters (Rooms, Dining, Nature, Property).
- `/about` — Heritage, team, spiritual philosophy of Rishikesh.
- `/contact` — Inquiry form (persists to DB & emails admin), contact cards, map.
- `/auth/login` & `/auth/register` — Guest / Admin authentication.
- `/dashboard` — User dashboard: My Bookings, Cancellation, Wishlist, Profile.
- `/admin` — Protected Admin portal (Stats, Room CRUD, Bookings manager, Date blocking, Coupons, Enquiries, Settings).

### Backend REST API (`/api/v1`)
- `/auth`: `POST /register`, `POST /login`, `POST /logout`, `GET /me`
- `/rooms`: `GET /`, `GET /:slug`
- `/availability`: `GET /check`
- `/bookings`: `POST /`, `GET /:id`, `POST /:id/cancel`, `GET /:id/invoice`
- `/payments`: `POST /create-order`, `POST /verify`
- `/reviews`: `GET /room/:roomId`, `POST /`
- `/coupons`: `POST /validate`
- `/enquiries`: `POST /`
- `/admin/*`: Stats, Rooms CRUD, Bookings status, Blocked Dates, Coupons, Settings

## Phases Breakdown
- Phase 0: Plan & Architecture (PLAN.md, DECISIONS.md, PENDING_INPUTS.md, PROGRESS.md)
- Phase 1: Client Setup, Design System, Navbar, Footer, Homepage
- Phase 2: Express Backend, Models, Seed Data, Auth & Availability API
- Phase 3: Rooms Catalog, Details Page, Booking Flow & Confirmation
- Phase 4: Payments (Razorpay + Pay at Hotel), User Dashboard, Reviews
- Phase 5: Admin Panel (KPIs, Room Manager, Bookings, Calendar Blocker, Coupons)
- Phase 6: Remaining Pages (Hotel OTA, Gallery, About, Contact, Policies), SEO & Schema Markup
- Phase 7: Final Verification, Monorepo Scripts, Production Deployment Guide
