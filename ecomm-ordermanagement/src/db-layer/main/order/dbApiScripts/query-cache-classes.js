const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class OrderQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("order", [], Op.and, Op.eq, input, wClause);
  }
}

class OrderQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("order", []);
  }
}

module.exports = {
  OrderQueryCache,
  OrderQueryCacheInvalidator,
};
