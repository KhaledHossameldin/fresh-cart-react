import React from "react";
import { useParams } from "react-router-dom";
import { blogImg1 } from "../assets/images";
import Slider from "react-slick";
import axios from "axios";
import { productDetailsUrl } from "../data/constants/network";
import { useQuery } from "react-query";
import { FallingLines } from "react-loader-spinner";
import { mainColor } from "../data/constants/colors";

function ProductDetails() {
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: response,
  } = useQuery("product-details", () => axios.get(productDetailsUrl(id)));

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

  console.log(response.data.data);

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
                <button className="flex-grow-1 btn bg-main text-white">
                  + ADD
                </button>
                <i className="fa-solid fa-heart"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
