import { useFormik } from "formik";
import React from "react";
import { emailSchema, passwordSchema } from "../utils/validators";
import { ErrorLabel } from "../components";
import { object } from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { resetPasswordUrl } from "../constants//network";
import { emptyRoute } from "../constants//routes";
import { FallingLines } from "react-loader-spinner";
import { mainColor } from "../constants//colors";
import toast from "react-hot-toast";
import { useContext } from "react";
import { authContext } from "../context/auth";

function ResetPassword() {
  const navigate = useNavigate();
  const { setToken } = useContext(authContext);
  const { mutate, isLoading } = useMutation(
    (values) => axios.put(resetPasswordUrl, values),
    {
      onSuccess: (response) => {
        setToken(response.data.token);
        navigate(emptyRoute);
      },
      onError: (error) => toast.error(error.response.data.message),
    }
  );
  const formik = useFormik({
    initialValues: { email: "", newPassword: "" },
    validationSchema: object({
      email: emailSchema,
      newPassword: passwordSchema,
    }),
    onSubmit: (values) => mutate(values),
  });
  return (
    <div className="container my-5 py-5">
      <h2 className="fw-bold">Please enter the new email and password</h2>
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
          <label htmlFor="newPassword">Password :</label>
          <input
            id="newPassword"
            type="password"
            name="newPassword"
            className="form-control mt-1"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorLabel
            error={formik.errors.newPassword}
            isTouched={formik.touched.newPassword ?? false}
          />
        </div>
        {isLoading ? (
          <FallingLines
            color={mainColor}
            width="50"
            ariaLabel="falling-lines-loading"
          />
        ) : (
          <button type="submit" className="btn btn-success">
            Reset Password
          </button>
        )}
      </form>
    </div>
  );
}

export default ResetPassword;
