import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/global.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout, Login, Register } from "./components";
import {
  empty,
  forgetPassword,
  login,
  register,
} from "./data/constants/routes";
import ForgetPassword from "./components/ForgetPassword";

const router = createBrowserRouter([
  {
    path: empty,
    element: <Layout />,
    children: [
      { path: login, element: <Login /> },
      { path: register, element: <Register /> },
      { path: forgetPassword, element: <ForgetPassword /> },
      { path: empty, element: <h1>Home</h1> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
