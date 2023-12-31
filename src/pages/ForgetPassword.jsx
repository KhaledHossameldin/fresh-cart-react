import { useFormik } from "formik";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { object } from "yup";
import { emailSchema } from "../utils/validators";
import { ErrorLabel } from "../components";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { forgetPasswordUrl } from "../constants//network";
import { verifyCodeRoute } from "../constants//routes";
import { FallingLines } from "react-loader-spinner";
import { mainColor } from "../constants//colors";

function ForgetPassword() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(
    (values) => axios.post(forgetPasswordUrl, values),
    {
      onSuccess: (response) => navigate(verifyCodeRoute),
      onError: (error) => toast.error(error.response.data.message),
    }
  );
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: object({ email: emailSchema }),
    onSubmit: (values) => mutate(values),
  });

  return (
    <div className="container my-5 py-5">
      <h2 className="fw-bold">Please enter your email</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="form-floating my-3">
          <input
            type="email"
            name="email"
            className="form-control"
            id="floating-email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floating-email">Email</label>
          <ErrorLabel
            error={formik.errors.email}
            isTouched={formik.touched.email ?? false}
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
              Send me a code
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ForgetPassword;
