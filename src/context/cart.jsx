import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

import React from "react";
import { cartUrl } from "../constants//network";
import { tokenKey } from "../constants//storage_keys";

function CartProvider({ children }) {
  const [products, setProducts] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    getDetails().catch(() => {
      setItemsCount(0);
      setTotalPrice(0);
      setProducts([]);
    });
  }, []);

  async function addProduct(id) {
    const { data } = await axios.post(
      cartUrl,
      { productId: id },
      { headers: { token: localStorage.getItem(tokenKey) } }
    );
    // setItemsCount(data.numOfCartItems);
    // setTotalPrice(data.data.totalCartPrice);
    // setProducts(data.data.products);
    getDetails();
    return data;
  }

  async function getDetails() {
    const { data } = await axios.get(cartUrl, {
      headers: { token: localStorage.getItem(tokenKey) },
    });
    setItemsCount(data.numOfCartItems);
    setTotalPrice(data.data.totalCartPrice);
    setProducts(data.data.products);
    setCartId(data.data._id);
    return data;
  }

  async function removeProduct(id) {
    const { data } = await axios.delete(`${cartUrl}/${id}`, {
      headers: { token: localStorage.getItem(tokenKey) },
    });
    setItemsCount(data.numOfCartItems);
    setTotalPrice(data.data.totalCartPrice);
    setProducts(data.data.products);
  }

  async function updateProductCount(id, count) {
    if (count <= 0) {
      await removeProduct(id);
      return;
    }
    const { data } = await axios.put(
      `${cartUrl}/${id}`,
      { count },
      { headers: { token: localStorage.getItem(tokenKey) } }
    );
    setItemsCount(data.numOfCartItems);
    setTotalPrice(data.data.totalCartPrice);
    setProducts(data.data.products);
  }

  async function clearCart() {
    await axios.delete(cartUrl, {
      headers: { token: localStorage.getItem(tokenKey) },
    });
    setItemsCount(0);
    setTotalPrice(0);
    setProducts([]);
  }

  return (
    <cartContext.Provider
      value={{
        addProduct,
        products,
        totalPrice,
        itemsCount,
        getDetails,
        removeProduct,
        updateProductCount,
        clearCart,
        cartId,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartProvider;
