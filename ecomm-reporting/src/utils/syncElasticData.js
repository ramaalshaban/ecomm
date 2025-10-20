const {
  getSalesReportById,
  getIdListOfSalesReportByField,
} = require("dbLayer");
const { getExportJobById, getIdListOfExportJobByField } = require("dbLayer");
const {
  getReportingJobAuditById,
  getIdListOfReportingJobAuditByField,
} = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexSalesReportData = async () => {
  const salesReportIndexer = new ElasticIndexer("salesReport", {
    isSilent: true,
  });
  console.log("Starting to update indexes for SalesReport");
  const idList = (await getIdListOfSalesReportByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getSalesReportById(chunk);
    if (dataList.length) {
      await salesReportIndexer.indexBulkData(dataList);
      await salesReportIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const indexExportJobData = async () => {
  const exportJobIndexer = new ElasticIndexer("exportJob", { isSilent: true });
  console.log("Starting to update indexes for ExportJob");
  const idList = (await getIdListOfExportJobByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getExportJobById(chunk);
    if (dataList.length) {
      await exportJobIndexer.indexBulkData(dataList);
      await exportJobIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const indexReportingJobAuditData = async () => {
  const reportingJobAuditIndexer = new ElasticIndexer("reportingJobAudit", {
    isSilent: true,
  });
  console.log("Starting to update indexes for ReportingJobAudit");
  const idList = (await getIdListOfReportingJobAuditByField()) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getReportingJobAuditById(chunk);
    if (dataList.length) {
      await reportingJobAuditIndexer.indexBulkData(dataList);
      await reportingJobAuditIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }
  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexSalesReportData();
    console.log(
      "SalesReport agregated data is indexed, total salesReports:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing SalesReport data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  try {
    const dataCount = await indexExportJobData();
    console.log(
      "ExportJob agregated data is indexed, total exportJobs:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing ExportJob data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  try {
    const dataCount = await indexReportingJobAuditData();
    console.log(
      "ReportingJobAudit agregated data is indexed, total reportingJobAudits:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing ReportingJobAudit data",
      err.toString(),
    );
    console.log(err);
    //**errorLog
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;
