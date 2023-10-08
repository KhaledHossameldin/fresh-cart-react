import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import ErrorLabel from "../components/ErrorLabel";
import { useMutation } from "react-query";
import axios from "axios";
import { verifyCodeUrl } from "../data/constants/network";
import { useNavigate } from "react-router-dom";
import { resetPasswordRoute } from "../data/constants/routes";
import { FallingLines } from "react-loader-spinner";
import { mainColor } from "../data/constants/colors";
import { verifyCodeSchema } from "../utils/validators";
import { object } from "yup";

function VerifyCode() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(
    (values) => axios.post(verifyCodeUrl, values),
    {
      onSuccess: (response) => navigate(resetPasswordRoute),
      onError: (error) => toast.error(error.response.data.message),
    }
  );

  const formik = useFormik({
    initialValues: { resetCode: "" },
    validationSchema: object({ resetCode: verifyCodeSchema }),
    onSubmit: (values) => mutate({ resetCode: values.resetCode.toString() }),
  });

  return (
    <div className="container my-5 py-5">
      <Toaster />
      <h2 className="fw-bold">We have sent you a verification code</h2>
      <h2>Please enter the sent code</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="my-3">
          <label htmlFor="resetCode">Verification Code :</label>
          <input
            id="resetCode"
            type="number"
            name="resetCode"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorLabel
            error={formik.errors.resetCode}
            isTouched={formik.touched.resetCode ?? false}
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
            Send me a code
          </button>
        )}
      </form>
    </div>
  );
}

export default VerifyCode;
