module.exports = (currentStatus, newStatus) => {
  const allowed = {
    pending: ["paid", "cancelled"],
    paid: ["processing", "refunded"],
    processing: ["shipped", "cancelled"],
    shipped: ["delivered", "cancelled"],
    delivered: [],
    cancelled: [],
    refunded: [],
  };
  return (
    allowed[currentStatus]?.includes(newStatus) || currentStatus === newStatus
  );
};
