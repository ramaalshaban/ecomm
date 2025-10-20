const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { SalesReport } = require("models");
const { Op } = require("sequelize");

const getIdListOfSalesReportByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    const options = {
      attributes: ["id"],
    };
    if (fieldName) {
      options.where = isArray
        ? { [fieldName]: { [Op.contains]: [fieldValue] } }
        : { [fieldName]: fieldValue };
    }

    let salesReportIdList = await SalesReport.findAll(options);

    if (!salesReportIdList) {
      throw new NotFoundError(
        `SalesReport with the specified criteria not found`,
      );
    }

    salesReportIdList = salesReportIdList.map((item) => item.id);
    return salesReportIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSalesReportIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfSalesReportByField;
