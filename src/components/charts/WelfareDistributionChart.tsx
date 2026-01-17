import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useData } from '../../contexts/DataContext';

const COLORS = {
  'Good': '#10b981',
  'Monitor': '#f59e0b',
  'Support Required': '#ef4444',
  'Unknown': '#6b7280',
};

const WelfareDistributionChart: React.FC = () => {
  const { filteredStaff } = useData();

  const data = filteredStaff.reduce((acc, member) => {
    const existing = acc.find(item => item.name === member.welfare);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: member.welfare, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          wrapperStyle={{ fontSize: '12px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default WelfareDistributionChart;
