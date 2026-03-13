import React from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-2xl shadow-soft">
      <h2 className="text-3xl font-bold text-text mb-8">Create Account</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-text mb-2">Full Name</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 rounded-xl bg-background border-none focus:ring-2 focus:ring-accent outline-none"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text mb-2">Email address</label>
          <input 
            type="email" 
            className="w-full px-4 py-3 rounded-xl bg-background border-none focus:ring-2 focus:ring-accent outline-none"
            placeholder="name@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text mb-2">Password</label>
          <input 
            type="password" 
            className="w-full px-4 py-3 rounded-xl bg-background border-none focus:ring-2 focus:ring-accent outline-none"
            placeholder="••••••••"
          />
        </div>
        <Button className="w-full">Get Started</Button>
      </form>
      <p className="mt-8 text-center text-gray-500 text-sm">
        Already have an account? <Link to="/login" className="text-accent font-bold">Sign in</Link>
      </p>
    </div>
  );
};

export default Register;
