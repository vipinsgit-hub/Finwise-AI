import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { profileService } from '../services/api';
import { Shield, Flame, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile();
        setProfile(data);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-text">Welcome back, {user?.name}!</h1>
        <p className="text-gray-500 mt-2">Here's a summary of your financial health.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* FinHealth Summary Card */}
        <div className="bg-white p-8 rounded-2xl shadow-soft border-t-4 border-primary">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-primary/10 p-3 rounded-xl text-primary">
              <Shield size={24} />
            </div>
            {profile?.finHealthScore !== undefined && (
              <span className="text-4xl font-black text-primary">{profile.finHealthScore}</span>
            )}
          </div>
          <h3 className="text-xl font-bold text-text mb-2">FinHealth Score</h3>
          <p className="text-gray-500 mb-6">
            {profile ? 'Your score is based on your latest financial data.' : 'Calculate your score to see how you are doing.'}
          </p>
          <Link to="/dashboard/finhealth">
            <Button variant="outline" className="w-full">
              {profile ? 'Update Data' : 'Calculate Now'} <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>

        {/* FIRE Summary Card */}
        <div className="bg-white p-8 rounded-2xl shadow-soft border-t-4 border-accent">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-accent/10 p-3 rounded-xl text-accent">
              <Flame size={24} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-text mb-2">FIRE Roadmap</h3>
          <p className="text-gray-500 mb-6">
            Plan your retirement and see when you can achieve financial independence.
          </p>
          <Link to="/dashboard/fire">
            <Button variant="outline" className="w-full">
              Plan Retirement <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Insights */}
      {profile && (
        <div className="bg-white p-8 rounded-2xl shadow-soft">
          <h3 className="text-xl font-bold text-text mb-6">Quick Insights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-background rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Monthly Income</p>
              <p className="text-lg font-bold text-text">₹ {((profile.income?.monthlyIncome || 0) + (profile.income?.otherIncome || 0)).toLocaleString()}</p>
            </div>
            <div className="p-4 bg-background rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Monthly Expenses</p>
              <p className="text-lg font-bold text-text">₹ {profile.expenses?.monthlyExpenses?.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-background rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Total Investments</p>
              <p className="text-lg font-bold text-text">₹ {profile.assets?.investments?.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
