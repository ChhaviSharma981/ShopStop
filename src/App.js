import "./App.css";
import Home from "./components/Home/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register/register";
import Login from "./components/Login/login";
import User from "./components/User/user";
import Products from "./components/Products/products";
import Cart from "./components/Products/cart";
import SingleProduct from "./components/Products/singleProduct";
import CheckOut from "./components/Products/checkOut";
import Admin from "./components/AdminDashboard/admin";
import Sales from "./components/SalesManager/sales";
import UpdateProduct from "./components/SalesManager/updateProduct";
import UpdateStore from "./components/SalesManager/updateStore";
import AddStores from "./components/AdminDashboard/addStores";
import UserOderHistory from "./components/Products/UserOderHistory";
import OrderView from "./components/Products/OrderView";
import UserAddReview from "./components/Products/UserAddReview";
import UserProfile from "./components/User/UserProfile";
import SellerAddProduct from "./components/SalesManager/SellerAddProduct";
import ProductList from "./components/SalesManager/productList";
import SRegister from "./components/Register/storeRegister";
import AddCato from "./components/AdminDashboard/addCategory";
import GenerateLink from "./components/AffiliateManager/generateLink";
import ViewStat from "./components/AffiliateManager/viewStat";
import AffiliateSingleProduct from "./components/Products/affiliatesingleProduct";
import VerifyUsers from "./components/AdminDashboard/verifyUsers";
import CategoryList from "./components/AdminDashboard/categoryList";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Products" element={<Products />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/Seller" element={<SRegister />} />
          <Route exact path="/User" element={<User />} />
          <Route exact path="/user/UserProfile" element={<UserProfile />} />
          <Route exact path="/products/cart" element={<Cart />} />
          <Route
            exact
            path="/products/singleProduct/:id"
            element={<SingleProduct />}
          />
          <Route exact path="/products/checkOut" element={<CheckOut />} />
          <Route
            exact
            path="/products/UserOderHistory"
            element={<UserOderHistory />}
          />
          <Route
            exact
            path="/products/OrderView/:orderid"
            element={<OrderView />}
          />
          <Route
            exact
            path="/products/UserAddReview/:productid"
            element={<UserAddReview />}
          />

          <Route exact path="/AdminDashboard/admin" element={<Admin />} />
          <Route
            exact
            path="/AdminDashboard/addStores"
            element={<AddStores />}
          />
          <Route exact path="/AdminDashboard/addCato" element={<AddCato />} />
          <Route
            exact
            path="/AdminDashboard/catoList"
            element={<CategoryList />}
          />
          <Route exact path="/AdminDashboard/user" element={<VerifyUsers />} />

          <Route exact path="/SalesManager/sales" element={<Sales />} />
          <Route
            exact
            path="/SalesManager/SellerAddProduct"
            element={<SellerAddProduct />}
          />
          <Route
            exact
            path="/SalesManager/UpdateProduct/:productid"
            element={<UpdateProduct />}
          />
          <Route
            exact
            path="/SalesManager/updateStore"
            element={<UpdateStore />}
          />
          <Route
            exact
            path="/SalesManager/productList"
            element={<ProductList />}
          />

          <Route exact path="/AffiliateDashboard/view" element={<ViewStat />} />
          <Route
            exact
            path="/AffiliateDashboard/generateLinks"
            element={<GenerateLink />}
          />
          <Route
            exact
            path="/products/AffliateSingleProduct/:id/:code"
            element={<AffiliateSingleProduct />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
