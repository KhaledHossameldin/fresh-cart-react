import axios from "axios";
import React, { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { productsUrl } from "../../constants//network";
import { FallingLines } from "react-loader-spinner";
import { mainColor } from "../../constants//colors";
import { Link } from "react-router-dom";
import { productDetailsRoute } from "../../constants//routes";
import { cartContext } from "../../context/cart";
import toast from "react-hot-toast";

function Products() {
  const {
    isLoading,
    error,
    data: response,
  } = useQuery("products", () => axios.get(productsUrl));

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
      <section className="text-center my-5">
        <FallingLines
          color={mainColor}
          width="50"
          ariaLabel="falling-lines-loading"
        />
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p className="text-danger my-5 text-center fw-bold">
          <i className="fa-solid fa-triangle-exclamation me-1"></i>
          {error.response.data.message}
        </p>
      </section>
    );
  }

  return (
    <div className="container mb-5">
      <div className="row g-4">
        {response.data.data.map((product, index) => (
          <div key={index} className="col-lg-3 col-md-6">
            <div className="product rounded p-3 cursor-pointer">
              <Link to={`${productDetailsRoute}/${product.id}`}>
                <img src={product.imageCover} alt="" className="img-fluid" />
                <h2 className="text-main h4 oneline-text">{product.title}</h2>
                <h3 className="font-sm fw-bold">{product.category.name}</h3>
                <div className="d-flex justify-content-between font-sm">
                  <p>{product.price} EGP</p>
                  <div>
                    <i className="fa-solid fa-star rating-color"></i>
                    {product.ratingsAverage}
                  </div>
                </div>
              </Link>
              <div className="d-flex align-items-center gap-4">
                <button
                  className="flex-grow-1 btn bg-main text-white"
                  onClick={() => add(product.id)}
                >
                  + ADD
                </button>
                <i className="fa-solid fa-heart cursor-pointer"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
