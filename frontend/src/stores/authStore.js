import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';


export const authStore = create((set,get) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post('client/signup', data);
      toast.success('Account created successfully');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Signup failed');
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('client/login', data);
      const { access_token } = res.data;
      localStorage.setItem('auth-token', access_token);
      get().checkAuth();
      toast.success('Logged in successfully');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed');
    } finally {
      set({ isLoggingIn: false });
    }
  },

  checkAuth: async () => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) throw new Error('No token');

      const res = await axiosInstance.get('client/check-auth', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ user: res.data.client, isCheckingAuth: false });
    } catch (err) {
      set({ user: null, isCheckingAuth: false });
    }
  },

  logout: () => {
    localStorage.removeItem('auth-token');
    set({ user: null });
  },
}));
