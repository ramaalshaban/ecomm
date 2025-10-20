const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class BvfQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("bvf", [], Op.and, Op.eq, input, wClause);
  }
}

class BvfQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("bvf", []);
  }
}

module.exports = {
  BvfQueryCache,
  BvfQueryCacheInvalidator,
};
