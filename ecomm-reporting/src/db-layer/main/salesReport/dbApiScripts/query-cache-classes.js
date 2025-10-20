const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class SalesReportQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("salesReport", [], Op.and, Op.eq, input, wClause);
  }
}

class SalesReportQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("salesReport", []);
  }
}

module.exports = {
  SalesReportQueryCache,
  SalesReportQueryCacheInvalidator,
};
