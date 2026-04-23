import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import ProductDetail from './pages/Product-detail'
import CartPage from './pages/Cart'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages_auth/Login'
import SignupPage from './pages_auth/Signup'
import BlogPage from './pages/Blog'
import ServicePage from './pages/Service'
import AboutPage from './pages/AboutPage'
import ProtectedRoute from './components/ProtectedRoute'
import { Layout as AdminLayout } from './pages_admin/Layout'
import { Dashboard as AdminDashboard } from './pages_admin/Dashboard'
import { Products as AdminProducts } from './pages_admin/Products'
import { AddProduct } from './pages_admin/AddProduct'
import { EditProduct } from './pages_admin/EditProduct'
import { Posters as AdminPosters } from './pages_admin/Posters'
import { AddPoster } from './pages_admin/AddPoster'
import { Blogs as AdminBlogs } from './pages_admin/Blogs'
import { AddBlog } from './pages_admin/AddBlog'
import { EditBlog } from './pages_admin/EditBlog'
import { Users as AdminUsers } from './pages_admin/Users'
import { AddUser } from './pages_admin/AddUser'
import { EditUser } from './pages_admin/EditUser'
import { Settings as AdminSettings } from './pages_admin/Settings'
import { Placeholder } from './pages_admin/Placeholder'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="analytics" element={<Placeholder title="Analytics" />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/edit/:id" element={<EditUser />} />
          <Route path="orders" element={<Placeholder title="Orders" />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="posters" element={<AdminPosters />} />
          <Route path="posters/add" element={<AddPoster />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="blogs/add" element={<AddBlog />} />
          <Route path="blogs/edit/:id" element={<EditBlog />} />
          <Route path="messages" element={<Placeholder title="Messages" />} />
          <Route path="integrations" element={<Placeholder title="Integrations" />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </>
  )
}
