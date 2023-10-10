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
  productDetailsRoute,
  productsRoute,
  registerRoute,
  resetPasswordRoute,
  verifyCodeRoute,
  wishlistRoute,
} from "./data/constants/routes";
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
            <h1>Wishlist</h1>
          </ProtectedRoute>
        ),
      },
      {
        path: productsRoute,
        element: (
          <ProtectedRoute>
            <h1>Products</h1>
          </ProtectedRoute>
        ),
      },
      {
        path: categoriesRoute,
        element: (
          <ProtectedRoute>
            <h1>Categories</h1>
          </ProtectedRoute>
        ),
      },
      {
        path: brandsRoute,
        element: (
          <ProtectedRoute>
            <h1>Brands</h1>
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
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>

      <Toaster />
    </>
  );
}

export default App;
