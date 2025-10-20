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
import orderManagementAxios, {
  orderManagementEndpoints,
} from "../../../../lib/orderManagement-axios.js";

const requestParams = [
  { name: "status", value: "", type: "Enum" },

  { name: "paymentStatus", value: "", type: "Enum" },

  { name: "stripePaymentIntentId", value: "", type: "String" },

  { name: "refundRequested", value: false, type: "Boolean" },

  { name: "refundAmount", value: "", type: "Integer" },

  { name: "adminNotes", value: "", type: "String" },

  { name: "orderHistory", value: "", type: "Object" },
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

export default function OrderManagementUpdateOrderApiPage() {
  const [view, setView] = useState("Table");
  const [updatedOrder, setUpdatedOrder] = useState(null);
  const [error, setError] = useState(null);

  const [inputOrderId, setInputOrderId] = useState("");

  const theme = useTheme();

  const defaultValues = {
    status: "",

    paymentStatus: "",

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

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await orderManagementAxios.patch(
        orderManagementEndpoints.order.updateOrder.replace(
          ":orderId",
          inputOrderId,
        ),
        data,
      );
      setError(null);
      setUpdatedOrder(null);
      reset();
      console.info("RESPONSE", response);
      setUpdatedOrder(response.data.order);
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
                label="orderId"
                value={inputOrderId}
                onChange={(e) => setInputOrderId(e.target.value)}
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
      {(updatedOrder || error) && (
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
              <TableResponse content={updatedOrder} error={error} />
            ) : (
              <JsonResponse content={updatedOrder || error} />
            )}
          </Box>
        </Box>
      )}
    </Form>
  );
}
