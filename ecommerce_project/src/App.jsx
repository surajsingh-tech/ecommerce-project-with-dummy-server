import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NevBar from "./Components/NevBar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import About from "./Pages/AboutPage";
import ContactUs from "./Pages/ContactUs";
import BuyerAddress from "./Pages/BuyerAddress";
import Dashboard from "./Pages/Dashboard";
import LoginPage from "./Pages/LoginPage";
import OrdersPage from "./Pages/OrdersPage";
import ProfilePage from "./Pages/ProfilePage";
import SignUpPage from "./Pages/SignUpPage";
import UpdateProfile from "./Pages/UpdateProfile";
import ForgetPassword from "./Pages/ForgetPassword";
import CartPage from "./Pages/CartPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import WishListPage from "./Pages/WishListPage";
import TestimonialPage from "./Pages/TestimonialPage";
import FeaturesPage from "./Pages/FeaturesPage";
import AdminHomePage from "./Pages/Admin/AdminePage";
import AdminMainCategoryCreatePage from "./Pages/Admin/AdmineMainCategory/AdminMainCategoryCreatePage";
import AdminUpdateCategoryPage from "./Pages/Admin/AdmineMainCategory/AdminUpdateCategoryPage";
import AdminMainCategoryPage from "./Pages/Admin/AdmineMainCategory/AdminMainCategoryPage";
//sub category
import AdmineSubCategoryPage from "./Pages/Admin/AdmineSubCategory/AdminSubCategoryPage";
import AdminSubCategoryCreatePage from "./Pages/Admin/AdmineSubCategory/AdminSubCategoryCreatePage";
import AdminUpdateSubCategoryPage from "./Pages/Admin/AdmineSubCategory/AdminUpdateSubCategoryPage";
//brand
import AdminBrandPage from "./Pages/Admin/AdmineBrandCategory/AdminBrandPage";
import AdminBrandActionCreatePage from "./Pages/Admin/AdmineBrandCategory/AdminBrandActionCreatePage";
import AdminUpdateBrandPage from "./Pages/Admin/AdmineBrandCategory/AdminUpdateBrandPage";
//Feature
import AdmineFeaturePage from "./Pages/Admin/AdmineFeatureCategory/AdminFeaturePage";
import AdminFeatureCreatePage from "./Pages/Admin/AdmineFeatureCategory/AdminFeatureCreatePage";
import AdminUpdateFeaturePage from "./Pages/Admin/AdmineFeatureCategory/AdminUpdateFeaturePage";
//FAQ
import AdminUpdateFAQPage from "./Pages/Admin/AdmineFAQ/AdminUpdateFAQPage";
import AdmineFaqPage from "./Pages/Admin/AdmineFAQ/AdminFAQPage";
import AdminFaqCreatePage from "./Pages/Admin/AdmineFAQ/AdminFAQCreatePage";
//Product
import AdminProductCreatePage from "./Pages/Admin/AdmineProduct/AdminProductCreatePage";
import AdmineProductPage from "./Pages/Admin/AdmineProduct/AdminProductPage";
import AdminUpdateProductPage from "./Pages/Admin/AdmineProduct/AdminUpdateProductPage";
//setting
import AdminSettingCreatePage from "./Pages/Admin/AdmineSetting/AdminSettingCreatePage";
//error
import ErrorPage from "./Pages/ErrorPage";
//shop
import ShopPage from "./Pages/ShopPage";
//ScrollTOp for shoe page always Top
import ScrollTop from "./Components/ScrollTop";
//Checkout
import CheckOutPage from "./Pages/CheckOutPage";
import OrderConfirmationPage from "./Pages/OrderConfirmationPage";
//Aadmin Contact us page
import AdminContactUsShowPage from "./Pages/Admin/AdminContactUs/AdminContactUsShowPage";
import AdminContactUsPage from "./Pages/Admin/AdminContactUs/AdminContactUsPage";
import AdminCheckOutPage from "./Pages/Admin/AdminCheckOut/AdminCheckOutPage";
import AdminCheckOutShowPage from "./Pages/Admin/AdminCheckOut/AdminCheckOutShowPage";
import AdminUserPage from "./Pages/Admin/AdminUser/AdminUserPage";
import AdminUserCreatePage from "./Pages/Admin/AdminUser/AdminUserCreatePage";
import AdminUserUpdatePage from "./Pages/Admin/AdminUser/AdminUserUpdatePage";
import NewsLetter from "./Components/NewsLetter";
import ShownewsLetterPage from "./Pages/ShownewsLetterPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import UnauthorisedUser from "./Pages/UnauthorisedUser";
import AdminUpdateProfile from "./Pages/Admin/AdminUpdateProfile";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollTop />
        <NevBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/testimonial" element={<TestimonialPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/error" element={<ErrorPage />} />

          {/* Buyer Routes */}
          <Route
            path="/buyerAddress"
            element={
              <ProtectedRoute requiredRole="Buyer">
                <BuyerAddress />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashBoard"
            element={
              <ProtectedRoute requiredRole="Buyer">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/myorders"
            element={
              <ProtectedRoute requiredRole="Buyer">
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signUP" element={<SignUpPage />} />
          <Route
            path="/updateProfile"
            element={
              <ProtectedRoute requiredRole="Buyer">
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/updateProfile"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminUpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishList"
            element={
              <ProtectedRoute requiredRole="Buyer">
                <WishListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute requiredRole="Buyer">
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path="/forgetPassword" element={<ForgetPassword />} />

          {/* Admine Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/maincategory"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminMainCategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/maincategoryCreatePage"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminMainCategoryCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`/admin/maincategory/update/:id`}
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminUpdateCategoryPage />
              </ProtectedRoute>
            }
          />
          {/* Subcategory Routes */}
          <Route
            path="/admin/subcategory"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdmineSubCategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/subcategoryCreatePage"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminSubCategoryCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`/admin/subcategory/update/:id`}
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminUpdateSubCategoryPage />
              </ProtectedRoute>
            }
          />
          {/* Brand Routes */}
          <Route
            path="/admin/brand"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminBrandPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/brandCreatePage"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminBrandActionCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`/admin/brand/update/:id`}
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminUpdateBrandPage />
              </ProtectedRoute>
            }
          />
          {/* Feature Routes */}
          <Route
            path="/admin/feature"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdmineFeaturePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/featureCreatePage"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminFeatureCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`/admin/feature/update/:id`}
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminUpdateFeaturePage />
              </ProtectedRoute>
            }
          />
          {/* FAQ Routes */}
          <Route
            path="/admin/fAQ"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdmineFaqPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/fAQCreatePage"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminFaqCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`/admin/fAQ/update/:id`}
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminUpdateFAQPage />
              </ProtectedRoute>
            }
          />
          {/* Product Routes */}
          <Route
            path="/admin/product"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdmineProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ProductCreatePage"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminProductCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`/admin/Product/update/:id`}
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminUpdateProductPage />
              </ProtectedRoute>
            }
          />
          {/* setting Routes */}
          <Route
            path="/admin/setting"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminSettingCreatePage />
              </ProtectedRoute>
            }
          />
          {/* Shop Routes */}
          <Route
            path="/shop/:filterType/:filterValue"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <ShopPage />
              </ProtectedRoute>
            }
          />
          {/* For Error */}
          <Route path="*" element={<ErrorPage />} />
          {/* For Checkout */}
          <Route
            path="/CheckOut"
            element={
              <ProtectedRoute requiredRole="Buyer">
                <CheckOutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/checkout"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminCheckOutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/checkout/show/:id"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminCheckOutShowPage />
              </ProtectedRoute>
            }
          />
          {/* For Order Confirmation*/}
          <Route
            path="/order-confirmation"
            element={
              <ProtectedRoute requiredRole="Buyer">
                <OrderConfirmationPage />
              </ProtectedRoute>
            }
          />
          {/* For Contect show Page*/}
          <Route
            path="/admin/contactus"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminContactUsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contactus/show/:id"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminContactUsShowPage />
              </ProtectedRoute>
            }
          />
          {/*Admin and user page*/}
          <Route
            path="/admin/user"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminUserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user/create"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminUserCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user/update/:id"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <AdminUserUpdatePage />
              </ProtectedRoute>
            }
          />
          {/*News letter*/}
          <Route
            path="/admin/newsletter"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <NewsLetter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/newsletter/show"
            element={
              <ProtectedRoute requiredRole={["Admin", "Super Admin"]}>
                <ShownewsLetterPage />
              </ProtectedRoute>
            }
          />
          {/* For Unauthorised User */}
          <Route path="/unauthorised" element={<UnauthorisedUser />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
