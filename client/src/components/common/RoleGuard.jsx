import React from 'react';
import useAuthStore from '../store/authStore';

/**
 * Component that renders children only if user has the specified role
 */
const RoleGuard = ({ role, children, fallback = null }) => {
  const user = useAuthStore((state) => state.user);

  if (!user || user.role !== role) {
    return fallback;
  }

  return children;
};

export default RoleGuard;
