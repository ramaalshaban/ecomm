import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useOrderManagementListPaymentCustomers } from "src/actions/orderManagement";

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
  title: `Sys_paymentCustomer data - OrderManagement module - ${CONFIG.appName}`,
};

export default function OrderManagementSys_paymentCustomerAppPage() {
  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useOrderManagementListPaymentCustomers();

  useEffect(() => {
    setField("name", "Sys_paymentCustomer");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listsys_paymentCustomers");

    setField("createModal", null);

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/ecomm/ecomm-orderManagement-service.git",
    );

    setField("cruds", [
      {
        name: "GetPaymentCustomerByUserId",
        method: "GET",
        color: "primary",
        componentName: "OrderManagementGetPaymentCustomerByUserIdApiPage",
      },

      {
        name: "ListPaymentCustomers",
        method: "LIST",
        color: "primary",
        componentName: "OrderManagementListPaymentCustomersApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "userId", headerName: "userId", flex: 1 },

    { field: "customerId", headerName: "customerId", flex: 1 },

    { field: "platform", headerName: "platform", flex: 1 },
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
