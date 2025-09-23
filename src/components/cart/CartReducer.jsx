import React, { createContext, useReducer, useContext } from "react";

const initialState = () => {
  cart: [];
};
export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

// Create cart context
const CartContext = createContext();

// cart provider
export const cartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  return (
    <CartContext.provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.provider>
  );
};
export const useCart = () => {
  return useContext(CartContext);
};
