import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../components/Hooks/useAdmin";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../Context/AuthProvider";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [admin, loading] = useAdmin(user?.email);
  if (loading) return <Loader />;
  if (user && admin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
