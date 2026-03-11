import React, { useState, useEffect } from 'react';
import { Search, Globe, User, ShoppingCart, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    // THAY ĐỔI 1: Đổi h-20 thành h-[10vh]
    <header 
      className={`w-full h-[8vh] px-5 lg:px-12 flex items-center justify-between font-sans sticky top-0 z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm border-b border-gray-800' : 'bg-black border-b border-transparent'
      }`}
    >
      
      {/* 1. Logo */}
      <div className="w-auto lg:w-1/4 flex-shrink-0 cursor-pointer z-[110]">
        <h1 className="text-xl font-bold uppercase tracking-wider flex items-center text-white">
          <span>KAPT</span>
          <span className="text-red-brand">DIECAST</span> 
        </h1>
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      
      <div className="hidden lg:flex flex-1 justify-center items-center">
        <nav className="flex items-center gap-8 text-sm font-light tracking-wide text-white">
          <a href="#" className="whitespace-nowrap hover:text-red-brand transition-colors duration-200">About Us</a>
          <a href="#" className="whitespace-nowrap hover:text-red-brand transition-colors duration-200">Product</a>
          <a href="#" className="whitespace-nowrap hover:text-red-brand transition-colors duration-200">Blog</a>
          <a href="#" className="whitespace-nowrap hover:text-red-brand transition-colors duration-200">Services</a>
        </nav>
      </div>

      <div className="hidden lg:flex w-1/4 justify-end items-center gap-5 sm:gap-6 flex-shrink-0 text-white">
        <button className="hover:text-red-brand transition-colors duration-200">
          <Search className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <button className="hover:text-red-brand transition-colors duration-200">
          <Globe className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <button className="hover:text-red-brand transition-colors duration-200">
          <User className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <button className="hover:text-red-brand transition-colors duration-200 relative">
          <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
          <span className="absolute -top-2 -right-2 bg-red-brand text-white text-[10px] font-medium w-4 h-4 flex items-center justify-center rounded-full">3</span>
        </button>
      </div>


      {/* ================= MOBILE VIEW ================= */}

      <div className="flex lg:hidden items-center gap-5 z-[110] text-white">
        <button className="hover:text-red-brand transition-colors duration-200">
          <Search className="w-5 h-5" strokeWidth={1.5} />
        </button>
        
        <button onClick={toggleMenu} className="hover:text-red-brand transition-colors duration-200">
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" strokeWidth={1.5} />
          ) : (
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* THAY ĐỔI 2: Đổi top-20 thành top-[10vh] và chiều cao thành h-[90vh] */}
      <div 
        className={`fixed top-[8vh] left-0 w-full h-[90vh] bg-black z-[105] transition-all duration-300 ease-in-out lg:hidden overflow-y-auto flex flex-col ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full px-6 py-8 text-white">
          <nav className="flex flex-col gap-8 text-2xl font-medium tracking-wide border-b border-gray-800 pb-10 mb-10">
            <a href="#" className="hover:text-red-brand transition-colors duration-200">About Us</a>
            <a href="#" className="hover:text-red-brand transition-colors duration-200">Product</a>
            <a href="#" className="hover:text-red-brand transition-colors duration-200">Blog</a>
            <a href="#" className="hover:text-red-brand transition-colors duration-200">Services</a>
          </nav>
          
          <div className="flex justify-around items-center mt-auto pb-8">
            <button className="flex flex-col items-center gap-2 hover:text-red-brand transition-colors duration-200 relative">
              <ShoppingCart className="w-6 h-6" strokeWidth={1.5} />
              <span className="absolute -top-2 -right-2 bg-red-brand text-white text-[10px] font-medium w-4 h-4 flex items-center justify-center rounded-full">3</span>
              <span className="text-xs text-gray-400">Cart</span>
            </button>
            <button className="flex flex-col items-center gap-2 hover:text-red-brand transition-colors duration-200">
              <User className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-xs text-gray-400">Account</span>
            </button>
            <button className="flex flex-col items-center gap-2 hover:text-red-brand transition-colors duration-200">
              <Globe className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-xs text-gray-400">EN</span>
            </button>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;