import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isTokenValid, loading } = useAuth();

  // Show loading state while auth is initializing
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Check if user is authenticated and token is valid
  if (!isAuthenticated || !isTokenValid()) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated and token is valid, render children
  return <>{children}</>;
};

export default ProtectedRoute;
