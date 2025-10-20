const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { ExportJob } = require("models");
const { Op } = require("sequelize");

const getIdListOfExportJobByField = async (fieldName, fieldValue, isArray) => {
  try {
    const options = {
      where: { isActive: true },
      attributes: ["id"],
    };
    if (fieldName) {
      options.where = isArray
        ? { [fieldName]: { [Op.contains]: [fieldValue] }, isActive: true }
        : { [fieldName]: fieldValue, isActive: true };
    }

    let exportJobIdList = await ExportJob.findAll(options);

    if (!exportJobIdList) {
      throw new NotFoundError(
        `ExportJob with the specified criteria not found`,
      );
    }

    exportJobIdList = exportJobIdList.map((item) => item.id);
    return exportJobIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingExportJobIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfExportJobByField;
