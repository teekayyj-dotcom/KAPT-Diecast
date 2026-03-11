import React from 'react';

// Nhận các props để component có thể linh hoạt hiển thị nội dung khác nhau
const BlogCard = ({ 
  image, 
  date, 
  title, 
  excerpt, 
  link = '#' 
}) => {
  return (
    <div className="flex flex-col w-full font-sans group">
      
      {/* 1. Ảnh bài viết */}
      <a href={link} className="w-full aspect-[4/3] sm:aspect-square lg:aspect-[4/3] overflow-hidden bg-gray-900 mb-6 block">
        <img 
          // Dùng ảnh mặc định nếu không có dữ liệu truyền vào
          src={image || 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=600&auto=format&fit=crop'} 
          alt={title || 'Blog Post'} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
      </a>

      {/* 2. Ngày tháng (Màu xám, in hoa, dãn chữ) */}
      <p className="text-gray-500 text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] mb-4">
        {date || 'JANUARY 14, 2022'}
      </p>

      {/* 3. Tiêu đề bài viết */}
      <a href={link} className="block">
        <h3 className="text-white text-2xl font-bold leading-snug mb-4 hover:text-red-brand transition-colors duration-300">
          {title || 'Quis Blandit Turpis Cursus Habitasse'}
        </h3>
      </a>

      {/* 4. Đoạn trích (Dùng line-clamp để tự động cắt chữ và thêm dấu ... nếu quá dài) */}
      <p className="text-[#8a8a8a] text-[15px] leading-relaxed mb-8 line-clamp-2">
        {excerpt || 'Volutpat odio facilisis mauris sit amet massa vitae tortor. Semper risus in...'}
      </p>

      {/* 5. Nút Read More */}
      <div>
        <a 
          href={link}
          className="inline-block bg-red-brand text-white px-8 py-3 text-sm font-semibold hover:bg-red-700 transition-colors duration-300"
        >
          Read More
        </a>
      </div>
      
    </div>
  );
};

export default BlogCard;