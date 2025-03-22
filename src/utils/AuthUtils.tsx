import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { User } from "../interfaces/User"; // Ensure the path is correct

export const logout = async (
  setUser: (user: User | null) => void,
  setAccessToken: (token: string | null) => void,
  navigate: NavigateFunction
): Promise<void> => {
  try {
    await axios.post('/logout', {}, { withCredentials: true });
    setUser(null);
    setAccessToken(null);
    navigate('/');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
