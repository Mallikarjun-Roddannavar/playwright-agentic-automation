import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export function OAuthCallbackPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    if (!code || !state) {
      setError("Missing OAuth callback parameters");
      return;
    }

    api
      .exchangeOAuthCode(code, state)
      .then((user) => {
        login(user);
        toast.success("OAuth login successful");
        navigate("/");
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "OAuth callback failed";
        setError(message);
        toast.error(message);
      });
  }, [login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="app-card w-full max-w-md p-6" data-testid="oauth-callback-card">
        <h1 className="text-xl font-semibold">OAuth Sign-In</h1>
        {error ? (
          <p className="mt-3 text-sm text-red-600" data-testid="oauth-callback-error">
            {error}
          </p>
        ) : (
          <p className="text-muted mt-3 text-sm" data-testid="oauth-callback-loading">
            Completing OAuth login...
          </p>
        )}
      </div>
    </div>
  );
}
