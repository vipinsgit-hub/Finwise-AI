import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { ShieldCheck, AlertCircle, Lightbulb, Zap } from 'lucide-react';

interface FinHealthResultProps {
  score: number;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  data: any;
}

const FinHealthResult: React.FC<FinHealthResultProps> = ({ score, swot, data }) => {
  const pieData = [
    { name: 'Expenses', value: data.expenses.monthlyExpenses + data.expenses.rentOrEmi + data.expenses.utilities + data.expenses.otherExpenses },
    { name: 'Debt Payments', value: data.debts.monthlyDebtPayments },
    { name: 'Savings/Investments', value: (data.income.monthlyIncome + data.income.otherIncome) - (data.expenses.monthlyExpenses + data.expenses.rentOrEmi + data.expenses.utilities + data.expenses.otherExpenses + data.debts.monthlyDebtPayments) }
  ].filter(d => d.value > 0);

  const COLORS = ['#5F7C8A', '#3AAFA9', '#8FA9B8'];

  const getScoreColor = () => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-accent';
    return 'text-red-500';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Score Gauge Placeholder */}
        <div className="col-span-1 bg-white p-8 rounded-2xl shadow-soft flex flex-col items-center justify-center text-center">
          <h3 className="text-xl font-bold text-text mb-4">Your FinHealth Score</h3>
          <div className="relative flex items-center justify-center w-40 h-40 rounded-full border-8 border-background">
            <span className={`text-5xl font-black ${getScoreColor()}`}>{score}</span>
          </div>
          <p className="mt-6 text-gray-500">
            {score >= 80 ? 'Excellent! You are on a solid financial track.' :
              score >= 50 ? 'Good, but there is room for improvement.' :
                'Attention needed to improve your financial security.'}
          </p>
        </div>

        {/* Expense Distribution */}
        <div className="col-span-1 md:col-span-2 bg-white p-8 rounded-2xl shadow-soft">
          <h3 className="text-xl font-bold text-text mb-6">Monthly Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SWOT Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <div className="flex items-center space-x-2 text-green-700 mb-4">
            <ShieldCheck size={20} />
            <h4 className="font-bold">Strengths</h4>
          </div>
          <ul className="space-y-2 text-sm text-green-800">
            {swot.strengths.map((s, i) => <li key={i}>• {s}</li>)}
          </ul>
        </div>

        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <div className="flex items-center space-x-2 text-red-700 mb-4">
            <AlertCircle size={20} />
            <h4 className="font-bold">Weaknesses</h4>
          </div>
          <ul className="space-y-2 text-sm text-red-800">
            {swot.weaknesses.map((s, i) => <li key={i}>• {s}</li>)}
          </ul>
        </div>

        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <div className="flex items-center space-x-2 text-blue-700 mb-4">
            <Lightbulb size={20} />
            <h4 className="font-bold">Opportunities</h4>
          </div>
          <ul className="space-y-2 text-sm text-blue-800">
            {swot.opportunities.map((s, i) => <li key={i}>• {s}</li>)}
          </ul>
        </div>

        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
          <div className="flex items-center space-x-2 text-orange-700 mb-4">
            <Zap size={20} />
            <h4 className="font-bold">Threats</h4>
          </div>
          <ul className="space-y-2 text-sm text-orange-800">
            {swot.threats.map((s, i) => <li key={i}>• {s}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FinHealthResult;
