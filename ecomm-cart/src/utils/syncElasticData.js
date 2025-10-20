const { getCartById, getIdListOfCartByField } = require("dbLayer");
const { getCartItemById, getIdListOfCartItemByField } = require("dbLayer");
const { getKoById, getIdListOfKoByField } = require("dbLayer");
const { getBvfById, getIdListOfBvfByField } = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexCartData = async () => {
  const cartIndexer = new ElasticIndexer("cart", { isSilent: true });
  console.log("Starting to update indexes for Cart");
  const idList = (await getIdListOfCartByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getCartById(chunk);
    if (dataList.length) {
      await cartIndexer.indexBulkData(dataList);
      await cartIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const indexCartItemData = async () => {
  const cartItemIndexer = new ElasticIndexer("cartItem", { isSilent: true });
  console.log("Starting to update indexes for CartItem");
  const idList = (await getIdListOfCartItemByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getCartItemById(chunk);
    if (dataList.length) {
      await cartItemIndexer.indexBulkData(dataList);
      await cartItemIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const indexKoData = async () => {
  const koIndexer = new ElasticIndexer("ko", { isSilent: true });
  console.log("Starting to update indexes for Ko");
  const idList = (await getIdListOfKoByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getKoById(chunk);
    if (dataList.length) {
      await koIndexer.indexBulkData(dataList);
      await koIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const indexBvfData = async () => {
  const bvfIndexer = new ElasticIndexer("bvf", { isSilent: true });
  console.log("Starting to update indexes for Bvf");
  const idList = (await getIdListOfBvfByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getBvfById(chunk);
    if (dataList.length) {
      await bvfIndexer.indexBulkData(dataList);
      await bvfIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexCartData();
    console.log("Cart agregated data is indexed, total carts:", dataCount);
  } catch (err) {
    console.log("Elastic Index Error When Syncing Cart data", err.toString());
    console.log(err);
    //**errorLog
  }

  try {
    const dataCount = await indexCartItemData();
    console.log(
      "CartItem agregated data is indexed, total cartItems:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing CartItem data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  try {
    const dataCount = await indexKoData();
    console.log("Ko agregated data is indexed, total kos:", dataCount);
  } catch (err) {
    console.log("Elastic Index Error When Syncing Ko data", err.toString());
    console.log(err);
    //**errorLog
  }

  try {
    const dataCount = await indexBvfData();
    console.log("Bvf agregated data is indexed, total bvfs:", dataCount);
  } catch (err) {
    console.log("Elastic Index Error When Syncing Bvf data", err.toString());
    console.log(err);
    //**errorLog
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;
