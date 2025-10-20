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

import productCatalogAxios, {
  productCatalogEndpoints,
} from "../../../../lib/productCatalog-axios.js";

const UPDATE_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const ProductSchema = zod.object({
  name: zod.string().nullable(),

  description: zod.string().nullable(),

  category: zod.string().nullable(),

  price: zod.number().nullable(),

  images: zod.string().nullable(),

  status: zod.string().nullable(),

  inventoryCount: zod.number().nullable(),

  sku: zod.string().nullable(),

  tags: zod.string().nullable(),

  weight: zod.number().nullable(),

  dimensions: zod.string().nullable(),

  attributes: zod.string().nullable(),
});

export default function ({ openDialog, selectedProduct }) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    { name: "name", value: selectedProduct?.name ?? "", type: "String" },

    {
      name: "description",
      value: selectedProduct?.description ?? "",
      type: "Text",
    },

    {
      name: "category",
      value: selectedProduct?.category ?? "",
      type: "String",
    },

    { name: "price", value: selectedProduct?.price ?? "", type: "Integer" },

    { name: "images", value: selectedProduct?.images ?? "", type: "String" },

    { name: "status", value: selectedProduct?.status ?? "", type: "Enum" },

    {
      name: "inventoryCount",
      value: selectedProduct?.inventoryCount ?? "",
      type: "Integer",
    },

    { name: "sku", value: selectedProduct?.sku ?? "", type: "String" },

    { name: "tags", value: selectedProduct?.tags ?? "", type: "String" },

    { name: "weight", value: selectedProduct?.weight ?? "", type: "Float" },

    {
      name: "dimensions",
      value: selectedProduct?.dimensions ?? "",
      type: "Object",
    },

    {
      name: "attributes",
      value: selectedProduct?.attributes ?? "",
      type: "Object",
    },
  ];

  const defaultValues = {
    name: selectedProduct?.name ?? "",

    description: selectedProduct?.description ?? "",

    category: selectedProduct?.category ?? "",

    price: selectedProduct?.price ?? "",

    images: selectedProduct?.images ?? "",

    status: selectedProduct?.status ?? "",

    inventoryCount: selectedProduct?.inventoryCount ?? "",

    sku: selectedProduct?.sku ?? "",

    tags: selectedProduct?.tags ?? "",

    weight: selectedProduct?.weight ?? "",

    dimensions: selectedProduct?.dimensions ?? "",

    attributes: selectedProduct?.attributes ?? "",
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (selectedProduct?.id) {
        const response = await productCatalogAxios.patch(
          productCatalogEndpoints.product.updateProduct.replace(
            ":productId",
            selectedProduct?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([productCatalogEndpoints.product.listProducts]);
        openDialog.onFalse();
      }
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  useEffect(() => {
    methods.reset({
      name: selectedProduct?.name ?? "",

      description: selectedProduct?.description ?? "",

      category: selectedProduct?.category ?? "",

      price: selectedProduct?.price ?? "",

      images: selectedProduct?.images ?? "",

      status: selectedProduct?.status ?? "",

      inventoryCount: selectedProduct?.inventoryCount ?? "",

      sku: selectedProduct?.sku ?? "",

      tags: selectedProduct?.tags ?? "",

      weight: selectedProduct?.weight ?? "",

      dimensions: selectedProduct?.dimensions ?? "",

      attributes: selectedProduct?.attributes ?? "",
    });
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update Product</DialogTitle>

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
                : "An error occurred while creating the product."}
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
