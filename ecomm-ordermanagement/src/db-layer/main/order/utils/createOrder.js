const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { Order } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("order");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "userId",
    "items",
    "shippingAddress",
    "totalAmount",
    "currency",
    "status",
    "paymentStatus",
    "placedAt",
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

const createOrder = async (data) => {
  try {
    validateData(data);

    const current_order = data.id ? await Order.findByPk(data.id) : null;
    let neworder = null;

    if (current_order) {
      delete data.id;
      data.isActive = true;
      await current_order.update(data);
      neworder = current_order;
    }

    if (!neworder) {
      neworder = await Order.create(data);
    }

    const _data = neworder.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingOrder", err);
  }
};

module.exports = createOrder;
