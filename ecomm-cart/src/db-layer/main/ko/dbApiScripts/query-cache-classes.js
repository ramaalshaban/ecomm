const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class KoQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("ko", [], Op.and, Op.eq, input, wClause);
  }
}

class KoQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("ko", []);
  }
}

module.exports = {
  KoQueryCache,
  KoQueryCacheInvalidator,
};
