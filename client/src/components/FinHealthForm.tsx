import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';

interface FinHealthFormProps {
  onSuccess: (data: any) => void;
}

const FinHealthForm: React.FC<FinHealthFormProps> = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    income: { monthlyIncome: 0, otherIncome: 0 },
    expenses: { monthlyExpenses: 0, rentOrEmi: 0, utilities: 0, otherExpenses: 0 },
    debts: { totalDebts: 0, monthlyDebtPayments: 0 },
    assets: { emergencyFund: 0, investments: 0, insuranceCover: 0, currentSavings: 0 }
  });

  const handleChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: parseFloat(value) || 0
      }
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-soft max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-text">Step {step} of 4</h2>
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`h-2 w-12 rounded-full ${s <= step ? 'bg-accent' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>
        <p className="text-gray-500">
          {step === 1 && 'Let\'s start with your income.'}
          {step === 2 && 'How about your monthly expenses?'}
          {step === 3 && 'Do you have any debts or EMIs?'}
          {step === 4 && 'Finally, your assets and savings.'}
        </p>
      </div>

      <div className="space-y-6">
        {step === 1 && (
          <>
            <Input 
              label="Primary Monthly Income" 
              type="number" 
              placeholder="0"
              onChange={(e) => handleChange('income', 'monthlyIncome', e.target.value)}
            />
            <Input 
              label="Other Monthly Income" 
              type="number" 
              placeholder="0"
              onChange={(e) => handleChange('income', 'otherIncome', e.target.value)}
            />
          </>
        )}

        {step === 2 && (
          <>
            <Input 
              label="Monthly Household Expenses" 
              type="number" 
              onChange={(e) => handleChange('expenses', 'monthlyExpenses', e.target.value)}
            />
            <Input 
              label="Rent or Home EMI" 
              type="number" 
              onChange={(e) => handleChange('expenses', 'rentOrEmi', e.target.value)}
            />
            <Input 
              label="Utilities (Electricity, Water, etc.)" 
              type="number" 
              onChange={(e) => handleChange('expenses', 'utilities', e.target.value)}
            />
          </>
        )}

        {step === 3 && (
          <>
            <Input 
              label="Total Debts (Loans, Credit Cards)" 
              type="number" 
              onChange={(e) => handleChange('debts', 'totalDebts', e.target.value)}
            />
            <Input 
              label="Total Monthly Debt Payments" 
              type="number" 
              onChange={(e) => handleChange('debts', 'monthlyDebtPayments', e.target.value)}
            />
          </>
        )}

        {step === 4 && (
          <>
            <Input 
              label="Emergency Fund" 
              type="number" 
              onChange={(e) => handleChange('assets', 'emergencyFund', e.target.value)}
            />
            <Input 
              label="Total Investments" 
              type="number" 
              onChange={(e) => handleChange('assets', 'investments', e.target.value)}
            />
            <Input 
              label="Insurance Coverage" 
              type="number" 
              onChange={(e) => handleChange('assets', 'insuranceCover', e.target.value)}
            />
          </>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        {step > 1 ? (
          <Button variant="outline" type="button" onClick={prevStep}>Back</Button>
        ) : <div />}
        
        {step < 4 ? (
          <Button type="button" onClick={nextStep}>Continue</Button>
        ) : (
          <Button variant="accent" type="submit">Calculate Score</Button>
        )}
      </div>
    </form>
  );
};

export default FinHealthForm;
