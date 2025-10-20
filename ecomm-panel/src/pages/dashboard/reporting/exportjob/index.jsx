import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useReportingListExportJobs } from "src/actions/reporting";

import { Iconify } from "src/components/iconify";

import { DashboardContent } from "../../../../layouts/dashboard/index.js";
import { useDataObjectContext } from "../../../../components/nav-section/data/context";
import {
  DataObjectApi,
  DataObjectList,
} from "../../../../components/data-object/index.js";
import { useBoolean } from "minimal-shared/hooks";

// ----------------------------------------------------------------------
// TODO: Add the feature to tell the user what crud route need to be created to use add,update and delete

const metadata = {
  title: `ExportJob data - Reporting module - ${CONFIG.appName}`,
};

export default function ReportingExportJobAppPage() {
  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useReportingListExportJobs();

  useEffect(() => {
    setField("name", "ExportJob");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listexportJobs");

    setField("createModal", "ReportingCreateExportJobModal");

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/ecomm/ecomm-reporting-service.git",
    );

    setField("cruds", [
      {
        name: "CreateExportJob",
        method: "CREATE",
        color: "success",
        componentName: "ReportingCreateExportJobApiPage",
      },

      {
        name: "GetExportJob",
        method: "GET",
        color: "primary",
        componentName: "ReportingGetExportJobApiPage",
      },

      {
        name: "ListExportJobs",
        method: "LIST",
        color: "primary",
        componentName: "ReportingListExportJobsApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "exportType", headerName: "exportType", flex: 1 },

    { field: "status", headerName: "status", flex: 1 },

    { field: "requestedBy", headerName: "requestedBy", flex: 1 },

    { field: "startedAt", headerName: "startedAt", flex: 1 },

    { field: "completedAt", headerName: "completedAt", flex: 1 },

    { field: "downloadUrl", headerName: "downloadUrl", flex: 1 },
    {
      type: "actions",
      field: "actions",
      headerName: "Actions",
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [],
    },
  ];

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        {state.display === "List" ? (
          <DataObjectList columns={columns} rows={options} />
        ) : (
          <DataObjectApi />
        )}
      </DashboardContent>
    </>
  );
}
