import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { blogImg1 } from "../assets/images";
import Slider from "react-slick";
import axios from "axios";
import { productDetailsUrl } from "../constants//network";
import { useMutation, useQuery } from "react-query";
import { FallingLines } from "react-loader-spinner";
import { mainColor } from "../constants//colors";
import { cartContext } from "../context/cart";
import toast from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: response,
  } = useQuery("product-details", () => axios.get(productDetailsUrl(id)));
  const { addProduct } = useContext(cartContext);

  const { mutate: add, isLoading: isAdding } = useMutation(
    (id) => addProduct(id),
    {
      onSuccess: (data) => toast.success(data.message),
      onError: (error) => toast.error(error.response.data.message),
    }
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
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4">
            <div>
              <Slider dots>
                {response.data.data.images.map((image, index) => (
                  <img key={index} src={image} />
                ))}
              </Slider>
            </div>
          </div>
          <div className="col-md-8">
            <div className="d-flex flex-column">
              <h2 className="fw-bold">{response.data.data.title}</h2>
              <p>{response.data.data.category.name}</p>
              <div className="d-flex justify-content-between font-sm">
                <p>{response.data.data.price} EGP</p>
                <div>
                  <i className="fa-solid fa-star rating-color"></i>
                  {response.data.data.ratingsAverage}
                </div>
              </div>
              <div className="d-flex align-items-center gap-5">
                <div className="flex-grow-1 d-flex justify-content-center">
                  {isAdding ? (
                    <FallingLines
                      color={mainColor}
                      width="50"
                      ariaLabel="falling-lines-loading"
                    />
                  ) : (
                    <button
                      className="flex-grow-1 btn bg-main text-white"
                      onClick={() => add(response.data.data.id)}
                    >
                      + ADD
                    </button>
                  )}
                </div>
                <i className="fa-solid fa-heart fa-2xl cursor-pointer"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
