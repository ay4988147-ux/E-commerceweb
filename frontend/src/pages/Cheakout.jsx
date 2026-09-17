import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      try {
        const cartRes = await api.get(`/cart/${userId}`);
        setCart(cartRes.data || { items: [] });

        const addressRes = await api.get(`/address/${userId}`);

        const data = Array.isArray(addressRes.data)
          ? addressRes.data
          : [];

        setAddresses(data);

        if (data.length > 0) {
          setSelectedAddress(data[0]);
        }
      } catch (error) {
        console.error("Checkout loading error:", error);
      }
    };

    loadData();
  }, [userId, navigate]);

  if (!cart) {
    return <div className="p-6">Loading...</div>;
  }

  const validItems = (cart.items || []).filter(
    (item) => item.productId
  );

  const total = validItems.reduce(
    (sum, item) =>
      sum + Number(item.productId.price) * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!selectedAddress) {
      alert("Please select address");
      return;
    }

    try {
      console.log("Sending order...");

      const res = await api.post("/order/place", {
        userId,
        address: selectedAddress,
      });

      console.log("Order response:", res.data);

      navigate(`/order-success/${res.data.orderId}`);
    } catch (error) {
      console.error("Place order error:", error);
      console.error("Backend response:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Failed to place order"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-4">
        Checkout
      </h1>

      <h2 className="font-semibold mb-2">
        Select Delivery Address
      </h2>

      {addresses.length === 0 ? (
        <div className="border p-4 rounded">
          <p>No address found.</p>

          <button
            onClick={() => navigate("/address")}
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Address
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => (
            <label
              key={addr._id}
              className="block border p-3 rounded cursor-pointer"
            >
              <input
                type="radio"
                name="address"
                checked={
                  selectedAddress?._id === addr._id
                }
                onChange={() =>
                  setSelectedAddress(addr)
                }
                className="mr-2"
              />

              <strong>{addr.fullName}</strong>

              <p className="text-sm">
                {addr.addressLine}, {addr.city},{" "}
                {addr.state} - {addr.pincode}
              </p>

              <p className="text-sm">
                📞 {addr.phone}
              </p>
            </label>
          ))}
        </div>
      )}

      <h2 className="font-semibold mt-6 mb-2">
        Order Summary
      </h2>

      {validItems.map((item) => (
        <div
          key={item.productId._id}
          className="flex justify-between border-b py-2"
        >
          <span>
            {item.productId.title} × {item.quantity}
          </span>

          <span>
            ₹
            {(
              item.productId.price * item.quantity
            ).toFixed(2)}
          </span>
        </div>
      ))}

      <p className="text-lg font-bold mt-4">
        Total: ₹{total.toFixed(2)}
      </p>

      <button
        onClick={placeOrder}
        disabled={!selectedAddress}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded disabled:bg-gray-400"
      >
        Place Order (COD)
      </button>

    </div>
  );
}