import { useQuery, useMutation } from '@tanstack/react-query'; // Correct import for React Query
import axios, { AxiosResponse, AxiosError } from 'axios'; // Use AxiosError from axios
import useAuthStore from '../store/authStore';
import React from 'react';

// Define types for user data
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  user?: User;
  error: string; // Ensure `error` is always a string
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const useCheckAuth = () => {
  const { setUser } = useAuthStore();

  const query = useQuery<User | null, Error>({
    queryKey: ['profile'],
    queryFn: async (): Promise<User> => {
      const res: AxiosResponse<User> = await axios.get('/profile');
      return res.data;
    },
    enabled: false, // Prevent automatic fetching
  });

  // Handle side effects using useEffect
  React.useEffect(() => {
    if (query.isSuccess && query.data) {
      setUser(query.data);
    } else if (query.isError) {
      setUser(null);
    }
  }, [query.isSuccess, query.isError, query.data, setUser]);

  return query;
};

export const useLogin = () => {
  const { setUser } = useAuthStore();

  return useMutation<AuthResponse, Error, LoginData>({
    mutationFn: async (loginData: LoginData): Promise<AuthResponse> => {
      const res: AxiosResponse<AuthResponse> = await axios.post('/login', loginData);
      return res.data;
    },
    onSuccess: (responseData) => {
      if (responseData.error) {
        throw new Error(responseData.error);
      } else if (responseData.user) {
        setUser(responseData.user);
      }
    },
  });
};

export const useRegister = () => {
  return useMutation<AuthResponse, AxiosError<AuthResponse>, RegisterData>({
    mutationFn: async (registerData: RegisterData): Promise<AuthResponse> => {
      const res: AxiosResponse<AuthResponse> = await axios.post('/register', registerData);
      return res.data;
    },
    onSuccess: (responseData) => {
      if (responseData.error) {
        throw new Error(responseData.error);
      }
    },
    onError: (error: AxiosError<AuthResponse>) => {
      // Handle AxiosError specifically
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    },
  });
};

export const useLogout = () => {
  const { setUser } = useAuthStore();

  return useMutation<void, Error>({
    mutationFn: async (): Promise<void> => {
      await axios.post('/logout');
    },
    onSuccess: () => {
      setUser(null);
    },
  });
};