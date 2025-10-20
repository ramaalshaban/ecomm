const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class OrderItemQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("orderItem", [], Op.and, Op.eq, input, wClause);
  }
}

class OrderItemQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("orderItem", []);
  }
}

module.exports = {
  OrderItemQueryCache,
  OrderItemQueryCacheInvalidator,
};
