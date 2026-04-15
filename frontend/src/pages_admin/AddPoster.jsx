import { useState, useRef } from "react";
import { ArrowLeft, UploadCloud } from "lucide-react";
import { Link } from "react-router-dom";

export function AddPoster() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("Homepage Hero");
  const [status, setStatus] = useState("true"); // string value to match select
  
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const imageInputRef = useRef(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8001";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setThumbnailImage(URL.createObjectURL(file));
    }
  };

  const handleSavePoster = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Poster name is required.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`${apiBaseUrl}/posters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          location: location,
          status: status === "true",
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.detail || "Failed to create poster.");
      }

      const savedPoster = await response.json();

      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("thumbnail", imageFile);

        const imageResponse = await fetch(`${apiBaseUrl}/posters/${savedPoster.id}/image`, {
          method: "POST",
          body: imageFormData,
        });

        if (!imageResponse.ok) {
          const imageData = await imageResponse.json().catch(() => ({}));
          throw new Error(imageData.detail || "Poster created but image upload failed.");
        }
      }

      setSuccess(`Poster created successfully with ID #${savedPoster.id}.`);
      setName("");
      setLocation("Homepage Hero");
      setStatus("true");
      setThumbnailImage(null);
      setImageFile(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSavePoster} className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/posters" className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-black hover:bg-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-black">Upload Poster</h2>
            <p className="text-sm text-gray-500 mt-1">Add a new poster or banner to the system.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/posters" className="bg-white border border-gray-200 text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Cancel
          </Link>
          <button type="submit" disabled={isSaving} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-red-600/20 disabled:opacity-60">
            {isSaving ? "Saving..." : "Save Poster"}
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

      <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <h3 className="text-lg font-semibold text-black mb-6">Poster Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Poster Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Summer Sale Banner" 
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder:text-gray-400" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Platform Location <span className="text-red-500">*</span></label>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="Homepage Hero">Homepage Hero Banner</option>
                <option value="Homepage Footer">Homepage Footer Banner</option>
                <option value="Products Page">Products Page Banner</option>
                <option value="Event Call-to-action">Event Page Call to Action</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="true">Active</option>
                <option value="false">Hidden</option>
              </select>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 text-blue-800 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                <p>To use this poster on the website, reference its assigned ID in the <Link to="/admin/appearance" className="font-semibold underline">Appearance</Link> settings.</p>
            </div>
          </div>

          {/* Right Column - Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Poster Image Setup</label>
            <div 
              className="relative border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-red-400 hover:bg-red-50/30 transition-colors cursor-pointer group group-focus-within:border-red-600 overflow-hidden h-72"
              onClick={() => imageInputRef.current?.click()}
            >
              <input 
                type="file" 
                className="hidden" 
                ref={imageInputRef} 
                accept="image/*" 
                onChange={handleImageChange} 
              />
              
              {thumbnailImage ? (
                <img src={thumbnailImage} alt="Thumbnail Preview" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-red-100 transition-colors">
                    <UploadCloud className="text-gray-400 group-hover:text-red-500 transition-colors" size={24} />
                  </div>
                  <p className="text-sm font-medium text-black mb-1">Click to upload poster image</p>
                  <p className="text-xs text-gray-500">Suggested ratio: 16:9 or ultra-wide</p>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </form>
  );
}
