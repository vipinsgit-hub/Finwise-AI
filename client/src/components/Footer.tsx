import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="bg-primary p-1.5 rounded-lg">
                <TrendingUp className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-text">FinWise AI</span>
            </Link>
            <p className="text-gray-500 leading-relaxed mb-6">
              Empowering people to achieve financial independence through smart, AI-driven financial health insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-soft">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-soft">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-soft">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-text mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link to="/#features" className="text-gray-500 hover:text-accent transition-soft">Features</Link></li>
              <li><Link to="/#calculator" className="text-gray-500 hover:text-accent transition-soft">FinHealth Score</Link></li>
              <li><Link to="/#fire" className="text-gray-500 hover:text-accent transition-soft">FIRE Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-500 hover:text-accent transition-soft">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-500 hover:text-accent transition-soft">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-accent transition-soft">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text mb-6">Newsletter</h4>
            <p className="text-gray-500 mb-4">Subscribe for financial tips and updates.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address"
                className="bg-gray-100 border-none rounded-l-xl px-4 py-3 w-full focus:ring-2 focus:ring-accent outline-none"
              />
              <button className="bg-primary text-white px-4 py-3 rounded-r-xl hover:bg-opacity-90 transition-soft">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© 2026 FinWise AI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-text transition-soft">Privacy Policy</a>
            <a href="#" className="hover:text-text transition-soft">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
