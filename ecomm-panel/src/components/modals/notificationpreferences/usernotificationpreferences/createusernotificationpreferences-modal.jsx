import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { TableHeadCustom } from "../../../table/index.js";
import { Iconify } from "../../../iconify/index.js";
import { useTheme } from "@mui/material/styles";

import { Form, Field } from "../../../hook-form";
import * as zod from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { mutate } from "swr";

import notificationPreferencesAxios, {
  notificationPreferencesEndpoints,
} from "../../../../lib/notificationPreferences-axios.js";

const ADD_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const requestParams = [
  { name: "orderUpdates", value: false, type: "Boolean" },

  { name: "shippingUpdates", value: false, type: "Boolean" },

  { name: "promoOptIn", value: false, type: "Boolean" },

  { name: "paymentEvents", value: false, type: "Boolean" },

  { name: "systemEvents", value: false, type: "Boolean" },
];

const UsernotificationpreferencesSchema = zod.object({
  orderUpdates: zod.boolean().min(1, { message: "orderUpdates is required" }),

  shippingUpdates: zod
    .boolean()
    .min(1, { message: "shippingUpdates is required" }),

  promoOptIn: zod.boolean().min(1, { message: "promoOptIn is required" }),

  paymentEvents: zod.boolean().min(1, { message: "paymentEvents is required" }),

  systemEvents: zod.boolean().nullable(),
});

export default function ({ openDialog }) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const defaultValues = {
    orderUpdates: false,

    shippingUpdates: false,

    promoOptIn: false,

    paymentEvents: false,

    systemEvents: false,
  };

  const methods = useForm({
    resolver: zodResolver(UsernotificationpreferencesSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await notificationPreferencesAxios.post(
        notificationPreferencesEndpoints.userNotificationPreferences
          .createUserNotificationPreferences,
        data,
      );
      setError(null);
      reset();
      console.info("RESPONSE", response);
      await mutate([
        notificationPreferencesEndpoints.userNotificationPreferences
          .listUserNotificationPreferences,
      ]);
      openDialog.onFalse();
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Create UserNotificationPreferences</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }}>
              <TableHeadCustom headCells={ADD_TABLE_HEAD} />

              <TableBody>
                {requestParams.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell
                      sx={{ backgroundColor: theme.palette.grey[100] }}
                    >
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
          {error && (
            <DialogContentText color="error">
              {error.message
                ? error.message
                : "An error occurred while creating the userNotificationPreferences."}
            </DialogContentText>
          )}
        </DialogContent>

        <DialogActions className="gap-2">
          <Link
            component="button"
            type="button"
            underline="always"
            onClick={openDialog.onFalse}
          >
            Cancel
          </Link>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            startIcon={<Iconify icon="material-symbols:save-outline" />}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
