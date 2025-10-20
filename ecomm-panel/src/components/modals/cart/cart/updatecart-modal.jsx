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

import cartAxios, { cartEndpoints } from "../../../../lib/cart-axios.js";

const UPDATE_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const CartSchema = zod.object({
  items: zod.string().nullable(),

  yuy: zod.string().nullable(),

  OI: zod.boolean().nullable(),

  frf: zod.number().nullable(),

  vrg: zod.boolean().nullable(),
});

export default function ({ openDialog, selectedCart }) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    { name: "items", value: selectedCart?.items ?? "", type: "Object" },

    { name: "yuy", value: selectedCart?.yuy ?? "", type: "Object" },

    { name: "OI", value: selectedCart?.OI ?? false, type: "Boolean" },

    { name: "frf", value: selectedCart?.frf ?? "", type: "Integer" },

    { name: "vrg", value: selectedCart?.vrg ?? false, type: "Boolean" },
  ];

  const defaultValues = {
    items: selectedCart?.items ?? "",

    yuy: selectedCart?.yuy ?? "",

    OI: selectedCart?.OI ?? false,

    frf: selectedCart?.frf ?? "",

    vrg: selectedCart?.vrg ?? false,
  };

  const methods = useForm({
    resolver: zodResolver(CartSchema),
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
      if (selectedCart?.id) {
        const response = await cartAxios.patch(
          cartEndpoints.cart.updateCart.replace(":cartId", selectedCart?.id),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([cartEndpoints.cart.listCarts]);
        openDialog.onFalse();
      }
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  useEffect(() => {
    methods.reset({
      items: selectedCart?.items ?? "",

      yuy: selectedCart?.yuy ?? "",

      OI: selectedCart?.OI ?? false,

      frf: selectedCart?.frf ?? "",

      vrg: selectedCart?.vrg ?? false,
    });
  }, [selectedCart]);

  if (!selectedCart) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update Cart</DialogTitle>

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
                : "An error occurred while creating the cart."}
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
