import React, { useEffect, useState } from 'react';
import { adminService } from '../services/api';
import { Users, FileText, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;

  const cards = [
    { title: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'text-blue-500', link: '#' },
    { title: 'Blog Posts', value: stats?.totalPosts || 0, icon: FileText, color: 'text-green-500', link: '/dashboard/admin/blogs' },
    { title: 'Unread Messages', value: stats?.unreadMessages || 0, icon: Mail, color: 'text-orange-500', link: '/dashboard/admin/messages' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-text">Admin Control Center</h1>
        <p className="text-gray-500 mt-2">Manage content and monitor system activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl shadow-soft">
            <div className="flex justify-between items-center mb-4">
              <div className={`${card.color} bg-current bg-opacity-10 p-3 rounded-xl`}>
                <card.icon size={24} />
              </div>
              <span className="text-3xl font-black text-text">{card.value}</span>
            </div>
            <h3 className="text-lg font-bold text-text mb-4">{card.title}</h3>
            {card.link !== '#' && (
              <Link to={card.link} className="text-sm font-bold text-accent flex items-center hover:underline">
                Manage <ArrowRight size={16} className="ml-1" />
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-soft">
        <h3 className="text-xl font-bold text-text mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { user: 'John Doe', action: 'Calculated FinHealth Score', time: '2 mins ago' },
            { user: 'Admin', action: 'Published new blog post: Smart Investing', time: '1 hour ago' },
            { user: 'Sarah Smith', action: 'Submitted a new inquiry', time: '5 hours ago' },
          ].map((log, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-background rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-xs font-bold text-gray-400">
                  {log.user.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-text">{log.user}</p>
                  <p className="text-xs text-gray-500">{log.action}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400 font-medium">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
