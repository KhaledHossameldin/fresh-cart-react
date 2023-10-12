import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { object } from "yup";
import { citySchema, detailsSchema, phoneSchema } from "../utils/validators";
import { ErrorLabel } from "../components";
import { useMutation } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FallingLines } from "react-loader-spinner";
import { mainColor } from "../constants//colors";
import { ordersUrl } from "../constants//network";
import { tokenKey } from "../constants//storage_keys";
import { cartContext } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { emptyRoute } from "../constants//routes";

function Payment() {
  const navigate = useNavigate();
  const [onlineState, setOnlineState] = useState(null);
  const { cartId, clearCart } = useContext(cartContext);
  const { mutate: online, isLoading: isOnline } = useMutation(
    (values) =>
      axios.post(`${ordersUrl}/checkout-session/${cartId}`, values, {
        headers: { token: localStorage.getItem(tokenKey) },
        params: { url: location.origin },
      }),
    {
      onSuccess: (response) => open(response.data.session.url, "_self"),
      onError: (error) => toast.error(error.response.data.message),
    }
  );
  const { mutate, isLoading: isCash } = useMutation(
    (values) =>
      axios.post(`${ordersUrl}/${cartId}`, values, {
        headers: { token: localStorage.getItem(tokenKey) },
      }),
    {
      onSuccess: (response) => {
        clearCart();
        navigate(emptyRoute);
      },
      onError: (error) => toast.error(error.response.data.message),
    }
  );

  const formik = useFormik({
    initialValues: { details: "", phone: "", city: "" },
    validationSchema: object({
      details: detailsSchema,
      phone: phoneSchema,
      city: citySchema,
    }),
    onSubmit: (values) => {
      if (onlineState) {
        online({ shippingAddress: { ...values } });
      } else {
        mutate({ shippingAddress: { ...values } });
      }
    },
  });

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <h2 className="fw-bold">Please enter the payment information</h2>
        <form onSubmit={formik.handleSubmit}>
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
            <label htmlFor="city">City :</label>
            <input
              id="city"
              type="text"
              name="city"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <ErrorLabel
              error={formik.errors.city}
              isTouched={formik.touched.city ?? false}
            />
          </div>
          <div className="my-3">
            <label htmlFor="details">Details :</label>
            <textarea
              id="details"
              rows={3}
              name="details"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            <ErrorLabel
              error={formik.errors.details}
              isTouched={formik.touched.details ?? false}
            />
          </div>
          {isCash ? (
            <FallingLines
              color={mainColor}
              width="50"
              ariaLabel="falling-lines-loading"
            />
          ) : (
            <button
              type="submit"
              className="btn btn-success me-3"
              onClick={() => setOnlineState(false)}
            >
              Cash
            </button>
          )}
          {isOnline ? (
            <FallingLines
              color={mainColor}
              width="50"
              ariaLabel="falling-lines-loading"
            />
          ) : (
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => setOnlineState(true)}
            >
              Online
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Payment;
