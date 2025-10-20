const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { SalesReport } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("salesReport");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "dateRange",
    "totalRevenue",
    "orderCount",
    "productCount",
    "bestsellers",
    "refundsTotal",
  ];

  requiredFields.forEach((field) => {
    if (data[field] === null || data[field] === undefined) {
      throw new BadRequestError(
        `Field "${field}" is required and cannot be null or undefined.`,
      );
    }
  });

  if (!data.id) {
    data.id = newUUID();
  }
};

const createSalesReport = async (data) => {
  try {
    validateData(data);

    const current_salesReport = data.id
      ? await SalesReport.findByPk(data.id)
      : null;
    let newsalesReport = null;

    if (current_salesReport) {
      delete data.id;

      await current_salesReport.update(data);
      newsalesReport = current_salesReport;
    }

    if (!newsalesReport) {
      newsalesReport = await SalesReport.create(data);
    }

    const _data = newsalesReport.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingSalesReport", err);
  }
};

module.exports = createSalesReport;
