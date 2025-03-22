import React from 'react';
import MainLayout from '../layouts/MainLayout';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className="home-page">
        <div className="home-content">
          <h1>Welcome to Home Page</h1>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
