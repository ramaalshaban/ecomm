const { ServicePublisher } = require("serviceCommon");

// Order Event Publisher Classes

// Publisher class for createOrder api
const { OrderCreatedTopic } = require("./topics");
class OrderCreatedPublisher extends ServicePublisher {
  constructor(order, session, requestId) {
    super(OrderCreatedTopic, order, session, requestId);
  }

  static async Publish(order, session, requestId) {
    const _publisher = new OrderCreatedPublisher(order, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for getOrder api
const { OrderRetrivedTopic } = require("./topics");
class OrderRetrivedPublisher extends ServicePublisher {
  constructor(order, session, requestId) {
    super(OrderRetrivedTopic, order, session, requestId);
  }

  static async Publish(order, session, requestId) {
    const _publisher = new OrderRetrivedPublisher(order, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for updateOrder api
const { OrderUpdatedTopic } = require("./topics");
class OrderUpdatedPublisher extends ServicePublisher {
  constructor(order, session, requestId) {
    super(OrderUpdatedTopic, order, session, requestId);
  }

  static async Publish(order, session, requestId) {
    const _publisher = new OrderUpdatedPublisher(order, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for deleteOrder api
const { OrderDeletedTopic } = require("./topics");
class OrderDeletedPublisher extends ServicePublisher {
  constructor(order, session, requestId) {
    super(OrderDeletedTopic, order, session, requestId);
  }

  static async Publish(order, session, requestId) {
    const _publisher = new OrderDeletedPublisher(order, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for listOrders api
const { OrdersListedTopic } = require("./topics");
class OrdersListedPublisher extends ServicePublisher {
  constructor(orders, session, requestId) {
    super(OrdersListedTopic, orders, session, requestId);
  }

  static async Publish(orders, session, requestId) {
    const _publisher = new OrdersListedPublisher(orders, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for checkoutStartOrder api
const { StartorderCheckoutedTopic } = require("./topics");
class StartorderCheckoutedPublisher extends ServicePublisher {
  constructor(startorder, session, requestId) {
    super(StartorderCheckoutedTopic, startorder, session, requestId);
  }

  static async Publish(startorder, session, requestId) {
    const _publisher = new StartorderCheckoutedPublisher(
      startorder,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for checkoutCompleteOrder api
const { CompleteorderCheckoutedTopic } = require("./topics");
class CompleteorderCheckoutedPublisher extends ServicePublisher {
  constructor(completeorder, session, requestId) {
    super(CompleteorderCheckoutedTopic, completeorder, session, requestId);
  }

  static async Publish(completeorder, session, requestId) {
    const _publisher = new CompleteorderCheckoutedPublisher(
      completeorder,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for checkoutRefreshOrder api
const { RefreshorderCheckoutedTopic } = require("./topics");
class RefreshorderCheckoutedPublisher extends ServicePublisher {
  constructor(refreshorder, session, requestId) {
    super(RefreshorderCheckoutedTopic, refreshorder, session, requestId);
  }

  static async Publish(refreshorder, session, requestId) {
    const _publisher = new RefreshorderCheckoutedPublisher(
      refreshorder,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// OrderItem Event Publisher Classes

// Sys_orderPayment Event Publisher Classes

// Publisher class for getOrderPayment2 api
const { Orderpayment2RetrivedTopic } = require("./topics");
class Orderpayment2RetrivedPublisher extends ServicePublisher {
  constructor(orderpayment2, session, requestId) {
    super(Orderpayment2RetrivedTopic, orderpayment2, session, requestId);
  }

  static async Publish(orderpayment2, session, requestId) {
    const _publisher = new Orderpayment2RetrivedPublisher(
      orderpayment2,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for listOrderPayments2 api
const { Orderpayments2ListedTopic } = require("./topics");
class Orderpayments2ListedPublisher extends ServicePublisher {
  constructor(orderpayments2, session, requestId) {
    super(Orderpayments2ListedTopic, orderpayments2, session, requestId);
  }

  static async Publish(orderpayments2, session, requestId) {
    const _publisher = new Orderpayments2ListedPublisher(
      orderpayments2,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for createOrderPayment api
const { OrderpaymentCreatedTopic } = require("./topics");
class OrderpaymentCreatedPublisher extends ServicePublisher {
  constructor(orderpayment, session, requestId) {
    super(OrderpaymentCreatedTopic, orderpayment, session, requestId);
  }

  static async Publish(orderpayment, session, requestId) {
    const _publisher = new OrderpaymentCreatedPublisher(
      orderpayment,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for updateOrderPayment api
const { OrderpaymentUpdatedTopic } = require("./topics");
class OrderpaymentUpdatedPublisher extends ServicePublisher {
  constructor(orderpayment, session, requestId) {
    super(OrderpaymentUpdatedTopic, orderpayment, session, requestId);
  }

  static async Publish(orderpayment, session, requestId) {
    const _publisher = new OrderpaymentUpdatedPublisher(
      orderpayment,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for deleteOrderPayment api
const { OrderpaymentDeletedTopic } = require("./topics");
class OrderpaymentDeletedPublisher extends ServicePublisher {
  constructor(orderpayment, session, requestId) {
    super(OrderpaymentDeletedTopic, orderpayment, session, requestId);
  }

  static async Publish(orderpayment, session, requestId) {
    const _publisher = new OrderpaymentDeletedPublisher(
      orderpayment,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for getOrderPaymentByOrderId api
const { OrderpaymentbyorderidRetrivedTopic } = require("./topics");
class OrderpaymentbyorderidRetrivedPublisher extends ServicePublisher {
  constructor(orderpaymentbyorderid, session, requestId) {
    super(
      OrderpaymentbyorderidRetrivedTopic,
      orderpaymentbyorderid,
      session,
      requestId,
    );
  }

  static async Publish(orderpaymentbyorderid, session, requestId) {
    const _publisher = new OrderpaymentbyorderidRetrivedPublisher(
      orderpaymentbyorderid,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for getOrderPaymentByPaymentId api
const { OrderpaymentbypaymentidRetrivedTopic } = require("./topics");
class OrderpaymentbypaymentidRetrivedPublisher extends ServicePublisher {
  constructor(orderpaymentbypaymentid, session, requestId) {
    super(
      OrderpaymentbypaymentidRetrivedTopic,
      orderpaymentbypaymentid,
      session,
      requestId,
    );
  }

  static async Publish(orderpaymentbypaymentid, session, requestId) {
    const _publisher = new OrderpaymentbypaymentidRetrivedPublisher(
      orderpaymentbypaymentid,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Sys_paymentCustomer Event Publisher Classes

// Publisher class for getPaymentCustomerByUserId api
const { PaymentcustomerbyuseridRetrivedTopic } = require("./topics");
class PaymentcustomerbyuseridRetrivedPublisher extends ServicePublisher {
  constructor(paymentcustomerbyuserid, session, requestId) {
    super(
      PaymentcustomerbyuseridRetrivedTopic,
      paymentcustomerbyuserid,
      session,
      requestId,
    );
  }

  static async Publish(paymentcustomerbyuserid, session, requestId) {
    const _publisher = new PaymentcustomerbyuseridRetrivedPublisher(
      paymentcustomerbyuserid,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for listPaymentCustomers api
const { PaymentcustomersListedTopic } = require("./topics");
class PaymentcustomersListedPublisher extends ServicePublisher {
  constructor(paymentcustomers, session, requestId) {
    super(PaymentcustomersListedTopic, paymentcustomers, session, requestId);
  }

  static async Publish(paymentcustomers, session, requestId) {
    const _publisher = new PaymentcustomersListedPublisher(
      paymentcustomers,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Sys_paymentMethod Event Publisher Classes

// Publisher class for listPaymentCustomerMethods api
const { PaymentcustomermethodsListedTopic } = require("./topics");
class PaymentcustomermethodsListedPublisher extends ServicePublisher {
  constructor(paymentcustomermethods, session, requestId) {
    super(
      PaymentcustomermethodsListedTopic,
      paymentcustomermethods,
      session,
      requestId,
    );
  }

  static async Publish(paymentcustomermethods, session, requestId) {
    const _publisher = new PaymentcustomermethodsListedPublisher(
      paymentcustomermethods,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

module.exports = {
  OrderCreatedPublisher,
  OrderRetrivedPublisher,
  OrderUpdatedPublisher,
  OrderDeletedPublisher,
  OrdersListedPublisher,
  StartorderCheckoutedPublisher,
  CompleteorderCheckoutedPublisher,
  RefreshorderCheckoutedPublisher,

  Orderpayment2RetrivedPublisher,
  Orderpayments2ListedPublisher,
  OrderpaymentCreatedPublisher,
  OrderpaymentUpdatedPublisher,
  OrderpaymentDeletedPublisher,
  OrderpaymentbyorderidRetrivedPublisher,
  OrderpaymentbypaymentidRetrivedPublisher,

  PaymentcustomerbyuseridRetrivedPublisher,
  PaymentcustomersListedPublisher,

  PaymentcustomermethodsListedPublisher,
};
