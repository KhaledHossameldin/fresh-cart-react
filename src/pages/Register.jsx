import { useFormik } from "formik";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { object } from "yup";
import {
  emailSchema,
  nameSchema,
  passwordSchema,
  phoneSchema,
  rePasswordSchema,
} from "../utils/validators";
import ErrorLabel from "../components/ErrorLabel";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { registerUrl } from "../constants//network";
import { loginRoute } from "../constants//routes";
import { mainColor } from "../constants//colors";
import { FallingLines } from "react-loader-spinner";

function Register() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(
    (values) => axios.post(registerUrl, values),
    {
      onSuccess: (response) => navigate(loginRoute),
      onError: (error) => toast.error(error.response.data.message),
    }
  );
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: object({
      name: nameSchema,
      email: emailSchema,
      phone: phoneSchema,
      password: passwordSchema,
      rePassword: rePasswordSchema,
    }),
    onSubmit: (values) => mutate(values),
  });

  return (
    <div className="container my-5 py-5">
      <h2 className="fw-bold">Register</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="my-3">
          <label htmlFor="name">Name :</label>
          <input
            id="name"
            type="text"
            name="name"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorLabel
            error={formik.errors.name}
            isTouched={formik.touched.name ?? false}
          />
        </div>
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
          <label htmlFor="phone">Phone :</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorLabel
            error={formik.errors.phone}
            isTouched={formik.touched.phone ?? false}
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
            target={"Password"}
          />
        </div>
        <div className="my-3">
          <label htmlFor="rePassword">Confirm Password :</label>
          <input
            id="rePassword"
            type="password"
            name="rePassword"
            className="form-control mt-1"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorLabel
            error={formik.errors.rePassword}
            isTouched={formik.touched.rePassword ?? false}
          />
        </div>
        <div className="text-end">
          {isLoading ? (
            <FallingLines
              color={mainColor}
              width="50"
              ariaLabel="falling-lines-loading"
            />
          ) : (
            <button type="submit" className="btn btn-success">
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Register;
