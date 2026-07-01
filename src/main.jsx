import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import EditorPage from "./pages/EditorPage";
import PublicInvitationPage from "./pages/PublicInvitationPage";
import "./index.css";
import "./styles/templates/template-1.css";
import "./styles/templates/template-2.css";
// Tambah import file template baru di sini setiap kali ada template baru.

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editor/:invitationId"
            element={
              <ProtectedRoute>
                <EditorPage />
              </ProtectedRoute>
            }
          />

          {/* Halaman publik — TIDAK dibungkus ProtectedRoute, siapa saja bisa akses
              tanpa login. Akses sebenarnya tetap dibatasi oleh RLS Supabase
              (hanya invitation dengan status='published' yang bisa di-query). */}
          <Route path="/u/:slug" element={<PublicInvitationPage />} />

          {/* Default: arahkan ke dashboard (ProtectedRoute akan redirect ke /login kalau belum auth) */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
