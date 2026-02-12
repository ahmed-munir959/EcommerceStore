// ==================== routes/PublicRoutes.tsx ====================
import { LogIn, SignUp, EcommHome, Cart, Products, WishList } from "../pages";

const publicRoutes = [
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <EcommHome />,
  },
  {
    path: "/cart/:productId",
    element: <Cart />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/wishlist",
    element: <WishList />,
  },
];

export default publicRoutes;

// Dekho Route composition krna k phela step routes/ PublicRoutes.tsx maa const publicRoutes = [] bnaoo
// usma [{path, element}] oor woo element app import kr raha hu gaa pages sa!!

// too yaa bss configuartion file haa, like if URL is this too render krdoo yaa wala component ko,
//It does not render any thing byt it self it just stores route definitions in an array!


// 🧠 So the Full Flow Is:

// User goes to /products

// <Routes> checks routes

// Finds matching route inside publicRoutes

// Renders:

// <PublicLayout />

// Inside <Outlet /> → <Products />