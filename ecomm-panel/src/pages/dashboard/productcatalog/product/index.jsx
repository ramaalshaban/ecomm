import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useProductCatalogListProducts } from "src/actions/productCatalog";

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
  title: `Product data - ProductCatalog module - ${CONFIG.appName}`,
};

const ProductCatalogUpdateProductModal = lazy(
  () =>
    import("src/components/modals/productcatalog/product/updateproduct-modal"),
);

const ProductCatalogDeleteProductModal = lazy(
  () =>
    import("src/components/modals/productcatalog/product/deleteproduct-modal"),
);

export default function ProductCatalogProductAppPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useProductCatalogListProducts();

  const OnEditClickHandler = (row) => {
    setSelectedProduct(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedProduct(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "Product");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listproducts");

    setField("createModal", "ProductCatalogCreateProductModal");

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/ecomm/ecomm-productCatalog-service.git",
    );

    setField("cruds", [
      {
        name: "CreateProduct",
        method: "CREATE",
        color: "success",
        componentName: "ProductCatalogCreateProductApiPage",
      },

      {
        name: "UpdateProduct",
        method: "UPDATE",
        color: "info",
        componentName: "ProductCatalogUpdateProductApiPage",
      },

      {
        name: "DeleteProduct",
        method: "DELETE",
        color: "error",
        componentName: "ProductCatalogDeleteProductApiPage",
      },

      {
        name: "GetProduct",
        method: "GET",
        color: "primary",
        componentName: "ProductCatalogGetProductApiPage",
      },

      {
        name: "ListProducts",
        method: "LIST",
        color: "primary",
        componentName: "ProductCatalogListProductsApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "name", headerName: "name", flex: 1 },

    { field: "description", headerName: "description", flex: 1 },

    { field: "category", headerName: "category", flex: 1 },

    { field: "price", headerName: "price", flex: 1 },

    { field: "images", headerName: "images", flex: 1 },

    {
      type: "boolean",
      field: "availability",
      headerName: "availability",
      width: 80,
      renderCell: (params) =>
        params.row.availability ? (
          <Iconify
            icon="eva:checkmark-circle-2-fill"
            sx={{ color: "primary.main" }}
          />
        ) : (
          "-"
        ),
    },

    { field: "status", headerName: "status", flex: 1 },

    { field: "inventoryCount", headerName: "inventoryCount", flex: 1 },

    { field: "sku", headerName: "sku", flex: 1 },

    { field: "tags", headerName: "tags", flex: 1 },

    { field: "weight", headerName: "weight", flex: 1 },

    { field: "dimensions", headerName: "dimensions", flex: 1 },

    { field: "attributes", headerName: "attributes", flex: 1 },
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

      <ProductCatalogUpdateProductModal
        openDialog={openEditDialog}
        selectedProduct={selectedProduct}
      />

      <ProductCatalogDeleteProductModal
        openDialog={openDeleteDialog}
        selectedId={selectedProduct?.id}
      />
    </>
  );
}
