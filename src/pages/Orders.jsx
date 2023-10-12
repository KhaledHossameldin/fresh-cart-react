import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { ordersUrl } from "../constants//network";
import { FallingLines } from "react-loader-spinner";
import { mainColor } from "../constants//colors";
import { tokenKey } from "../constants//storage_keys";
import jwtDecode from "jwt-decode";

function Orders() {
  const {
    isLoading,
    error,
    data: response,
  } = useQuery("orders", () =>
    axios.get(
      `${ordersUrl}/user/${jwtDecode(localStorage.getItem(tokenKey)).id}`
    )
  );

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <FallingLines
          color={mainColor}
          width="50"
          ariaLabel="falling-lines-loading"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <p className="text-danger my-5 text-center fw-bold">
          <i className="fa-solid fa-triangle-exclamation me-1"></i>
          {error.response.data.message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-vh-100 p-5">
      <div className="container my-5">
        <div className="row g-4">
          {response.data.map((order, index) => (
            <div key={index} className="col-lg-6">
              <div className="bg-main rounded p-3 text-white">
                <div>
                  <h4>Order Details: </h4>
                  <p>
                    <span className="fw-bold">Paid: </span>{" "}
                    {order.isPaid ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="fw-bold">Delivered: </span>
                    {order.isDelivered ? "Yes" : "No"}
                  </p>
                  <p className="text-capitalize">
                    <span className="fw-bold">Payment Method:</span>{" "}
                    {order.paymentMethodType}
                  </p>
                  <p className="text-capitalize">
                    <span className="fw-bold">Shipping:</span>{" "}
                    {`${order.shippingPrice} EGP`}
                  </p>
                  <p className="text-capitalize">
                    <span className="fw-bold">Tax:</span>{" "}
                    {`${order.taxPrice} EGP`}
                  </p>
                  <p className="text-capitalize">
                    <span className="fw-bold">Total:</span>{" "}
                    {`${order.totalOrderPrice} EGP`}
                  </p>
                </div>
                <hr />
                <div>
                  <h4>Shipping Details: </h4>
                  <p>
                    <span className="fw-bold">Details: </span>{" "}
                    {order.shippingAddress.details}
                  </p>
                  <p>
                    <span className="fw-bold">Phone: </span>{" "}
                    {order.shippingAddress.phone}
                  </p>
                  <p>
                    <span className="fw-bold">City: </span>{" "}
                    {order.shippingAddress.city}
                  </p>
                </div>
                <hr />
                <h4>Products</h4>
                {order.cartItems.map((item, index) => (
                  <div key={index}>
                    <div className="row g-4 align-items-center my-1">
                      <div className="col-md-3">
                        <div>
                          <img
                            src={item.product.imageCover}
                            alt={item.product.title}
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div>
                          <h5>{item.product.title}</h5>
                          <h6>{item.product.category.name}</h6>
                          <p>
                            <span className="fw-bold">Price: </span>{" "}
                            {item.price}
                          </p>
                          <p>
                            <span className="fw-bold">Count: </span>{" "}
                            {item.count}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
