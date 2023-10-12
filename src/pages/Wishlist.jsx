import React, { useContext } from "react";
import { wishlistContext } from "../context/wishlist";
import { cartContext } from "../context/cart";

function Wishlist() {
  const { wishlist, toggle } = useContext(wishlistContext);
  const { addProduct } = useContext(cartContext);

  if (wishlist.length == 0) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <h2 className="fw-bold">Wishlist is Empty</h2>
      </div>
    );
  }

  return (
    <div className="min-vh-100 p-5">
      <div className="container my-5">
        <h2 className="fw-bold">My wishlist</h2>
        {wishlist.map((product, index) => (
          <div
            key={index}
            className="row g-4 align-items-center border-bottom pb-4 mb-4"
          >
            <div className="col-lg-2">
              <div>
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-8">
              <div>
                <h3 className="fw-bold">{product.title}</h3>
                <p>{product.price} EGP</p>
                <button
                  className="btn btn-danger"
                  onClick={() => toggle(product)}
                >
                  <i className="fa-solid fa-trash"></i> Remove
                </button>
              </div>
            </div>
            <div className="col-lg-2">
              <button
                className="btn btn-success"
                onClick={() => addProduct(product.id)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
