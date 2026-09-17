
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    stock: "",
  });

  const allowedFields = [
    "title",
    "price",
    "description",
    "category",
    "image",
    "stock",
  ];

  const loadProduct = async () => {
    try {
      console.log("EDIT ID:", id);

      const res = await api.get("/products");

      console.log("PRODUCTS:", res.data);

      const product = res.data.find(
        (p) => String(p._id) === String(id)
      );

      console.log("SELECTED PRODUCT:", product);

      if (!product) {
        alert("Product not found");
        return;
      }

      setForm({
        title: product.title || "",
        price: product.price ?? "",
        description: product.description || "",
        category: product.category || "",
        image: product.image || "",
        stock: product.stock ?? "",
      });
    } catch (error) {
      console.log("LOAD ERROR:", error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("UPDATE ID:", id);
      console.log("UPDATE DATA:", form);

      const res = await api.put(`/products/update/${id}`, {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });

      console.log("UPDATE RESPONSE:", res.data);

      alert("Product updated successfully!");

      navigate("/admin/products");
    } catch (error) {
      console.log(
        "UPDATE ERROR:",
        error.response?.data || error
      );

      alert("Product update failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">
        Edit Product
      </h2>

      <form
        className="space-y-3"
        onSubmit={handleSubmit}
      >
        {allowedFields.map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            className="w-full border px-3 py-2 rounded"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

