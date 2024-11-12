import ProtectedRouter from "@/components/protected-router";
import NotFoundPage from "@/pages/404";
import LoginPage from "@/pages/admin/login";
import ProductPage from "@/pages/admin/products";
import CreateProductPage from "@/pages/admin/products/create";
import UsersPage from "@/pages/admin/users";
import CategoriesPage from "@/pages/admin/categories";
import HomePage from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";
import BrandsPage from "@/pages/admin/brands";
import UpdateProductPage from "@/pages/admin/products/update";
import LayoutHomePage from "@/pages/home/layout";
import CustomersPage from "@/pages/admin/customers";
import OrdersPage from "@/pages/admin/orders";
import LoginHomePage from "@/pages/home/login";
import ProductsHomePage from "@/pages/home/products";
import ProductDetailPage from "@/pages/home/products/detail";
import CartPage from "@/pages/home/cart";
import ForgotPasswordPage from "@/pages/home/forgot-password";
import ResetPasswordPage from "@/pages/home/reset-password";
import CheckoutPage from "@/pages/home/checkout";
import ThanksPage from "@/pages/home/checkout/thanks";
import ProfilePage from "@/pages/home/profile";
import { DashBoardPage } from "@/pages/admin/dashboard";
import LayoutAdminPage from "@/pages/admin";
import BlogsPage from "@/pages/admin/blogs";
import CreateBlogPage from "@/pages/admin/blogs/create";
import BlogHomePage from "@/pages/home/blog";
import BlogDetailPage from "@/pages/home/blog/detail";
import UpdateBlogPage from "@/pages/admin/blogs/update";
import ContactPage from "@/pages/home/contact";
import ChatPage from "@/pages/admin/chats";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutHomePage />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/products",
                element: <ProductsHomePage />,
            },
            {
                path: "/products/:id",
                element: <ProductDetailPage />,
            },
            {
                path: "/cart",
                element: <CartPage />,
            },
            {
                path: "/place-order",
                element: <CheckoutPage />,
            },
            {
                path: "/thanks",
                element: <ThanksPage />,
            },
            {
                path: "/profile",
                element: <ProfilePage />,
            },
            {
                path: "/blogs",
                element: <BlogHomePage />,
            },
            {
                path: "/blogs/:id",
                element: <BlogDetailPage />,
            },
            {
                path: "/contact",
                element: <ContactPage />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginHomePage />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
    },
    {
        path: "/reset-password",
        element: <ResetPasswordPage />,
    },
    {
        element: (
            <ProtectedRouter>
                <LayoutAdminPage />
            </ProtectedRouter>
        ),
        children: [
            {
                path: "/admin",
                element: <DashBoardPage />,
            },
            { path: "/admin/chats", element: <ChatPage /> },
            {
                path: "/admin/blogs",
                element: <BlogsPage />,
            },
            {
                path: "/admin/blogs/create-blog",
                element: <CreateBlogPage />,
            },
            {
                path: "/admin/blogs/:id",
                element: <UpdateBlogPage />,
            },
            {
                path: "/admin/users",
                element: <UsersPage />,
            },
            {
                path: "/admin/categories",
                element: <CategoriesPage />,
            },
            {
                path: "/admin/products",
                element: <ProductPage />,
            },
            {
                path: "/admin/products/create-product",
                element: <CreateProductPage />,
            },
            {
                path: "/admin/products/:id",
                element: <UpdateProductPage />,
            },
            {
                path: "/admin/brands",
                element: <BrandsPage />,
            },
            {
                path: "/admin/customers",
                element: <CustomersPage />,
            },
            {
                path: "/admin/orders",
                element: <OrdersPage />,
            },
        ],
    },
    {
        path: "/admin/login",
        element: <LoginPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

export default router;
