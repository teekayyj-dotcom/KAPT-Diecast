import React from 'react';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ 
  title = 'Rolls Royce Cullinan', 
  price = '$4,500.00', 
  image = 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800&auto=format&fit=crop', // Temporary car model placeholder
  scale = '1:32',
  onAddToCart
}) => {
  return (
    <div className="bg-white flex flex-col h-full relative group shadow-sm hover:shadow-xl transition-shadow duration-300 font-sans">
      
      {/* Scale Badge */}
      <div className="absolute top-2 left-2 bg-gray-200 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
        {scale}
      </div>

      {/* Cart Icon Triangle */}
      <button
        type="button"
        onClick={onAddToCart}
        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-pointer"
        aria-label={`Add ${title} to cart`}
      >
        <div className="border-t-[48px] border-t-[#e3342f] border-l-[48px] border-l-transparent"></div>
        <ShoppingCart className="absolute top-2 right-2 text-white w-4 h-4" />
      </button>

      {/* Image Area */}
      <div className="flex-1 flex items-center justify-center p-4 pt-10 pb-4 overflow-hidden bg-white">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-32 object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Title */}
      <div className="bg-white text-center pb-4 px-2">
        <h3 className="text-sm font-extrabold text-black truncate">
          {title}
        </h3>
      </div>

      {/* Bottom Actions Row */}
      <div className="flex w-full h-[36px] mt-auto">
        <button className="flex-[4] bg-[#1a1a1a] text-white text-[10px] font-bold flex items-center justify-center hover:bg-black transition-colors focus:outline-none tracking-wider">
          LEARN MORE
        </button>
        <div className="flex-[6] bg-[#e3342f] text-white text-[11px] font-bold flex items-center justify-center">
          {price}
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
