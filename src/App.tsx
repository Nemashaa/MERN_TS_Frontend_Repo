import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/AppRoutes";
import "./utils/axiosInterceptor"; // Ensure the interceptor is imported
import useAuthStore from "./store/authStore";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify styles

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { checkAuth, refreshAccessToken } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      await refreshAccessToken();
      await checkAuth();
    };
    initializeAuth();
  }, [checkAuth, refreshAccessToken]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Only use ToastContainer for toast notifications */}
      <AppRoutes /> {/* Navbar is removed here to prevent duplication */}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </QueryClientProvider>
  );
};

export default App;
