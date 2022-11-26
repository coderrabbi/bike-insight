import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../components/Hooks/useAdmin";
import useSeller from "../../components/Hooks/useSeller";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../Context/AuthProvider";

const SellerRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [admin, loading] = useAdmin(user?.email);
  const [seller, sellerLoading] = useSeller(user?.email);
  if (loading || sellerLoading) return <Loader />;
  if ((user && admin) || seller) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
