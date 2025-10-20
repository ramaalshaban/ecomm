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

export default function OrderManagementCreateOrderApiPage() {
  const [view, setView] = useState("Table");
  const [createdOrder, setCreatedOrder] = useState(null);
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

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await orderManagementAxios.post(
        orderManagementEndpoints.order.createOrder,
        data,
      );
      setError(null);
      setCreatedOrder(null);
      reset();
      console.info("RESPONSE", response);
      setCreatedOrder(response.data.order);
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box marginY="2rem">
        <Typography variant="h4" marginBottom="1.5rem">
          CREATE
        </Typography>

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
          <Link component="button" underline="always" onClick={reset}>
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
      {(createdOrder || error) && (
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
                {error ? (error.status ?? "500") : "201"}
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
              <TableResponse content={createdOrder} error={error} />
            ) : (
              <JsonResponse content={createdOrder || error} />
            )}
          </Box>
        </Box>
      )}
    </Form>
  );
}
