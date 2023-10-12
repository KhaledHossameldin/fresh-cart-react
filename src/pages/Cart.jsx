import React, { useContext } from "react";
import { cartContext } from "../context/cart";
import { FallingLines } from "react-loader-spinner";
import { mainColor } from "../data/constants/colors";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { paymentRoute } from "../data/constants/routes";

function Cart() {
  const navigate = useNavigate();
  const {
    products,
    totalPrice,
    itemsCount,
    removeProduct,
    updateProductCount,
    clearCart,
  } = useContext(cartContext);

  const { mutate: remove } = useMutation((id) => removeProduct(id), {
    onError: (error) => toast.error(error.response.data.message),
  });

  const { mutate: updateCount } = useMutation(
    (values) => updateProductCount(values.id, values.count),
    { onError: (error) => toast.error(error.response.data.message) }
  );

  const { mutate: clear } = useMutation(() => clearCart(), {
    onError: (error) => toast.error(error.response.data.message),
  });

  if (products === null) {
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

  return (
    <div className="min-vh-100 p-5">
      <div className="container my-5">
        <div className="d-flex justify-content-between">
          <h2 className="fw-bold">Cart</h2>
          <button
            className="btn btn-success"
            onClick={() => navigate(paymentRoute)}
          >
            Checkout
          </button>
        </div>
        <div className="d-flex justify-content-between mt-4 fw-bold">
          <p>
            Total Price: <span className="text-main">{totalPrice}</span>
          </p>
          <p>
            Total Number of Items:{" "}
            <span className="text-main">{itemsCount}</span>
          </p>
        </div>
        <div>
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={index}
                className="row g-4 align-items-center border-bottom pb-4 mb-4"
              >
                <div className="col-lg-2">
                  <div>
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col-lg-8">
                  <div>
                    <h3 className="fw-bold">{product.product.title}</h3>
                    <p>{product.price} EGP</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => remove(product.product.id)}
                    >
                      <i className="fa-solid fa-trash"></i> Remove
                    </button>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="d-flex align-items-center justify-content-around">
                    <button
                      className="btn btn-outline-success"
                      onClick={() =>
                        updateCount({
                          id: product.product.id,
                          count: product.count + 1,
                        })
                      }
                    >
                      +
                    </button>
                    <p className="mb-0 h4">{product.count}</p>
                    <button
                      className="btn btn-outline-success"
                      onClick={() =>
                        updateCount({
                          id: product.product.id,
                          count: product.count - 1,
                        })
                      }
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h3>Your cart is empty</h3>
          )}
        </div>
        <div className="text-center mt-5">
          <button className="btn btn-lg btn-danger px-5" onClick={clear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
