import * as zod from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Chip,
  Link,
  Table,
  Paper,
  TableRow,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  ToggleButton,
  TableContainer,
  ToggleButtonGroup,
} from "@mui/material";

import { Form, Field } from "../../../../components/hook-form";
import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";
import notificationPreferencesAxios, {
  notificationPreferencesEndpoints,
} from "../../../../lib/notificationPreferences-axios.js";

const requestParams = [
  { name: "triggerEvents", value: "", type: "String" },

  { name: "notifyBy", value: "", type: "String" },

  { name: "enabled", value: false, type: "Boolean" },
];

const AdminnotificationconfigSchema = zod.object({
  triggerEvents: zod.string().nullable(),

  notifyBy: zod.string().nullable(),

  enabled: zod.boolean().nullable(),
});

export default function NotificationPreferencesUpdateAdminNotificationConfigApiPage() {
  const [view, setView] = useState("Table");
  const [updatedAdminnotificationconfig, setUpdatedAdminnotificationconfig] =
    useState(null);
  const [error, setError] = useState(null);

  const [inputAdminNotificationConfigId, setInputAdminNotificationConfigId] =
    useState("");

  const theme = useTheme();

  const defaultValues = {
    triggerEvents: "",

    notifyBy: "",

    enabled: false,
  };

  const methods = useForm({
    resolver: zodResolver(AdminnotificationconfigSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await notificationPreferencesAxios.patch(
        notificationPreferencesEndpoints.adminNotificationConfig.updateAdminNotificationConfig.replace(
          ":adminNotificationConfigId",
          inputAdminNotificationConfigId,
        ),
        data,
      );
      setError(null);
      setUpdatedAdminnotificationconfig(null);
      reset();
      console.info("RESPONSE", response);
      setUpdatedAdminnotificationconfig(response.data.adminNotificationConfig);
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box marginY="2rem">
        <Box marginBottom="2rem">
          <Typography variant="h4" marginBottom="1.5rem">
            UPDATE
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
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="30%">
                  <Typography variant="body1" fontWeight="bold">
                    Property Name
                  </Typography>
                </TableCell>
                <TableCell width="70%">
                  <Typography variant="body1" fontWeight="bold">
                    Property Value
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requestParams.map((row) => (
                <TableRow key={row.name}>
                  <TableCell sx={{ backgroundColor: theme.palette.grey[100] }}>
                    <Chip variant="soft" label={row.name} />
                  </TableCell>
                  <TableCell>
                    {row.type === "Boolean" ? (
                      <Field.Checkbox name={row.name} />
                    ) : (
                      <Field.Text name={row.name} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Link component="button" underline="always" onClick={() => reset()}>
            Cancel
          </Link>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>
      <Divider />
      {(updatedAdminnotificationconfig || error) && (
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
                color={error ? "error" : "success"}
                display="inline"
              >
                {error ? (error.status ?? "500") : "200"}
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
                content={updatedAdminnotificationconfig}
                error={error}
              />
            ) : (
              <JsonResponse content={updatedAdminnotificationconfig || error} />
            )}
          </Box>
        </Box>
      )}
    </Form>
  );
}
