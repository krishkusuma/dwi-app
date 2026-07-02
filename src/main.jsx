import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import EditorPage from "./pages/EditorPage";
import PublicInvitationPage from "./pages/PublicInvitationPage";
import RegisterPage from "./pages/RegisterPage";
import PaymentResultPage from "./pages/PaymentResultPage";
import GuestManagementPage from "./pages/GuestManagementPage";
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
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/payment/success" element={<PaymentResultPage status="success" />} />
          <Route path="/payment/pending" element={<PaymentResultPage status="pending" />} />
          <Route path="/payment/failed" element={<PaymentResultPage status="failed" />} />

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

          <Route
            path="/dashboard/:invitationId/guests"
            element={
              <ProtectedRoute>
                <GuestManagementPage />
              </ProtectedRoute>
            }
          />          

          <Route path="/u/:slug" element={<PublicInvitationPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
