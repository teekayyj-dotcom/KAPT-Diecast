import { useState, useEffect, useRef } from "react";
import { 
  UploadCloud, 
  Bold, 
  Italic, 
  Link2, 
  List, 
  Image as ImageIcon,
  ArrowLeft,
  Calendar,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

export function AddBlog() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState("blog");
  const [status, setStatus] = useState("published");
  const [publishedDate, setPublishedDate] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const imageInputRef = useRef(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8001";

  // Automatically generate slug from title
  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(generatedSlug);
  }, [title]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFeaturedImage(URL.createObjectURL(file));
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`${apiBaseUrl}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug,
          content: content.trim(),
          post_type: postType,
          status: status,
          published_date: publishedDate ? new Date(publishedDate).toISOString() : null,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.detail || "Failed to publish blog post.");
      }

      const savedBlog = await response.json();

      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("featured_image", imageFile);

        const imageResponse = await fetch(`${apiBaseUrl}/blogs/${savedBlog.id}/image`, {
          method: "POST",
          body: imageFormData,
        });

        if (!imageResponse.ok) {
          const imageData = await imageResponse.json().catch(() => ({}));
          throw new Error(imageData.detail || "Blog published but image upload failed.");
        }
      }

      setSuccess(`Post published successfully with ID #${savedBlog.id}.`);
      setTitle("");
      setContent("");
      setFeaturedImage(null);
      setImageFile(null);
      setPublishedDate("");
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } catch (err) {
      setError(err.message || "Failed to publish post.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <form onSubmit={handlePublish} className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-black mb-1">Add New Post</h2>
            <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
              <Link to="/admin" className="hover:text-black transition-colors">Dashboard</Link>
              <ChevronRight size={14} className="text-gray-400" />
              <Link to="/admin/blogs" className="hover:text-black transition-colors">Blogs & Events</Link>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-black font-medium">Add New Post</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/blogs" className="bg-white border border-gray-200 text-gray-600 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm text-center">
              Discard Draft
            </Link>
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-red-600/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Publishing..." : "Publish Now"}
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

        {/* Main Form Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            
            {/* Left Column (2/3) */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Post Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Top 10 AUTOart Models of 2026"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-base text-black focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  readOnly
                  placeholder="auto-generated-slug"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-500 cursor-not-allowed font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Post Content
                </label>
                <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col focus-within:ring-1 focus-within:ring-red-600 focus-within:border-red-600 transition-all">
                  {/* WYSIWYG Toolbar */}
                  <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center gap-1 flex-wrap">
                    <button type="button" className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-200 rounded transition-colors" title="Bold">
                      <Bold size={16} />
                    </button>
                    <button type="button" className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-200 rounded transition-colors" title="Italic">
                      <Italic size={16} />
                    </button>
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-200 rounded transition-colors" title="Bullet List">
                      <List size={16} />
                    </button>
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-200 rounded transition-colors" title="Link">
                      <Link2 size={16} />
                    </button>
                    <button type="button" className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-200 rounded transition-colors" title="Image">
                      <ImageIcon size={16} />
                    </button>
                  </div>
                  {/* Editor Area */}
                  <textarea
                    rows={12}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post content here..."
                    className="w-full p-4 bg-white text-sm text-black focus:outline-none resize-y min-h-[300px] placeholder:text-gray-400"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Right Column (1/3) */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <div 
                  className="relative border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-red-400 hover:bg-red-50/30 transition-colors cursor-pointer group group-focus-within:border-red-600 overflow-hidden min-h-[200px]"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={imageInputRef} 
                    accept="image/*" 
                    onChange={handleImageChange} 
                  />
                  
                  {featuredImage ? (
                    <img src={featuredImage} alt="Featured Preview" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-red-100 transition-colors">
                        <UploadCloud className="text-gray-400 group-hover:text-red-500 transition-colors" size={24} />
                      </div>
                      <p className="text-sm font-medium text-black mb-1">Click to upload</p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Post Type
                </label>
                <select 
                  value={postType}
                  onChange={(e) => setPostType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-black focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-all appearance-none cursor-pointer"
                >
                  <option value="blog">Blog Post</option>
                  <option value="event">Event Listing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-black focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-all appearance-none cursor-pointer"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Published Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="datetime-local"
                    value={publishedDate}
                    onChange={(e) => setPublishedDate(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-black focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-all cursor-pointer"
                  />
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
