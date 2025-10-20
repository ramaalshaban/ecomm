import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useCartListCarts } from "src/actions/cart";

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

const metadata = { title: `Cart data - Cart module - ${CONFIG.appName}` };

const CartUpdateCartModal = lazy(
  () => import("src/components/modals/cart/cart/updatecart-modal"),
);

const CartDeleteCartModal = lazy(
  () => import("src/components/modals/cart/cart/deletecart-modal"),
);

export default function CartCartAppPage() {
  const [selectedCart, setSelectedCart] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } = useCartListCarts();

  const OnEditClickHandler = (row) => {
    setSelectedCart(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedCart(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "Cart");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listcarts");

    setField("createModal", "CartCreateCartModal");

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/ecomm/ecomm-cart-service.git",
    );

    setField("cruds", [
      {
        name: "CreateCart",
        method: "CREATE",
        color: "success",
        componentName: "CartCreateCartApiPage",
      },

      {
        name: "GetCart",
        method: "GET",
        color: "primary",
        componentName: "CartGetCartApiPage",
      },

      {
        name: "UpdateCart",
        method: "UPDATE",
        color: "info",
        componentName: "CartUpdateCartApiPage",
      },

      {
        name: "DeleteCart",
        method: "DELETE",
        color: "error",
        componentName: "CartDeleteCartApiPage",
      },

      {
        name: "ListCarts",
        method: "LIST",
        color: "primary",
        componentName: "CartListCartsApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "userId", headerName: "userId", flex: 1 },

    { field: "items", headerName: "items", flex: 1 },

    { field: "lastModified", headerName: "lastModified", flex: 1 },

    { field: "yuy", headerName: "yuy", flex: 1 },

    {
      type: "boolean",
      field: "OI",
      headerName: "OI",
      width: 80,
      renderCell: (params) =>
        params.row.OI ? (
          <Iconify
            icon="eva:checkmark-circle-2-fill"
            sx={{ color: "primary.main" }}
          />
        ) : (
          "-"
        ),
    },

    { field: "frf", headerName: "frf", flex: 1 },

    {
      type: "boolean",
      field: "vrg",
      headerName: "vrg",
      width: 80,
      renderCell: (params) =>
        params.row.vrg ? (
          <Iconify
            icon="eva:checkmark-circle-2-fill"
            sx={{ color: "primary.main" }}
          />
        ) : (
          "-"
        ),
    },
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

      <CartUpdateCartModal
        openDialog={openEditDialog}
        selectedCart={selectedCart}
      />

      <CartDeleteCartModal
        openDialog={openDeleteDialog}
        selectedId={selectedCart?.id}
      />
    </>
  );
}
