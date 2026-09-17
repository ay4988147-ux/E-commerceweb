import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, address } = req.body;

    console.log("USER ID:", userId);
    console.log("ADDRESS:", address);

    // Find cart
    const cart = await Cart.findOne({ userId })
      .populate("items.productId");

    console.log("CART:", cart);

    if (!cart) {
      return res.status(400).json({
        message: "Cart not found",
      });
    }

    if (cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Remove deleted/missing products
    const validItems = cart.items.filter(
      (item) => item.productId
    );

    if (validItems.length === 0) {
      return res.status(400).json({
        message: "No valid products in cart",
      });
    }

    // Create order items
    const orderItems = validItems.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    // Calculate total
    const totalAmount = orderItems.reduce(
      (total, item) =>
        total + Number(item.price) * Number(item.quantity),
      0
    );

    console.log("ORDER ITEMS:", orderItems);
    console.log("TOTAL:", totalAmount);

    // Create order
    const order = await Order.create({
      userId: userId,

      items: orderItems,

      address: {
        fullName: address.fullName,
        phone: address.phone,
        addressLine: address.addressLine,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      },

      totalAmount: totalAmount,

      paymentMethod: "COD",

      status: "Placed",
    });

    console.log("CREATED ORDER ID:", order._id);

    // Empty cart
    cart.items = [];
    await cart.save();

    // Send order ID to frontend
    return res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id.toString(),
    });

  } catch (error) {
    console.error("================================");
    console.error("PLACE ORDER ERROR:", error);
    console.error("ERROR MESSAGE:", error.message);
    console.error("ERROR STACK:", error.stack);
    console.error("================================");

    return res.status(500).json({
      message: error.message,
    });
  }
};