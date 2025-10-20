const { ServicePublisher } = require("serviceCommon");

// SalesReport Event Publisher Classes

// Publisher class for createSalesReport api
const { SalesreportCreatedTopic } = require("./topics");
class SalesreportCreatedPublisher extends ServicePublisher {
  constructor(salesreport, session, requestId) {
    super(SalesreportCreatedTopic, salesreport, session, requestId);
  }

  static async Publish(salesreport, session, requestId) {
    const _publisher = new SalesreportCreatedPublisher(
      salesreport,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// ExportJob Event Publisher Classes

// Publisher class for createExportJob api
const { ExportjobCreatedTopic } = require("./topics");
class ExportjobCreatedPublisher extends ServicePublisher {
  constructor(exportjob, session, requestId) {
    super(ExportjobCreatedTopic, exportjob, session, requestId);
  }

  static async Publish(exportjob, session, requestId) {
    const _publisher = new ExportjobCreatedPublisher(
      exportjob,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for getExportJob api
const { ExportjobRetrivedTopic } = require("./topics");
class ExportjobRetrivedPublisher extends ServicePublisher {
  constructor(exportjob, session, requestId) {
    super(ExportjobRetrivedTopic, exportjob, session, requestId);
  }

  static async Publish(exportjob, session, requestId) {
    const _publisher = new ExportjobRetrivedPublisher(
      exportjob,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// Publisher class for listExportJobs api
const { ExportjobsListedTopic } = require("./topics");
class ExportjobsListedPublisher extends ServicePublisher {
  constructor(exportjobs, session, requestId) {
    super(ExportjobsListedTopic, exportjobs, session, requestId);
  }

  static async Publish(exportjobs, session, requestId) {
    const _publisher = new ExportjobsListedPublisher(
      exportjobs,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

// ReportingJobAudit Event Publisher Classes

module.exports = {
  SalesreportCreatedPublisher,

  ExportjobCreatedPublisher,
  ExportjobRetrivedPublisher,
  ExportjobsListedPublisher,
};
