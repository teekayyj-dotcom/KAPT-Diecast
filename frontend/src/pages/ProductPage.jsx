import React, { useState } from 'react';
import ProductCard from '../components/ui/ProductCard';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ChevronDown } from 'lucide-react';

// Demo data matching image
const products = [
  { id: 1, title: 'Rolls Royce Cullinan', price: '4.500.000 VND', scale: '1:32', image: 'https://images.unsplash.com/photo-1633507340058-202d08a05c31?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Rolls Royce Cullinan', price: '4.500.000 VND', scale: '1:32', image: 'https://images.unsplash.com/photo-1633507340058-202d08a05c31?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Rolls Royce Cullinan', price: '4.500.000 VND', scale: '1:32', image: 'https://images.unsplash.com/photo-1633507340058-202d08a05c31?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Bugatti Atlantic Concept', price: '4.500.000 VND', scale: '1:32', image: 'https://images.unsplash.com/photo-1603387806509-216e91ea6b60?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: 'Rolls Royce Cullinan', price: '4.500.000 VND', scale: '1:32', image: 'https://images.unsplash.com/photo-1633507340058-202d08a05c31?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: 'Rolls Royce Cullinan', price: '4.500.000 VND', scale: '1:32', image: 'https://images.unsplash.com/photo-1633507340058-202d08a05c31?q=80&w=800&auto=format&fit=crop' },
  { id: 7, title: 'Rolls Royce Cullinan', price: '4.500.000 VND', scale: '1:32', image: 'https://images.unsplash.com/photo-1633507340058-202d08a05c31?q=80&w=800&auto=format&fit=crop' },
  { id: 8, title: 'Bugatti Atlantic Concept', price: '4.500.000 VND', scale: '1:32', image: 'https://images.unsplash.com/photo-1603387806509-216e91ea6b60?q=80&w=800&auto=format&fit=crop' },
  { id: 9, title: 'Rolls Royce Cullinan', price: '4.500.000 VND', scale: '1:32', image: 'https://images.unsplash.com/photo-1633507340058-202d08a05c31?q=80&w=800&auto=format&fit=crop' },
  { id: 10, title: 'Rolls Royce Cullinan', price: '4.500.000 VND', scale: '1:32', image: 'https://images.unsplash.com/photo-1633507340058-202d08a05c31?q=80&w=800&auto=format&fit=crop' },
  { id: 11, title: 'Rolls Royce Cullinan', price: '4.500.000 VND', scale: '1:32', image: 'https://images.unsplash.com/photo-1633507340058-202d08a05c31?q=80&w=800&auto=format&fit=crop' },
  { id: 12, title: 'Bugatti Atlantic Concept', price: '4.500.000 VND', scale: '1:32', image: 'https://images.unsplash.com/photo-1603387806509-216e91ea6b60?q=80&w=800&auto=format&fit=crop' },
];

const FilterSection = ({ title, defaultOpen = true, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#333] mb-4">
      <button 
        className="flex justify-between items-center w-full py-3 text-white font-bold text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform text-white ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-300 text-xs">
          {children}
        </div>
      )}
    </div>
  );
};

const CheckboxList = ({ items }) => (
  <div className="space-y-1.5 mt-2">
    {items.map((item, idx) => (
      <label key={idx} className="flex items-center space-x-2 cursor-pointer group">
        <div className="relative flex items-center justify-center">
          <input type="checkbox" className="peer appearance-none w-3 h-3 bg-white border border-gray-300 rounded-[2px] checked:bg-gray-400 checked:border-gray-400 focus:outline-none focus:ring-0 cursor-pointer" />
          <svg className="absolute w-2 h-2 text-white pointer-events-none hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span className="text-gray-300 hover:text-white transition-colors">{item}</span>
      </label>
    ))}
  </div>
);

