import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
const [cartItems, setCartItems] = useState(() => { 
        
        const savedCart = localStorage.getItem("cartItems"); 
        return savedCart ? JSON.parse(savedCart) : []; 
    }); 
    
    // ========================================== // SAVE CART TO LOCAL STORAGE // ========================================== // 
    useEffect(() => { 
            
            localStorage.setItem( "cartItems", JSON.stringify(cartItems) ); 

    }, [cartItems]);

  // ==========================================
  // ADD TO CART
  // ==========================================

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item._id === product._id
      );

      // If product already exists, increase quantity
      if (existingItem) {
        return currentItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // Otherwise add new product
      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };


  // ==========================================
  // REMOVE FROM CART
  // ==========================================

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item._id !== productId
      )
    );
  };


  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };


  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item._id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };


  // ==========================================
  // CLEAR CART
  // ==========================================

  const clearCart = () => {
    setCartItems([]);
  };


  // ==========================================
  // TOTAL ITEMS
  // ==========================================

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity, 0
  );


  // ==========================================
  // SUBTOTAL
  // ==========================================

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  // ==========================================
  // CHECK IF PRODUCT IS IN CART
  // ==========================================

  const isInCart = (productId) => {
    return cartItems.some(
      (item) => item._id === productId
    );
  };


  const printCartItems = () => {
    console.log("Cart Items:", cartItems);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        printCartItems,
        totalItems,
        subtotal,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


// ==========================================
// CUSTOM HOOK
// ==========================================

export const useCart = () => {
  return useContext(CartContext);
};

