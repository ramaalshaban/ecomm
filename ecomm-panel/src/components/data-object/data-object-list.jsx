import { lazy, useState } from "react";
import { useBoolean } from "minimal-shared/hooks";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {
  DataGrid,
  gridClasses,
  GridToolbarExport,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import { EmptyContent } from "src/components/empty-content";

import { Iconify } from "../iconify/index.js";
import { useDataObjectContext } from "../nav-section/data/context/index.js";

const ProductCatalogCreateProductModal = lazy(
  () =>
    import("src/components/modals/productcatalog/product/createproduct-modal"),
);

const CartCreateCartModal = lazy(
  () => import("src/components/modals/cart/cart/createcart-modal"),
);

const OrderManagementCreateOrderModal = lazy(
  () => import("src/components/modals/ordermanagement/order/createorder-modal"),
);

const NotificationPreferencesCreateAdminNotificationConfigModal = lazy(
  () =>
    import(
      "src/components/modals/notificationpreferences/adminnotificationconfig/createadminnotificationconfig-modal"
    ),
);

const ReportingCreateExportJobModal = lazy(
  () =>
    import("src/components/modals/reporting/exportjob/createexportjob-modal"),
);

const CreateModals = {
  ProductCatalogCreateProductModal,

  CartCreateCartModal,

  OrderManagementCreateOrderModal,

  NotificationPreferencesCreateAdminNotificationConfigModal,

  ReportingCreateExportJobModal,
};

export function DataObjectList({ columns, rows }) {
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const { state } = useDataObjectContext();
  const openAddDialog = useBoolean();

  const getTogglableColumns = () => columns.map((column) => column.field);

  const CreateModal = CreateModals[state.createModal];
  return (
    <>
      <h2>{state.name} List</h2>

      <Divider />

      <DataGrid
        checkboxSelection
        disableRowSelectionOnClick
        columns={columns}
        rows={rows == null ? [] : rows}
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectedRows(newSelectionModel);
        }}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[5, 10, 20, 50, { value: -1, label: "All" }]}
        slots={{
          toolbar: CustomToolbar,
          noRowsOverlay: () => <EmptyContent />,
          noResultsOverlay: () => <EmptyContent title="No results found" />,
        }}
        slotProps={{
          panel: { anchorEl: filterButtonEl },
          toolbar: {
            setFilterButtonEl,
            showQuickFilter: true,
            dataObject: state.name,
            onAddClickHandler: openAddDialog.onTrue,
            createModal: CreateModal,
          },
          columnsManagement: { getTogglableColumns },
        }}
        sx={{
          [`& .${gridClasses.cell}`]: {
            alignItems: "center",
            display: "inline-flex",
          },
        }}
      />

      {CreateModal && <CreateModal openDialog={openAddDialog} />}
    </>
  );
}

function CustomToolbar({
  setFilterButtonEl,
  dataObject,
  onAddClickHandler,
  createModal,
}) {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton ref={setFilterButtonEl} />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      {createModal && (
        <Button
          onClick={onAddClickHandler}
          startIcon={<Iconify icon="material-symbols:add" />}
        >
          Add {dataObject}
        </Button>
      )}
      {/* TODO: implement delete multi selected */}
      {/* <Button color="error" startIcon={<Iconify icon="icomoon-free:bin" />}>
                Delete
            </Button> */}
    </GridToolbarContainer>
  );
}
