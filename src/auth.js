export function generateMockToken(role, ttlMs = 60 * 60 * 1000) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({ role, exp: Date.now() + ttlMs }));
  const signature = btoa("mock-signature");
  return `${header}.${payload}.${signature}`;
}

export function saveToken(token) {
  localStorage.setItem("mf_token", token);
}

export function getToken() {
  return localStorage.getItem("mf_token");
}

export function clearToken() {
  localStorage.removeItem("mf_token");
}

export function parseToken(token) {
  try {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (e) {
    console.error("Failed to parse token", e);
    return null;
  }
}

export function isTokenValid(token) {
  const p = parseToken(token);
  return !!p && p.exp && p.exp > Date.now();
}
