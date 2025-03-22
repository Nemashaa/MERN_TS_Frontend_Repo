import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useRegister } from '../hooks/useAuth';
import { AxiosError } from 'axios';
import MainLayout from '../layouts/MainLayout';
import '../styles/Register.css';

// Define type for register form data
interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Define type for error response
interface ErrorResponse {
  error: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
  });

  const registerMutation = useRegister();

  const registerUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerMutation.mutate(registerData, {
      onSuccess: () => {
        setRegisterData({ name: '', email: '', password: '' });
        toast.success('Registration successful! Welcome!');
        navigate('/login');
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        const errorMessage = error.response?.data?.error || 'Registration failed';
        toast.error(errorMessage);
      },
    });
  };

  return (
    <MainLayout>
      <div className="register-page">
        <form className="form" onSubmit={registerUser}>
          <h2>Register</h2>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name..."
            value={registerData.name}
            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email..."
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password..."
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </MainLayout>
  );
}