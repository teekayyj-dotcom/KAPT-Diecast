import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Filter, Image as ImageIcon, X, UploadCloud } from "lucide-react";
import { Link } from "react-router-dom";

// Mock Data for Posters
const INITIAL_POSTERS = [
  {
    id: "#PST-001",
    name: "Summer Sale Hero",
    thumbnail: "https://images.unsplash.com/photo-1772309497248-c2331ef18105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXIlMjBwb3N0ZXJ8ZW58MXx8fHwxNzc2MDUzMjc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Homepage Hero",
    status: true,
  },
  {
    id: "#PST-002",
    name: "New Porsche Models",
    thumbnail: "https://images.unsplash.com/photo-1707406768296-3028288ab362?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3JzY2hlJTIwZGllY2FzdCUyMHBvc3RlcnxlbnwxfHx8fDE3NzYwNTMyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Product Page",
    status: true,
  },
  {
    id: "#PST-003",
    name: "Restoration Guide",
    thumbnail: "https://images.unsplash.com/photo-1591920689160-ee83654e464a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY2FyJTIwcG9zdGVyfGVufDF8fHx8MTc3NjA1MzI3OHww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Blog Page",
    status: false,
  },
];

export function Posters() {
  const [search, setSearch] = useState("");
  const [posters, setPosters] = useState(INITIAL_POSTERS);

  // Toggle poster status
  const toggleStatus = (id) => {
    setPosters(posters.map(p => p.id === id ? { ...p, status: !p.status } : p));
  };

  const getLocationBadge = (location) => {
    switch (location) {
      case "Blog Page":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "Product Page":
        return "bg-red-50 text-red-700 border-red-100";
      case "Service Page":
        return "bg-zinc-800 text-zinc-100 border-zinc-900";
      case "Homepage Hero":
      default:
        return "bg-white text-black border-gray-200 shadow-sm";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-black">Poster Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage banners and promotional images across the site.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search posters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all w-64 shadow-sm text-black placeholder:text-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={16} />
            Filter
          </button>
          <Link
            to="/admin/posters/add"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add Poster
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                  ID
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">
                  Thumbnail
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Poster Name
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Display Location
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posters.map((poster) => (
                <tr key={poster.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6 text-sm font-medium text-gray-600">
                    {poster.id}
                  </td>
                  <td className="py-4 px-6">
                    <div className="w-16 h-10 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={poster.thumbnail} alt={poster.name} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium text-black">{poster.name}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getLocationBadge(poster.location)}`}>
                      {poster.location}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      type="button"
                      onClick={() => toggleStatus(poster.id)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 ${
                        poster.status ? "bg-red-600" : "bg-gray-200"
                      }`}
                      role="switch"
                      aria-checked={poster.status}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          poster.status ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to="/admin/posters/add" className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
