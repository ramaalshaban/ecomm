const { ServicePublisher } = require("serviceCommon");

// Product Event Publisher Classes

// Publisher class for createProduct api
const { ProductCreatedTopic } = require("./topics");
class ProductCreatedPublisher extends ServicePublisher {
  constructor(product, session, requestId) {
    super(ProductCreatedTopic, product, session, requestId);
  }

  static async Publish(product, session, requestId) {
    const _publisher = new ProductCreatedPublisher(product, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for updateProduct api
const { ProductUpdatedTopic } = require("./topics");
class ProductUpdatedPublisher extends ServicePublisher {
  constructor(product, session, requestId) {
    super(ProductUpdatedTopic, product, session, requestId);
  }

  static async Publish(product, session, requestId) {
    const _publisher = new ProductUpdatedPublisher(product, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for deleteProduct api
const { ProductDeletedTopic } = require("./topics");
class ProductDeletedPublisher extends ServicePublisher {
  constructor(product, session, requestId) {
    super(ProductDeletedTopic, product, session, requestId);
  }

  static async Publish(product, session, requestId) {
    const _publisher = new ProductDeletedPublisher(product, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for getProduct api
const { ProductRetrivedTopic } = require("./topics");
class ProductRetrivedPublisher extends ServicePublisher {
  constructor(product, session, requestId) {
    super(ProductRetrivedTopic, product, session, requestId);
  }

  static async Publish(product, session, requestId) {
    const _publisher = new ProductRetrivedPublisher(
      product,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for listProducts api
const { ProductsListedTopic } = require("./topics");
class ProductsListedPublisher extends ServicePublisher {
  constructor(products, session, requestId) {
    super(ProductsListedTopic, products, session, requestId);
  }

  static async Publish(products, session, requestId) {
    const _publisher = new ProductsListedPublisher(
      products,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

module.exports = {
  ProductCreatedPublisher,
  ProductUpdatedPublisher,
  ProductDeletedPublisher,
  ProductRetrivedPublisher,
  ProductsListedPublisher,
};
