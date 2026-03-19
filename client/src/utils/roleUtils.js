import useAuthStore from '../store/authStore';

/**
 * Check if current user is an admin
 */
export const isAdmin = () => {
  const user = useAuthStore.getState().user;
  return user && user.role === 'ADMIN';
};

/**
 * Check if current user is a regular user
 */
export const isUser = () => {
  const user = useAuthStore.getState().user;
  return user && user.role === 'USER';
};

/**
 * Check if current user has a specific role
 */
export const hasRole = (role) => {
  const user = useAuthStore.getState().user;
  return user && user.role === role;
};

/**
 * Check if user can edit a contribution
 * Users can only edit their own contributions, admins can edit any
 */
export const canEditContribution = (contributionUserId) => {
  const user = useAuthStore.getState().user;
  if (!user) return false;
  return user.role === 'ADMIN' || user.id === contributionUserId;
};

/**
 * Check if user can delete a contribution
 * Users can only delete their own contributions, admins can delete any
 */
export const canDeleteContribution = (contributionUserId) => {
  const user = useAuthStore.getState().user;
  if (!user) return false;
  return user.role === 'ADMIN' || user.id === contributionUserId;
};

/**
 * Check if user can manage zones
 * Only admins can manage zones
 */
export const canManageZones = () => {
  const user = useAuthStore.getState().user;
  return user && user.role === 'ADMIN';
};

/**
 * Check if user can manage users
 * Only admins can manage users
 */
export const canManageUsers = () => {
  const user = useAuthStore.getState().user;
  return user && user.role === 'ADMIN';
};

/**
 * Get user role label
 */
export const getRoleLabel = (role) => {
  const labels = {
    ADMIN: 'Administrator',
    USER: 'User',
    RESPONDER: 'Emergency Responder',
  };
  return labels[role] || role;
};
