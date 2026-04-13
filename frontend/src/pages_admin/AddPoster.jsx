import { useState } from "react";
import { UploadCloud, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function AddPoster() {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/posters" className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-black hover:bg-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-black flex items-center gap-2">
              <ImageIcon className="text-red-600" size={24} />
              Configure Poster
            </h2>
            <p className="text-sm text-gray-500 mt-1">Upload and set up a new promotional poster.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/posters" className="bg-white border border-gray-200 text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Cancel
          </Link>
          <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-red-600/20">
            Save & Apply
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Image Upload Area */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <h3 className="text-lg font-semibold text-black mb-5">Poster Image</h3>
            <div className="group relative w-full aspect-[21/9] bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center hover:bg-gray-100 hover:border-red-400 transition-all cursor-pointer overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <UploadCloud className="text-gray-400 group-hover:text-red-500 mb-3 transition-colors" size={40} strokeWidth={1.5} />
                <span className="text-sm font-semibold text-gray-600 group-hover:text-red-600">Drag & drop your poster here</span>
                <span className="text-xs text-gray-400 mt-1">or click to browse from your computer</span>
                
                <div className="flex items-center gap-2 mt-4">
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-500 shadow-sm">16:9</span>
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-500 shadow-sm">21:9</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <h3 className="text-lg font-semibold text-black mb-5">Poster Details</h3>
            
            <div className="space-y-5">
              {/* Poster Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Poster Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Summer Sale Hero Banner"
                  className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-black placeholder:text-gray-400"
                />
              </div>

              {/* Placement & Target Link */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Placement / Location <span className="text-red-500">*</span>
                  </label>
                  <select defaultValue="" className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-black appearance-none cursor-pointer">
                    <option value="" disabled>Select a location</option>
                    <option value="homepage">Homepage Hero</option>
                    <option value="product">Product Page</option>
                    <option value="blog">Blog Page</option>
                    <option value="service">Service Page</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Target Link (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://"
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-black placeholder:text-gray-400"
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5">Where users will be redirected upon clicking</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Fields (Status) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <h3 className="text-lg font-semibold text-black mb-5">Settings</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">Active Status</p>
                <p className="text-xs text-gray-500 mt-0.5">{isActive ? "Currently visible" : "Currently hidden"}</p>
              </div>
              
              {/* Custom Toggle Switch */}
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 ${
                  isActive ? "bg-red-600" : "bg-gray-200"
                }`}
                role="switch"
                aria-checked={isActive}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isActive ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
