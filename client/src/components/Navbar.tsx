import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Menu, X, Shield } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useAuth();

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-soft">
                <TrendingUp className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-text tracking-tight">FinWise <span className="text-accent">AI</span></span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-text font-medium hover:text-accent transition-soft">Home</Link>
            <Link to="/about" className="text-text font-medium hover:text-accent transition-soft">About</Link>
            <Link to="/blog" className="text-text font-medium hover:text-accent transition-soft">Blog</Link>
            <Link to="/contact" className="text-text font-medium hover:text-accent transition-soft">Contact</Link>
            {user?.role === 'admin' && (
              <Link to="/dashboard/admin" className="text-accent font-bold hover:brightness-110 transition-soft flex items-center">
                <Shield size={18} className="mr-1" /> Admin
              </Link>
            )}
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="accent">Sign Up</Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-text">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-3 text-text font-medium border-b hover:bg-gray-50">Home</Link>
            <Link to="/about" className="block px-3 py-3 text-text font-medium border-b hover:bg-gray-50">About</Link>
            <Link to="/blog" className="block px-3 py-3 text-text font-medium border-b hover:bg-gray-50">Blog</Link>
            <Link to="/contact" className="block px-3 py-3 text-text font-medium border-b hover:bg-gray-50">Contact</Link>
            <div className="grid grid-cols-2 gap-4 mt-4 px-3">
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/register" className="w-full">
                <Button variant="accent" className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
