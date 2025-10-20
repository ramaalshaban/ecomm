import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { JsonResponse } from "../../../../components/json-response/index.js";
import { TableResponse } from "../../../../components/table-response/index.js";
import orderManagementAxios, {
  orderManagementEndpoints,
} from "../../../../lib/orderManagement-axios.js";

export default function OrderManagementDeleteOrderPaymentApiPage() {
  const [view, setView] = useState("Table");
  const [deletedOrderpayment, setDeletedOrderpayment] = useState(null);
  const [sys_orderPaymentLoading, setOrderpaymentLoading] = useState(false);

  const [error, setError] = useState(null);

  const [inputSys_orderPaymentId, setInputSys_orderPaymentId] = useState("");

  const handleDeleteOrderpayment = async () => {
    try {
      setOrderpaymentLoading(true);
      const response = await orderManagementAxios.delete(
        orderManagementEndpoints.sys_orderPayment.deleteOrderPayment.replace(
          ":sys_orderPaymentId",
          inputSys_orderPaymentId,
        ),
      );
      setError(null);
      setDeletedOrderpayment(null);
      console.info("RESPONSE", response);
      setDeletedOrderpayment(response.data.sys_orderPayment);
      setOrderpaymentLoading(false);

      setInputSys_orderPaymentId("");
    } catch (ex) {
      console.error(ex);
      setError(ex);
      setOrderpaymentLoading(false);
    }
  };

  return (
    <Box>
      <Box marginY="2rem">
        <Box marginBottom="2rem">
          <Typography variant="h4" marginBottom="1.5rem">
            DELETE
          </Typography>

          <Box component="div" gap="1rem" display="flex" key="0">
            <Box minWidth="35%">
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                label="sys_orderPaymentId"
                value={inputSys_orderPaymentId}
                onChange={(e) => setInputSys_orderPaymentId(e.target.value)}
              />
            </Box>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteOrderpayment}
              disabled={!inputSys_orderPaymentId || sys_orderPaymentLoading}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider />

      {!sys_orderPaymentLoading && (error || deletedOrderpayment) && (
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
                {error ? error.status : "200"}
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
              <TableResponse content={deletedOrderpayment} error={error} />
            ) : (
              <JsonResponse content={deletedOrderpayment || error} />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
