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

const OrderpaymentSchema = zod.object({
  paymentId: zod.string().nullable(),

  paymentStatus: zod.string().nullable(),

  statusLiteral: zod.string().nullable(),

  redirectUrl: zod.string().nullable(),
});

export default function ({ openDialog, selectedSys_orderPayment }) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    {
      name: "paymentId",
      value: selectedSys_orderPayment?.paymentId ?? "",
      type: "String",
    },

    {
      name: "paymentStatus",
      value: selectedSys_orderPayment?.paymentStatus ?? "",
      type: "String",
    },

    {
      name: "statusLiteral",
      value: selectedSys_orderPayment?.statusLiteral ?? "",
      type: "String",
    },

    {
      name: "redirectUrl",
      value: selectedSys_orderPayment?.redirectUrl ?? "",
      type: "String",
    },
  ];

  const defaultValues = {
    paymentId: selectedSys_orderPayment?.paymentId ?? "",

    paymentStatus: selectedSys_orderPayment?.paymentStatus ?? "",

    statusLiteral: selectedSys_orderPayment?.statusLiteral ?? "",

    redirectUrl: selectedSys_orderPayment?.redirectUrl ?? "",
  };

  const methods = useForm({
    resolver: zodResolver(OrderpaymentSchema),
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
      if (selectedSys_orderPayment?.id) {
        const response = await orderManagementAxios.patch(
          orderManagementEndpoints.sys_orderPayment.updateOrderPayment.replace(
            ":sys_orderPaymentId",
            selectedSys_orderPayment?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([
          orderManagementEndpoints.sys_orderPayment.listOrderPayments2,
        ]);
        openDialog.onFalse();
      }
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  useEffect(() => {
    methods.reset({
      paymentId: selectedSys_orderPayment?.paymentId ?? "",

      paymentStatus: selectedSys_orderPayment?.paymentStatus ?? "",

      statusLiteral: selectedSys_orderPayment?.statusLiteral ?? "",

      redirectUrl: selectedSys_orderPayment?.redirectUrl ?? "",
    });
  }, [selectedSys_orderPayment]);

  if (!selectedSys_orderPayment) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update Sys_orderPayment</DialogTitle>

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
                : "An error occurred while creating the sys_orderPayment."}
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
