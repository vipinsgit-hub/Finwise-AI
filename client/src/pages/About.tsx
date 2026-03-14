import React from 'react';
import { Target, Users, Landmark, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const About: React.FC = () => {
  return (
    <div className="space-y-24 py-12">
      <SEO title="About Us - FinWise AI" description="Learn about our mission to democratize financial intelligence." />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-black text-text mb-6">
          Democratizing <span className="text-accent">Financial Intelligence</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          We believe everyone deserves access to elite-level financial planning tools. Our AI-driven platform helps you make smarter decisions for a secure future.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register">
            <Button size="lg" variant="accent">Join FinWise Today</Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline">Get in Touch</Button>
          </Link>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 text-accent font-bold mb-4 uppercase tracking-widest text-sm">
              <Target size={20} />
              <span>Our Mission</span>
            </div>
            <h2 className="text-4xl font-bold text-text mb-6">Helping 1 Million People Reach FIRE.</h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Financial Independence, Retire Early (FIRE) isn't just for the 1%. It's a structured approach to saving, investing, and living that anyone can follow with the right guidance.
            </p>
            <ul className="space-y-4">
              {[
                'Automated financial health analysis',
                'Precision FIRE calculations',
                'Personalized investment insights',
                'Secure and private data handling'
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-text font-medium">
                  <CheckCircle2 size={24} className="text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-accent/5 rounded-3xl -rotate-2"></div>
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Team working" 
              className="relative rounded-3xl shadow-xl border-8 border-white"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text mb-4">Core Values</h2>
          <p className="text-gray-500 max-w-xl mx-auto">The principles that drive everything we build at FinWise AI.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Transparency First", 
              desc: "No hidden fees, no complex jargon. Just clear, actionable financial advice.",
              icon: Landmark,
              color: "bg-blue-500"
            },
            { 
              title: "AI with Ethics", 
              desc: "We use artificial intelligence to serve you, not to exploit your data for profit.",
              icon: Users,
              color: "bg-accent"
            },
            { 
              title: "Simplified Complexity", 
              desc: "We handle the complex math so you can focus on making life-changing decisions.",
              icon: ArrowRight,
              color: "bg-primary"
            }
          ].map((value, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100 hover:border-accent/20 transition-soft group">
              <div className={`${value.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-soft shadow-lg`}>
                <value.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-text mb-4">{value.title}</h3>
              <p className="text-gray-500 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="bg-white border-2 border-primary/10 rounded-3xl p-12 text-center text-text shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full -ml-24 -mb-24"></div>
          <h2 className="text-4xl font-bold mb-6">Ready to secure your future?</h2>
          <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of others who are already using FinWise AI to master their money.
          </p>
          <Link to="/register">
            <Button size="lg" variant="accent" className="px-12">Start Now</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
