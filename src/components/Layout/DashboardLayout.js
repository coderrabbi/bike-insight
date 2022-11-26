import React, { useContext } from "react";
import Navbar from "../Common/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Common/Footer/Footer";
import { AuthContext } from "../../Context/AuthProvider";
import useAdmin from "../Hooks/useAdmin";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [admin] = useAdmin(user?.email);
  console.log(admin);
  return (
    <div>
      <Navbar />
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content ">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <Link to="addproducts">Add products</Link>
            </li>
            <li>
              <Link to="myorders">My Orders</Link>
            </li>
            <li>
              <Link to="myorders">My Orders</Link>
            </li>
            {admin && (
              <>
                <li>
                  <Link to="allusers">All Users</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
