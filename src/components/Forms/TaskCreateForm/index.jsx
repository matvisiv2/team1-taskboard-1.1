import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchTaskCreate } from "../../../redux/slices/columns";
import { showSnackbar } from "../../../redux/slices/snackbar";
import styles from "./TaskCreateForm.module.scss";

export const TaskCreateForm = ({ columnId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      title: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const onSubmit = async (values) => {
    if (values.title.trim()) {
      setIsLoading(true);
      const data = await dispatch(fetchTaskCreate({ columnId, values }));
      if (data.error) {
        dispatch(
          showSnackbar({ message: "Failed to create task", success: false }),
        );
      } else {
        dispatch(
          showSnackbar({ message: "Task created succesfully", success: true }),
        );
        form.reset();
      }
      setIsLoading(false);
    }
    setIsOpen(false);
  };

  const handleOnBlur = (event) => {
    const nextFocus = event.relatedTarget;
    if (nextFocus?.dataset?.role === "close-button") {
      form.reset();
      return;
    }
    form.handleSubmit(onSubmit)();
  };

  if (!isOpen) {
    return (
      <Button variant="outlined" onClick={() => setIsOpen(true)}>
        Add task
      </Button>
    );
  }

  return (
    <Box className={clsx(styles.root)}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <TextField
          name="title"
          inputRef={inputRef}
          className={styles.field}
          label="New task"
          placeholder="Enter title"
          fullWidth
          variant="outlined"
          size="small"
          sx={{ width: "100%" }}
          {...form.register("title", {
            onBlur: handleOnBlur,
          })}
        />
        <div className={styles["form-buttons"]}>
          <Button variant="contained" type="submit" loading={isLoading}>
            Add task
          </Button>
          <Button onClick={() => setIsOpen(false)} data-role="close-button">
            <CloseIcon />
          </Button>
        </div>
      </form>
    </Box>
  );
};
