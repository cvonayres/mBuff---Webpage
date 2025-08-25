// src/services/robotApi.ts
type HttpMethod = "GET" | "POST";

function resolveApiBase(): string {
  // 1) Prefer build-time Vite var if present
  const viteVar =
    // @ts-expect-error Vite injects this in prod builds
    (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_ROBOT_API_URL)
      ? import.meta.env.VITE_ROBOT_API_URL as string
      : undefined;

  // 2) Allow a runtime override (handy for debugging)
  // e.g., window.ROBOT_API="http://172.16.68.73:5001"
  // @ts-expect-error window global
  const runtimeVar: string | undefined = typeof window !== "undefined" ? window.ROBOT_API : undefined;

  // 3) Fallback to same host, port 5001
  const inferred =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.hostname}:5001`
      : "http://localhost:5001";

  return (viteVar || runtimeVar || inferred).replace(/\/+$/, ""); // trim trailing slashes
}

const API_BASE = resolveApiBase();

async function makeRequest<T = unknown>(path: string, method: HttpMethod = "GET", body?: any): Promise<T> {
  const url = `${API_BASE}${path}`;
  const opts: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}: ${text}`);
  }
  // try json, allow empty body
  try {
    return (await res.json()) as T;
  } catch {
    return undefined as unknown as T;
  }
}

// Public API
export const robotApi = {
  getStatus: () => makeRequest("/api/status"),
  moveForward: () => makeRequest("/api/move/forward", "POST"),
  moveBackward: () => makeRequest("/api/move/backward", "POST"),
  moveLeft: () => makeRequest("/api/move/left", "POST"),
  moveRight: () => makeRequest("/api/move/right", "POST"),
  stop: () => makeRequest("/api/move/stop", "POST"),
};
