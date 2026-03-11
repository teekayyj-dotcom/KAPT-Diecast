import React from 'react';
import BlogCard from '../ui/BlogCard';

// Dữ liệu giả lập cho 3 bài viết (Sếp thay bằng link ảnh hoặc biến ảnh thật nhé)
const blogData = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=600&auto=format&fit=crop', // Ảnh cây cảnh
    date: 'JANUARY 14, 2022',
    title: 'Quis Blandit Turpis Cursus Habitasse',
    excerpt: 'Volutpat odio facilisis mauris sit amet massa vitae tortor. Semper risus in...'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=600&auto=format&fit=crop', // Ảnh ghế tựa
    date: 'JANUARY 14, 2022',
    title: 'Pharetra Etultrices Neque Ornare Aenean',
    excerpt: 'Cras adipiscing enim eu turpis egestas pretium aenean pharetra. Quam id leo...'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?q=80&w=600&auto=format&fit=crop', // Ảnh xe đạp hoa vàng
    date: 'JANUARY 14, 2022',
    title: 'Cras Semper Auctor Neque Vitae',
    excerpt: 'Diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Nisl nisi...'
  }
];

const BlogSection = () => {
  return (
    <section className="w-full bg-black py-20 px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Phần Tiêu đề & Nút All Posts --- */}
        {/* Dùng flex-col trên mobile và flex-row trên desktop để đẩy 2 thành phần về 2 góc */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 lg:mb-16 gap-6 sm:gap-0">
          
          {/* Tiêu đề bên trái */}
          <div>
            <h3 className="text-red-brand text-xl font-bold mb-2">Blog</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">Upcoming Events</h2>
          </div>

          {/* Nút All Posts bên phải */}
          <a 
            href="#" 
            className="inline-block border border-gray-500 text-white text-xs font-bold uppercase tracking-widest py-3 px-8 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            All Posts
          </a>

        </div>

        {/* --- Lưới hiển thị 3 thẻ Blog Card --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {blogData.map((post) => (
            <BlogCard 
              key={post.id}
              image={post.image}
              date={post.date}
              title={post.title}
              excerpt={post.excerpt}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogSection;