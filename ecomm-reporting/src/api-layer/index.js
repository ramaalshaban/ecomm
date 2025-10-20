module.exports = {
  ReportingServiceManager: require("./service-manager/ReportingServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // SalesReport Db Object
  CreateSalesReportManager: require("./main/salesReport/create-salesreport-api"),
  // ExportJob Db Object
  CreateExportJobManager: require("./main/exportJob/create-exportjob-api"),
  GetExportJobManager: require("./main/exportJob/get-exportjob-api"),
  ListExportJobsManager: require("./main/exportJob/list-exportjobs-api"),
  // ReportingJobAudit Db Object
  integrationRouter: require("./integrations/testRouter"),
};
