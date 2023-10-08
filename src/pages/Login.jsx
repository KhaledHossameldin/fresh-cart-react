import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/auth";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import { object } from "yup";
import { emailSchema, passwordSchema } from "../utils/validators";
import toast, { Toaster } from "react-hot-toast";
import { ErrorLabel } from "../components";
import { emptyRoute, forgetPasswordRoute } from "../data/constants/routes";
import { FallingLines } from "react-loader-spinner";
import { mainColor } from "../data/constants/colors";
import axios from "axios";
import { loginUrl } from "../data/constants/network";

function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(authContext);
  const { mutate, isLoading } = useMutation(
    (values) => axios.post(loginUrl, values),
    {
      onSuccess: (response) => {
        setToken(response.data.token);
        navigate(emptyRoute);
      },
      onError: (error) => toast.error(error.response.data.message),
    }
  );

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: object({
      email: emailSchema,
      password: passwordSchema,
    }),
    onSubmit: (values) => mutate(values),
  });

  return (
    <div className="container my-5 py-5">
      <Toaster />
      <h2 className="fw-bold">Login</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="my-3">
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorLabel
            error={formik.errors.email}
            isTouched={formik.touched.email ?? false}
          />
        </div>
        <div className="my-3">
          <label htmlFor="password">Password :</label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-control mt-1"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorLabel
            error={formik.errors.password}
            isTouched={formik.touched.password ?? false}
          />
        </div>
        <div className="d-flex justify-content-between">
          <Link to={forgetPasswordRoute} className="fw-bold hover-main">
            Forgot your password ?
          </Link>
          {isLoading ? (
            <FallingLines
              color={mainColor}
              width="50"
              ariaLabel="falling-lines-loading"
            />
          ) : (
            <button type="submit" className="btn btn-success">
              Login
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
