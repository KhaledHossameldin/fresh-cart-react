import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/global.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { RouterProvider, createHashRouter } from "react-router-dom";
import {
  brandsRoute,
  cartRoute,
  categoriesRoute,
  emptyRoute,
  forgetPasswordRoute,
  loginRoute,
  ordersRoute,
  paymentRoute,
  productDetailsRoute,
  registerRoute,
  resetPasswordRoute,
  verifyCodeRoute,
  wishlistRoute,
} from "./constants/routes";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from "./context/auth";
import ProtectedRoute from "./utils/ProtectedRoute";
import {
  Cart,
  ForgetPassword,
  Login,
  Register,
  ResetPassword,
  VerifyCode,
} from "./pages";
import { Layout } from "./components";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CartProvider from "./context/cart";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import Brands from "./pages/Brands";
import WishlistProvider from "./context/wishlist";
import Wishlist from "./pages/Wishlist";
import Categories from "./pages/Categories";

const client = new QueryClient({});

const router = createHashRouter([
  {
    path: emptyRoute,
    element: <Layout />,
    children: [
      { path: loginRoute, element: <Login /> },
      { path: registerRoute, element: <Register /> },
      { path: forgetPasswordRoute, element: <ForgetPassword /> },
      { path: verifyCodeRoute, element: <VerifyCode /> },
      { path: resetPasswordRoute, element: <ResetPassword /> },
      {
        path: emptyRoute,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: cartRoute,
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: wishlistRoute,
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: categoriesRoute,
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: brandsRoute,
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: `${productDetailsRoute}/:id`,
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: paymentRoute,
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: ordersRoute,
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <RouterProvider router={router} />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>

      <Toaster />
    </>
  );
}

export default App;
