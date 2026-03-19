import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faShieldAlt,
  faSignOut,
  faArrowLeft,
  faEdit,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import useAuthStore from '../store/authStore';
import { formatDateTime } from '../utils/helpers';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-6"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Dashboard
        </button>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                My Profile
              </h1>
              <p className="text-gray-600">
                View and manage your account information
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
            >
              <FontAwesomeIcon icon={faEdit} />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  defaultValue={user?.name}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800">
                  {user?.name || 'Not provided'}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  defaultValue={user?.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800">
                  {user?.email || 'Not provided'}
                </p>
              )}
            </div>

            {/* User Role */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                User Role
              </label>
              <p className="text-lg font-semibold text-gray-800">
                {user?.role || 'Community Member'}
              </p>
            </div>

            {/* Account Status */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Account Status
              </label>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-success-500 rounded-full"></span>
                <p className="text-lg font-semibold text-gray-800">Active</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          {user?.createdAt && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendar} />
                Member since {formatDateTime(user.createdAt)}
              </p>
            </div>
          )}
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faShieldAlt} />
            Security
          </h2>
          <p className="text-gray-600 mb-4">
            Your account is protected with industry-standard security measures.
          </p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-danger-600 text-white rounded-lg hover:bg-danger-700 font-medium flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faSignOut} />
            Logout
          </button>
        </div>

        {/* Account Information Card */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-3">Account Information</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              You can view and manage your contributions from the Contributions page.
            </li>
            <li>
              Create disaster zones to help coordinate relief efforts in your area.
            </li>
            <li>
              All your contributions are securely stored and can be reviewed anytime.
            </li>
            <li>
              Contact support if you have any questions about your account.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
