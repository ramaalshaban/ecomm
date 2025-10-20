const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { Bvf } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("bvf");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [];

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

const createBvf = async (data) => {
  try {
    validateData(data);

    const current_bvf = data.id ? await Bvf.findByPk(data.id) : null;
    let newbvf = null;

    if (current_bvf) {
      delete data.id;
      data.isActive = true;
      await current_bvf.update(data);
      newbvf = current_bvf;
    }

    if (!newbvf) {
      newbvf = await Bvf.create(data);
    }

    const _data = newbvf.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingBvf", err);
  }
};

module.exports = createBvf;
