import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const user = await api.login(username, password);
      login(user);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function onOAuthLogin() {
    setOauthLoading(true);
    setError("");
    try {
      const authorizationUrl = await api.getOAuthAuthorizationUrl();
      window.location.href = authorizationUrl;
    } catch (err) {
      const message = err instanceof Error ? err.message : "OAuth login failed";
      setError(message);
      toast.error(message);
      setOauthLoading(false);
    }
  }

  return (
    <div className="app-login-shell">
      <div className="app-login-grid">
        <section className="app-card app-login-intro">
          <p className="app-kicker">Welcome</p>
          <h1 className="mt-3 text-3xl font-semibold">Playwright Practice App</h1>
          <p className="text-muted mt-3 text-sm">
            Sign in to access the file-management workspace and validate realistic UI and API flows.
          </p>

          <div className="app-preview-tile mt-6">
            <p className="text-sm font-medium">Sign-in guidance</p>
            <div className="app-login-checklist mt-4 text-sm text-muted">
              <div className="app-login-checklist-item">
                Use one of the demo role accounts below
              </div>
              <div className="app-login-checklist-item">Choose username/password or OAuth</div>
              <div className="app-login-checklist-item">
                After sign-in, the full workspace overview is available on home
              </div>
            </div>
          </div>
        </section>

        <form
          className="app-workspace app-login-form-panel w-full"
          onSubmit={onSubmit}
          data-testid="login-form"
        >
          <p className="app-kicker">Sign in</p>
          <h2 className="mt-3 text-2xl font-semibold">Access your workspace</h2>
          <p className="text-muted mt-2 text-sm" data-testid="login-hint">
            Roles: admin/admin123, editor/editor123, viewer/viewer123
          </p>
          <div className="mt-5">
            <label htmlFor="login-username" className="block text-sm font-medium">
              Username
            </label>
            <input
              id="login-username"
              name="username"
              autoComplete="username"
              required
              className="app-input mt-1"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              data-testid="login-username"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="login-password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="app-input mt-1"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              data-testid="login-password"
            />
          </div>
          {error && (
            <p className="app-alert app-alert-danger mt-4 text-sm" data-testid="login-error">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="btn-primary mt-5 w-full py-3 disabled:opacity-60"
            disabled={loading}
            data-testid="login-submit"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
          <button
            type="button"
            className="btn-secondary mt-3 w-full py-3 disabled:opacity-60"
            disabled={oauthLoading}
            onClick={onOAuthLogin}
            data-testid="oauth-login-btn"
          >
            {oauthLoading ? "Redirecting..." : "Login with OAuth"}
          </button>
        </form>
      </div>
    </div>
  );
}
