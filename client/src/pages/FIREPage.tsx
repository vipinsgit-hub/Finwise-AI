import React from 'react';
import FIRECalculator from '../components/FIRECalculator';

const FIREPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-text">FIRE Journey</h1>
        <p className="text-gray-500 mt-2">Visualize your path to financial independence and early retirement.</p>
      </div>

      <FIRECalculator />
    </div>
  );
};

export default FIREPage;
