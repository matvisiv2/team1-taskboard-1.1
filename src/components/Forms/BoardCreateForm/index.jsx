import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Alert, Box, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchBoardCreate } from "../../../redux/slices/boards";
import styles from "./BoardCreateForm.module.scss";

export const BoardCreateForm = () => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
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
      data.payload ? setSuccess(true) : setSuccess(false);
      setOpen(true);
      form.reset();
    } catch (err) {
      setSuccess(false);
      setOpen(true);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={success ? "success" : "error"}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {success
                ? "Board created successfully"
                : "Failed to create board"}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
};
