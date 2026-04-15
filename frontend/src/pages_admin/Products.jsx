import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, Edit2, Trash2, Package } from "lucide-react";

export function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8001";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [apiBaseUrl]);

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${apiBaseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await fetch(`${apiBaseUrl}/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (err) {
      alert(err.message);
    }
  };

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

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-black"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-black">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    Loading products...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Package className="w-12 h-12 text-gray-300 mb-3" />
                      <p>No products found. Start by adding one!</p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
                          {product.main_image_url ? (
                            <img src={getImageUrl(product.main_image_url)} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Package size={16} />
                            </div>
                          )}
                        </div>
                        <div className="font-medium max-w-[200px] truncate">{product.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{product.sku || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-500">{product.original_brand || product.diecast_brand || "N/A"}</td>
                    <td className="px-6 py-4 font-semibold">${parseFloat(product.price).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${product.in_stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {product.in_stock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/admin/products/edit/${product.id}`} className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded transition-colors" title="Edit">
                          <Edit2 size={16} />
                        </Link>
                        <button onClick={() => handleDelete(product.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
