const { HttpServerError } = require("common");

let { ExportJob } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getExportJobById = async (exportJobId) => {
  try {
    const exportJob = Array.isArray(exportJobId)
      ? await ExportJob.findAll({
          where: {
            id: { [Op.in]: exportJobId },
            isActive: true,
          },
        })
      : await ExportJob.findOne({
          where: {
            id: exportJobId,
            isActive: true,
          },
        });

    if (!exportJob) {
      return null;
    }
    return Array.isArray(exportJobId)
      ? exportJob.map((item) => item.getData())
      : exportJob.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingExportJobById", err);
  }
};

module.exports = getExportJobById;
