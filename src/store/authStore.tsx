import { create } from "zustand";
import axios from 'axios';
import type { User } from '../interfaces/User'; // Use `type` for type-only import

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void; // Add setIsLoggedIn function
  checkAuth: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  accessToken: null,

  setUser: (user) => set({ user, isLoggedIn: !!user }),

  setAccessToken: (token) => set({ accessToken: token }),

  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }), // Implement setIsLoggedIn

  checkAuth: async () => {
    try {
      const { data } = await axios.get<User>('/profile', { withCredentials: true });
      set({ user: data, isLoggedIn: true });
    } catch {
      set({ user: null, isLoggedIn: false });
    }
  },

  refreshAccessToken: async () => {
    try {
      const { data: responseData } = await axios.post<{ accessToken: string; user: User }>('/refresh-token', {}, { withCredentials: true });
      if (responseData.accessToken) {
        set({ accessToken: responseData.accessToken });
        set({ user: responseData.user, isLoggedIn: true });
      }
    } catch {
      set({ user: null, isLoggedIn: false, accessToken: null });
    }
  },

  logout: async () => {
    try {
      await axios.post('/logout', {}, { withCredentials: true });
      set({ user: null, isLoggedIn: false, accessToken: null }); // Clear all auth-related state
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
}));

export default useAuthStore;
