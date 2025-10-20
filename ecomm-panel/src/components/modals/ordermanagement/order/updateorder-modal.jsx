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
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { mutate } from "swr";

import orderManagementAxios, {
  orderManagementEndpoints,
} from "../../../../lib/orderManagement-axios.js";

const UPDATE_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const OrderSchema = zod.object({
  status: zod.string().min(1, { message: "status is required" }),

  paymentStatus: zod.string().min(1, { message: "paymentStatus is required" }),

  stripePaymentIntentId: zod.string().nullable(),

  refundRequested: zod.boolean().nullable(),

  refundAmount: zod.number().nullable(),

  adminNotes: zod.string().nullable(),

  orderHistory: zod.string().nullable(),
});

export default function ({ openDialog, selectedOrder }) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    { name: "status", value: selectedOrder?.status ?? "", type: "Enum" },

    {
      name: "paymentStatus",
      value: selectedOrder?.paymentStatus ?? "",
      type: "Enum",
    },

    {
      name: "stripePaymentIntentId",
      value: selectedOrder?.stripePaymentIntentId ?? "",
      type: "String",
    },

    {
      name: "refundRequested",
      value: selectedOrder?.refundRequested ?? false,
      type: "Boolean",
    },

    {
      name: "refundAmount",
      value: selectedOrder?.refundAmount ?? "",
      type: "Integer",
    },

    {
      name: "adminNotes",
      value: selectedOrder?.adminNotes ?? "",
      type: "String",
    },

    {
      name: "orderHistory",
      value: selectedOrder?.orderHistory ?? "",
      type: "Object",
    },
  ];

  const defaultValues = {
    status: selectedOrder?.status ?? "",

    paymentStatus: selectedOrder?.paymentStatus ?? "",

    stripePaymentIntentId: selectedOrder?.stripePaymentIntentId ?? "",

    refundRequested: selectedOrder?.refundRequested ?? false,

    refundAmount: selectedOrder?.refundAmount ?? "",

    adminNotes: selectedOrder?.adminNotes ?? "",

    orderHistory: selectedOrder?.orderHistory ?? "",
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
      if (selectedOrder?.id) {
        const response = await orderManagementAxios.patch(
          orderManagementEndpoints.order.updateOrder.replace(
            ":orderId",
            selectedOrder?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([orderManagementEndpoints.order.listOrders]);
        openDialog.onFalse();
      }
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  useEffect(() => {
    methods.reset({
      status: selectedOrder?.status ?? "",

      paymentStatus: selectedOrder?.paymentStatus ?? "",

      stripePaymentIntentId: selectedOrder?.stripePaymentIntentId ?? "",

      refundRequested: selectedOrder?.refundRequested ?? false,

      refundAmount: selectedOrder?.refundAmount ?? "",

      adminNotes: selectedOrder?.adminNotes ?? "",

      orderHistory: selectedOrder?.orderHistory ?? "",
    });
  }, [selectedOrder]);

  if (!selectedOrder) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update Order</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }}>
              <TableHeadCustom headCells={UPDATE_TABLE_HEAD} />

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
