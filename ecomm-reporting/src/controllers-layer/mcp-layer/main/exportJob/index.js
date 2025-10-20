module.exports = (headers) => {
  // ExportJob Db Object Rest Api Router
  const exportJobMcpRouter = [];

  // createExportJob controller
  exportJobMcpRouter.push(require("./create-exportjob-api")(headers));
  // getExportJob controller
  exportJobMcpRouter.push(require("./get-exportjob-api")(headers));
  // listExportJobs controller
  exportJobMcpRouter.push(require("./list-exportjobs-api")(headers));

  return exportJobMcpRouter;
};
