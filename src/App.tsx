import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import MapPage from "@/pages/MapPage";
import IncidentsPage from "@/pages/IncidentsPage";
import StaffPage from "@/pages/StaffPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import { AnimatePresence } from "framer-motion";
import { useCrisisStore } from "@/lib/store";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useCrisisStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/map" 
            element={
              <ProtectedRoute>
                <MapPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/incidents" 
            element={
              <ProtectedRoute>
                <IncidentsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/staff" 
            element={
              <ProtectedRoute>
                <StaffPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/analytics" 
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
