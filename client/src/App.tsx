import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FinHealthPage from './pages/FinHealthPage';
import FIREPage from './pages/FIREPage';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminBlogs from './pages/AdminBlogs';
import AdminInquiries from './pages/AdminInquiries';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
            <Route path="/register" element={<MainLayout><Register /></MainLayout>} />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/finhealth" element={<ProtectedRoute><DashboardLayout><FinHealthPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/fire" element={<ProtectedRoute><DashboardLayout><FIREPage /></DashboardLayout></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/dashboard/admin" element={<AdminRoute><DashboardLayout><AdminDashboard /></DashboardLayout></AdminRoute>} />
            <Route path="/dashboard/admin/blogs" element={<AdminRoute><DashboardLayout><AdminBlogs /></DashboardLayout></AdminRoute>} />
            <Route path="/dashboard/admin/messages" element={<AdminRoute><DashboardLayout><AdminInquiries /></DashboardLayout></AdminRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
