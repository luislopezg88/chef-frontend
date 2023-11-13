import { useContext, createContext, useReducer, useState } from "react";
//Crear el contexto para consumir
export const ShoppingContext = createContext();
// Definicion el reducer
const shoppingReducer = (state, action) => {
  const { payload, type } = action;
  console.log(payload);
  switch (type) {
    case "ADD_TO_PRODUCT": {
      const productInCartIndex = state.findIndex(
        (item) => item?._id === payload._id
      );

      if (productInCartIndex >= 0) {
        const newState = [...state];
        newState[productInCartIndex].subTotal += 1;
        return newState;
      }

      return [...state, { ...payload, subTotal: 1 }];
    }
    case "REMOVE_FROM_PRODUCT": {
      const productInCartIndex = state.findIndex(
        (item) => item._id === payload._id
      );

      if (productInCartIndex >= 0) {
        const newState = [...state];
        newState[productInCartIndex].subTotal -= 1;
        return newState;
      }
      return state;
    }
    case "DELETE_FROM_PRODUCT":
      return state.filter((item) => item._id !== payload._id);
    case "CLEAR_CART":
      return [];
    default:
      console.warn(`Tipo de acción no controlada: ${type}`);
      return state;
  }
};

const initialState = [];
//Crear provider, para proveer el contexto
export function ShoppingProvider({ children }) {
  const [state, dispatch] = useReducer(shoppingReducer, initialState);
  const [cart, setCart] = useState([]);

  const addToProduct = (product) => {
    dispatch({ type: "ADD_TO_PRODUCT", payload: product });
    /*
    //Existe producto en el carrito, obtener indice
    const productInCartIndex = cart.findIndex(
      (item) => item._id === product._id
    );
    //Existe
    if (productInCartIndex >= 0) {
      const clone = structuredClone(cart);
      clone[productInCartIndex].subTotal += 1;
      return setCart(clone);
    }
    //No existe
    setCart((prev) => [...prev, { ...product, subTotal: 1 }]);
    */
  };

  const removeFromProduct = (product) => {
    dispatch({ type: "REMOVE_FROM_PRODUCT", payload: product });
    /*setCart((prev) => prev.filter((item) => item._id !== product._id));*/
  };

  const deletFromProduct = () => {
    dispatch({ type: "DELETE_FROM_PRODUCT" });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    /*
    setCart([]);
    */
  };

  return (
    <ShoppingContext.Provider
      value={{
        cart: state,
        addToProduct,
        removeFromProduct,
        deletFromProduct,
        clearCart,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}

export const useShopping = () => useContext(ShoppingContext);
