import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";

import { Iconify } from "src/components/iconify";

import { DashboardContent } from "../../../../layouts/dashboard/index.js";
import { useDataObjectContext } from "../../../../components/nav-section/data/context";
import {
  DataObjectApi,
  DataObjectListNotProvided,
} from "../../../../components/data-object/index.js";
import { useBoolean } from "minimal-shared/hooks";

// ----------------------------------------------------------------------
// TODO: Add the feature to tell the user what crud route need to be created to use add,update and delete

const metadata = {
  title: `ReportingJobAudit data - Reporting module - ${CONFIG.appName}`,
};

export default function ReportingReportingJobAuditAppPage() {
  const { setField, state } = useDataObjectContext();

  useEffect(() => {
    setField("name", "ReportingJobAudit");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listreportingJobAudits");

    setField("createModal", null);

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/ecomm/ecomm-reporting-service.git",
    );

    setField("cruds", []);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "exportJobId", headerName: "exportJobId", flex: 1 },

    { field: "action", headerName: "action", flex: 1 },

    { field: "timestamp", headerName: "timestamp", flex: 1 },

    { field: "details", headerName: "details", flex: 1 },
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
          <DataObjectListNotProvided />
        ) : (
          <DataObjectApi />
        )}
      </DashboardContent>
    </>
  );
}
