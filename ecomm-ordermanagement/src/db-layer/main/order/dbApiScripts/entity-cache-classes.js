const { EntityCache } = require("common");

class OrderEntityCache extends EntityCache {
  constructor() {
    super("order", ["status"]);
  }

  async getOrderById(orderId) {
    const result = await this.getEntityFromCache(orderId);
    return result;
  }

  async getOrders(input) {
    const query = {};

    const result = await this.selectEntityFromCache(query);
    return result;
  }
}

module.exports = {
  OrderEntityCache,
};
