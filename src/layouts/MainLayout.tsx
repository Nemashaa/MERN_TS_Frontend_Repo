import React from 'react';
import Navbar from '../components/Navbar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar /> 
      <div style={{ flex: 1, width: "100%" }}>{children}</div> 
    </div>
  );
};

export default MainLayout;
