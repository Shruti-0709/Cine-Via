import Header from './Components/Header';
import Footer from './Components/Footer';
import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Header />
      <div 
        id="app" 
        className="min-h-screen md:pb-24 md:pt-14 relative"
        style={{
          backgroundImage: "url('https://cdn.pixabay.com/photo/2024/01/16/17/38/ai-generated-8512736_1280.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-xs"></div>

        {/* Ensure content appears above overlay */}
        <div className="relative z-10 pt-16">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
