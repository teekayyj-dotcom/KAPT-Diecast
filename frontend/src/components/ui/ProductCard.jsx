import React from 'react';

const ProductCard = ({ 
  title = 'Porsche 911', 
  price = '$180/day', 
  image = 'https://images.unsplash.com/photo-1503376710356-748c58257007?q=80&w=800&auto=format&fit=crop', // Tạm dùng ảnh placeholder
  buttonText = 'Book Now' 
}) => {
  return (
    <div className="bg-white border border-gray-200 p-6 flex flex-col h-full rounded-sm font-sans group">
      
      {/* 1. Tên sản phẩm (Góc trái trên cùng) */}
      <h3 className="text-2xl font-bold text-black mb-2">
        {title}
      </h3>

      {/* 2. Ảnh sản phẩm (Căn giữa, chiếm phần lớn không gian) */}
      {/* Dùng flex-1 để tự động đẩy phần footer xuống dưới cùng nếu tên xe có 1 hoặc 2 dòng */}
      <div className="flex-1 flex items-center justify-center py-8 overflow-hidden cursor-pointer">
        <img 
          src={image} 
          alt={title} 
          // object-contain giúp ảnh không bị cắt xén, luôn hiển thị trọn vẹn chiếc xe
          className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* 3. Footer: Giá và Nút bấm */}
      <div className="flex justify-between items-center mt-2">
        
        {/* Giá tiền */}
        <span className="text-xl font-medium text-black">
          {price}
        </span>
        
        {/* Nút bấm (Bo tròn dạng Pill) */}
        <button className="px-6 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-black hover:border-black hover:bg-gray-50 transition-all duration-300">
          {buttonText}
        </button>

      </div>

    </div>
  );
};

export default ProductCard;