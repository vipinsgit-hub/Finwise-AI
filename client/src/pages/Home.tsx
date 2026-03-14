import React from 'react';
import Button from '../components/Button';
import { ArrowRight, Shield, Zap, BarChart3 } from 'lucide-react';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <SEO 
        title="Understand Your Money. Improve Your Financial Health" 
        description="FinWise AI helps you understand your financial health using a FinHealth Score and a FIRE calculator. Simple, beginner-friendly, and powerful."
      />
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left lg:max-w-2xl">
              <h1 className="text-5xl lg:text-7xl font-bold text-text leading-tight mb-8">
                Understand Your <span className="text-accent">Money.</span> Improve Your <span className="text-primary">Financial Health.</span>
              </h1>
              <p className="text-xl text-gray-500 mb-10 leading-relaxed">
                FinWise AI helps everyday people track their financial well-being with a simple score and a clear path to retirement.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                <Button size="lg">Get Started Free</Button>
                <Button size="lg" variant="outline">How it Works</Button>
              </div>
            </div>
            <div className="hidden lg:block w-1/2 mt-12 lg:mt-0 animate-float">
              <img 
                src="/finwise_hero_illustration.png" 
                alt="FinWise AI Illustration" 
                className="w-full h-auto drop-shadow-2xl translate-x-10" 
              />
            </div>
          </div>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-text mb-4">Why FinWise AI?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We simplify complex finance so you can focus on making better decisions for your future.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'FinHealth Score', desc: 'Get a 0-100 score of your financial health based on real data.', icon: Shield },
              { title: 'FIRE Calculator', desc: 'Calculate exactly when you can retire and how to get there.', icon: Zap },
              { title: 'Deep Insights', desc: 'Understand your spending patterns with AI-driven analysis.', icon: BarChart3 }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl bg-background hover:scale-105 transition-soft group">
                <div className="w-14 h-14 bg-white rounded-xl shadow-soft flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-soft">
                  <f.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-text mb-4">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
