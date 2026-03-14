import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { profileService } from '../services/api';
import FIREProjections from './FIREProjections';

const FIRECalculator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [formData, setFormData] = useState({
    currentAge: 30,
    monthlyExpenses: 50000,
    currentSavings: 1000000,
    expectedReturnRate: 10,
    monthlyInvestment: 20000
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: Number(value) || 0
    }));
  };

  const calculateRetirement = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await profileService.calculateFIRE(formData);
      setResults(data);
    } catch (error) {
      console.error('Calculation failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="bg-white p-8 rounded-2xl shadow-soft max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-text">FIRE Calculator</h2>
          <p className="text-gray-500 mt-2">Find out when you can stop working and start living.</p>
        </div>

        <form onSubmit={calculateRetirement} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input 
            label="Current Age" 
            type="number" 
            value={formData.currentAge}
            onChange={(e) => handleChange('currentAge', e.target.value)}
          />
          <Input 
            label="Monthly Expenses" 
            type="number" 
            value={formData.monthlyExpenses}
            helperText="Your estimated expenses post-retirement"
            onChange={(e) => handleChange('monthlyExpenses', e.target.value)}
          />
          <Input 
            label="Current Savings" 
            type="number" 
            value={formData.currentSavings}
            onChange={(e) => handleChange('currentSavings', e.target.value)}
          />
          <Input 
            label="Monthly Investment" 
            type="number" 
            value={formData.monthlyInvestment}
            helperText="Amount you invest every month"
            onChange={(e) => handleChange('monthlyInvestment', e.target.value)}
          />
          <Input 
            label="Expected Returns (%)" 
            type="number" 
            value={formData.expectedReturnRate}
            helperText="Average annual return on investments"
            onChange={(e) => handleChange('expectedReturnRate', e.target.value)}
          />
          <div className="flex items-end">
            <Button className="w-full h-[52px]" variant="accent" isLoading={loading}>
              Calculate Projections
            </Button>
          </div>
        </form>
      </div>

      {results && (
        <div className="animate-in fade-in slide-in-from-bottom duration-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-soft text-center">
              <p className="text-gray-500 mb-1">FIRE Number</p>
              <h3 className="text-2xl font-bold text-primary">₹ {results.fireNumber?.toLocaleString()}</h3>
              <p className="text-xs text-gray-400 mt-2">Target corpus needed</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-soft text-center">
              <p className="text-gray-500 mb-1">Retirement Age</p>
              <h3 className="text-2xl font-bold text-accent">{results.retirementAge}</h3>
              <p className="text-xs text-gray-400 mt-2">In {results.yearsToRetirement} years</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-soft text-center">
              <p className="text-gray-500 mb-1">Required Monthly SIP</p>
              <h3 className="text-2xl font-bold text-text">₹ {results.requiredMonthlySIP?.toLocaleString()}</h3>
              <p className="text-xs text-gray-400 mt-2">To reach target in 30 years</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-soft">
            <h3 className="text-xl font-bold text-text mb-8 text-center">Wealth Projection Over Time</h3>
            <FIREProjections 
              data={results.projectedSavings} 
              fireNumber={results.fireNumber}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FIRECalculator;
