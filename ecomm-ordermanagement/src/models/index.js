const { DataTypes } = require("sequelize");
const { getEnumValue } = require("serviceCommon");
const { ElasticIndexer } = require("serviceCommon");
const updateElasticIndexMappings = require("./elastic-index");
const { hexaLogger } = require("common");

const Order = require("./order");
const OrderItem = require("./orderItem");
const Sys_orderPayment = require("./sys_orderPayment");
const Sys_paymentCustomer = require("./sys_paymentCustomer");
const Sys_paymentMethod = require("./sys_paymentMethod");

Order.prototype.getData = function () {
  const data = this.dataValues;

  for (const key of Object.keys(data)) {
    if (key.startsWith("json_")) {
      data[key] = JSON.parse(data[key]);
      const newKey = key.slice(5);
      data[newKey] = data[key];
      delete data[key];
    }
  }

  // set enum Index and enum value
  const statusOptions = [
    "pending",
    "paid",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "refunded",
  ];
  const dataTypestatusOrder = typeof data.status;
  const enumIndexstatusOrder =
    dataTypestatusOrder === "string"
      ? statusOptions.indexOf(data.status)
      : data.status;
  data.status_idx = enumIndexstatusOrder;
  data.status =
    enumIndexstatusOrder > -1 ? statusOptions[enumIndexstatusOrder] : null;
  // set enum Index and enum value
  const paymentStatusOptions = ["unpaid", "paid", "refunded", "failed"];
  const dataTypepaymentStatusOrder = typeof data.paymentStatus;
  const enumIndexpaymentStatusOrder =
    dataTypepaymentStatusOrder === "string"
      ? paymentStatusOptions.indexOf(data.paymentStatus)
      : data.paymentStatus;
  data.paymentStatus_idx = enumIndexpaymentStatusOrder;
  data.paymentStatus =
    enumIndexpaymentStatusOrder > -1
      ? paymentStatusOptions[enumIndexpaymentStatusOrder]
      : null;

  data._owner = data.userId ?? undefined;

  return data;
};

OrderItem.prototype.getData = function () {
  const data = this.dataValues;

  for (const key of Object.keys(data)) {
    if (key.startsWith("json_")) {
      data[key] = JSON.parse(data[key]);
      const newKey = key.slice(5);
      data[newKey] = data[key];
      delete data[key];
    }
  }

  return data;
};

Sys_orderPayment.prototype.getData = function () {
  const data = this.dataValues;

  for (const key of Object.keys(data)) {
    if (key.startsWith("json_")) {
      data[key] = JSON.parse(data[key]);
      const newKey = key.slice(5);
      data[newKey] = data[key];
      delete data[key];
    }
  }

  data._owner = data.ownerId ?? undefined;

  return data;
};

Sys_paymentCustomer.prototype.getData = function () {
  const data = this.dataValues;

  for (const key of Object.keys(data)) {
    if (key.startsWith("json_")) {
      data[key] = JSON.parse(data[key]);
      const newKey = key.slice(5);
      data[newKey] = data[key];
      delete data[key];
    }
  }

  data._owner = data.userId ?? undefined;

  return data;
};

Sys_paymentMethod.prototype.getData = function () {
  const data = this.dataValues;

  for (const key of Object.keys(data)) {
    if (key.startsWith("json_")) {
      data[key] = JSON.parse(data[key]);
      const newKey = key.slice(5);
      data[newKey] = data[key];
      delete data[key];
    }
  }

  data._owner = data.userId ?? undefined;

  return data;
};

module.exports = {
  Order,
  OrderItem,
  Sys_orderPayment,
  Sys_paymentCustomer,
  Sys_paymentMethod,
  updateElasticIndexMappings,
};
