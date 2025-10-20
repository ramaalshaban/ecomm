const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const OrderCheckout = require("../../checkout/order-checkout");

const OrderManagementServiceManager = require("../../service-manager/OrderManagementServiceManager");

/* Base Class For the Crud Routes Of DbObject Order */
class OrderManager extends OrderManagementServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "order";
    this.modelName = "Order";

    this.checkoutManager = new OrderCheckout("order", this);
    this.checkoutOrderStatus = 0;
    this.checkoutManager.createPaymentGate();
  }

  toJSON() {
    const jsonObj = super.toJSON();

    jsonObj.paymentGateName = this.checkoutManager?.paymentGate?.gateName;

    return jsonObj;
  }

  getOrderId() {
    return this.orderId;
  }

  async checkoutUpdated(statusLiteral) {
    switch (statusLiteral) {
      case "started":
        await this.checkoutStarted();
        break;
      case "canceled":
        await this.checkoutCanceled();
        break;
      case "failed":
        await this.checkoutFailed();
        break;
      case "success":
        await this.checkoutDone();
        break;
      default:
        await this.checkoutFailed();
        break;
    }
  }

  async checkoutStarted() {
    this.status = 0;
  }

  async checkoutCanceled() {
    this.status = 5;
  }

  async checkoutFailed() {
    this.status = 6;
  }

  async checkoutDone() {
    this.status = 1;
  }

  getCheckoutParameters(userParams) {
    const description = `Order #${this.order.id} by user ${this.order.userId}`;

    return {
      userId: this.session._USERID,
      fullname: this.session.fullname,
      email: this.session.email,
      description,
      amount: this.order.totalAmount,
      currency: this.order.currency,
      orderId: this.order.id,
      metadata: {
        order: "OrderManagement-Order-order",
        orderId: this.order.id,
        checkoutName: "order",
      },
      storeCard: userParams?.storeCard,
      paymentUserParams: userParams,
      bodyParams: this.bodyParams,
    };
  }
}

module.exports = OrderManager;
