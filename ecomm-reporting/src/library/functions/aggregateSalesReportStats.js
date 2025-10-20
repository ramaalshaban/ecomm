module.exports = function (orders, orderItems, refundedOrders) {
  // orders: Array of order objects in relevant statuses
  // orderItems: Array of all orderItem objects from these orders
  // refundedOrders: Only refunded orders
  let totalRevenue = 0,
    orderCount = 0,
    refundsTotal = 0,
    productSales = {},
    bestsellers = [],
    productCount = 0;
  const paidStatuses = [1, 2, 3, 4]; // paid, processing, shipped, delivered
  orders.forEach((ord) => {
    if (paidStatuses.includes(ord.status)) {
      totalRevenue += ord.totalAmount || 0;
      orderCount++;
    }
  });
  refundedOrders.forEach((ord) => {
    refundsTotal += ord.refundAmount || 0;
  });
  orderItems.forEach((oi) => {
    if (!productSales[oi.productId])
      productSales[oi.productId] = {
        productId: oi.productId,
        productName: oi.productName,
        soldCount: 0,
      };
    productSales[oi.productId].soldCount += oi.quantity || 0;
  });
  bestsellers = Object.values(productSales)
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, 10);
  productCount = Object.keys(productSales).length;
  return { totalRevenue, orderCount, refundsTotal, bestsellers, productCount };
};
