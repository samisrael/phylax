import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * Admin Dashboard - Shows overall statistics and user management
 */
const AdminDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.role !== 'ADMIN') {
      setError('Access denied. Admin privileges required.');
      setLoading(false);
      return;
    }
    fetchDashboardStatistics();
  }, [user, token]);

  const fetchDashboardStatistics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users/admin/statistics', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }

      const data = await response.json();
      setStatistics(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error loading dashboard statistics');
      console.error('Error fetching dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="text-gray-600 text-sm font-medium mb-2">Total Users</div>
          <div className="text-3xl font-bold text-blue-600">{statistics?.totalUsers || 0}</div>
        </div>

        {/* Total Zones */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="text-gray-600 text-sm font-medium mb-2">Total Zones</div>
          <div className="text-3xl font-bold text-green-600">{statistics?.totalZones || 0}</div>
        </div>

        {/* Total Contributions */}
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <div className="text-gray-600 text-sm font-medium mb-2">Total Contributions</div>
          <div className="text-3xl font-bold text-purple-600">{statistics?.totalContributions || 0}</div>
        </div>

        {/* Admins Count */}
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <div className="text-gray-600 text-sm font-medium mb-2">Administrators</div>
          <div className="text-3xl font-bold text-orange-600">
            {statistics?.usersByRole?.ADMIN || 0}
          </div>
        </div>
      </div>

      {/* Users by Role */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold mb-6">Users by Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statistics?.usersByRole && Object.entries(statistics.usersByRole).map(([role, count]) => (
            <div key={role} className="bg-gray-50 p-4 rounded border border-gray-200">
              <div className="text-gray-600 text-sm mb-2">{role}</div>
              <div className="text-2xl font-bold text-gray-800">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Recent Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="borderb-2 border-gray-300">
                <th className="text-left py-3 px-4 font-semibold">Name</th>
                <th className="text-left py-3 px-4 font-semibold">Email</th>
                <th className="text-left py-3 px-4 font-semibold">Role</th>
                <th className="text-left py-3 px-4 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody>
              {statistics?.recentUsers && statistics.recentUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                      user.role === 'RESPONDER' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
