import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Blog: React.FC = () => {
  const posts = [
    {
      id: 1,
      title: "How to Calculate Your FIRE Number in 5 Minutes",
      excerpt: "Understanding your target retirement number is the first step toward financial freedom. Here's a simple breakdown...",
      author: "FinWise Team",
      date: "Mar 12, 2026",
      category: "FIRE",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "5 Common Financial Mistakes to Avoid in Your 20s",
      excerpt: "Your 20s are the most critical years for wealth building. Learn how to avoid these common pitfalls...",
      author: "Vipin",
      date: "Mar 10, 2026",
      category: "Investing",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "The Power of Compound Interest: Explained Simply",
      excerpt: "Albert Einstein called it the eighth wonder of the world. Here's how it can work for you over the long term...",
      author: "AI Assistant",
      date: "Mar 08, 2026",
      category: "Basics",
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <SEO title="Blog - Financial Insights from FinWise AI" description="Read the latest articles on FIRE, investing, and personal finance." />
      
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-text mb-6">Financial <span className="text-accent">Insights</span></h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Master your money with our latest guides and articles on wealth building.
        </p>
      </div>

      {/* Featured Post (Simplified for now) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="md:col-span-3">
          <div className="relative h-[400px] rounded-3xl overflow-hidden group shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
              alt="Featured post" 
              className="absolute inset-0 w-full h-full object-cover transition-soft group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-10">
              <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-bold w-fit mb-4">Featured</span>
              <h2 className="text-4xl font-bold text-white mb-4 max-w-3xl">The Future of AI in Personal Finance Management</h2>
              <p className="text-white/80 text-lg mb-6 max-w-2xl">Discover how artificial intelligence is changing the way we save, invest, and plan for retirement.</p>
              <Button variant="accent" className="w-fit">Read Article</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-soft border border-gray-100 group hover:shadow-xl transition-soft flex flex-col">
            <div className="h-56 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-soft group-hover:scale-110"
              />
            </div>
            <div className="p-8 flex-grow flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-accent text-sm font-bold tracking-wider uppercase">{post.category}</span>
                <div className="flex items-center text-gray-400 text-sm">
                  <Calendar size={14} className="mr-1" />
                  {post.date}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-text mb-4 leading-tight group-hover:text-accent transition-soft">{post.title}</h3>
              <p className="text-gray-500 mb-8 line-clamp-3">{post.excerpt}</p>
              <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-medium text-text">{post.author}</span>
                </div>
                <Link to="#" className="text-accent font-bold text-sm flex items-center group-hover:translate-x-1 transition-soft">
                  Read More <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="mt-24 bg-background p-12 rounded-3xl border border-dashed border-gray-300 text-center">
        <h2 className="text-3xl font-bold text-text mb-4">Never miss an update</h2>
        <p className="text-gray-500 mb-8">Get our best financial advice delivered straight to your inbox.</p>
        <form className="max-w-md mx-auto flex gap-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-grow px-6 py-3 rounded-xl bg-white border-none shadow-sm outline-none focus:ring-2 focus:ring-accent"
          />
          <Button variant="primary">Subscribe</Button>
        </form>
      </div>
    </div>
  );
};

export default Blog;
