import React from "react";
import { categoriesUrl } from "../constants/network";
import { FallingLines } from "react-loader-spinner";
import { mainColor } from "../constants/colors";
import { useQuery } from "react-query";

function Categories() {
  const {
    isLoading,
    error,
    data: response,
  } = useQuery("categories", () => axios.get(categoriesUrl));

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
          {response.data.data.map((category, index) => (
            <div key={index} className="col-md-4">
              <div className="d-flex justify-content-center align-items-center border rounded p-5 flex-column product">
                <img src={category.image} alt={category.name} className="img-fluid" />
                <h4>{category.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
