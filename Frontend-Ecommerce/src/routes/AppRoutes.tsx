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



// import { Routes, Route } from "react-router-dom";
// import publicRoutes from "./PublicRoutes";
// import PublicLayout from "../layouts/PublicLayout";

// function AppRoutes() {
//   return (
//     <Routes>
//       {/* Public Layout */}
//       <Route element={<PublicLayout />}>
//         {publicRoutes.map((route) => (
//           <Route
//             key={route.path}
//             path={route.path}
//             element={route.element}
//           />
//         ))}
//       </Route>
//     </Routes>
//   );
// }

// export default AppRoutes;



// step 2
// Now this is where Real Routing happens!!
// <Routes> -->> This is the Router switch system, yaa check krta current URL ko, Ex If URL = /signup. It looks through all <Route> paths to find a match. Abb yaha p -->> <Route element={<PublicLayout />}> too <Route> ki jagga <Routes> matching path k component render krwa deta!! <Route element={<PublicLayout />}> This means mwans wraps all child routes inside PublicLayout. This is called a layout route.


// Step 3
// <Routes> under the hood isma -->> <Route element={<PublicLayout />}>, inside genearte krta <Route path="/signup" element={<SignUp />} />. So when URL = /signup:. React Router does this: 



