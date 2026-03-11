import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Footer = () => {
  // State quản lý đóng/mở cho từng menu trên mobile
  const [openMenus, setOpenMenus] = useState({
    shop: false,
    services: false,
    about: false,
  });

  // Hàm toggle: Click vào sẽ đổi trạng thái (đang đóng thành mở, đang mở thành đóng)
  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <footer className="w-full bg-[#141414] text-white pt-16 pb-10 px-6 lg:px-12 font-sans">
      
      {/* --- PHẦN TOP: Logo và Các cột Link --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-8">
        
        {/* Cột 1: Logo & Slogan */}
        {/* Mobile: Căn giữa (items-center, text-center) | Desktop: Căn trái (lg:items-start, lg:text-left) */}
        <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left mb-10 lg:mb-0">
          <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter flex items-center mb-4 lg:mb-6">
            <span>KAPT</span>
            <span className="text-red-brand">DIECAST</span>
          </h2>
          <p className="text-gray-400 text-[15px] leading-relaxed max-w-md">
            The world's premier destination for art-grade diecast models. <br className="hidden lg:block"/>
            Where automotive passion meets collecting excellence.
          </p>
        </div>

        {/* Cột 2: Shop */}
        <div className="lg:col-span-2 lg:col-start-7 flex flex-col border-b border-gray-800 lg:border-none">
          {/* Nút bấm (Chỉ có tác dụng trên Mobile, Desktop thì như chữ bình thường) */}
          <button 
            onClick={() => toggleMenu('shop')}
            className="w-full flex justify-between items-center py-5 lg:py-0 cursor-pointer lg:cursor-default"
          >
            <h3 className="text-lg font-medium">Shop</h3>
            <ChevronDown className={`w-5 h-5 lg:hidden transition-transform duration-300 ${openMenus.shop ? 'rotate-180 text-red-brand' : 'text-gray-400'}`} />
          </button>
          
          {/* Nội dung Dropdown: Mobile thì ẩn/hiện, Desktop (lg) thì luôn luôn hiện */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out lg:max-h-full lg:opacity-100 ${openMenus.shop ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
            <ul className="flex flex-col gap-4 text-[15px] text-gray-400 lg:mt-6">
              <li><a href="#" className="hover:text-red-brand transition-colors duration-200">Scale 1:18</a></li>
              <li><a href="#" className="hover:text-red-brand transition-colors duration-200">Scale 1:24</a></li>
              <li><a href="#" className="hover:text-red-brand transition-colors duration-200">Scale 1:64</a></li>
              <li><a href="#" className="hover:text-red-brand transition-colors duration-200">Limited Editions</a></li>
              <li><a href="#" className="hover:text-red-brand transition-colors duration-200">Pre-Orders</a></li>
            </ul>
          </div>
        </div>

        {/* Cột 3: Services */}
        <div className="lg:col-span-2 flex flex-col border-b border-gray-800 lg:border-none">
          <button 
            onClick={() => toggleMenu('services')}
            className="w-full flex justify-between items-center py-5 lg:py-0 cursor-pointer lg:cursor-default"
          >
            <h3 className="text-lg font-medium">Services</h3>
            <ChevronDown className={`w-5 h-5 lg:hidden transition-transform duration-300 ${openMenus.services ? 'rotate-180 text-red-brand' : 'text-gray-400'}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out lg:max-h-full lg:opacity-100 ${openMenus.services ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
            <ul className="flex flex-col gap-4 text-[15px] text-gray-400 lg:mt-6">
              <li><a href="#" className="hover:text-red-brand transition-colors duration-200">Buy-Back Program</a></li>
              <li><a href="#" className="hover:text-red-brand transition-colors duration-200">Consignment</a></li>
              <li><a href="#" className="hover:text-red-brand transition-colors duration-200">Authentication</a></li>
              <li><a href="#" className="hover:text-red-brand transition-colors duration-200">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-red-brand transition-colors duration-200">Support</a></li>
            </ul>
          </div>
        </div>

        {/* Cột 4: About */}
        <div className="lg:col-span-2 flex flex-col border-b border-gray-800 lg:border-none">
          <button 
            onClick={() => toggleMenu('about')}
            className="w-full flex justify-between items-center py-5 lg:py-0 cursor-pointer lg:cursor-default"
          >
            <h3 className="text-lg font-medium">About</h3>
            <ChevronDown className={`w-5 h-5 lg:hidden transition-transform duration-300 ${openMenus.about ? 'rotate-180 text-red-brand' : 'text-gray-400'}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out lg:max-h-full lg:opacity-100 ${openMenus.about ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
            <ul className="flex flex-col gap-4 text-[15px] text-gray-400 lg:mt-6">
              <li><a href="#" className="hover:text-red-brand transition-colors duration-200">Our Story</a></li>
              <li><a href="#" className="hover:text-red-brand transition-colors duration-200">Collector Circle</a></li>
              <li><a href="#" className="hover:text-red-brand transition-colors duration-200">Events & Shows</a></li>
              <li><a href="#" className="hover:text-red-brand transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-brand transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>
        </div>

      </div>

      {/* --- PHẦN BOTTOM: Bản quyền & Feature tags --- */}
      <div className="mt-12 lg:mt-20 pt-8 border-t border-gray-800 lg:border-none flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-6 lg:gap-0">
        <p className="order-2 md:order-1 text-center md:text-left">© 2026 KAPT Diecast. All rights reserved.</p>
        
        <div className="order-1 md:order-2 flex flex-wrap justify-center items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-brand"></span>
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-brand"></span>
            <span>Worldwide Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-brand"></span>
            <span>Authenticity Guaranteed</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;