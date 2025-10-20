const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class UserNotificationPreferencesQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("userNotificationPreferences", [], Op.and, Op.eq, input, wClause);
  }
}

class UserNotificationPreferencesQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("userNotificationPreferences", []);
  }
}

module.exports = {
  UserNotificationPreferencesQueryCache,
  UserNotificationPreferencesQueryCacheInvalidator,
};
