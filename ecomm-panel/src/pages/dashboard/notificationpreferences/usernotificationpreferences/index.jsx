import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useNotificationPreferencesListUserNotificationPreferences } from "src/actions/notificationPreferences";

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
  title: `UserNotificationPreferences data - NotificationPreferences module - ${CONFIG.appName}`,
};

const NotificationPreferencesUpdateUserNotificationPreferencesModal = lazy(
  () =>
    import(
      "src/components/modals/notificationpreferences/usernotificationpreferences/updateusernotificationpreferences-modal"
    ),
);

const NotificationPreferencesDeleteUserNotificationPreferencesModal = lazy(
  () =>
    import(
      "src/components/modals/notificationpreferences/usernotificationpreferences/deleteusernotificationpreferences-modal"
    ),
);

export default function NotificationPreferencesUserNotificationPreferencesAppPage() {
  const [
    selectedUserNotificationPreferences,
    setSelectedUserNotificationPreferences,
  ] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useNotificationPreferencesListUserNotificationPreferences();

  const OnEditClickHandler = (row) => {
    setSelectedUserNotificationPreferences(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedUserNotificationPreferences(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "UserNotificationPreferences");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listuserNotificationPreferencess");

    setField(
      "createModal",
      "NotificationPreferencesCreateUserNotificationPreferencesModal",
    );

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/ecomm/ecomm-notificationPreferences-service.git",
    );

    setField("cruds", [
      {
        name: "CreateUserNotificationPreferences",
        method: "CREATE",
        color: "success",
        componentName:
          "NotificationPreferencesCreateUserNotificationPreferencesApiPage",
      },

      {
        name: "GetUserNotificationPreferences",
        method: "GET",
        color: "primary",
        componentName:
          "NotificationPreferencesGetUserNotificationPreferencesApiPage",
      },

      {
        name: "UpdateUserNotificationPreferences",
        method: "UPDATE",
        color: "info",
        componentName:
          "NotificationPreferencesUpdateUserNotificationPreferencesApiPage",
      },

      {
        name: "DeleteUserNotificationPreferences",
        method: "DELETE",
        color: "error",
        componentName:
          "NotificationPreferencesDeleteUserNotificationPreferencesApiPage",
      },

      {
        name: "ListUserNotificationPreferences",
        method: "LIST",
        color: "primary",
        componentName:
          "NotificationPreferencesListUserNotificationPreferencesApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "userId", headerName: "userId", flex: 1 },

    {
      type: "boolean",
      field: "orderUpdates",
      headerName: "orderUpdates",
      width: 80,
      renderCell: (params) =>
        params.row.orderUpdates ? (
          <Iconify
            icon="eva:checkmark-circle-2-fill"
            sx={{ color: "primary.main" }}
          />
        ) : (
          "-"
        ),
    },

    {
      type: "boolean",
      field: "shippingUpdates",
      headerName: "shippingUpdates",
      width: 80,
      renderCell: (params) =>
        params.row.shippingUpdates ? (
          <Iconify
            icon="eva:checkmark-circle-2-fill"
            sx={{ color: "primary.main" }}
          />
        ) : (
          "-"
        ),
    },

    {
      type: "boolean",
      field: "promoOptIn",
      headerName: "promoOptIn",
      width: 80,
      renderCell: (params) =>
        params.row.promoOptIn ? (
          <Iconify
            icon="eva:checkmark-circle-2-fill"
            sx={{ color: "primary.main" }}
          />
        ) : (
          "-"
        ),
    },

    {
      type: "boolean",
      field: "paymentEvents",
      headerName: "paymentEvents",
      width: 80,
      renderCell: (params) =>
        params.row.paymentEvents ? (
          <Iconify
            icon="eva:checkmark-circle-2-fill"
            sx={{ color: "primary.main" }}
          />
        ) : (
          "-"
        ),
    },

    {
      type: "boolean",
      field: "systemEvents",
      headerName: "systemEvents",
      width: 80,
      renderCell: (params) =>
        params.row.systemEvents ? (
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

      <NotificationPreferencesUpdateUserNotificationPreferencesModal
        openDialog={openEditDialog}
        selectedUserNotificationPreferences={
          selectedUserNotificationPreferences
        }
      />

      <NotificationPreferencesDeleteUserNotificationPreferencesModal
        openDialog={openDeleteDialog}
        selectedId={selectedUserNotificationPreferences?.id}
      />
    </>
  );
}
