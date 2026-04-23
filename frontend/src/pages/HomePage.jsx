import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import ShopByScale from '../components/home/ShopByScale';
import BlogSection from '../components/home/BlogSection';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { currentUser, isAdmin, loading } = useAuth();

  if (!loading && currentUser && isAdmin) {
    return <Navigate to="/admin" replace />
  }

  return (

    <div className="min-h-screen flex flex-col bg-black font-sans">
      
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center border-t border-gray-800">
        
        <HeroSection />
        <ShopByScale />
        <BlogSection />

      </main>

      <Footer />

    </div>
  );
};

export default HomePage;
