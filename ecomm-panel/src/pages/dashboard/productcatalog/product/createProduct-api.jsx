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
import productCatalogAxios, {
  productCatalogEndpoints,
} from "../../../../lib/productCatalog-axios.js";

const requestParams = [
  { name: "name", value: "", type: "String" },

  { name: "description", value: "", type: "Text" },

  { name: "category", value: "", type: "String" },

  { name: "price", value: "", type: "Integer" },

  { name: "images", value: "", type: "String" },

  { name: "status", value: "", type: "Enum" },

  { name: "inventoryCount", value: "", type: "Integer" },

  { name: "sku", value: "", type: "String" },

  { name: "tags", value: "", type: "String" },

  { name: "weight", value: "", type: "Float" },

  { name: "dimensions", value: "", type: "Object" },

  { name: "attributes", value: "", type: "Object" },
];

const ProductSchema = zod.object({
  name: zod.string().min(1, { message: "name is required" }),

  description: zod.string().nullable(),

  category: zod.string().min(1, { message: "category is required" }),

  price: zod.number().min(1, { message: "price is required" }),

  images: zod.string().min(1, { message: "images is required" }),

  status: zod.string().min(1, { message: "status is required" }),

  inventoryCount: zod
    .number()
    .min(1, { message: "inventoryCount is required" }),

  sku: zod.string().min(1, { message: "sku is required" }),

  tags: zod.string().nullable(),

  weight: zod.number().nullable(),

  dimensions: zod.string().nullable(),

  attributes: zod.string().nullable(),
});

export default function ProductCatalogCreateProductApiPage() {
  const [view, setView] = useState("Table");
  const [createdProduct, setCreatedProduct] = useState(null);
  const [error, setError] = useState(null);

  const theme = useTheme();

  const defaultValues = {
    name: "",

    description: "",

    category: "",

    price: "",

    images: "",

    status: "",

    inventoryCount: "",

    sku: "",

    tags: "",

    weight: "",

    dimensions: "",

    attributes: "",
  };

  const methods = useForm({
    resolver: zodResolver(ProductSchema),
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
      const response = await productCatalogAxios.post(
        productCatalogEndpoints.product.createProduct,
        data,
      );
      setError(null);
      setCreatedProduct(null);
      reset();
      console.info("RESPONSE", response);
      setCreatedProduct(response.data.product);
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
      {(createdProduct || error) && (
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
              <TableResponse content={createdProduct} error={error} />
            ) : (
              <JsonResponse content={createdProduct || error} />
            )}
          </Box>
        </Box>
      )}
    </Form>
  );
}
