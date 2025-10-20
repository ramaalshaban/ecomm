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
  title: `SalesReport data - Reporting module - ${CONFIG.appName}`,
};

export default function ReportingSalesReportAppPage() {
  const { setField, state } = useDataObjectContext();

  useEffect(() => {
    setField("name", "SalesReport");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listsalesReports");

    setField("createModal", null);

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/ecomm/ecomm-reporting-service.git",
    );

    setField("cruds", [
      {
        name: "CreateSalesReport",
        method: "CREATE",
        color: "success",
        componentName: "ReportingCreateSalesReportApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "dateRange", headerName: "dateRange", flex: 1 },

    { field: "totalRevenue", headerName: "totalRevenue", flex: 1 },

    { field: "orderCount", headerName: "orderCount", flex: 1 },

    { field: "productCount", headerName: "productCount", flex: 1 },

    { field: "bestsellers", headerName: "bestsellers", flex: 1 },

    { field: "refundsTotal", headerName: "refundsTotal", flex: 1 },

    { field: "exportJobId", headerName: "exportJobId", flex: 1 },
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
