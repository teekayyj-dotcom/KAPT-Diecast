import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export function EditUser() {
  const { id } = useParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("customer");
  const [status, setStatus] = useState("active");
  const [joinedDate, setJoinedDate] = useState("");
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8001";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/users/${id}`);
        if (!response.ok) {
          throw new Error("Failed to load user info");
        }
        const data = await response.json();
        setFullName(data.full_name || "");
        setEmail(data.email || "");
        setRole(data.role || "customer");
        setStatus(data.status || "active");
        setJoinedDate(data.created_at ? new Date(data.created_at).toISOString().split("T")[0] : "");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id, apiBaseUrl]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    setIsSaving(true);
    try {
      const response = await fetch(`${apiBaseUrl}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName.trim(),
          role: role.toLowerCase(),
          status: status.toLowerCase(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.detail || "Failed to update user.");
      }

      setSuccess(`User #${id} updated successfully.`);
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Loading profile...</div>;
  }

  return (
    <form onSubmit={handleUpdateUser} className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/users" className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-black hover:bg-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-black">Edit User</h2>
            <p className="text-sm text-gray-500 mt-1">Update role and status for #{id}.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/users" className="bg-white border border-gray-200 text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Cancel
          </Link>
          <button type="submit" disabled={isSaving} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-red-600/20 disabled:opacity-60">
            {isSaving ? "Updating..." : "Update User"}
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
        <h3 className="text-lg font-semibold text-black mb-6">User Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">ID</label>
            <input 
              type="text" 
              disabled 
              value={id} 
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. John Doe" 
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder:text-gray-400" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address (Readonly)</label>
            <input 
              type="email"
              disabled
              value={email}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none cursor-not-allowed" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all appearance-none cursor-pointer capitalize"
            >
              <option value="customer">Customer</option>
              <option value="vip">VIP</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all appearance-none cursor-pointer capitalize"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Joined Date</label>
            <input 
              type="date" 
              disabled
              value={joinedDate}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none cursor-not-allowed" 
            />
          </div>
        </div>
      </div>
    </form>
  );
}
