const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createBvf: utils.createBvf,
  getIdListOfBvfByField: utils.getIdListOfBvfByField,
  getBvfById: utils.getBvfById,
  getBvfAggById: utils.getBvfAggById,
  getBvfListByQuery: utils.getBvfListByQuery,
  getBvfStatsByQuery: utils.getBvfStatsByQuery,
  getBvfByQuery: utils.getBvfByQuery,
  updateBvfById: utils.updateBvfById,
  updateBvfByIdList: utils.updateBvfByIdList,
  updateBvfByQuery: utils.updateBvfByQuery,
  deleteBvfById: utils.deleteBvfById,
  deleteBvfByQuery: utils.deleteBvfByQuery,
};
