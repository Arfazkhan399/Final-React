const initialState = {
  cartItems: [],
  totalAmount: 0,
};

export const cartReducer = (state = initialState, action) => {
  let updatedCart;

  switch (action.type) {
    case 'ADD_TO_CART':
      const exists = state.cartItems.find(item => item.id === action.payload.id);
      if (exists) {
        updatedCart = state.cartItems.map(item =>
          item.id === action.payload.id && item.quantity < 5
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cartItems, { ...action.payload, quantity: 1 }];
      }
      return {
        ...state,
        cartItems: updatedCart,
        totalAmount: calculateTotal(updatedCart),
      };

    case 'INCREMENT_QTY':
      updatedCart = state.cartItems.map(item =>
        item.id === action.payload && item.quantity < 5
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, cartItems: updatedCart, totalAmount: calculateTotal(updatedCart) };

    case 'DECREMENT_QTY':
      updatedCart = state.cartItems.map(item =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return { ...state, cartItems: updatedCart, totalAmount: calculateTotal(updatedCart) };

    case 'REMOVE_FROM_CART':
      updatedCart = state.cartItems.filter(item => item.id !== action.payload);
      return { ...state, cartItems: updatedCart, totalAmount: calculateTotal(updatedCart) };

    default:
      return state;
  }
};

// Utility function
const calculateTotal = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);