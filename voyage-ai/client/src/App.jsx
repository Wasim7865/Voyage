import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/public/Home';
import Destinations from './pages/public/Destinations';
import DestinationDetail from './pages/public/DestinationDetail';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Dashboard from './pages/dashboard/Dashboard';
import MyTrips from './pages/dashboard/MyTrips';
import CreateTrip from './pages/dashboard/CreateTrip';
import TripDetails from './pages/dashboard/TripDetails';
import Itinerary from './pages/dashboard/Itinerary';
import AIPlanner from './pages/dashboard/AIPlanner';
import AIAssistant from './pages/dashboard/AIAssistant';
import AIBudgetPlanner from './pages/dashboard/AIBudgetPlanner';
import AIPackingList from './pages/dashboard/AIPackingList';
import SavedDestinations from './pages/dashboard/SavedDestinations';
import Profile from './pages/dashboard/Profile';
import Settings from './pages/dashboard/Settings';
import AdminDashboard from './pages/admin/AdminDashboard';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-4 border-voyage-500 border-t-transparent" /></div>;
  if (!user) return <Navigate to="/login" />;
  return children;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user || user.role !== 'admin') return <Navigate to="/dashboard" />;
  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" toastOptions={{ duration: 3000, style: { borderRadius: '12px', padding: '16px', fontSize: '14px' } }} />
        <Routes>
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<DestinationDetail />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
          <Route path="/trips" element={<ProtectedRoute><Layout><MyTrips /></Layout></ProtectedRoute>} />
          <Route path="/trips/create" element={<ProtectedRoute><Layout><CreateTrip /></Layout></ProtectedRoute>} />
          <Route path="/trips/:id" element={<ProtectedRoute><Layout><TripDetails /></Layout></ProtectedRoute>} />
          <Route path="/trips/:id/itinerary" element={<ProtectedRoute><Layout><Itinerary /></Layout></ProtectedRoute>} />
          <Route path="/ai-planner" element={<ProtectedRoute><Layout><AIPlanner /></Layout></ProtectedRoute>} />
          <Route path="/ai-assistant" element={<ProtectedRoute><Layout><AIAssistant /></Layout></ProtectedRoute>} />
          <Route path="/ai-budget" element={<ProtectedRoute><Layout><AIBudgetPlanner /></Layout></ProtectedRoute>} />
          <Route path="/ai-packing" element={<ProtectedRoute><Layout><AIPackingList /></Layout></ProtectedRoute>} />
          <Route path="/saved" element={<ProtectedRoute><Layout><SavedDestinations /></Layout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Layout title="Settings"><Settings /></Layout></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><Layout><AdminDashboard /></Layout></AdminRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
