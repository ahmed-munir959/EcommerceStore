// src/routes/AppRoutes.tsx
import {  Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout"; // path may vary
import ProtectedRoute from "./ProtectedRoute";

// pages
import {
  LogIn,
  SignUp,
  EcommHome,
  Cart,
  Products,
  WishList,
} from "../pages";

function AppRouter() {
  return (
    
      <Routes>
        {/* PublicLayout always renders Header/Footer and an Outlet for children */}
        <Route path="/" element={<PublicLayout />}>
          {/* index -> renders at path="/" */}
          <Route index element={<LogIn />} />
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />

          {/* Protected routes (wrap with ProtectedRoute) */}
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <EcommHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="cart/:productId"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="wishlist"
            element={
              <ProtectedRoute>
                <WishList />
              </ProtectedRoute>
            }
          />

          {/* Optional: catch-all or 404 route (still within the PublicLayout) */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    
  );
}

export default AppRouter;
