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

import { useOrderManagementGetOrder } from "src/actions/orderManagement";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function OrderManagementGetOrderApiPage() {
  const [view, setView] = useState("Table");

  const [inputOrderId, setInputOrderId] = useState("");
  const [submittedOrderId, setSubmittedOrderId] = useState(null);

  const { order, orderLoading, orderError } =
    useOrderManagementGetOrder(submittedOrderId);

  const handleGetOrder = () => {
    setSubmittedOrderId(inputOrderId);
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
              label="orderId"
              value={inputOrderId}
              onChange={(e) => setInputOrderId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetOrder}
            disabled={!inputOrderId || orderLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!orderLoading && (orderError || order) && (
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
                color={orderError ? "error" : "success"}
                display="inline"
              >
                {orderError ? orderError.status : "200"}
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
              <TableResponse content={order} error={orderError} />
            ) : (
              <JsonResponse content={order || orderError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
