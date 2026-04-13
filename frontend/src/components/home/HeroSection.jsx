import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBg from '../../assets/media/hero-image.jpg'

const HeroSection = () => {
  return (
    // Container chính: Cao bằng 100vh trừ đi độ cao của Header (h-20), tương đối (relative) để chứa ảnh absolute
    <section className="relative w-full h-[92vh] min-h-[500px] flex items-center font-sans">
      
      {/* 1. Background Image */}
      {/* Thay url ảnh bằng đường dẫn ảnh thật của sếp. Tạm thời tôi dùng một ảnh placeholder siêu xe cho sếp dễ hình dung */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      ></div>

      {/* 2. Linear Gradient Overlay (Từ trên-trái chéo xuống dưới-phải) */}
      {/* Lớp này phủ lên ảnh, tạo nền đen ở bên trái để làm nổi bật chữ */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"></div>

      {/* Thêm một lớp gradient phụ từ trái sang phải để đảm bảo chữ không bao giờ bị chìm */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

      {/* 3. Nội dung Content (Chữ & Nút) */}
      <div className="relative z-10 w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="max-w-xl lg:max-w-2xl">
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Where Passion <br /> Meets Precision
          </h1>
          
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.
          </p>
          
          <Link to="/products" className="flex items-center w-fit gap-2 bg-red-brand text-white px-8 py-4 text-base font-medium hover:bg-red-700 hover:scale-105 transition-all duration-300 inline-flex">
            Discover the Collection
            <ChevronRight className="w-5 h-5" />
          </Link>

        </div>
      </div>

    </section>
  );
};

export default HeroSection;