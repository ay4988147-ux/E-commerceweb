
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Get all products
  const loadProducts = async () => {
    try {
      const res = await api.get("/products");

      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error loading products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/delete/${id}`);

      alert("Product deleted successfully!");

      // Remove deleted product from UI
      setProducts(
        products.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        Loading products...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Product List
        </h1>

        <button
          onClick={() => navigate("/admin/products/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Product
        </button>

      </div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >

            {/* Image */}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />

            {/* Details */}
            <div className="p-4">

              <h2 className="text-lg font-bold mb-2">
                {product.title}
              </h2>

              <p className="text-gray-600 mb-2">
                {product.description}
              </p>

              <p className="font-bold text-lg mb-1">
                ₹{product.price}
              </p>

              <p className="text-sm text-gray-500 mb-4">
                Category: {product.category}
              </p>

              <p className="text-sm mb-4">
                Stock: {product.stock}
              </p>

              {/* Buttons */}
              <div className="flex gap-2">

                <button
                  onClick={() =>
                    navigate(
                      `/admin/products/edit/${product._id}`
                    )
                  }
                  className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(product._id)
                  }
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* No Products */}
      {products.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No products found.
        </p>
      )}

    </div>
  );
}

