import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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

export function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inStock, setInStock] = useState(true);
  const [carName, setCarName] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [originalBrand, setOriginalBrand] = useState("");
  const [diecastBrand, setDiecastBrand] = useState("");
  const [scale, setScale] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([null, null, null]);
  
  const [mainImageFile, setMainImageFile] = useState(null);
  const [thumbnailFiles, setThumbnailFiles] = useState([null, null, null]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const mainInputRef = useRef(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8001";

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    return `${apiBaseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const data = await response.json();
        setCarName(data.name || "");
        setPrice(data.price || "");
        setSku(data.sku || "");
        setOriginalBrand(data.original_brand || "");
        setDiecastBrand(data.diecast_brand || "");
        setScale(data.scale || "");
        setColor(data.color || "");
        setDescription(data.description || "");
        setInStock(data.in_stock !== undefined ? data.in_stock : true);
        
        if (data.main_image_url) {
          setMainImage(getImageUrl(data.main_image_url));
        }
        
        if (data.gallery_image_urls && data.gallery_image_urls.length > 0) {
          const newThumbs = [null, null, null];
          data.gallery_image_urls.forEach((url, idx) => {
            if (idx < 3) newThumbs[idx] = getImageUrl(url);
          });
          setThumbnails(newThumbs);
        }
        
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id, apiBaseUrl]);

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      setMainImage(URL.createObjectURL(file));
    }
  };

  const handleThumbnailChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newThumbnails = [...thumbnails];
      const newThumbnailFiles = [...thumbnailFiles];
      newThumbnails[index] = URL.createObjectURL(file);
      newThumbnailFiles[index] = file;
      setThumbnails(newThumbnails);
      setThumbnailFiles(newThumbnailFiles);
    }
  };

  const handleSaveProduct = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!carName.trim() || !price) {
      setError("Car name and price are required.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`${apiBaseUrl}/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: carName.trim(),
          sku: sku.trim() || null,
          original_brand: originalBrand || null,
          diecast_brand: diecastBrand || null,
          scale: scale || null,
          color: color || null,
          description: description.trim() || null,
          price: Number(price),
          in_stock: inStock,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.detail || "Failed to update product.");
      }

      if (mainImageFile || thumbnailFiles.some(Boolean)) {
        const imageFormData = new FormData();

        if (mainImageFile) {
          imageFormData.append("main_image", mainImageFile);
        }

        thumbnailFiles.forEach((file) => {
          if (file) {
            imageFormData.append("gallery_images", file);
          }
        });

        const imageResponse = await fetch(`${apiBaseUrl}/products/${id}/images`, {
          method: "POST",
          body: imageFormData,
        });

        if (!imageResponse.ok) {
          const imageData = await imageResponse.json().catch(() => ({}));
          throw new Error(imageData.detail || "Product updated but image upload failed.");
        }
      }

      setSuccess(`Product #${id} updated successfully.`);
    } catch (err) {
      setError(err.message || "Failed to update product.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Loading product details...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <form onSubmit={handleSaveProduct} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/products" className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-black hover:bg-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-black">Edit Product</h2>
            <p className="text-sm text-gray-500 mt-1">Update details for #{id}.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/products" className="bg-white border border-gray-200 text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Cancel
          </Link>
          <button type="submit" disabled={isSaving} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-red-600/20 disabled:cursor-not-allowed disabled:opacity-60">
            {isSaving ? "Updating..." : "Update Product"}
          </button>
        </div>
      </div>

      {(error || success) && (
        <div className={`rounded-lg border px-4 py-3 text-sm ${
          error
            ? "border-red-200 bg-red-50 text-red-700"
            : "border-emerald-200 bg-emerald-50 text-emerald-700"
        }`}>
          {error || success}
        </div>
      )}

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
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
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
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
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
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
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
                  <select value={originalBrand} onChange={(e) => setOriginalBrand(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-black appearance-none">
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
                  <select value={diecastBrand} onChange={(e) => setDiecastBrand(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-black appearance-none">
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
                  <select value={scale} onChange={(e) => setScale(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-black appearance-none">
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
                  <select value={color} onChange={(e) => setColor(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-black appearance-none">
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
                    <button type="button" className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><Bold size={16} /></button>
                    <button type="button" className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><Italic size={16} /></button>
                    <button type="button" className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><Underline size={16} /></button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><AlignLeft size={16} /></button>
                    <button type="button" className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><AlignCenter size={16} /></button>
                    <button type="button" className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><AlignRight size={16} /></button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><List size={16} /></button>
                    <button type="button" className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><ListOrdered size={16} /></button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 rounded transition-colors"><Link2 size={16} /></button>
                  </div>
                  {/* Editor Area */}
                  <textarea
                    rows={8}
                    placeholder="Describe the material, detailing, moving parts, etc..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
              <div 
                className="group relative w-full aspect-[4/3] bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center hover:bg-gray-100 hover:border-red-400 transition-all cursor-pointer overflow-hidden"
                onClick={() => mainInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={mainInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleMainImageChange} 
                />
                
                {mainImage ? (
                  <img src={mainImage} className="w-full h-full object-cover" alt="Main Preview" />
                ) : (
                  <>
                    <UploadCloud className="text-gray-400 group-hover:text-red-500 mb-2 transition-colors" size={32} />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-red-600">Click to upload main image</span>
                    <span className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</span>
                  </>
                )}
                
                {/* Overlay for "Main" badge */}
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded">
                  MAIN IMAGE
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-3 gap-3">
                {thumbnails.map((thumb, idx) => (
                  <div key={idx} className="relative group aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center hover:bg-gray-100 hover:border-red-400 transition-all cursor-pointer overflow-hidden">
                    <label className="absolute inset-0 flex items-center justify-center cursor-pointer w-full h-full">
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={(e) => handleThumbnailChange(idx, e)}
                      />
                      {thumb ? (
                        <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      ) : (
                        <Plus className="text-gray-300 group-hover:text-red-500 transition-colors" size={24} />
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
}
