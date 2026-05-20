import { useState, useCallback, useEffect } from "react";
import { setAuthTokenGetter } from "@workspace/api-client-react";

const SESSION_KEY = "ngr_admin_token";

/**
 * Manages admin authentication state for the dashboard.
 *
 * Token lifecycle:
 *  - On mount, reads any existing token from sessionStorage and registers it
 *    with the API client so all React Query hooks automatically send it.
 *  - login() POSTs credentials to /api/admin/login and stores the returned
 *    token in sessionStorage.
 *  - logout() clears sessionStorage and unregisters the token getter.
 *  - sessionStorage (not localStorage) is intentional: the token is cleared
 *    when the browser tab closes, reducing the session window for a stolen token.
 */
export function useAdminAuth() {
  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem(SESSION_KEY),
  );

  // Register the token getter with the shared API client so every generated
  // React Query hook automatically includes the Authorization header.
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    setAuthTokenGetter(() => sessionStorage.getItem(SESSION_KEY));
    if (stored) setToken(stored);

    return () => {
      setAuthTokenGetter(null);
    };
  }, []);

  const login = useCallback(async (password: string): Promise<void> => {
    const basePath = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
    const res = await fetch(`${basePath}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const message =
        res.status === 429
          ? "Too many login attempts. Please wait 15 minutes."
          : (data as { error?: string }).error ?? "Login failed. Please try again.";
      throw new Error(message);
    }

    const { token: newToken } = (await res.json()) as { token: string };

    sessionStorage.setItem(SESSION_KEY, newToken);
    setToken(newToken);
    // Update the getter immediately so in-flight queries pick up the token.
    setAuthTokenGetter(() => newToken);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setToken(null);
    setAuthTokenGetter(null);
  }, []);

  return {
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };
}
