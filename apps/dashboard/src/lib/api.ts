const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

interface RequestOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

async function request<T>(method: string, path: string, options: RequestOptions & { body?: unknown } = {}): Promise<T> {
  const url = new URL(path, BASE_URL);

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const token = typeof window !== "undefined" ? localStorage.getItem("tavvio-token") : null;

  const res = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (res.status === 401) {
    // TODO: Attempt token refresh, then redirect to login
    if (typeof window !== "undefined") {
      localStorage.removeItem("tavvio-token");
      window.location.href = "/login";
    }
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) => request<T>("GET", path, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>("POST", path, { ...options, body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>("PUT", path, { ...options, body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>("PATCH", path, { ...options, body }),
  delete: <T>(path: string, options?: RequestOptions) => request<T>("DELETE", path, options),
};
