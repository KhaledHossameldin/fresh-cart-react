import { useFormik } from "formik";
import React, { useContext } from "react";
import { object } from "yup";
import { emailValidator, passwordValidator } from "../utils/validators";
import ErrorLabel from "./ErrorLabel";
import { Link, useNavigate } from "react-router-dom";
import { emptyRoute, forgetPasswordRoute } from "../data/constants/routes";
import { useMutation } from "react-query";
import axios from "axios";
import { loginUrl } from "../data/constants/network";
import { authContext } from "../context/auth";
import { FallingLines } from "react-loader-spinner";
import { mainColor } from "../data/constants/colors";
import { Toaster } from '../../node_modules/react-hot-toast/src/components/toaster';
import toast from '../../node_modules/react-hot-toast/src/index';

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
      email: emailValidator,
      password: passwordValidator,
    }),
    onSubmit: (values) => mutate(values),
  });

  return (
    <div className="container my-5 py-5">
      <Toaster />
      <h2 className="fw-bold">Login</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="my-3">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorLabel
            error={formik.errors.email}
            isTouched={formik.touched.email ?? false}
            target={"Email"}
          />
        </div>
        <div className="my-3">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control mt-1"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorLabel
            error={formik.errors.password}
            isTouched={formik.touched.password ?? false}
            target={"Password"}
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
