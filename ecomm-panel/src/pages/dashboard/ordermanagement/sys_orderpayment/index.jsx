import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useOrderManagementListOrderPayments2 } from "src/actions/orderManagement";

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
  title: `Sys_orderPayment data - OrderManagement module - ${CONFIG.appName}`,
};

const OrderManagementUpdateOrderPaymentModal = lazy(
  () =>
    import(
      "src/components/modals/ordermanagement/sys_orderpayment/updateorderpayment-modal"
    ),
);

const OrderManagementDeleteOrderPaymentModal = lazy(
  () =>
    import(
      "src/components/modals/ordermanagement/sys_orderpayment/deleteorderpayment-modal"
    ),
);

export default function OrderManagementSys_orderPaymentAppPage() {
  const [selectedSys_orderPayment, setSelectedSys_orderPayment] =
    useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useOrderManagementListOrderPayments2();

  const OnEditClickHandler = (row) => {
    setSelectedSys_orderPayment(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedSys_orderPayment(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "Sys_orderPayment");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listsys_orderPayments");

    setField("createModal", "OrderManagementCreateOrderPaymentModal");

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/ecomm/ecomm-orderManagement-service.git",
    );

    setField("cruds", [
      {
        name: "GetOrderPayment2",
        method: "GET",
        color: "primary",
        componentName: "OrderManagementGetOrderPayment2ApiPage",
      },

      {
        name: "ListOrderPayments2",
        method: "LIST",
        color: "primary",
        componentName: "OrderManagementListOrderPayments2ApiPage",
      },

      {
        name: "CreateOrderPayment",
        method: "CREATE",
        color: "success",
        componentName: "OrderManagementCreateOrderPaymentApiPage",
      },

      {
        name: "UpdateOrderPayment",
        method: "UPDATE",
        color: "info",
        componentName: "OrderManagementUpdateOrderPaymentApiPage",
      },

      {
        name: "DeleteOrderPayment",
        method: "DELETE",
        color: "error",
        componentName: "OrderManagementDeleteOrderPaymentApiPage",
      },

      {
        name: "ListOrderPayments2",
        method: "LIST",
        color: "primary",
        componentName: "OrderManagementListOrderPayments2ApiPage",
      },

      {
        name: "GetOrderPaymentByOrderId",
        method: "GET",
        color: "primary",
        componentName: "OrderManagementGetOrderPaymentByOrderIdApiPage",
      },

      {
        name: "GetOrderPaymentByPaymentId",
        method: "GET",
        color: "primary",
        componentName: "OrderManagementGetOrderPaymentByPaymentIdApiPage",
      },

      {
        name: "GetOrderPayment2",
        method: "GET",
        color: "primary",
        componentName: "OrderManagementGetOrderPayment2ApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "ownerId", headerName: "ownerId", flex: 1 },

    { field: "orderId", headerName: "orderId", flex: 1 },

    { field: "paymentId", headerName: "paymentId", flex: 1 },

    { field: "paymentStatus", headerName: "paymentStatus", flex: 1 },

    { field: "statusLiteral", headerName: "statusLiteral", flex: 1 },

    { field: "redirectUrl", headerName: "redirectUrl", flex: 1 },
    {
      type: "actions",
      field: "actions",
      headerName: "Actions",
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Update"
          onClick={() => OnEditClickHandler(params.row)}
        />,

        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => OnDeleteClickHandler(params.row)}
          sx={{ color: "error.main" }}
        />,
      ],
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

      <OrderManagementUpdateOrderPaymentModal
        openDialog={openEditDialog}
        selectedSys_orderPayment={selectedSys_orderPayment}
      />

      <OrderManagementDeleteOrderPaymentModal
        openDialog={openDeleteDialog}
        selectedId={selectedSys_orderPayment?.id}
      />
    </>
  );
}
