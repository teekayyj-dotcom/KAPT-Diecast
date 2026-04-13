import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Clock, ArrowRight } from 'lucide-react';

const featuredArticle = {
  id: 1,
  title: 'Exploring Future Model Car Innovations',
  date: 'December 11, 2023',
  description: 'Embark on a journey with us as we delve into the realms of innovation, share insights, and explore the transformative power of scale modeling. Our team of enthusiasts and collectors discuss what the future holds for diecast technology.',
  image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1200&auto=format&fit=crop'
};

const recentArticles = [
  { id: 2, title: 'From Ideas to Impact in Scale Collecting', date: 'November 20, 2023', image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=600&auto=format&fit=crop' },
  { id: 3, title: 'Navigating the Resin Landscape with Insights', date: 'November 20, 2023', image: 'https://images.unsplash.com/photo-1533256086821-65471d4924c5?q=80&w=600&auto=format&fit=crop' },
  { id: 4, title: 'Behind the Scenes of Crafting Our Displays', date: 'November 20, 2023', image: 'https://images.unsplash.com/photo-1605417482436-05beddcf562d?q=80&w=600&auto=format&fit=crop' }
];

const latestArticles = [
  { id: 5, title: 'Empowering Collectors Success Unveiled', date: 'November 21, 2023', image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb29?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: 'Thriving in a Dynamic Model Landscape', date: 'December 8, 2023', image: 'https://images.unsplash.com/photo-1583344654924-d2eab2187747?q=80&w=800&auto=format&fit=crop' },
  { id: 7, title: 'Strategies Propelling Model Startups to Success', date: 'December 8, 2023', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop' },
  { id: 8, title: 'Pioneering the Future in Our Startup Showcase', date: 'December 8, 2023', image: 'https://images.unsplash.com/photo-1558504013-1a2d6aae2eac?q=80&w=800&auto=format&fit=crop' },
  { id: 9, title: 'Artificial Intelligence Impact on Modern Industries', date: 'December 11, 2023', image: 'https://images.unsplash.com/photo-1563729784407-88981f337f7a?q=80&w=800&auto=format&fit=crop' },
  { id: 10, title: 'Healthy Storage Habits for a Busy Lifestyle', date: 'December 11, 2023', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&auto=format&fit=crop' }
];

const Blog = () => {
  return (
    <div className="bg-[#1c1c1c] min-h-screen font-sans flex flex-col text-white">
      <Header />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 py-12 lg:py-16">
        
        {/* Main Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto mt-4 lg:mt-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-wide text-white">
            Our Insightful <span className="underline decoration-[#e3342f] decoration-4 underline-offset-8">Blog</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate tellus luctus neque ullamcorper matti, phasellus leo dolor.
          </p>
        </div>

        {/* Top Section: Featured + Recent */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 items-stretch">
          
          {/* Featured Article (Left - takes 2 cols) */}
          <div className="lg:col-span-2 relative rounded-xl overflow-hidden group cursor-pointer h-[400px] lg:h-auto min-h-[400px]">
            <img 
              src={featuredArticle.image} 
              alt={featuredArticle.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/60 to-transparent"></div>
            
            {/* Content Array */}
            <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10 text-left w-full sm:w-[90%]">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-[#e3342f] transition-colors duration-300">
                {featuredArticle.title}
              </h2>
              <div className="flex items-center text-gray-300 text-xs mb-4 uppercase tracking-wider font-semibold">
                <Clock className="w-4 h-4 mr-2" />
                {featuredArticle.date}
              </div>
              <p className="text-gray-300 text-sm md:text-base line-clamp-3">
                {featuredArticle.description}
              </p>
            </div>
          </div>

          {/* Recent Articles List (Right - takes 1 col) */}
          <div className="flex flex-col justify-between space-y-6">
            {recentArticles.map(article => (
              <div key={article.id} className="bg-[#2a2a2a] rounded-xl overflow-hidden flex h-full group cursor-pointer hover:bg-[#333] transition-colors shadow-lg border border-gray-800">
                {/* Thumbnail */}
                <div className="w-[40%] sm:w-48 lg:w-[40%] flex-shrink-0 relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content */}
                <div className="w-[60%] flex flex-col justify-center p-4 lg:p-5">
                  <h3 className="font-bold text-sm lg:text-base mb-2 group-hover:text-[#e3342f] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center text-gray-400 text-[10px] sm:text-xs mb-4 mt-auto">
                    <Clock className="w-3 h-3 mr-1.5" />
                    {article.date}
                  </div>
                  <div className="flex items-center text-xs font-bold text-gray-300 hover:text-white uppercase tracking-wider mt-4">
                    Read More 
                    <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Middle Section: Latest Articles Grid */}
        <div className="mb-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <h2 className="text-3xl md:text-4xl font-black tracking-wide text-white">
              Explore Our Latest <span className="underline decoration-[#e3342f] decoration-4 underline-offset-8">Articles</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xs text-left md:text-right">
              Lorem ipsum dolor sit amet, consectet adipiscing elit vipu.
            </p>
          </div>

          {/* 3x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {latestArticles.map(article => (
              <div key={article.id} className="bg-[#2a2a2a] rounded-xl overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-black/50 transition-all border border-gray-800 flex flex-col">
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-3 group-hover:text-[#e3342f] transition-colors line-clamp-2 flex-1">
                    {article.title}
                  </h3>
                  <div className="flex items-center text-gray-400 text-xs mb-5">
                    <Clock className="w-3 h-3 mr-2" />
                    {article.date}
                  </div>
                  <div className="flex items-center text-xs font-bold text-white uppercase tracking-wider mt-auto">
                    Read More 
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform text-[#e3342f]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 flex justify-center mb-12">
          <button className="bg-[#2a2a2a] border border-gray-600 text-white px-8 py-3 rounded-md font-bold text-sm tracking-widest hover:bg-[#3a3a3a] transition-colors shadow-lg">
            View all articles
          </button>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Blog;
