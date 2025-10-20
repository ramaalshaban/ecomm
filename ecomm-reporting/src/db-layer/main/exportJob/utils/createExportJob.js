const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { ExportJob } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("exportJob");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = ["exportType", "status", "requestedBy", "startedAt"];

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

const createExportJob = async (data) => {
  try {
    validateData(data);

    const current_exportJob = data.id
      ? await ExportJob.findByPk(data.id)
      : null;
    let newexportJob = null;

    if (current_exportJob) {
      delete data.id;
      data.isActive = true;
      await current_exportJob.update(data);
      newexportJob = current_exportJob;
    }

    if (!newexportJob) {
      newexportJob = await ExportJob.create(data);
    }

    const _data = newexportJob.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenCreatingExportJob", err);
  }
};

module.exports = createExportJob;
