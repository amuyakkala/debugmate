import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { AuthProvider } from "./lib/auth";
import ProtectedRoute from "./components/protected-route";

// Lazy load components
const Login = lazy(() => import("./components/auth/login"));
const DashboardLayout = lazy(() => import("./components/dashboard/layout"));
const DashboardHome = lazy(
  () => import("./components/dashboard/dashboard-home"),
);
const Timeline = lazy(() => import("./components/dashboard/timeline"));
const UploadLogs = lazy(() => import("./components/dashboard/upload-logs"));
const Chat = lazy(() => import("./components/dashboard/chat"));
const Integrations = lazy(() => import("./components/dashboard/integrations"));

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        }
      >
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardHome />} />
                <Route path="/dashboard/timeline" element={<Timeline />} />
                <Route path="/dashboard/upload" element={<UploadLogs />} />
                <Route path="/dashboard/chat" element={<Chat />} />
                <Route
                  path="/dashboard/integrations"
                  element={<Integrations />}
                />
              </Route>
            </Route>
            {/* Allow Tempo routes */}
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
