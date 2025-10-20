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

import orderManagementAxios, {
  orderManagementEndpoints,
} from "../../../../lib/orderManagement-axios.js";

const ADD_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const requestParams = [
  { name: "items", value: "", type: "Object" },

  { name: "shippingAddress", value: "", type: "Object" },

  { name: "totalAmount", value: "", type: "Integer" },

  { name: "currency", value: "", type: "String" },

  { name: "placedAt", value: "", type: "Date" },

  { name: "stripePaymentIntentId", value: "", type: "String" },

  { name: "refundRequested", value: false, type: "Boolean" },

  { name: "refundAmount", value: "", type: "Integer" },

  { name: "adminNotes", value: "", type: "String" },

  { name: "orderHistory", value: "", type: "Object" },
];

const OrderSchema = zod.object({
  items: zod.string().min(1, { message: "items is required" }),

  shippingAddress: zod
    .string()
    .min(1, { message: "shippingAddress is required" }),

  totalAmount: zod.number().min(1, { message: "totalAmount is required" }),

  currency: zod.string().min(1, { message: "currency is required" }),

  placedAt: zod.string().min(1, { message: "placedAt is required" }),

  stripePaymentIntentId: zod.string().nullable(),

  refundRequested: zod.boolean().nullable(),

  refundAmount: zod.number().nullable(),

  adminNotes: zod.string().nullable(),

  orderHistory: zod.string().nullable(),
});

export default function ({ openDialog }) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const defaultValues = {
    items: "",

    shippingAddress: "",

    totalAmount: "",

    currency: "",

    placedAt: "",

    stripePaymentIntentId: "",

    refundRequested: false,

    refundAmount: "",

    adminNotes: "",

    orderHistory: "",
  };

  const methods = useForm({
    resolver: zodResolver(OrderSchema),
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
      const response = await orderManagementAxios.post(
        orderManagementEndpoints.order.createOrder,
        data,
      );
      setError(null);
      reset();
      console.info("RESPONSE", response);
      await mutate([orderManagementEndpoints.order.listOrders]);
      openDialog.onFalse();
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Create Order</DialogTitle>

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
                : "An error occurred while creating the order."}
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
