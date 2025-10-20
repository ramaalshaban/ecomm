const { EntityCache } = require("common");

class ProductEntityCache extends EntityCache {
  constructor() {
    super("product", ["name", "category", "status", "sku"]);
  }

  async getProductById(productId) {
    const result = await this.getEntityFromCache(productId);
    return result;
  }

  async getProducts(input) {
    const query = {};

    const result = await this.selectEntityFromCache(query);
    return result;
  }
}

module.exports = {
  ProductEntityCache,
};
