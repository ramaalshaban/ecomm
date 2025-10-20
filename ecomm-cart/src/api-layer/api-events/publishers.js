const { ServicePublisher } = require("serviceCommon");

// Cart Event Publisher Classes

// Publisher class for createCart api
const { CartCreatedTopic } = require("./topics");
class CartCreatedPublisher extends ServicePublisher {
  constructor(cart, session, requestId) {
    super(CartCreatedTopic, cart, session, requestId);
  }

  static async Publish(cart, session, requestId) {
    const _publisher = new CartCreatedPublisher(cart, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for getCart api
const { CartRetrivedTopic } = require("./topics");
class CartRetrivedPublisher extends ServicePublisher {
  constructor(cart, session, requestId) {
    super(CartRetrivedTopic, cart, session, requestId);
  }

  static async Publish(cart, session, requestId) {
    const _publisher = new CartRetrivedPublisher(cart, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for updateCart api
const { CartUpdatedTopic } = require("./topics");
class CartUpdatedPublisher extends ServicePublisher {
  constructor(cart, session, requestId) {
    super(CartUpdatedTopic, cart, session, requestId);
  }

  static async Publish(cart, session, requestId) {
    const _publisher = new CartUpdatedPublisher(cart, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for deleteCart api
const { CartDeletedTopic } = require("./topics");
class CartDeletedPublisher extends ServicePublisher {
  constructor(cart, session, requestId) {
    super(CartDeletedTopic, cart, session, requestId);
  }

  static async Publish(cart, session, requestId) {
    const _publisher = new CartDeletedPublisher(cart, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for listCarts api
const { CartsListedTopic } = require("./topics");
class CartsListedPublisher extends ServicePublisher {
  constructor(carts, session, requestId) {
    super(CartsListedTopic, carts, session, requestId);
  }

  static async Publish(carts, session, requestId) {
    const _publisher = new CartsListedPublisher(carts, session, requestId);
    await _publisher.publish();
  }
}

// CartItem Event Publisher Classes

// Ko Event Publisher Classes

// Bvf Event Publisher Classes

module.exports = {
  CartCreatedPublisher,
  CartRetrivedPublisher,
  CartUpdatedPublisher,
  CartDeletedPublisher,
  CartsListedPublisher,
};
