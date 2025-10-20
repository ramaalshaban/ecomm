import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useOrderManagementListOrders } from "src/actions/orderManagement";

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
  title: `Order data - OrderManagement module - ${CONFIG.appName}`,
};

const OrderManagementUpdateOrderModal = lazy(
  () => import("src/components/modals/ordermanagement/order/updateorder-modal"),
);

const OrderManagementDeleteOrderModal = lazy(
  () => import("src/components/modals/ordermanagement/order/deleteorder-modal"),
);

export default function OrderManagementOrderAppPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useOrderManagementListOrders();

  const OnEditClickHandler = (row) => {
    setSelectedOrder(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedOrder(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "Order");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listorders");

    setField("createModal", "OrderManagementCreateOrderModal");

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/ecomm/ecomm-orderManagement-service.git",
    );

    setField("cruds", [
      {
        name: "CreateOrder",
        method: "CREATE",
        color: "success",
        componentName: "OrderManagementCreateOrderApiPage",
      },

      {
        name: "GetOrder",
        method: "GET",
        color: "primary",
        componentName: "OrderManagementGetOrderApiPage",
      },

      {
        name: "UpdateOrder",
        method: "UPDATE",
        color: "info",
        componentName: "OrderManagementUpdateOrderApiPage",
      },

      {
        name: "DeleteOrder",
        method: "DELETE",
        color: "error",
        componentName: "OrderManagementDeleteOrderApiPage",
      },

      {
        name: "ListOrders",
        method: "LIST",
        color: "primary",
        componentName: "OrderManagementListOrdersApiPage",
      },

      {
        name: "CheckoutStartOrder",
        method: "UPDATE",
        color: "info",
        componentName: "OrderManagementCheckoutStartOrderApiPage",
      },

      {
        name: "CheckoutCompleteOrder",
        method: "UPDATE",
        color: "info",
        componentName: "OrderManagementCheckoutCompleteOrderApiPage",
      },

      {
        name: "CheckoutRefreshOrder",
        method: "UPDATE",
        color: "info",
        componentName: "OrderManagementCheckoutRefreshOrderApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "userId", headerName: "userId", flex: 1 },

    { field: "items", headerName: "items", flex: 1 },

    { field: "shippingAddress", headerName: "shippingAddress", flex: 1 },

    { field: "totalAmount", headerName: "totalAmount", flex: 1 },

    { field: "currency", headerName: "currency", flex: 1 },

    { field: "status", headerName: "status", flex: 1 },

    { field: "paymentStatus", headerName: "paymentStatus", flex: 1 },

    { field: "placedAt", headerName: "placedAt", flex: 1 },

    {
      field: "stripePaymentIntentId",
      headerName: "stripePaymentIntentId",
      flex: 1,
    },

    {
      type: "boolean",
      field: "refundRequested",
      headerName: "refundRequested",
      width: 80,
      renderCell: (params) =>
        params.row.refundRequested ? (
          <Iconify
            icon="eva:checkmark-circle-2-fill"
            sx={{ color: "primary.main" }}
          />
        ) : (
          "-"
        ),
    },

    { field: "refundAmount", headerName: "refundAmount", flex: 1 },

    { field: "adminNotes", headerName: "adminNotes", flex: 1 },

    { field: "orderHistory", headerName: "orderHistory", flex: 1 },
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

      <OrderManagementUpdateOrderModal
        openDialog={openEditDialog}
        selectedOrder={selectedOrder}
      />

      <OrderManagementDeleteOrderModal
        openDialog={openDeleteDialog}
        selectedId={selectedOrder?.id}
      />
    </>
  );
}
