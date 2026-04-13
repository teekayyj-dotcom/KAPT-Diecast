import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Filter, MoreHorizontal, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

const MOCK_BLOGS = [
  { id: "#BLG-001", title: "Top 10 AUTOart Models of 2026", category: "Review", status: "Published", date: "2026-04-01", thumb: "https://images.unsplash.com/photo-1542451313-0ceafca9c1b7?auto=format&fit=crop&q=80&w=150&h=100" },
  { id: "#BLG-002", title: "Scale 1:18 vs 1:43 Comparison", category: "Guide", status: "Draft", date: "2026-03-28", thumb: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=150&h=100" },
  { id: "#BLG-003", title: "Upcoming Ferrari Releases", category: "News", status: "Published", date: "2026-03-25", thumb: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=150&h=100" },
  { id: "#BLG-004", title: "Diecast Collection Event 2026", category: "Event", status: "Upcoming", date: "2026-03-20", thumb: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=150&h=100" },
];

export function Blogs() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-black">Blogs & Events</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your store's articles and upcoming events.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all w-64 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={16} />
            Filter
          </button>
          <Link to="/admin/blogs/add" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Plus size={16} />
            New Post
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Post details
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Published Date
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_BLOGS.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-black">
                    {blog.id}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200 shrink-0">
                        {blog.thumb ? (
                          <img src={blog.thumb} alt={blog.title} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="text-gray-400" size={20} />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-black mb-0.5">{blog.title}</div>
                        <div className="text-xs text-gray-400 font-medium bg-gray-100 inline-block px-2 py-0.5 rounded">
                          {blog.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        blog.status === "Published"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : blog.status === "Draft"
                          ? "bg-gray-50 text-gray-600 border-gray-200"
                          : "bg-blue-50 text-blue-600 border-blue-100"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">{blog.date}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30 text-sm">
          <span className="text-gray-500">Showing 1 to 4 of 48 entries</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
