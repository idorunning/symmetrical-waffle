import React from 'react';
import { BarChart3, PieChart, GraduationCap, Users, AlertCircle, Activity } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import CollapsiblePanel from './CollapsiblePanel';
import StaffByRoleChart from './charts/StaffByRoleChart';
import StaffByTeamChart from './charts/StaffByTeamChart';
import WelfareDistributionChart from './charts/WelfareDistributionChart';
import TrainingCompletionChart from './charts/TrainingCompletionChart';

const Dashboard: React.FC = () => {
  const { filteredStaff } = useData();

  const stats = {
    total: filteredStaff.length,
    active: filteredStaff.filter(s => s.status === 'Active').length,
    onLeave: filteredStaff.filter(s => s.status === 'On Leave').length,
    responseOfficers: filteredStaff.filter(s => s.role === 'Response Officer').length,
    investigators: filteredStaff.filter(s => s.role === 'RIT Investigator').length,
    sergeants: filteredStaff.filter(s => s.role === 'Sergeant').length,
    welfareSupport: filteredStaff.filter(s => s.welfare === 'Support Required').length,
    welfareMonitor: filteredStaff.filter(s => s.welfare === 'Monitor').length,
    highRisk: filteredStaff.filter(s => s.riskFlag === 'High').length,
    mediumRisk: filteredStaff.filter(s => s.riskFlag === 'Medium').length,
  };

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color?: string;
  }> = ({ title, value, icon, color = 'police-blue' }) => (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600 dark:text-${color}-400`}>
            {value}
          </p>
        </div>
        <div className={`p-3 bg-${color}-100 dark:bg-${color}-900 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin bg-gray-50 dark:bg-gray-900">
      <div className="p-6 space-y-6">
        {/* Header Stats */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Staff Management Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Staff"
              value={stats.total}
              icon={<Users className="w-6 h-6 text-police-blue-600 dark:text-police-blue-400" />}
            />
            <StatCard
              title="Active"
              value={stats.active}
              icon={<Activity className="w-6 h-6 text-green-600 dark:text-green-400" />}
              color="green"
            />
            <StatCard
              title="On Leave"
              value={stats.onLeave}
              icon={<AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />}
              color="yellow"
            />
            <StatCard
              title="Welfare Support Needed"
              value={stats.welfareSupport}
              icon={<AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />}
              color="red"
            />
          </div>
        </div>

        {/* Role Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Response Officers</p>
              <p className="text-3xl font-bold text-police-blue-600 dark:text-police-blue-400">
                {stats.responseOfficers}
              </p>
            </div>
          </div>
          <div className="card p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">RIT Investigators</p>
              <p className="text-3xl font-bold text-police-blue-600 dark:text-police-blue-400">
                {stats.investigators}
              </p>
            </div>
          </div>
          <div className="card p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Sergeants</p>
              <p className="text-3xl font-bold text-police-blue-600 dark:text-police-blue-400">
                {stats.sergeants}
              </p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CollapsiblePanel
            title="Staff by Role"
            icon={<BarChart3 className="w-5 h-5 text-police-blue-600 dark:text-police-blue-400" />}
          >
            <StaffByRoleChart />
          </CollapsiblePanel>

          <CollapsiblePanel
            title="Staff by Team"
            icon={<Users className="w-5 h-5 text-police-blue-600 dark:text-police-blue-400" />}
          >
            <StaffByTeamChart />
          </CollapsiblePanel>

          <CollapsiblePanel
            title="Welfare Distribution"
            icon={<PieChart className="w-5 h-5 text-police-blue-600 dark:text-police-blue-400" />}
          >
            <WelfareDistributionChart />
          </CollapsiblePanel>

          <CollapsiblePanel
            title="Training Completion"
            icon={<GraduationCap className="w-5 h-5 text-police-blue-600 dark:text-police-blue-400" />}
          >
            <TrainingCompletionChart />
          </CollapsiblePanel>
        </div>

        {/* Risk and Welfare Alerts */}
        {(stats.highRisk > 0 || stats.welfareSupport > 0 || stats.welfareMonitor > 0) && (
          <CollapsiblePanel
            title="Alerts and Notifications"
            icon={<AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />}
          >
            <div className="space-y-3">
              {stats.highRisk > 0 && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <span className="text-sm font-medium text-red-900 dark:text-red-200">
                      {stats.highRisk} staff member{stats.highRisk !== 1 ? 's' : ''} with high risk flag
                    </span>
                  </div>
                </div>
              )}
              {stats.mediumRisk > 0 && (
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <span className="text-sm font-medium text-orange-900 dark:text-orange-200">
                      {stats.mediumRisk} staff member{stats.mediumRisk !== 1 ? 's' : ''} with medium risk flag
                    </span>
                  </div>
                </div>
              )}
              {stats.welfareSupport > 0 && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <span className="text-sm font-medium text-red-900 dark:text-red-200">
                      {stats.welfareSupport} staff member{stats.welfareSupport !== 1 ? 's' : ''} require welfare support
                    </span>
                  </div>
                </div>
              )}
              {stats.welfareMonitor > 0 && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-900 dark:text-yellow-200">
                      {stats.welfareMonitor} staff member{stats.welfareMonitor !== 1 ? 's' : ''} on welfare monitoring
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CollapsiblePanel>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
