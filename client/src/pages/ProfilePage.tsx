import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <SEO title="My Profile" />
      
      <div>
        <h1 className="text-3xl font-bold text-text">Account Settings</h1>
        <p className="text-gray-500 mt-2">Manage your personal information and preferences.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <div className="bg-primary h-32 w-full relative">
          <div className="absolute -bottom-12 left-10">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center text-primary font-black text-3xl border-4 border-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
        
        <div className="pt-16 pb-10 px-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Full Name</label>
              <div className="flex items-center space-x-3 p-4 bg-background rounded-xl">
                <User size={18} className="text-gray-400" />
                <span className="font-bold text-text">{user.name}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email Address</label>
              <div className="flex items-center space-x-3 p-4 bg-background rounded-xl">
                <Mail size={18} className="text-gray-400" />
                <span className="font-bold text-text">{user.email}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Account Type</label>
              <div className="flex items-center space-x-3 p-4 bg-background rounded-xl">
                <Shield size={18} className="text-gray-400" />
                <span className="font-bold text-text capitalize">{user.role}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Member Since</label>
              <div className="flex items-center space-x-3 p-4 bg-background rounded-xl">
                <Calendar size={18} className="text-gray-400" />
                <span className="font-bold text-text">March 2026</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="outline" className="flex-1">Edit Profile</Button>
            <Button variant="outline" className="flex-1 text-red-500 hover:bg-red-50 border-red-100" onClick={logout}>Sign Out</Button>
          </div>
        </div>
      </div>

      <div className="bg-red-50 p-8 rounded-2xl border-2 border-dashed border-red-100">
        <h3 className="text-lg font-bold text-red-700 mb-2">Danger Zone</h3>
        <p className="text-red-600/70 text-sm mb-6">Once you delete your account, all your data including financial profiles and FIRE projections will be permanently removed.</p>
        <Button className="bg-red-600 hover:bg-red-700 text-white border-none">Delete Account</Button>
      </div>
    </div>
  );
};

export default ProfilePage;
