import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useNotificationPreferencesListAdminNotificationConfigs } from "src/actions/notificationPreferences";

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
  title: `AdminNotificationConfig data - NotificationPreferences module - ${CONFIG.appName}`,
};

const NotificationPreferencesUpdateAdminNotificationConfigModal = lazy(
  () =>
    import(
      "src/components/modals/notificationpreferences/adminnotificationconfig/updateadminnotificationconfig-modal"
    ),
);

const NotificationPreferencesDeleteAdminNotificationConfigModal = lazy(
  () =>
    import(
      "src/components/modals/notificationpreferences/adminnotificationconfig/deleteadminnotificationconfig-modal"
    ),
);

export default function NotificationPreferencesAdminNotificationConfigAppPage() {
  const [selectedAdminNotificationConfig, setSelectedAdminNotificationConfig] =
    useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useNotificationPreferencesListAdminNotificationConfigs();

  const OnEditClickHandler = (row) => {
    setSelectedAdminNotificationConfig(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedAdminNotificationConfig(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "AdminNotificationConfig");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listadminNotificationConfigs");

    setField(
      "createModal",
      "NotificationPreferencesCreateAdminNotificationConfigModal",
    );

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/ecomm/ecomm-notificationPreferences-service.git",
    );

    setField("cruds", [
      {
        name: "CreateAdminNotificationConfig",
        method: "CREATE",
        color: "success",
        componentName:
          "NotificationPreferencesCreateAdminNotificationConfigApiPage",
      },

      {
        name: "GetAdminNotificationConfig",
        method: "GET",
        color: "primary",
        componentName:
          "NotificationPreferencesGetAdminNotificationConfigApiPage",
      },

      {
        name: "UpdateAdminNotificationConfig",
        method: "UPDATE",
        color: "info",
        componentName:
          "NotificationPreferencesUpdateAdminNotificationConfigApiPage",
      },

      {
        name: "DeleteAdminNotificationConfig",
        method: "DELETE",
        color: "error",
        componentName:
          "NotificationPreferencesDeleteAdminNotificationConfigApiPage",
      },

      {
        name: "ListAdminNotificationConfigs",
        method: "LIST",
        color: "primary",
        componentName:
          "NotificationPreferencesListAdminNotificationConfigsApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "adminId", headerName: "adminId", flex: 1 },

    { field: "triggerEvents", headerName: "triggerEvents", flex: 1 },

    { field: "notifyBy", headerName: "notifyBy", flex: 1 },

    {
      type: "boolean",
      field: "enabled",
      headerName: "enabled",
      width: 80,
      renderCell: (params) =>
        params.row.enabled ? (
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

      <NotificationPreferencesUpdateAdminNotificationConfigModal
        openDialog={openEditDialog}
        selectedAdminNotificationConfig={selectedAdminNotificationConfig}
      />

      <NotificationPreferencesDeleteAdminNotificationConfigModal
        openDialog={openDeleteDialog}
        selectedId={selectedAdminNotificationConfig?.id}
      />
    </>
  );
}
