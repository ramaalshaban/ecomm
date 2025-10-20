const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { Ko } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("ko");
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

const createKo = async (data) => {
  try {
    validateData(data);

    const current_ko = data.id ? await Ko.findByPk(data.id) : null;
    let newko = null;

    if (current_ko) {
      delete data.id;
      data.isActive = true;
      await current_ko.update(data);
      newko = current_ko;
    }

    if (!newko) {
      newko = await Ko.create(data);
    }

    const _data = newko.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingKo", err);
  }
};

module.exports = createKo;
