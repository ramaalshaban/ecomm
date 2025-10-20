const { HttpServerError, BadRequestError } = require("common");

const { AdminNotificationConfig } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getAdminNotificationConfigStatsByQuery = async (query, stats) => {
  const promises = [];
  const statLabels = [];
  try {
    const queryWithSoftDelete = {
      ...query,
      isActive: true,
    };

    for (const stat of stats) {
      let statParts = stat.replace("(", "-").replace(")", "").split("-");
      if (stat === "count") {
        promises.push(
          AdminNotificationConfig.count({ where: queryWithSoftDelete }),
        );
        statLabels.push("count");
      } else if (statParts.length == 2) {
        if (statParts[0] === "sum") {
          promises.push(
            AdminNotificationConfig.sum(statParts[1], {
              where: queryWithSoftDelete,
            }),
          );
          statLabels.push("sum-" + statParts[1]);
        } else if (statParts[0] === "avg") {
          promises.push(
            AdminNotificationConfig.avg(statParts[1], {
              where: queryWithSoftDelete,
            }),
          );
          statLabels.push("avg-" + statParts[1]);
        } else if (statParts[0] === "min") {
          promises.push(
            AdminNotificationConfig.min(statParts[1], {
              where: queryWithSoftDelete,
            }),
          );
          statLabels.push("min-" + statParts[1]);
        } else if (statParts[0] === "max") {
          promises.push(
            AdminNotificationConfig.max(statParts[1], {
              where: queryWithSoftDelete,
            }),
          );
          statLabels.push("max-" + statParts[1]);
        }
      }
    }

    if (promises.length == 0) {
      return await AdminNotificationConfig.count({
        where: queryWithSoftDelete,
      });
    } else if (promises.length == 1) {
      return await promises[0];
    } else {
      const results = await Promise.all(promises);
      return results.reduce((acc, val, index) => {
        acc[statLabels[index]] = val;
        return acc;
      }, {});
    }
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingAdminNotificationConfigStatsByQuery",
      err,
    );
  }
};

module.exports = getAdminNotificationConfigStatsByQuery;
