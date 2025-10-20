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

import { useProductCatalogGetProduct } from "src/actions/productCatalog";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function ProductCatalogGetProductApiPage() {
  const [view, setView] = useState("Table");

  const [inputProductId, setInputProductId] = useState("");
  const [submittedProductId, setSubmittedProductId] = useState(null);

  const { product, productLoading, productError } =
    useProductCatalogGetProduct(submittedProductId);

  const handleGetProduct = () => {
    setSubmittedProductId(inputProductId);
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
              label="productId"
              value={inputProductId}
              onChange={(e) => setInputProductId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetProduct}
            disabled={!inputProductId || productLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!productLoading && (productError || product) && (
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
                color={productError ? "error" : "success"}
                display="inline"
              >
                {productError ? productError.status : "200"}
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
              <TableResponse content={product} error={productError} />
            ) : (
              <JsonResponse content={product || productError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
