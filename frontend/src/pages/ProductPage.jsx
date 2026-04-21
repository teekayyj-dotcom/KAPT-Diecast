import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ui/ProductCard';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useCart } from '../context/CartContext';
import {
  COLOR_OPTIONS,
  DIECAST_BRAND_OPTIONS,
  ORIGINAL_BRAND_OPTIONS,
  SCALE_OPTIONS,
} from '../constants/productOptions';
import { ChevronDown } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';
const FALLBACK_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800&auto=format&fit=crop';

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

const CheckboxList = ({ items, selectedItems, onToggle }) => (
  <div className="space-y-1.5 mt-2">
    {items.map((item) => (
      <label key={item.value} className="flex items-center space-x-2 cursor-pointer group">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={selectedItems.includes(item.value)}
            onChange={() => onToggle(item.value)}
            className="peer appearance-none w-3 h-3 bg-white border border-gray-300 rounded-[2px] checked:bg-gray-400 checked:border-gray-400 focus:outline-none focus:ring-0 cursor-pointer"
          />
          <svg className="absolute w-2 h-2 text-white pointer-events-none hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span className="text-gray-300 hover:text-white transition-colors">{item.label}</span>
      </label>
    ))}
  </div>
);

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addedProductId, setAddedProductId] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModelBrands, setSelectedModelBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedScales, setSelectedScales] = useState([]);
  const PRODUCTS_PER_PAGE = 12;
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);

        if (!response.ok) {
          throw new Error('Unable to load products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'An error occurred while loading products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [products.length, priceRange.min, priceRange.max, selectedBrands, selectedModelBrands, selectedColors, selectedScales]);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(price) || 0);

  const getImageUrl = (url) => {
    if (!url) return FALLBACK_PRODUCT_IMAGE;
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const toggleSelection = (value, setState) => {
    setState((currentItems) =>
      currentItems.includes(value)
        ? currentItems.filter((item) => item !== value)
        : [...currentItems, value]
    );
  };

  const filteredProducts = products.filter((product) => {
    const price = Number(product.price) || 0;
    const min = priceRange.min === '' ? null : Number(priceRange.min);
    const max = priceRange.max === '' ? null : Number(priceRange.max);
    const matchesMinPrice = min === null || price >= min;
    const matchesMaxPrice = max === null || price <= max;
    const matchesBrand =
      selectedBrands.length === 0 ||
      selectedBrands.includes(product.original_brand || '');
    const matchesModelBrand =
      selectedModelBrands.length === 0 ||
      selectedModelBrands.includes(product.diecast_brand || '');
    const matchesColor =
      selectedColors.length === 0 ||
      selectedColors.includes(product.color || '');
    const matchesScale =
      selectedScales.length === 0 ||
      selectedScales.includes(product.scale || '');

    return (
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesBrand &&
      matchesModelBrand &&
      matchesColor &&
      matchesScale
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      image: getImageUrl(product.main_image_url),
      scale: product.scale || 'N/A',
      brand: product.diecast_brand || product.original_brand || '',
      color: product.color || '',
    });

    setAddedProductId(product.id);
    window.setTimeout(() => {
      setAddedProductId((currentId) => (currentId === product.id ? null : currentId));
    }, 1800);
  };

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
                  <span className="text-xs text-gray-400">Enter price range</span>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="number"
                      min="0"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange((current) => ({ ...current, min: e.target.value }))}
                      placeholder="Min $" 
                      className="w-full bg-white text-black px-3 py-1.5 text-xs rounded-full border-none focus:ring-0 focus:outline-none" 
                    />
                    <span className="text-white text-xs">to</span>
                    <input 
                      type="number"
                      min="0"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange((current) => ({ ...current, max: e.target.value }))}
                      placeholder="Max $" 
                      className="w-full bg-white text-black px-3 py-1.5 text-xs rounded-full border-none focus:ring-0 focus:outline-none" 
                    />
                  </div>
                </div>
              </FilterSection>

              <FilterSection title="Original Car Brand">
                <CheckboxList
                  items={ORIGINAL_BRAND_OPTIONS}
                  selectedItems={selectedBrands}
                  onToggle={(item) => toggleSelection(item, setSelectedBrands)}
                />
              </FilterSection>

              <FilterSection title="Diecast Brand">
                <CheckboxList
                  items={DIECAST_BRAND_OPTIONS}
                  selectedItems={selectedModelBrands}
                  onToggle={(item) => toggleSelection(item, setSelectedModelBrands)}
                />
              </FilterSection>

              <FilterSection title="Scale">
                <CheckboxList
                  items={SCALE_OPTIONS}
                  selectedItems={selectedScales}
                  onToggle={(item) => toggleSelection(item, setSelectedScales)}
                />
              </FilterSection>

              <FilterSection title="Color">
                <CheckboxList
                  items={COLOR_OPTIONS}
                  selectedItems={selectedColors}
                  onToggle={(item) => toggleSelection(item, setSelectedColors)}
                />
              </FilterSection>

            </div>
          </div>

          {/* Product Grid Area w/ Pagination */}
          <div className="col-span-1 lg:col-span-3 flex flex-col">
            {addedProductId && (
              <div className="mb-4 rounded-sm border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-200">
                Product added to cart.
              </div>
            )}

            <div className="mb-4 flex items-center justify-between gap-4 text-sm text-gray-300">
              <span>{filteredProducts.length} product(s) found</span>
              <button
                type="button"
                onClick={() => {
                  setPriceRange({ min: '', max: '' });
                  setSelectedBrands([]);
                  setSelectedModelBrands([]);
                  setSelectedColors([]);
                  setSelectedScales([]);
                }}
                className="rounded-full border border-gray-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300 transition-colors hover:border-white hover:text-white"
              >
                Clear Filters
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 flex-1">
              {isLoading ? (
                <div className="col-span-full rounded-sm border border-[#2a2a2a] bg-[#1a1a1a] px-6 py-10 text-center text-gray-300">
                  Loading products...
                </div>
              ) : error ? (
                <div className="col-span-full rounded-sm border border-red-500/30 bg-red-500/10 px-6 py-10 text-center text-red-200">
                  {error}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="col-span-full rounded-sm border border-[#2a2a2a] bg-[#1a1a1a] px-6 py-10 text-center text-gray-300">
                  No products match the selected filters.
                </div>
              ) : (
                visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    price={formatPrice(product.price)}
                    image={getImageUrl(product.main_image_url)}
                    scale={product.scale || 'N/A'}
                    onAddToCart={() => handleAddToCart(product)}
                  />
                ))
              )}
            </div>

            {/* Pagination Line below cards */}
            <div className="flex justify-between items-center mt-12 text-gray-400 border-t border-gray-700 pt-6">
              <button
                className={`flex items-center space-x-2 transition-colors group ${
                  currentPage === 1 || filteredProducts.length === 0
                    ? 'cursor-not-allowed opacity-40'
                    : 'hover:text-white'
                }`}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1 || filteredProducts.length === 0}
              >
                <span className="text-lg leading-none group-hover:-translate-x-1 transition-transform">&larr;</span> 
                <span className="text-sm">Previous</span>
              </button>
              
              <div className="flex items-center space-x-4 text-xs font-medium">
                {pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`w-6 h-6 flex items-center justify-center rounded-[2px] transition-colors ${
                      currentPage === pageNumber
                        ? 'bg-gray-500 text-white'
                        : 'hover:text-white'
                    }`}
                    onClick={() => setCurrentPage(pageNumber)}
                    disabled={filteredProducts.length === 0}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
              
              <button
                className={`flex items-center space-x-2 transition-colors group ${
                  currentPage === totalPages || filteredProducts.length === 0
                    ? 'cursor-not-allowed opacity-40'
                    : 'hover:text-white'
                }`}
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages || filteredProducts.length === 0}
              >
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
