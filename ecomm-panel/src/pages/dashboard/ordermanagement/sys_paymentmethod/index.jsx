import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useOrderManagementListPaymentCustomerMethods } from "src/actions/orderManagement";

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
  title: `Sys_paymentMethod data - OrderManagement module - ${CONFIG.appName}`,
};

export default function OrderManagementSys_paymentMethodAppPage() {
  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useOrderManagementListPaymentCustomerMethods();

  useEffect(() => {
    setField("name", "Sys_paymentMethod");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listsys_paymentMethods");

    setField("createModal", null);

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/ecomm/ecomm-orderManagement-service.git",
    );

    setField("cruds", [
      {
        name: "ListPaymentCustomerMethods",
        method: "LIST",
        color: "primary",
        componentName: "OrderManagementListPaymentCustomerMethodsApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "paymentMethodId", headerName: "paymentMethodId", flex: 1 },

    { field: "userId", headerName: "userId", flex: 1 },

    { field: "customerId", headerName: "customerId", flex: 1 },

    { field: "cardHolderName", headerName: "cardHolderName", flex: 1 },

    { field: "cardHolderZip", headerName: "cardHolderZip", flex: 1 },

    { field: "platform", headerName: "platform", flex: 1 },

    { field: "cardInfo", headerName: "cardInfo", flex: 1 },
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
