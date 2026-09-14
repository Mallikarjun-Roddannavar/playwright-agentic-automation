import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import { FilesPage } from "./pages/FilesPage";
import { FoldersPage } from "./pages/FoldersPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { OAuthCallbackPage } from "./pages/OAuthCallbackPage";
import { PreferencesPage } from "./pages/PreferencesPage";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { user } = useAuth();

  return (
    <>
      <div className="app-bg-orbs" aria-hidden="true">
        <span className="app-bg-orb" />
        <span className="app-bg-orb" />
        <span className="app-bg-orb" />
        <span className="app-bg-orb" />
      </div>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route path="/oauth/callback" element={<OAuthCallbackPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/folders"
          element={
            <PrivateRoute>
              <FoldersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/folders/:folderId"
          element={
            <PrivateRoute>
              <FilesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/preferences"
          element={
            <PrivateRoute>
              <PreferencesPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
      </Routes>
    </>
  );
}
