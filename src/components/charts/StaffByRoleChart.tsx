import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useData } from '../../contexts/DataContext';

const COLORS = ['#2a3ad8', '#5573ff', '#7a96ff'];

const StaffByRoleChart: React.FC = () => {
  const { filteredStaff } = useData();

  const data = filteredStaff.reduce((acc, member) => {
    const existing = acc.find(item => item.role === member.role);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ role: member.role, count: 1 });
    }
    return acc;
  }, [] as { role: string; count: number }[]);

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis
          dataKey="role"
          tick={{ fontSize: 12 }}
          className="fill-gray-600 dark:fill-gray-400"
          angle={-15}
          textAnchor="end"
          height={60}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          className="fill-gray-600 dark:fill-gray-400"
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--tooltip-bg)',
            border: '1px solid var(--tooltip-border)',
            borderRadius: '6px',
            fontSize: '12px',
          }}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StaffByRoleChart;
