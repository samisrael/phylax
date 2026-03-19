import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faMap,
  faHandHoldingHeart,
  faUser,
  faSignOut,
  faBars,
  faTimes,
  faChartLine,
  faUsers,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';
import useAuthStore from '../../store/authStore';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-600 border-b-2 border-primary-600' : '';
  };

  const isAdmin = user?.role === 'ADMIN';

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faChartLine} className="text-primary-600 text-2xl" />
            <span className="text-xl font-bold text-gray-800">Phylax</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 py-2 px-3 text-sm font-medium text-gray-700 hover:text-primary-600 ${isActive(
                '/dashboard'
              )}`}
            >
              <FontAwesomeIcon icon={faHome} />
              Dashboard
            </Link>
            <Link
              to="/zones"
              className={`flex items-center gap-2 py-2 px-3 text-sm font-medium text-gray-700 hover:text-primary-600 ${isActive(
                '/zones'
              )}`}
            >
              <FontAwesomeIcon icon={faMap} />
              Zones
            </Link>
            <Link
              to="/contributions"
              className={`flex items-center gap-2 py-2 px-3 text-sm font-medium text-gray-700 hover:text-primary-600 ${isActive(
                '/contributions'
              )}`}
            >
              <FontAwesomeIcon icon={faHandHoldingHeart} />
              Contributions
            </Link>
            
            {/* Admin Links */}
            {isAdmin && (
              <>
                <Link
                  to="/admin/dashboard"
                  className={`flex items-center gap-2 py-2 px-3 text-sm font-medium text-gray-700 hover:text-primary-600 ${isActive(
                    '/admin/dashboard'
                  )}`}
                >
                  <FontAwesomeIcon icon={faShieldAlt} />
                  Admin
                </Link>
                <Link
                  to="/admin/users"
                  className={`flex items-center gap-2 py-2 px-3 text-sm font-medium text-gray-700 hover:text-primary-600 ${isActive(
                    '/admin/users'
                  )}`}
                >
                  <FontAwesomeIcon icon={faUsers} />
                  Users
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
            <Link
              to="/profile"
              className="p-2 text-gray-700 hover:text-primary-600"
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-danger-600 text-white rounded-lg hover:bg-danger-700 transition-colors"
            >
              <FontAwesomeIcon icon={faSignOut} />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-primary-600"
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <Link
              to="/dashboard"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Dashboard
            </Link>
            <Link
              to="/zones"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faMap} className="mr-2" />
              Zones
            </Link>
            <Link
              to="/contributions"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faHandHoldingHeart} className="mr-2" />
              Contributions
            </Link>
            
            {/* Admin Links Mobile */}
            {isAdmin && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                  Admin Dashboard
                </Link>
                <Link
                  to="/admin/users"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  <FontAwesomeIcon icon={faUsers} className="mr-2" />
                  Manage Users
                </Link>
              </>
            )}
            
            <Link
              to="/profile"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-danger-600 hover:bg-danger-50"
            >
              <FontAwesomeIcon icon={faSignOut} className="mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
