import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/ui/ProductCard';
import { useCart } from '../context/CartContext';
import { Star, Minus, Plus, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { buildApiUrl } from '../config/api';

const FALLBACK_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800&auto=format&fit=crop';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(buildApiUrl(`/products/${id}`));
        if (!res.ok) {
          throw new Error('Product not found');
        }
        const data = await res.json();
        setProduct(data);
        setActiveImage(getImageUrl(data.main_image_url));

        // Fetch related products (just fetching all and taking 4 for demo)
        const relRes = await fetch(buildApiUrl('/products'));
        if (relRes.ok) {
          const allProds = await relRes.json();
          setRelatedProducts(allProds.filter(p => p.id !== data.id).slice(0, 4));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const getImageUrl = (url) => {
    if (!url) return FALLBACK_PRODUCT_IMAGE;
    if (url.startsWith('http')) return url;
    return buildApiUrl(url);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    // Add multiple items if quantity > 1
    for (let i = 0; i < quantity; i++) {
        addToCart({
        id: product.id,
        name: product.name,
        price: Number(product.price) || 0,
        image: getImageUrl(product.main_image_url),
        scale: product.scale || 'N/A',
        brand: product.diecast_brand || product.original_brand || '',
        color: product.color || '',
        });
    }

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleAddRelatedToCart = (relProduct) => {
    addToCart({
      id: relProduct.id,
      name: relProduct.name,
      price: Number(relProduct.price) || 0,
      image: getImageUrl(relProduct.main_image_url),
      scale: relProduct.scale || 'N/A',
      brand: relProduct.diecast_brand || relProduct.original_brand || '',
      color: relProduct.color || '',
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(Number(price) || 0);
  };

  if (loading) {
    return (
      <div className="bg-[#1c1c1c] min-h-screen flex flex-col items-center justify-center text-white">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400">Loading product details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-[#1c1c1c] min-h-screen flex flex-col items-center justify-center text-white">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-bold mb-4">Error loading product</h2>
            <p className="text-gray-400 mb-6">{error || "Product not found."}</p>
            <Link to="/products" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition">
                Return to Shop
            </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const allImages = [
    getImageUrl(product.main_image_url),
    ...(product.gallery_image_urls || []).map(getImageUrl),
  ];

  return (
    <div className="bg-white min-h-screen font-sans flex flex-col text-black">
      <Header />
      
      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-6xl flex-1 mt-20">
        
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-red-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-red-600 capitalize">Shop</Link>
          <span>/</span>
          <span className="text-red-600 font-medium">{product.name}</span>
        </div>

        {/* Main Product Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="bg-gray-50 aspect-square flex items-center justify-center p-8 border border-gray-100 rounded-lg overflow-hidden">
                <img 
                    src={activeImage} 
                    alt={product.name} 
                    className="w-full h-full object-contain hover:scale-110 transition-transform duration-500"
                />
            </div>
            
            {allImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                {allImages.map((imgUrl, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setActiveImage(imgUrl)}
                        className={`w-20 h-20 bg-gray-50 border-2 rounded-md overflow-hidden shrink-0 transition-colors ${
                            activeImage === imgUrl ? 'border-red-600' : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <img src={imgUrl} alt={`${product.name} thumbnail ${idx+1}`} className="w-full h-full object-contain p-2" />
                    </button>
                ))}
                </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            <div className="mb-2 text-xs text-gray-500 uppercase tracking-wider">
                {product.diecast_brand} / {product.original_brand}
            </div>
            
            <h1 className="text-3xl font-extrabold text-black mb-4">
                {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
                <div className="flex text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                </div>
                <div className="text-sm text-gray-500">
                    10 review(s)
                </div>
            </div>

            <div className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-3">
                {formatPrice(product.price)}
                {/* Simulated old price strike for template parity */}
                <span className="text-sm line-through text-gray-400 font-medium">
                    {formatPrice(Number(product.price) * 1.2)}
                </span>
            </div>

            <div className="mb-6 flex items-center gap-2 text-sm">
                <span className="text-gray-500">Availability:</span>
                <span className={product.in_stock ? "text-red-600 font-medium" : "text-gray-400 font-medium"}>
                    {product.in_stock ? "In Stock" : "Out of Stock"}
                </span>
            </div>

            <div className="text-gray-600 text-sm leading-relaxed mb-6">
                {product.description || "Typi non habent claritatem insitam, est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus."}
            </div>

            {/* Bullet points for details */}
            <ul className="space-y-2 mb-8 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full inline-block"></span>
                    Scale: {product.scale}
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full inline-block"></span>
                    Color: <span className="capitalize">{product.color}</span>
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full inline-block"></span>
                    SKU: {product.sku}
                </li>
            </ul>

            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                    <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 transition"
                    >
                        <Minus size={14} />
                    </button>
                    <div className="px-4 py-2 text-sm font-medium border-x border-gray-300 w-12 text-center">
                        {quantity}
                    </div>
                    <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 transition"
                    >
                        <Plus size={14} />
                    </button>
                </div>
                
                <button 
                    onClick={handleAddToCart}
                    disabled={!product.in_stock}
                    className={`px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap ${!product.in_stock && 'opacity-50 cursor-not-allowed'}`}
                >
                    ADD TO CART
                </button>
            </div>

            {addedToCart && (
              <div className="text-sm font-medium text-emerald-600 mb-4 transition-all">
                ✓ Added {quantity} item(s) to your cart!
              </div>
            )}

            <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="text-sm">
                    <span className="text-gray-500 mr-2">Category:</span>
                    <span className="text-black capitalize">{product.original_brand}, {product.diecast_brand}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-500">Share:</span>
                    <div className="flex items-center gap-3 text-gray-400">
                        <button className="hover:text-black transition"><Facebook size={16} /></button>
                        <button className="hover:text-black transition"><Twitter size={16} /></button>
                        <button className="hover:text-black transition"><Instagram size={16} /></button>
                        <button className="hover:text-black transition"><Linkedin size={16} /></button>
                    </div>
                </div>
            </div>

          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-20 border-t border-gray-200">
            <div className="flex justify-center border-b border-gray-200">
                <button 
                    onClick={() => setActiveTab('description')}
                    className={`px-6 py-4 text-sm font-bold tracking-wider uppercase border-b-2 transition-colors ${activeTab === 'description' ? 'border-red-600 text-black' : 'border-transparent text-gray-400 hover:text-black'}`}
                >
                    Description
                </button>
                <button 
                    onClick={() => setActiveTab('additional')}
                    className={`px-6 py-4 text-sm font-bold tracking-wider uppercase border-b-2 transition-colors ${activeTab === 'additional' ? 'border-red-600 text-black' : 'border-transparent text-gray-400 hover:text-black'}`}
                >
                    Additional Information
                </button>
                <button 
                    onClick={() => setActiveTab('reviews')}
                    className={`px-6 py-4 text-sm font-bold tracking-wider uppercase border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-red-600 text-black' : 'border-transparent text-gray-400 hover:text-black'}`}
                >
                    Reviews (10)
                </button>
            </div>
            
            <div className="py-10">
                {activeTab === 'description' && (
                    <div className="max-w-4xl mx-auto text-sm text-gray-600 space-y-6 leading-relaxed">
                        <p>{product.description}</p>
                        <ul className="space-y-3 mt-6">
                            <li className="flex items-center gap-3">
                                <span className="text-red-500">✓</span> Claritas est etiam processus dynamicus.
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-red-500">✓</span> Qui sequitur mutationem consuetudium lectorum.
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-red-500">✓</span> Claritas est etiam processus dynamicus.
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-red-500">✓</span> Qui sequitur mutationem consuetudium lectorum.
                            </li>
                        </ul>
                    </div>
                )}
                {activeTab === 'additional' && (
                    <div className="max-w-4xl mx-auto text-sm text-gray-600">
                        <table className="w-full text-left border-collapse">
                            <tbody>
                                <tr className="border-b border-gray-100">
                                    <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50 w-1/4">Manufacturer</th>
                                    <td className="py-3 px-4 capitalize">{product.diecast_brand}</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50 w-1/4">Scale</th>
                                    <td className="py-3 px-4 uppercase">{product.scale}</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50 w-1/4">Color</th>
                                    <td className="py-3 px-4 capitalize">{product.color}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === 'reviews' && (
                    <div className="max-w-4xl mx-auto text-sm text-gray-600">
                        <p className="italic">Customer reviews for {product.name} would appear here.</p>
                    </div>
                )}
            </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 pt-10 border-t border-gray-200">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-extrabold uppercase tracking-widest text-black">
                    Related Products
                </h3>
                <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-black">{'<'}</button>
                    <button className="text-gray-400 hover:text-black">{'>'}</button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.length > 0 ? relatedProducts.map(rel => (
                    <div className="border border-gray-100" key={rel.id}>
                        <ProductCard 
                            id={rel.id}
                            title={rel.name}
                            price={formatPrice(rel.price)}
                            image={getImageUrl(rel.main_image_url)}
                            scale={rel.scale || 'N/A'}
                            onAddToCart={() => handleAddRelatedToCart(rel)}
                        />
                    </div>
                )) : (
                    <div className="col-span-4 text-center text-gray-500 text-sm py-10">No related products found.</div>
                )}
            </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
