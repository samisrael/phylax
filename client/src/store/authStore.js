import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,

  initializeAuth: () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({ user, token, isAuthenticated: true });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  },

  setLoading: (isLoading) => set({ isLoading }),

  setAuth: (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  },

  updateUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  // Role checking utility methods
  isAdmin: () => {
    const state = useAuthStore.getState();
    return state.user && state.user.role === 'ADMIN';
  },

  isUser: () => {
    const state = useAuthStore.getState();
    return state.user && state.user.role === 'USER';
  },

  hasRole: (role) => {
    const state = useAuthStore.getState();
    return state.user && state.user.role === role;
  },
}));

export default useAuthStore;
