// Shared auth helpers — work in both Node.js and Edge (Web Crypto).

export const SESSION_COOKIE = "latency_admin_session";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/** Derives the expected session token from the admin password. */
export async function deriveToken(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data    = encoder.encode("latency:admin:" + password);
  const hash    = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Returns true if the cookie value is a valid session token for the current password. */
export async function isValidSession(cookieValue: string | undefined): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || !cookieValue) return false;
  const expected = await deriveToken(password);
  return cookieValue === expected;
}
