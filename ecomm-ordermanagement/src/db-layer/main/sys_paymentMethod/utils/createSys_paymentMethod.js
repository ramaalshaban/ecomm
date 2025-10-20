const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { Sys_paymentMethod } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("sys_paymentMethod");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "paymentMethodId",
    "userId",
    "customerId",
    "platform",
    "cardInfo",
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

const createSys_paymentMethod = async (data) => {
  try {
    validateData(data);

    const current_sys_paymentMethod = data.id
      ? await Sys_paymentMethod.findByPk(data.id)
      : null;
    let newsys_paymentMethod = null;

    if (current_sys_paymentMethod) {
      delete data.id;
      data.isActive = true;
      await current_sys_paymentMethod.update(data);
      newsys_paymentMethod = current_sys_paymentMethod;
    }

    if (!newsys_paymentMethod) {
      newsys_paymentMethod = await Sys_paymentMethod.create(data);
    }

    const _data = newsys_paymentMethod.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenCreatingSys_paymentMethod",
      err,
    );
  }
};

module.exports = createSys_paymentMethod;
