import React from 'react';
import { Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <SEO title="Contact Us - FinWise AI Support" description="Get in touch with FinWise AI team for support or inquiries." />
      
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-text mb-6">Get in <span className="text-accent">Touch</span></h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Our team is here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100 flex items-start space-x-6">
            <div className="bg-primary/10 p-4 rounded-2xl text-primary">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text mb-2">Email Us</h3>
              <p className="text-gray-500 mb-1">General Inquiries: hello@finwise.ai</p>
              <p className="text-gray-500">Support: support@finwise.ai</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100 flex items-start space-x-6">
            <div className="bg-accent/10 p-4 rounded-2xl text-accent">
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text mb-2">Live Chat</h3>
              <p className="text-gray-500 mb-1">Available Mon-Fri</p>
              <p className="text-gray-500">9:00 AM - 6:00 PM EST</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100 flex items-start space-x-6">
            <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-500">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text mb-2">Our Office</h3>
              <p className="text-gray-500 mb-1">Financial District</p>
              <p className="text-gray-500">123 Wealth St, New York, NY</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <form className="bg-white p-10 rounded-3xl shadow-soft border border-gray-100 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full px-5 py-3 rounded-xl bg-background border-none focus:ring-2 focus:ring-accent outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full px-5 py-3 rounded-xl bg-background border-none focus:ring-2 focus:ring-accent outline-none"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text ml-1">Subject</label>
              <select className="w-full px-5 py-3 rounded-xl bg-background border-none focus:ring-2 focus:ring-accent outline-none appearance-none">
                <option>General Support</option>
                <option>Billing Question</option>
                <option>Feature Request</option>
                <option>Bug Report</option>
                <option>Partnership</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text ml-1">Message</label>
              <textarea 
                rows={6} 
                placeholder="How can we help you today?" 
                className="w-full px-5 py-4 rounded-xl bg-background border-none focus:ring-2 focus:ring-accent outline-none resize-none"
                required
              ></textarea>
            </div>

            <Button size="lg" variant="accent" className="w-full group">
              Send Message
              <Send size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-soft" />
            </Button>
          </form>
        </div>
      </div>

      {/* FAQ Preview */}
      <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold text-text mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
          {[
            { q: "Is FinWise AI free to use?", a: "Yes, our core tools like the FIRE Calculator and FinHealth Score are free for everyone." },
            { q: "How secure is my data?", a: "We use bank-level encryption and never sell your personal data to third parties." },
            { q: "Can I use it on mobile?", a: "Absolutely! FinWise AI is fully responsive and works perfectly on any device." },
            { q: "How do I reset my password?", a: "You can click on 'Forgot Password' on the login page to receive a reset link." }
          ].map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-text mb-2">{faq.q}</h4>
              <p className="text-sm text-gray-500">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
