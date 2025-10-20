const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { Sys_orderPayment } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("sys_orderPayment");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "orderId",
    "paymentId",
    "paymentStatus",
    "statusLiteral",
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

const createSys_orderPayment = async (data) => {
  try {
    validateData(data);

    const current_sys_orderPayment = data.id
      ? await Sys_orderPayment.findByPk(data.id)
      : null;
    let newsys_orderPayment = null;

    if (current_sys_orderPayment) {
      delete data.id;
      data.isActive = true;
      await current_sys_orderPayment.update(data);
      newsys_orderPayment = current_sys_orderPayment;
    }

    if (!newsys_orderPayment) {
      newsys_orderPayment = await Sys_orderPayment.create(data);
    }

    const _data = newsys_orderPayment.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenCreatingSys_orderPayment",
      err,
    );
  }
};

module.exports = createSys_orderPayment;
