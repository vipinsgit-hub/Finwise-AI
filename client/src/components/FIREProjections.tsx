import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';

interface FIREProjectionsProps {
  data: Array<{ age: number; balance: number }>;
  fireNumber: number;
}

const FIREProjections: React.FC<FIREProjectionsProps> = ({ data, fireNumber }) => {
  const formatYAxis = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value}`;
  };

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3AAFA9" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3AAFA9" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis 
            dataKey="age" 
            label={{ value: 'Age', position: 'insideBottomRight', offset: -10 }}
            tick={{ fill: '#6B7280' }}
          />
          <YAxis 
            tickFormatter={formatYAxis} 
            tick={{ fill: '#6B7280' }}
          />
          <Tooltip 
            formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Balance']}
            labelFormatter={(label) => `Age: ${label}`}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="balance" 
            stroke="#3AAFA9" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorBalance)" 
          />
          <ReferenceLine 
            y={fireNumber} 
            label={{ value: 'FIRE Goal', position: 'top', fill: '#5F7C8A', fontWeight: 'bold' }} 
            stroke="#5F7C8A" 
            strokeDasharray="5 5" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FIREProjections;
