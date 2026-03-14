import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  HeartPulse, 
  Flame, 
  User, 
  LogOut, 
  TrendingUp, 
  FileText, 
  Mail 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { title: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { title: 'FinHealth', icon: HeartPulse, path: '/dashboard/finhealth' },
    { title: 'FIRE Calc', icon: Flame, path: '/dashboard/fire' },
    { title: 'Profile', icon: User, path: '/dashboard/profile' },
  ];

  const adminItems = [
    { title: 'Admin Home', icon: TrendingUp, path: '/dashboard/admin' },
    { title: 'Manage Blogs', icon: FileText, path: '/dashboard/admin/blogs' },
    { title: 'Inquiries', icon: Mail, path: '/dashboard/admin/messages' },
  ];

  return (
    <div className="w-64 bg-white border-r min-h-screen flex flex-col fixed left-0 top-0 z-40">
      {/* Logo Section */}
      <div className="p-8 flex items-center space-x-2">
        <div className="bg-primary p-2 rounded-lg">
          <TrendingUp className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold text-text">FinWise AI</span>
      </div>

      {/* Navigation */}
      <nav className="flex-grow px-4 mt-2 space-y-8 overflow-y-auto pb-10">
        <div>
          <p className="px-4 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">User Menu</p>
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) => cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-soft font-medium",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-text"
                )}
              >
                <item.icon size={20} />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {user?.role === 'admin' && (
          <div>
            <p className="px-4 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Admin Menu</p>
            <div className="space-y-1">
              {adminItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-soft font-medium",
                    isActive 
                      ? "bg-accent/10 text-accent" 
                      : "text-gray-500 hover:bg-gray-50 hover:text-text"
                  )}
                >
                  <item.icon size={20} />
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t bg-white">
        <button
          onClick={logout}
          className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-soft font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
