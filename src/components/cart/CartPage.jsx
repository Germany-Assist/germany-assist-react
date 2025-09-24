import React from "react";
import { useCart } from "./CartReducer";

export const CartPage = () => {
  const { cart, dispatch } = useCart();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cart Shopping</h1>
      {cart.length === 0 ? (
        <p>Your cart is Empty</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>${cart.title}</span>
            <span>${cart.price}</span>
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
              }
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};
