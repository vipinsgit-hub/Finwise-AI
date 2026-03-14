import React, { useState } from 'react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-2xl shadow-soft">
      <SEO title="Login" />
      <h2 className="text-3xl font-bold text-text mb-8">Welcome Back</h2>
      {error && <p className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-text mb-2">Email address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-background border-none focus:ring-2 focus:ring-accent outline-none"
            placeholder="name@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-background border-none focus:ring-2 focus:ring-accent outline-none"
            placeholder="••••••••"
            required
          />
        </div>
        <Button className="w-full" isLoading={loading}>Sign In</Button>
      </form>
      <p className="mt-8 text-center text-gray-500 text-sm">
        Don't have an account? <Link to="/register" className="text-accent font-bold">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
