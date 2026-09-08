import React from "react";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import AuthLayout from "./layouts/AuthLayout";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductsList from "./pages/admin/products/ProductsList";
import CategoryList from "./pages/admin/category/CategoryList";
import OrdersList from "./pages/admin/orders/OrdersList";
import RoleRoute from "./layouts/RoleRoute";
import AddCategory from "./pages/admin/category/AddCategory";
import EditCategory from "./pages/admin/category/EditCategory";
import AddProduct from "./pages/admin/products/AddProduct";
import EditProduct from "./pages/admin/products/EditProduct";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router";

import "./App.css";

function App() {

  const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      }
    ],
  },
  {
      element: <PrivateLayout />,

      children: [

        // ADMIN + USER
        {
          element: (
            <RoleRoute
              allowedRoles={["admin", "user"]}
            />
          ),

          children: [

            {
              path: "/dashboard",
              element: <Dashboard />,
            },

            {
              path: "/dashboard/profile",
              element: <Profile />,
            },

            {
              path: "/dashboard/orders",
              element: <OrdersList />,
            },

          ],
        },


        // ADMIN ONLY
        {
          element: (
            <RoleRoute
              allowedRoles={["admin"]}
            />
          ),

          children: [

            {
              path: "/dashboard/products",
              element: <ProductsList />,
            },

            {
              path: "/dashboard/categories",
              element: <CategoryList />,
            },

            {
              path: "/dashboard/categories/add",
              element: <AddCategory />,
            },
            {
              path: "/dashboard/categories/edit/:id",
              element: <EditCategory />,
            },
            {
              path: "/dashboard/products",
              element: <ProductsList />,
            },

            {
              path: "/dashboard/products/add",
              element: <AddProduct />,
            },
            {
              path: "/dashboard/products/edit/:id",
              element: <EditProduct />,
            },

          ],
        },

      ],
    },
  // {
  //   element: <PrivateLayout />,
  //   children: [
  //     {
  //       path: "/dashboard",
  //       element: <Dashboard />,
  //     },
  //     {
  //       path: "/dashboard/profile",
  //       element: <Profile />,
  //     },
  //     {
  //       path: "/dashboard/products",
  //       element: <ProductsList />,
  //     },
  //     {
  //       path: "/dashboard/categories",
  //       element: <CategoryList />,
  //     },
  //     {
  //       path: "/dashboard/orders",
  //       element: <OrdersList />,
  //     },
  //   ],
  // },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
    


  return (
    <RouterProvider router={router} />
  );
}

export default App;