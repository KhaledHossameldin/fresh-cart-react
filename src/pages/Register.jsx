import { useFormik } from "formik";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { object } from "yup";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
  rePasswordValidator,
} from "../utils/validators";
import ErrorLabel from "../components/ErrorLabel";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { registerUrl } from "../data/constants/network";
import { loginRoute } from "../data/constants/routes";
import { FallingLines } from "react-loader-spinner";
import { mainColor } from "../data/constants/colors";

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
      name: nameValidator,
      email: emailValidator,
      phone: phoneValidator,
      password: passwordValidator,
      rePassword: rePasswordValidator,
    }),
    onSubmit: (values) => mutate(values),
  });

  return (
    <div className="container my-5 py-5">
      <Toaster />
      <h2 className="fw-bold">Register</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="my-3">
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formik.values.name}
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
            type="email"
            name="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorLabel
            error={formik.errors.email}
            isTouched={formik.touched.email ?? false}
          />
        </div>
        <div className="my-3">
          <label htmlFor="email">Phone :</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorLabel
            error={formik.errors.phone}
            isTouched={formik.touched.phone ?? false}
          />
          <div className="my-3">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              name="password"
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
          <div className="my-3">
            <label htmlFor="password">Confirm Password :</label>
            <input
              type="password"
              name="rePassword"
              className="form-control mt-1"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <ErrorLabel
              error={formik.errors.rePassword}
              isTouched={formik.touched.rePassword ?? false}
            />
          </div>
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
