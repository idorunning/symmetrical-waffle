import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useData } from '../../contexts/DataContext';

const COLORS = {
  'Complete': '#10b981',
  'In Progress': '#3b82f6',
  'Overdue': '#ef4444',
  'Not Started': '#6b7280',
};

const TrainingCompletionChart: React.FC = () => {
  const { filteredStaff } = useData();

  const statusCounts = filteredStaff.reduce((acc, member) => {
    member.training.forEach(training => {
      if (!acc[training.status]) {
        acc[training.status] = 0;
      }
      acc[training.status] += 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }));

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
        No data available
      </div>
    );
  }

  const totalTraining = data.reduce((sum, item) => sum + item.count, 0);
  const completedCount = statusCounts['Complete'] || 0;
  const completionRate = totalTraining > 0 ? ((completedCount / totalTraining) * 100).toFixed(1) : '0';

  return (
    <div>
      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">Overall Completion Rate</div>
        <div className="text-2xl font-bold text-police-blue-600 dark:text-police-blue-400">
          {completionRate}%
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500">
          {completedCount} of {totalTraining} training records complete
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis
            dataKey="status"
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
            {data.map((entry) => (
              <Cell key={`cell-${entry.status}`} fill={COLORS[entry.status as keyof typeof COLORS]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrainingCompletionChart;
