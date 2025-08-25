// src/services/robotApi.ts
type HttpMethod = "GET" | "POST";

function resolveApiBase(): string {
  // Prefer build-time Vite var
  // @ts-expect-error Vite injects this in prod builds
  const viteVar: string | undefined =
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    (import.meta.env as any).VITE_ROBOT_API_URL;

  // Allow runtime override for quick testing: window.ROBOT_API = "http://<IP>:5001"
  // @ts-ignore
  const runtimeVar: string | undefined = typeof window !== "undefined" ? window.ROBOT_API : undefined;

  // Fallback: same host, port 5001
  const inferred =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.hostname}:5001`
      : "http://localhost:5001";

  return (viteVar || runtimeVar || inferred).replace(/\/+$/, "");
}

const API_BASE = resolveApiBase();

async function makeRequest<T = unknown>(path: string, method: HttpMethod = "GET", body?: any): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}: ${text}`);
  }
  try { return (await res.json()) as T; } catch { return undefined as unknown as T; }
}

// New-style helpers
export const robotApi = {
  base: API_BASE,
  getStatus: () => makeRequest("/api/status"),
  moveForward: () => makeRequest("/api/move/forward", "POST"),
  moveBackward: () => makeRequest("/api/move/backward", "POST"),
  moveLeft: () => makeRequest("/api/move/left", "POST"),
  moveRight: () => makeRequest("/api/move/right", "POST"),
  stop: () => makeRequest("/api/move/stop", "POST"),

  // Keep generic + legacy helpers so older components don’t crash:
  makeRequest,
  getCameraFeedUrl: () => `${API_BASE}/api/camera/feed`,
};

// Keep default export for legacy imports: `import api from ...`
export default robotApi;
