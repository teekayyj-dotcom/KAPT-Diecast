import { Link } from "react-router-dom";

export function Products() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Products</h2>
        <Link
          to="/admin/products/add"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          + Add New Product
        </Link>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Products list goes here. Click 'Add New Product' to view Screen 2.</p>
      </div>
    </div>
  );
}
