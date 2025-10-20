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

import { useOrderManagementGetOrderPayment2 } from "src/actions/orderManagement";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function OrderManagementGetOrderPayment2ApiPage() {
  const [view, setView] = useState("Table");

  const [inputSys_orderPaymentId, setInputSys_orderPaymentId] = useState("");
  const [submittedSys_orderPaymentId, setSubmittedSys_orderPaymentId] =
    useState(null);

  const { sys_orderPayment, sys_orderPaymentLoading, sys_orderPaymentError } =
    useOrderManagementGetOrderPayment2(submittedSys_orderPaymentId);

  const handleGetOrderpayment2 = () => {
    setSubmittedSys_orderPaymentId(inputSys_orderPaymentId);
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
              label="sys_orderPaymentId"
              value={inputSys_orderPaymentId}
              onChange={(e) => setInputSys_orderPaymentId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetOrderpayment2}
            disabled={!inputSys_orderPaymentId || sys_orderPaymentLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!sys_orderPaymentLoading &&
        (sys_orderPaymentError || sys_orderPayment) && (
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
                  color={sys_orderPaymentError ? "error" : "success"}
                  display="inline"
                >
                  {sys_orderPaymentError ? sys_orderPaymentError.status : "200"}
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
                  content={sys_orderPayment}
                  error={sys_orderPaymentError}
                />
              ) : (
                <JsonResponse
                  content={sys_orderPayment || sys_orderPaymentError}
                />
              )}
            </Box>
          </Box>
        )}
    </>
  );
}
