const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createKo: utils.createKo,
  getIdListOfKoByField: utils.getIdListOfKoByField,
  getKoById: utils.getKoById,
  getKoAggById: utils.getKoAggById,
  getKoListByQuery: utils.getKoListByQuery,
  getKoStatsByQuery: utils.getKoStatsByQuery,
  getKoByQuery: utils.getKoByQuery,
  updateKoById: utils.updateKoById,
  updateKoByIdList: utils.updateKoByIdList,
  updateKoByQuery: utils.updateKoByQuery,
  deleteKoById: utils.deleteKoById,
  deleteKoByQuery: utils.deleteKoByQuery,
};
