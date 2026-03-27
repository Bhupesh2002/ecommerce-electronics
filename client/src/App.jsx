import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { ToastContainer } from 'react-toastify';
import ProductDetails from "./pages/ProductDetails";
import CheckOut from "./pages/CheckOut";
import Cart from "./pages/Cart";
import OrderDetails from "./pages/OrderDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
 
function App(){
  return(
    <>
    <Router>
      <Navbar/>
      <ToastContainer position="top-right"/>  
      <Routes>
        <Route path="/register" element={ <Register/> }/>
        <Route path="/login" element={ <Login/> }/>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={ <ProductDetails/> }/>
        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute> }/>
        <Route path="/checkout" element={ <ProtectedRoute><CheckOut/></ProtectedRoute>  }/>
        <Route path="/order/:id" element={ <ProtectedRoute><OrderDetails/></ProtectedRoute>  }/>
      </Routes>
    </Router>
    </>
  )
}

export default App;
