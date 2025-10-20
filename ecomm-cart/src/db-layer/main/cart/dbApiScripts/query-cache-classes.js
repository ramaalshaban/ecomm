const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class CartQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("cart", ["userId"], Op.and, Op.eq, input, wClause);
  }
}

class CartQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("cart", ["userId"]);
  }
}

module.exports = {
  CartQueryCache,
  CartQueryCacheInvalidator,
};
