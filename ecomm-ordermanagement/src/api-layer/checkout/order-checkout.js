const CheckoutManager = require("./CheckoutManager");

const {
  getOrderPaymentByOrderId,
  createOrderPayment,
  updateOrderPaymentById,
} = require("dbLayer");

class OrderCheckout extends CheckoutManager {
  constructor(name, apiManager) {
    super(name, apiManager);
  }

  async getPaymentTicket(orderId) {
    return await getOrderPaymentByOrderId(orderId);
  }

  async upsertPaymentTicket(
    ticketId,
    orderId,
    paymentId,
    paymentStatus,
    statusLiteral,
    redirectUrl,
  ) {
    return ticketId
      ? await updateOrderPaymentById(ticketId, {
          paymentId,
          paymentStatus,
          statusLiteral,
          redirectUrl,
        })
      : await createOrderPayment({
          ownerId: this.session?._USERID,
          orderId,
          paymentId,
          paymentStatus,
          statusLiteral,
          redirectUrl,
        });
  }
}

module.exports = OrderCheckout;
