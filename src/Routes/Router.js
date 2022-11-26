import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import DashboardLayout from "../components/Layout/DashboardLayout";
import PrivetRouter from "./PrivetRouter/PrivetRouter";
import Main from "../components/Layout/Main";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import NotFound from "../Pages/NotFound/NotFound";
import Bikes from "../Pages/BIkes/Bikes";
import MyOrders from "../components/Dadhboard/MyOrders/MyOrders";
import Dashboard from "../components/Dadhboard/Dashboard";
import AllUsers from "../components/Dadhboard/AllUsers/Allusers";
import AddProducts from "../components/Dadhboard/AddProducts/AddProducts";
import AdminRoute from "./AdminRoute/AdminRoute";
import SellerRoute from "./AdminRoute/SellerRoute";

export const routes = createBrowserRouter([
  { path: "*", element: <NotFound /> },
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      {
        path: "/products/:category",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/${params.category}`),
        element: (
          <PrivetRouter>
            <Bikes />
          </PrivetRouter>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRouter>
        <DashboardLayout />
      </PrivetRouter>
    ),
    children: [
      { path: "/dashboard/myorders", element: <MyOrders /> },
      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers />{" "}
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addproducts",
        element: (
          <SellerRoute>
            <AddProducts />
          </SellerRoute>
        ),
      },
    ],
  },
]);
