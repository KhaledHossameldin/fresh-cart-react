import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { brandsUrl } from "../constants/network";
import { FallingLines } from "react-loader-spinner";
import { mainColor } from "../constants/colors";

function Brands() {
  const {
    isLoading,
    error,
    data: response,
  } = useQuery("brands", () => axios.get(brandsUrl));

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
          {response.data.data.map((brand, index) => (
            <div key={index} className="col-md-4">
              <div className="d-flex justify-content-center align-items-center border rounded p-5">
                {brand.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Brands;
