const { getOrderById, getIdListOfOrderByField } = require("dbLayer");
const { getOrderItemById, getIdListOfOrderItemByField } = require("dbLayer");
const {
  getSys_orderPaymentById,
  getIdListOfSys_orderPaymentByField,
} = require("dbLayer");
const {
  getSys_paymentCustomerById,
  getIdListOfSys_paymentCustomerByField,
} = require("dbLayer");
const {
  getSys_paymentMethodById,
  getIdListOfSys_paymentMethodByField,
} = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexOrderData = async () => {
  const orderIndexer = new ElasticIndexer("order", { isSilent: true });
  console.log("Starting to update indexes for Order");
  const idList = (await getIdListOfOrderByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getOrderById(chunk);
    if (dataList.length) {
      await orderIndexer.indexBulkData(dataList);
      await orderIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const indexOrderItemData = async () => {
  const orderItemIndexer = new ElasticIndexer("orderItem", { isSilent: true });
  console.log("Starting to update indexes for OrderItem");
  const idList = (await getIdListOfOrderItemByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getOrderItemById(chunk);
    if (dataList.length) {
      await orderItemIndexer.indexBulkData(dataList);
      await orderItemIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const indexSys_orderPaymentData = async () => {
  const sys_orderPaymentIndexer = new ElasticIndexer("sys_orderPayment", {
    isSilent: true,
  });
  console.log("Starting to update indexes for Sys_orderPayment");
  const idList = (await getIdListOfSys_orderPaymentByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getSys_orderPaymentById(chunk);
    if (dataList.length) {
      await sys_orderPaymentIndexer.indexBulkData(dataList);
      await sys_orderPaymentIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const indexSys_paymentCustomerData = async () => {
  const sys_paymentCustomerIndexer = new ElasticIndexer("sys_paymentCustomer", {
    isSilent: true,
  });
  console.log("Starting to update indexes for Sys_paymentCustomer");
  const idList = (await getIdListOfSys_paymentCustomerByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getSys_paymentCustomerById(chunk);
    if (dataList.length) {
      await sys_paymentCustomerIndexer.indexBulkData(dataList);
      await sys_paymentCustomerIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const indexSys_paymentMethodData = async () => {
  const sys_paymentMethodIndexer = new ElasticIndexer("sys_paymentMethod", {
    isSilent: true,
  });
  console.log("Starting to update indexes for Sys_paymentMethod");
  const idList = (await getIdListOfSys_paymentMethodByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getSys_paymentMethodById(chunk);
    if (dataList.length) {
      await sys_paymentMethodIndexer.indexBulkData(dataList);
      await sys_paymentMethodIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexOrderData();
    console.log("Order agregated data is indexed, total orders:", dataCount);
  } catch (err) {
    console.log("Elastic Index Error When Syncing Order data", err.toString());
    console.log(err);
    //**errorLog
  }

  try {
    const dataCount = await indexOrderItemData();
    console.log(
      "OrderItem agregated data is indexed, total orderItems:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing OrderItem data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  try {
    const dataCount = await indexSys_orderPaymentData();
    console.log(
      "Sys_orderPayment agregated data is indexed, total sys_orderPayments:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing Sys_orderPayment data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  try {
    const dataCount = await indexSys_paymentCustomerData();
    console.log(
      "Sys_paymentCustomer agregated data is indexed, total sys_paymentCustomers:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing Sys_paymentCustomer data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  try {
    const dataCount = await indexSys_paymentMethodData();
    console.log(
      "Sys_paymentMethod agregated data is indexed, total sys_paymentMethods:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing Sys_paymentMethod data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;
