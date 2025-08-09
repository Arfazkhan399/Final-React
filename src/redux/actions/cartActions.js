export const addToCart = (product) => {
    return {
        type: 'ADD_TO_CART',
        payload: product
    };
};

export const incrementQty = (productId) => {
    return {
        type: 'INCREMENT_QTY',
        payload: productId
    };
};

export const decrementQty = (productId) => {
    return {
        type: 'DECREMENT_QTY',
        payload: productId
    };
};

export const removeFromCart = (productId) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: productId
    };
};