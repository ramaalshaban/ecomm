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

const metadata = { title: `Ko data - Cart module - ${CONFIG.appName}` };

export default function CartKoAppPage() {
  const { setField, state } = useDataObjectContext();

  useEffect(() => {
    setField("name", "Ko");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listkos");

    setField("createModal", null);

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/ecomm/ecomm-cart-service.git",
    );

    setField("cruds", []);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
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
