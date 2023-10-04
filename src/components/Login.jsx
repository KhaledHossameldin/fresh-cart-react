import { useFormik } from "formik";
import React from "react";
import { object } from "yup";
import {
  email as emailValidation,
  password as passwordValidation,
} from "../utils/validators";
import ErrorLabel from "./ErrorLabel";
import { Link } from "react-router-dom";
import { forgetPassword } from "../data/constants/routes";

function Login() {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: object({
      email: emailValidation,
      password: passwordValidation,
    }),
    onSubmit: (values) => console.log(values),
  });

  return (
    <div className="container my-5 py-5">
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
            isTouched={formik.touched.email}
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
            isTouched={formik.touched.password}
            target={"Password"}
          />
        </div>
        <div className="d-flex justify-content-between">
          <Link to={forgetPassword} className="fw-bold hover-main">
            Forgot your password ?
          </Link>
          <button type="submit" className="btn btn-success">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
