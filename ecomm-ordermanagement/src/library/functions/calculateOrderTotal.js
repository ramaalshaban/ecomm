module.exports = (cartItems) => {
  if (!cartItems || !Array.isArray(cartItems)) return 0;
  return cartItems.reduce(
    (sum, item) => sum + item.priceAtAdd * item.quantity,
    0,
  );
};
