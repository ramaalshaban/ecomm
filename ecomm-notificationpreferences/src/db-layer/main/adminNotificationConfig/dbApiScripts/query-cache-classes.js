const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class AdminNotificationConfigQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("adminNotificationConfig", [], Op.and, Op.eq, input, wClause);
  }
}

class AdminNotificationConfigQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("adminNotificationConfig", []);
  }
}

module.exports = {
  AdminNotificationConfigQueryCache,
  AdminNotificationConfigQueryCacheInvalidator,
};
