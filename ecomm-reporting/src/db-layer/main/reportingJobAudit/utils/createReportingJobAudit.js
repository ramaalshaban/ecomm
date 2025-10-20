const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { ReportingJobAudit } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("reportingJobAudit");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = ["exportJobId", "action", "timestamp"];

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

const createReportingJobAudit = async (data) => {
  try {
    validateData(data);

    const current_reportingJobAudit = data.id
      ? await ReportingJobAudit.findByPk(data.id)
      : null;
    let newreportingJobAudit = null;

    if (current_reportingJobAudit) {
      delete data.id;
      data.isActive = true;
      await current_reportingJobAudit.update(data);
      newreportingJobAudit = current_reportingJobAudit;
    }

    if (!newreportingJobAudit) {
      newreportingJobAudit = await ReportingJobAudit.create(data);
    }

    const _data = newreportingJobAudit.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenCreatingReportingJobAudit",
      err,
    );
  }
};

module.exports = createReportingJobAudit;
