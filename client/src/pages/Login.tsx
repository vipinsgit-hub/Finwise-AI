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

      <div className="mt-6 flex items-center justify-center space-x-2">
        <div className="h-px bg-gray-200 flex-grow"></div>
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">or</span>
        <div className="h-px bg-gray-200 flex-grow"></div>
      </div>

      <button className="mt-6 w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-100 py-3 rounded-2xl hover:bg-gray-50 transition-soft group">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span className="text-text font-bold">Continue with Google</span>
      </button>

      <p className="mt-8 text-center text-gray-500 text-sm">
        Don't have an account? <Link to="/register" className="text-accent font-bold hover:underline">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
