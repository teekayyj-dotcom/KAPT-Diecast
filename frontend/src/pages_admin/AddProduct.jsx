import { useState } from "react";
import { 
  UploadCloud, 
  Bold, 
  Italic, 
  Underline, 
  Link2, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Image as ImageIcon,
  Plus,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

export function AddProduct() {
  const [inStock, setInStock] = useState(true);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/products" className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-black hover:bg-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-black">Add New Product</h2>
            <p className="text-sm text-gray-500 mt-1">Fill in the details for the new diecast model.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-200 text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Save as Draft
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-red-600/20">
            Save Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <h3 className="text-lg font-semibold text-black mb-5">Basic Information</h3>
            
            <div className="space-y-5">
              {/* Car Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Car Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Porsche 911 GT3 RS (992)"
                  className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-black placeholder:text-gray-400"
                />
              </div>

              {/* Pricing & SKU Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full pl-7 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-black placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    SKU
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. KAPT-992-GT3"
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-black placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Brands Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Original Car Brand
                  </label>
                  <select defaultValue="" className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-black appearance-none">
                    <option value="" disabled>Select Brand</option>
                    <option value="porsche">Porsche</option>
                    <option value="ferrari">Ferrari</option>
                    <option value="lamborghini">Lamborghini</option>
                    <option value="bmw">BMW</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Diecast Brand
                  </label>
                  <select defaultValue="" className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-black appearance-none">
                    <option value="" disabled>Select Manufacturer</option>
                    <option value="autoart">AUTOart</option>
                    <option value="cmc">CMC</option>
                    <option value="hotwheels">Hot Wheels</option>
                    <option value="minichamps">Minichamps</option>
                    <option value="norev">Norev</option>
                  </select>
                </div>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Scale
                  </label>
                  <select defaultValue="" className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-black appearance-none">
                    <option value="" disabled>Select Scale</option>
                    <option value="1:12">1:12</option>
                    <option value="1:18">1:18</option>
                    <option value="1:24">1:24</option>
                    <option value="1:43">1:43</option>
                    <option value="1:64">1:64</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Color
                  </label>
                  <select defaultValue="" className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-black appearance-none">
                    <option value="" disabled>Select Color</option>
                    <option value="red">Racing Red</option>
                    <option value="black">Jet Black</option>
                    <option value="white">Alpine White</option>
                    <option value="silver">GT Silver</option>
                    <option value="yellow">Racing Yellow</option>
                    <option value="blue">Shark Blue</option>
                  </select>
                </div>
              </div>

              {/* Description (Rich Text Editor Mock) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Detailed Description
                </label>
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-red-600 focus-within:border-transparent transition-all">
                  {/* Toolbar */}
                  <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50/50 flex-wrap">
                    <button className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><Bold size={16} /></button>
                    <button className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><Italic size={16} /></button>
                    <button className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><Underline size={16} /></button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><AlignLeft size={16} /></button>
                    <button className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><AlignCenter size={16} /></button>
                    <button className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><AlignRight size={16} /></button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><List size={16} /></button>
                    <button className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><ListOrdered size={16} /></button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><Link2 size={16} /></button>
                  </div>
                  {/* Editor Area */}
                  <textarea
                    rows={8}
                    placeholder="Describe the material, detailing, moving parts, etc..."
                    className="w-full p-4 text-sm text-black focus:outline-none resize-y min-h-[150px] placeholder:text-gray-400"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Fields (Images & Status) */}
        <div className="space-y-6">
          {/* Status & Availability */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <h3 className="text-lg font-semibold text-black mb-5">Inventory</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">Availability Status</p>
                <p className="text-xs text-gray-500 mt-0.5">{inStock ? "Currently in stock" : "Currently out of stock"}</p>
              </div>
              
              {/* Custom Toggle Switch */}
              <button
                type="button"
                onClick={() => setInStock(!inStock)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 ${
                  inStock ? "bg-red-600" : "bg-gray-200"
                }`}
                role="switch"
                aria-checked={inStock}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    inStock ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Image Upload Dropzone */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <h3 className="text-lg font-semibold text-black mb-1">Product Images</h3>
            <p className="text-xs text-gray-500 mb-5">Upload up to 4 images (1 main + 3 thumbnails)</p>

            <div className="space-y-3">
              {/* Main Image Dropzone */}
              <div className="group relative w-full aspect-[4/3] bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center hover:bg-gray-100 hover:border-red-400 transition-all cursor-pointer overflow-hidden">
                <UploadCloud className="text-gray-400 group-hover:text-red-500 mb-2 transition-colors" size={32} />
                <span className="text-sm font-medium text-gray-600 group-hover:text-red-600">Click to upload main image</span>
                <span className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</span>
                
                {/* Overlay for "Main" badge */}
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded">
                  MAIN IMAGE
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="group aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center hover:bg-gray-100 hover:border-red-400 transition-all cursor-pointer">
                    <Plus className="text-gray-300 group-hover:text-red-500 transition-colors" size={24} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
