# Pending User Inputs (PENDING_INPUTS.md)

The project is pre-configured with clean placeholders that can be updated in `/client/src/config/hotel.ts` and `/client/src/data/images.js`:

1. **Hotel Information** (in `/client/src/config/hotel.ts`):
   - [ ] Real official phone number (placeholder: `+91 98765 43210`)
   - [ ] Real reservation email (placeholder: `reservations@hotelroyalheights.com`)
   - [ ] Exact street address (placeholder: `Badrinath Road, Tapovan, Rishikesh, Uttarakhand 249192`)
   - [ ] Official Google Maps Embed URL or Coordinates

2. **Media & Images** (in `/client/src/data/images.js`):
   - [ ] Hotel exterior & lobby photos
   - [ ] Specific room photos for each category
   - [ ] Property logo SVG / PNG

3. **Payment Gateway Credentials** (in `.env` / `server/.env`):
   - [ ] `RAZORPAY_KEY_ID` (currently set to test placeholder)
   - [ ] `RAZORPAY_KEY_SECRET` (currently set to test placeholder)
   - [ ] Set `RAZORPAY_ENABLED=true` when ready to activate live or test Razorpay orders

4. **Production Database & SMTP** (in `server/.env`):
   - [ ] MongoDB Atlas connection string (`MONGODB_URI`)
   - [ ] SMTP credentials for transactional booking confirmation emails
