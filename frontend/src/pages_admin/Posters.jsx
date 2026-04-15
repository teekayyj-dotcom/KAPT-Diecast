import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit2, Trash2, Image as ImageIcon, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export function Posters() {
  const [posters, setPosters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8001";

  const fetchPosters = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/posters`);
      if (!response.ok) throw new Error("Failed to fetch posters");
      const data = await response.json();
      setPosters(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosters();
  }, [apiBaseUrl]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this poster?")) return;
    try {
      const response = await fetch(`${apiBaseUrl}/posters/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setPosters(posters.filter((p) => p.id !== id));
      } else {
        throw new Error("Failed to delete poster");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredPosters = posters.filter((poster) =>
    poster.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <div>
          <h2 className="text-2xl font-bold text-black flex items-center gap-2">
            <ImageIcon className="text-red-600" size={24} />
            Posters & Banners
          </h2>
          <p className="text-sm text-gray-500 mt-1">Manage promotional banners, hero images, and placement.</p>
        </div>
        <Link 
          to="/admin/posters/add"
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-red-600/20 flex items-center gap-2 w-fit"
        >
          <Plus size={18} />
          Upload Poster
        </Link>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search posters by name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-black focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-64 text-gray-500">Loading posters...</div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 text-red-500">Error: {error}</div>
        ) : filteredPosters.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 text-gray-500">
            <ImageIcon size={32} className="mb-3 text-gray-300" />
            <p>No posters found.</p>
          </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold text-black">Preview</th>
                <th className="px-6 py-4 font-semibold text-black">Poster Name</th>
                <th className="px-6 py-4 font-semibold text-black">Location</th>
                <th className="px-6 py-4 font-semibold text-black">Status</th>
                <th className="px-6 py-4 font-semibold text-black">Upload Date</th>
                <th className="px-6 py-4 text-right font-semibold text-black w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPosters.map((poster) => (
                <tr key={poster.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-3 border-r border-transparent group-hover:border-red-500 transition-all">
                    <div className="w-20 h-10 rounded border border-gray-200 bg-gray-50 overflow-hidden relative group-hover:shadow-sm">
                        {poster.thumbnail ? (
                            <img src={poster.thumbnail} alt={poster.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon size={14} className="text-gray-300" />
                            </div>
                        )}
                        
                        {!poster.status && (
                            <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px]">
                                <EyeOff size={14} className="text-gray-500" />
                            </div>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-black">{poster.name}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{poster.location}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold ${
                      poster.status
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-gray-50 text-gray-600 border border-gray-200"
                    }`}>
                      {poster.status ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(poster.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/posters/edit/${poster.id}`}
                        className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded transition-colors"
                        title="Edit Poster"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button 
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" 
                        title="Delete Poster"
                        onClick={() => handleDelete(poster.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
}
