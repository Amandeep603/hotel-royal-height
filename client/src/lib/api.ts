// Frontend API Client communicating with Express REST Backend

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function fetchRooms(params: Record<string, string | number | undefined> = {}) {
  try {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== "") searchParams.append(key, String(val));
    });

    const res = await fetch(`${API_BASE}/rooms?${searchParams.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch rooms");
    return await res.json();
  } catch (error) {
    console.warn("[API Client] Fallback to local config data", error);
    return { success: true, rooms: [] };
  }
}

export async function fetchRoomBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/rooms/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Room not found");
    return await res.json();
  } catch (error) {
    console.warn("[API Client] Fetch room error", error);
    return { success: false, room: null };
  }
}

export async function checkAvailability(checkIn: string, checkOut: string, adults = 2) {
  try {
    const res = await fetch(
      `${API_BASE}/availability/check?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}&adults=${adults}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Could not check availability");
    return await res.json();
  } catch (error) {
    return { success: false, availability: [] };
  }
}

export async function validateCoupon(code: string, amount: number) {
  const res = await fetch(`${API_BASE}/coupons/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, amount }),
  });
  return await res.json();
}

export async function createBooking(payload: any) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await res.json();
}

export async function fetchBookingById(id: string) {
  const res = await fetch(`${API_BASE}/bookings/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Booking not found");
  return await res.json();
}

export async function cancelBooking(id: string) {
  const res = await fetch(`${API_BASE}/bookings/${id}/cancel`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
}

export async function submitEnquiry(payload: any) {
  const res = await fetch(`${API_BASE}/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await res.json();
}
