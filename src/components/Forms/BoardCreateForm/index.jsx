import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Alert, Box, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchBoardCreate } from "../../../redux/slices/boards";
import styles from "./BoardCreateForm.module.scss";
import { showSnackbar } from "../../../redux/slices/snackbar";

export const BoardCreateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      title: "New board",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const data = await dispatch(fetchBoardCreate(values));
      dispatch(
        showSnackbar({ message: "Board created succesfully", success: true }),
      );
      form.reset();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box className={styles.root} sx={{ width: "500px", height: "100%" }}>
        <Box sx={{ height: "100%" }}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
            <TextField
              name="title"
              className={styles.field}
              label="Create new board"
              fullWidth
              variant="outlined"
              size="small"
              {...form.register("title", { required: "type board title" })}
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
