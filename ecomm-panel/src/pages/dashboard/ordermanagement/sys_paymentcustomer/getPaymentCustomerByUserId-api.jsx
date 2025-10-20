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

import { useOrderManagementGetPaymentCustomerByUserId } from "src/actions/orderManagement";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function OrderManagementGetPaymentCustomerByUserIdApiPage() {
  const [view, setView] = useState("Table");

  const [inputSys_paymentCustomerId, setInputSys_paymentCustomerId] =
    useState("");
  const [submittedSys_paymentCustomerId, setSubmittedSys_paymentCustomerId] =
    useState(null);

  const {
    sys_paymentCustomer,
    sys_paymentCustomerLoading,
    sys_paymentCustomerError,
  } = useOrderManagementGetPaymentCustomerByUserId(
    submittedSys_paymentCustomerId,
  );

  const handleGetPaymentcustomerbyuserid = () => {
    setSubmittedSys_paymentCustomerId(inputSys_paymentCustomerId);
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
              label="sys_paymentCustomerId"
              value={inputSys_paymentCustomerId}
              onChange={(e) => setInputSys_paymentCustomerId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetPaymentcustomerbyuserid}
            disabled={!inputSys_paymentCustomerId || sys_paymentCustomerLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!sys_paymentCustomerLoading &&
        (sys_paymentCustomerError || sys_paymentCustomer) && (
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
                  color={sys_paymentCustomerError ? "error" : "success"}
                  display="inline"
                >
                  {sys_paymentCustomerError
                    ? sys_paymentCustomerError.status
                    : "200"}
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
                  content={sys_paymentCustomer}
                  error={sys_paymentCustomerError}
                />
              ) : (
                <JsonResponse
                  content={sys_paymentCustomer || sys_paymentCustomerError}
                />
              )}
            </Box>
          </Box>
        )}
    </>
  );
}
