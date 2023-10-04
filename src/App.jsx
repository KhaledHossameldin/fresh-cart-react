import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/global.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ForgetPassword, Layout, Login, Register } from "./components";
import {
  emptyRoute,
  forgetPasswordRoute,
  loginRoute,
  registerRoute,
} from "./data/constants/routes";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from "./context/auth";
import ProtectedRoute from "./utils/ProtectedRoute";

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: emptyRoute,
    element: <Layout />,
    children: [
      { path: loginRoute, element: <Login /> },
      { path: registerRoute, element: <Register /> },
      { path: forgetPasswordRoute, element: <ForgetPassword /> },
      {
        path: emptyRoute,
        element: (
          <ProtectedRoute>
            <h1>Home</h1>
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
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
