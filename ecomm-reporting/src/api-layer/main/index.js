module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // SalesReport Db Object
  CreateSalesReportManager: require("./salesReport/create-salesreport-api"),
  // ExportJob Db Object
  CreateExportJobManager: require("./exportJob/create-exportjob-api"),
  GetExportJobManager: require("./exportJob/get-exportjob-api"),
  ListExportJobsManager: require("./exportJob/list-exportjobs-api"),
  // ReportingJobAudit Db Object
};
