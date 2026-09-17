import { useParams, useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  console.log("ORDER ID FROM URL:", orderId);

  return (
    <div className="max-w-xl mx-auto p-6 text-center">

      <h1 className="text-3xl font-bold text-green-600">
        Order Placed Successfully 🎉
      </h1>

      <p className="mt-4">
        Your Order ID:
      </p>

      <p className="mt-2 text-xl font-bold">
        {orderId}
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Continue Shopping
      </button>

    </div>
  );
}