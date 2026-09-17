import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ProductList from "./admin/ProductList"
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Cheakout";
import CheckoutAddress from "./pages/CheakoutAddress";
import OrderSuccess from "./pages/OrderSuccess"

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element ={<Cart/>}/>
        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/products/edit/:id" element={<EditProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout-address" element={<CheckoutAddress/>} />
        <Route path="/order-success/:orderid" element={<OrderSuccess />} />
      </Routes>

    </>
  );

};



export default App;