const ProductPage = () => {
  return (
    <div className="bg-[#1c1c1c] min-h-screen font-sans flex flex-col">
      <Header />
      
      <main className="flex-1 pb-16">
        {/* Banner */}
      <div className="w-full bg-white relative h-64 sm:h-80 lg:h-[400px] overflow-hidden flex items-center justify-center border-b-[8px] border-[#e3342f]">
        {/* We use an arbitrary sports car placeholder image for the banner */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center brightness-75"></div>
        
        {/* Banner Content Layout */}
        <div className="relative z-10 w-full max-w-7xl px-4 flex justify-start items-center h-full ml-0 md:ml-12 lg:ml-24">
           {/* Banner Text Block (Simulating the design) */}
           <div className="bg-white/90 p-8 py-10 rounded-sm max-w-[500px] backdrop-blur-sm shadow-xl border-l-[6px] border-[#e3342f] relative overflow-hidden">
             
             {/* Decorative Dots inside banner */}
             <div className="absolute bottom-4 right-4 grid grid-cols-4 gap-1 opacity-40">
               {[...Array(16)].map((_, i) => (
                 <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#e3342f]"></div>
               ))}
             </div>

             <h2 className="text-gray-600 font-extrabold italic uppercase tracking-wider mb-[-5px]">
               Exotic & Performance
             </h2>
             <h1 className="text-5xl md:text-6xl font-extrabold italic text-[#e3342f] uppercase leading-none mb-2">
               CAR FOR RENT
             </h1>
             <p className="text-[#e3342f] font-bold italic tracking-wide mb-6 mt-2 text-lg">
               AT 25% DISCOUNT
             </p>

             <p className="text-gray-500 text-xs mb-8 pr-12">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
             </p>
             
             <div className="flex items-center space-x-4">
               <button className="bg-[#e3342f] text-white px-6 py-2 text-xs rounded-sm font-bold shadow hover:bg-red-700 transition duration-300 uppercase tracking-widest">
                 BOOK NOW
               </button>
               <div className="flex space-x-1">
                 <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                 <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                 <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
               </div>
               <span className="text-gray-400 text-[10px] ml-2">www.websitehere.com</span>
             </div>
           </div>
        </div>

        {/* Decorative slants matching design */}
        <div className="absolute right-0 top-0 h-full w-[40%] hidden md:block z-0 pointer-events-none">
          <div className="absolute bg-[#e3342f]/80 w-32 h-[150%] right-[30%] rotate-12 -top-10"></div>
          <div className="absolute bg-white/80 w-8 h-[150%] right-[45%] rotate-12 -top-10"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 gap-4 items-start">
          
          {/* Sidebar */}
          <div className="col-span-1">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-5 rounded-sm h-fit">
              
              <FilterSection title="Price">
                <div className="flex flex-col space-y-3 mt-1">
                  <span className="text-xs text-gray-400">Insert Range</span>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="text" 
                      placeholder="Min" 
                      className="w-full bg-white text-black px-3 py-1.5 text-xs rounded-full border-none focus:ring-0 focus:outline-none" 
                    />
                    <span className="text-white text-xs">to</span>
                    <input 
                      type="text" 
                      placeholder="Max" 
                      className="w-full bg-white text-black px-3 py-1.5 text-xs rounded-full border-none focus:ring-0 focus:outline-none" 
                    />
                  </div>
                </div>
              </FilterSection>

              <FilterSection title="Car brand">
                <CheckboxList items={['Toyota', 'Mercedes-Benz', 'BMW', 'Ford', 'Honda', 'Volkswagen', 'Audi', 'Chevrolet', 'Ferrari', 'Lamborghini']} />
              </FilterSection>

              <FilterSection title="Model Car Brand">
                <CheckboxList items={['Hot Wheels', 'Matchbox', 'Tomica', 'Maisto', 'Bburago', 'MiniGT', 'AUTOart', 'Kyosho', 'Greenlight', 'Norev']} />
              </FilterSection>

              <FilterSection title="Color">
                <CheckboxList items={['Red', 'Black', 'Silver', 'White', 'Blue', 'Gray', 'Yellow', 'Green', 'Orange', 'Purple']} />
              </FilterSection>

            </div>
          </div>

          {/* Product Grid Area w/ Pagination */}
          <div className="col-span-1 lg:col-span-3 flex flex-col">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 flex-1">
              {products.map((product) => (
                <ProductCard 
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  scale={product.scale}
                />
              ))}
            </div>

            {/* Pagination Line below cards */}
            <div className="flex justify-between items-center mt-12 text-gray-400 border-t border-gray-700 pt-6">
              <button className="flex items-center space-x-2 hover:text-white transition-colors group">
                <span className="text-lg leading-none group-hover:-translate-x-1 transition-transform">&larr;</span> 
                <span className="text-sm">Previous</span>
              </button>
              
              <div className="flex items-center space-x-4 text-xs font-medium">
                <button className="bg-gray-500 text-white w-6 h-6 flex items-center justify-center rounded-[2px]">1</button>
                <button className="hover:text-white transition-colors">2</button>
                <button className="hover:text-white transition-colors">3</button>
                <button className="hover:text-white transition-colors">4</button>
                <span className="px-1 text-gray-600">—</span>
                <button className="hover:text-white transition-colors">8</button>
                <button className="hover:text-white transition-colors">9</button>
                <button className="hover:text-white transition-colors">10</button>
              </div>
              
              <button className="flex items-center space-x-2 hover:text-white transition-colors group">
                <span className="text-sm">Next</span> 
                <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>

          </div>
          
        </div>
      </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;