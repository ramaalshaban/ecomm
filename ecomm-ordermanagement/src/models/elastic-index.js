const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const orderMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  userId: { type: "keyword", index: true },
  items: { type: "object", enabled: false },
  shippingAddress: { type: "object", enabled: false },
  totalAmount: { type: "integer", index: false },
  currency: { type: "keyword", index: true },
  status: { type: "keyword", index: true },
  status_: { type: "keyword" },
  paymentStatus: { type: "keyword", index: false },
  paymentStatus_: { type: "keyword" },
  placedAt: { type: "date", index: true },
  stripePaymentIntentId: { type: "keyword", index: false },
  refundRequested: { type: "boolean", null_value: false },
  refundAmount: { type: "integer", index: false },
  adminNotes: { type: "keyword", index: false },
  orderHistory: { type: "object", enabled: false },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const orderItemMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  productId: { type: "keyword", index: false },
  productName: { type: "keyword", index: false },
  sku: { type: "keyword", index: false },
  price: { type: "integer", index: false },
  quantity: { type: "integer", index: false },
  image: { type: "keyword", index: false },
  attributes: { type: "object", enabled: false },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const sys_orderPaymentMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  ownerId: { type: "keyword", index: true },
  orderId: { type: "keyword", index: true },
  paymentId: { type: "keyword", index: true },
  paymentStatus: { type: "keyword", index: true },
  statusLiteral: { type: "keyword", index: true },
  redirectUrl: { type: "keyword", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const sys_paymentCustomerMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  userId: { type: "keyword", index: true },
  customerId: { type: "keyword", index: true },
  platform: { type: "keyword", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const sys_paymentMethodMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  paymentMethodId: { type: "keyword", index: true },
  userId: { type: "keyword", index: true },
  customerId: { type: "keyword", index: true },
  cardHolderName: { type: "keyword", index: true },
  cardHolderZip: { type: "keyword", index: true },
  platform: { type: "keyword", index: true },
  cardInfo: { properties: {} },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("order", orderMapping);
    await new ElasticIndexer("order").updateMapping(orderMapping);
    ElasticIndexer.addMapping("orderItem", orderItemMapping);
    await new ElasticIndexer("orderItem").updateMapping(orderItemMapping);
    ElasticIndexer.addMapping("sys_orderPayment", sys_orderPaymentMapping);
    await new ElasticIndexer("sys_orderPayment").updateMapping(
      sys_orderPaymentMapping,
    );
    ElasticIndexer.addMapping(
      "sys_paymentCustomer",
      sys_paymentCustomerMapping,
    );
    await new ElasticIndexer("sys_paymentCustomer").updateMapping(
      sys_paymentCustomerMapping,
    );
    ElasticIndexer.addMapping("sys_paymentMethod", sys_paymentMethodMapping);
    await new ElasticIndexer("sys_paymentMethod").updateMapping(
      sys_paymentMethodMapping,
    );
  } catch (err) {
    hexaLogger.insertError(
      "UpdateElasticIndexMappingsError",
      { function: "updateElasticIndexMappings" },
      "elastic-index.js->updateElasticIndexMappings",
      err,
    );
  }
};

module.exports = updateElasticIndexMappings;
