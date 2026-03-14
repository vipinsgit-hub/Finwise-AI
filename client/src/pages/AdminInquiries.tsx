import React, { useEffect, useState } from 'react';
import { adminService } from '../services/api';
import { Mail, Trash2, CheckCircle, Clock } from 'lucide-react';

const AdminInquiries: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const data = await adminService.getMessages();
      setMessages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkRead = async (id: string) => {
    try {
      await adminService.markMessageRead(id);
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text">User Inquiries</h1>
        <p className="text-gray-500 mt-1">Manage contact form submissions and feedback.</p>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg._id} className={`bg-white p-6 rounded-2xl shadow-soft border-l-4 ${msg.isRead ? 'border-gray-200' : 'border-accent'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-background p-2 rounded-lg">
                  <Mail size={18} className="text-text" />
                </div>
                <div>
                  <h4 className="font-bold text-text">{msg.name}</h4>
                  <p className="text-xs text-gray-500">{msg.email} • {new Date(msg.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              {!msg.isRead && (
                <button 
                  onClick={() => handleMarkRead(msg._id)}
                  className="flex items-center space-x-2 text-xs font-bold text-accent px-3 py-1 bg-accent/10 rounded-full hover:bg-accent/20 transition-soft"
                >
                  <CheckCircle size={14} /> <span>Mark as Read</span>
                </button>
              )}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{msg.message}</p>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Mail size={48} className="mx-auto mb-4 opacity-20" />
            <p>No messages yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;
