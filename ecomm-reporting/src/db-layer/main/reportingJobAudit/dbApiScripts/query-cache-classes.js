const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class ReportingJobAuditQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("reportingJobAudit", [], Op.and, Op.eq, input, wClause);
  }
}

class ReportingJobAuditQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("reportingJobAudit", []);
  }
}

module.exports = {
  ReportingJobAuditQueryCache,
  ReportingJobAuditQueryCacheInvalidator,
};
