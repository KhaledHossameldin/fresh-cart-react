import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { wishlistUrl } from "../constants/network";
import { tokenKey } from "../constants/storage_keys";
import toast from "react-hot-toast";

export const wishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    getWishlist();
  }, []);

  async function getWishlist() {
    const { data } = await axios.get(wishlistUrl, {
      headers: { token: localStorage.getItem(tokenKey) },
    });
    setWishlist(data.data);
  }

  async function toggle(product) {
    const index = wishlist.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      axios
        .delete(`${wishlistUrl}/${product.id}`, {
          headers: { token: localStorage.getItem(tokenKey) },
        })
        .then(() => {
          const oldWishlist = [...wishlist];
          oldWishlist.splice(index, 1);
          setWishlist(oldWishlist);
        })
        .catch((error) => toast.error(error.response.data.message));
      return;
    }
    axios
      .post(
        wishlistUrl,
        { productId: product.id },
        { headers: { token: localStorage.getItem(tokenKey) } }
      )
      .then(() => {
        const oldWishlist = [...wishlist];
        console.log(oldWishlist, "old");
        oldWishlist.push(product);
        console.log(oldWishlist, "new");
        setWishlist(oldWishlist);
      })
      .catch((error) => toast.error(error.response.data.message));
  }

  return (
    <wishlistContext.Provider value={{ wishlist, toggle }}>
      {children}
    </wishlistContext.Provider>
  );
}

export default WishlistProvider;
