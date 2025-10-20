const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class ExportJobQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("exportJob", [], Op.and, Op.eq, input, wClause);
  }
}

class ExportJobQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("exportJob", []);
  }
}

module.exports = {
  ExportJobQueryCache,
  ExportJobQueryCacheInvalidator,
};
