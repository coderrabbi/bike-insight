import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/bike-insight.png";
import { AuthContext } from "../../../Context/AuthProvider";
import { VscMenu, VscChromeClose } from "react-icons/vsc";
// import DashboardLayout from "../../Layout/DashboardLayout";
import avater from "../../../assets/avater.png";
const Navbar = () => {
  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Bikes", to: "/bikes" },
    { name: "About Us", to: "/about" },
    { name: "Blog", to: "/blog" },
    { name: "Contact", to: "/contact" },
  ];
  const { user, logOut } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const handleSignOut = () => {
    logOut();
  };
  const toggleMenu = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <div className="navbar bg-gray-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            <img src={logo} alt="bike-insight" className="h-[50px]" />
          </Link>
        </div>

        <div className="flex-none relative">
          <div className="flex">
            <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
              {navLinks.map((item, index) => (
                <NavLink key={index} to={item.to}>
                  <li className="text-base list-none font-medium text-black transition-all duration-200 hover:text-red-600 focus:text-red-600">
                    {item.name}
                  </li>
                </NavLink>
              ))}
              {user ? (
                <>
                  <NavLink to={"/dashboard"}>
                    <li className="text-base list-none font-medium text-black transition-all duration-200 hover:text-red-600 focus:text-red-600">
                      My Orders
                    </li>
                  </NavLink>
                  <NavLink to={"/addproducts"}>
                    <li className="text-base list-none font-medium text-black transition-all duration-200 hover:text-red-600 focus:text-red-600">
                      Add Products
                    </li>
                  </NavLink>
                  <NavLink to={"/addservices"}>
                    <li className="text-base list-none font-medium text-black transition-all duration-200 hover:text-red-600 focus:text-red-600">
                      My Products
                    </li>
                  </NavLink>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                      <div className="indicator">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span className="badge badge-sm indicator-item">8</span>
                      </div>
                    </label>
                    <div
                      tabIndex={0}
                      className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
                    >
                      <div className="card-body">
                        <span className="font-bold text-lg">8 Items</span>
                        <span className="text-info">Subtotal: $999</span>
                        <div className="card-actions">
                          <button className="btn bg-black btn-block">
                            View cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <NavLink to={"/login"}>
                    <li className="text-base list-none font-medium text-black transition-all duration-200 hover:text-red-600 focus:text-red-600">
                      Login
                    </li>
                  </NavLink>
                  <NavLink to={"/register"}>
                    <li className="text-base btn list-none font-medium  transition-all duration-200 hover:text-gray-600 focus:text-red-600">
                      Register
                    </li>
                  </NavLink>
                </>
              )}
            </div>
          </div>
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={user?.photoURL ? user.photoURL : avater}
                    alt="profile"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link className="justify-between">Profile</Link>
                </li>
                {/* <li>
                  <Link to="/dashboard" className="justify-between">
                    <DashboardLayout />
                  </Link>
                </li> */}

                <li
                  onClick={handleSignOut}
                  className="cursor-pointer bg-black text-white py-3 "
                >
                  Logout
                </li>
                <li
                  tabIndex={1}
                  htmlFor="dashboard-drawer"
                  className="cursor-pointer bg-black text-white py-3 lg:hidden flex "
                >
                  Open drawer
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}

          {!toggle ? (
            <VscMenu
              onClick={toggleMenu}
              className="inline-flex text-black p-2 transition-all duration-200
            rounded-md lg:hidden   cursor-pointer text-[45px]"
            />
          ) : (
            <VscChromeClose
              onClick={toggleMenu}
              className="inline-flex text-black p-2 transition-all duration-200
                rounded-md lg:hidden   cursor-pointer text-[45px]"
            />
          )}

          {toggle && (
            <nav className="pt-4 mt-[21rem] pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden absolute right-5 w-[200px] z-[10]">
              <div className="flow-root">
                <div className="flex flex-col px-6 -my-2 space-y-1 text-center">
                  {navLinks.map((item, index) => (
                    <NavLink key={index} to={item.to}>
                      <li
                        to={item.to}
                        className="text-base list-none font-medium text-black transition-all duration-200 hover:text-red-500 focus:text-red-600"
                      >
                        {item.name}
                      </li>
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className="px-6 mt-6 text-center flex flex-col gap-2">
                {user?.uid ? (
                  <>
                    <div className="flex flex-col  items-center ">
                      <img
                        className="rounded-full w-8"
                        src={user.photoURL ? user.photoURL : avater}
                        alt=""
                      />
                      <h4 className="text-black">{user.displayName}</h4>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={handleSignOut}
                        className="items-center justify-center  px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-red-500 border border-transparent rounded-md flex hover:bg-blue-700 focus:bg-blue-700 "
                      >
                        Log out
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/register"
                      title=""
                      className="inline-flex justify-center text-base font-semibold text-black transition-all duration-200 border border-transparent hover:text-blue-700 focus:text-blue-700"
                      role="button"
                    >
                      {" "}
                      Register{" "}
                    </NavLink>
                    <NavLink
                      to="/login"
                      title=""
                      className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-black border border-transparent rounded-md tems-center hover:bg-gray-900 "
                      role="button"
                    >
                      {" "}
                      LogIn{" "}
                    </NavLink>
                  </>
                )}
              </div>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
