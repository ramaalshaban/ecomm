const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { Sys_paymentCustomer } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("sys_paymentCustomer");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = ["customerId", "platform"];

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

const createSys_paymentCustomer = async (data) => {
  try {
    validateData(data);

    const current_sys_paymentCustomer = data.id
      ? await Sys_paymentCustomer.findByPk(data.id)
      : null;
    let newsys_paymentCustomer = null;

    if (current_sys_paymentCustomer) {
      delete data.id;
      data.isActive = true;
      await current_sys_paymentCustomer.update(data);
      newsys_paymentCustomer = current_sys_paymentCustomer;
    }

    if (!newsys_paymentCustomer) {
      newsys_paymentCustomer = await Sys_paymentCustomer.create(data);
    }

    const _data = newsys_paymentCustomer.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenCreatingSys_paymentCustomer",
      err,
    );
  }
};

module.exports = createSys_paymentCustomer;
