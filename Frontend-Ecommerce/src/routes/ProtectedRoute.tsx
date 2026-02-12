import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // simple check: token existence
  const token = sessionStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
