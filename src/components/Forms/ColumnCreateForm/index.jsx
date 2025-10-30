import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchColumnCreate } from "../../../redux/slices/columns";
import { showSnackbar } from "../../../redux/slices/snackbar";
import styles from "./ColumnCreateForm.module.scss";

export const ColumnCreateForm = ({ boardId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      title: "New list",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const data = await dispatch(fetchColumnCreate({ boardId, values }));
      if (data.payload) {
        dispatch(
          showSnackbar({ message: "List created succesfully", success: true }),
        );
      }
      form.reset();
    } catch (err) {
      showSnackbar({
        message: "List create failed",
        success: false,
      });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box className={styles.root} sx={{ height: "100%" }}>
        <Box sx={{ height: "100%" }}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
            <TextField
              name="title"
              className={styles.field}
              label="Create new list"
              fullWidth
              variant="outlined"
              size="small"
              sx={{ width: "256px" }}
              {...form.register("title", { required: "type list title" })}
            />
            <Button type="submit" loading={isLoading}>
              <AddCircleOutlineIcon />
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};
