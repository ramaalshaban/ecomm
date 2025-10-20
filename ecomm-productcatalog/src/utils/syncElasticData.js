const { getProductById, getIdListOfProductByField } = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexProductData = async () => {
  const productIndexer = new ElasticIndexer("product", { isSilent: true });
  console.log("Starting to update indexes for Product");
  const idList = (await getIdListOfProductByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getProductById(chunk);
    if (dataList.length) {
      await productIndexer.indexBulkData(dataList);
      await productIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexProductData();
    console.log(
      "Product agregated data is indexed, total products:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing Product data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;
