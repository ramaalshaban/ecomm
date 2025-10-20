import { useState } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
  Button,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { useNotificationPreferencesGetAdminNotificationConfig } from "src/actions/notificationPreferences";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function NotificationPreferencesGetAdminNotificationConfigApiPage() {
  const [view, setView] = useState("Table");

  const [inputAdminNotificationConfigId, setInputAdminNotificationConfigId] =
    useState("");
  const [
    submittedAdminNotificationConfigId,
    setSubmittedAdminNotificationConfigId,
  ] = useState(null);

  const {
    adminNotificationConfig,
    adminNotificationConfigLoading,
    adminNotificationConfigError,
  } = useNotificationPreferencesGetAdminNotificationConfig(
    submittedAdminNotificationConfigId,
  );

  const handleGetAdminnotificationconfig = () => {
    setSubmittedAdminNotificationConfigId(inputAdminNotificationConfigId);
  };

  return (
    <>
      <Box marginY="2rem">
        <Typography variant="h4" marginBottom="1.5rem">
          GET
        </Typography>

        <Box component="div" gap="1rem" display="flex" key="0">
          <Box minWidth="35%">
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              label="adminNotificationConfigId"
              value={inputAdminNotificationConfigId}
              onChange={(e) =>
                setInputAdminNotificationConfigId(e.target.value)
              }
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetAdminnotificationconfig}
            disabled={
              !inputAdminNotificationConfigId || adminNotificationConfigLoading
            }
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!adminNotificationConfigLoading &&
        (adminNotificationConfigError || adminNotificationConfig) && (
          <Box paddingTop="2rem">
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1">
                STATUS:{" "}
                <Typography
                  component="span"
                  variant="subtitle1"
                  color={adminNotificationConfigError ? "error" : "success"}
                  display="inline"
                >
                  {adminNotificationConfigError
                    ? adminNotificationConfigError.status
                    : "200"}
                </Typography>
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                <ToggleButtonGroup
                  color="standard"
                  value={view}
                  exclusive
                  onChange={(_, val) => val && setView(val)}
                >
                  <ToggleButton value="Table" sx={{ paddingX: "2rem" }}>
                    Table
                  </ToggleButton>
                  <ToggleButton value="JSON" sx={{ paddingX: "2rem" }}>
                    JSON
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
            <Box>
              {view === "Table" ? (
                <TableResponse
                  content={adminNotificationConfig}
                  error={adminNotificationConfigError}
                />
              ) : (
                <JsonResponse
                  content={
                    adminNotificationConfig || adminNotificationConfigError
                  }
                />
              )}
            </Box>
          </Box>
        )}
    </>
  );
}
