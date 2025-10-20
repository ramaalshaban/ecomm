const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class CartItemQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("cartItem", [], Op.and, Op.eq, input, wClause);
  }
}

class CartItemQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("cartItem", []);
  }
}

module.exports = {
  CartItemQueryCache,
  CartItemQueryCacheInvalidator,
};
