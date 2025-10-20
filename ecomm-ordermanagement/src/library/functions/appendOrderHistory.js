module.exports = (order, update) => {
  const now = new Date();
  const history = order.orderHistory || [];
  if (update.status && update.status !== order.status)
    history.push({
      event: `status:${order.status}->${update.status}`,
      date: now,
      note: "",
    });
  if (update.paymentStatus && update.paymentStatus !== order.paymentStatus)
    history.push({
      event: `payment:${order.paymentStatus}->${update.paymentStatus}`,
      date: now,
      note: "",
    });
  if (update.refundRequested)
    history.push({ event: "refundRequested", date: now, note: "" });
  return history;
};
