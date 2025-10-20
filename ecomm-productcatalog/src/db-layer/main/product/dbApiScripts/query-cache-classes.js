const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class ProductQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("product", [], Op.and, Op.eq, input, wClause);
  }
}

class ProductQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("product", []);
  }
}

module.exports = {
  ProductQueryCache,
  ProductQueryCacheInvalidator,
};
