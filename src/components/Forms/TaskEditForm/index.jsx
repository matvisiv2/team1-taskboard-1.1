import { Checkbox, FormControlLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import SimpleMdeReact from "react-simplemde-editor";
import { fetchTaskUpdate } from "../../../redux/slices/columns";
import { showSnackbar } from "../../../redux/slices/snackbar";
import {
  hideTaskEditForm,
  selectTaskEditForm,
} from "../../../redux/slices/taskEditForm";
import styles from "./TaskEditForm.module.scss";

export const TaskEditForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { open, task } = useSelector(selectTaskEditForm);

  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      title: task?.title || "",
      content: task?.content || "",
      done: task?.done || false,
      archived: task?.archived || false,
      labels: [],
      participants: [],
    },
  });

  useEffect(() => {
    const newTask = { ...task };
    delete newTask.orderIndex;
    form.reset(newTask);
  }, [form, task]);

  const options = {
    spellChecker: false,
    maxHeight: "400px",
    autofocus: true,
    placeholder: "Enter text...",
    status: false,
    autosave: {
      enabled: true,
      delay: 1000,
      uniqueId: `SimpleMdeReact-task-${task?.id || "new"}`,
    },
  };

  const handleClose = () => {
    dispatch(hideTaskEditForm());
  };

  const onSubmit = async (values) => {
    if (values.title.trim()) {
      setIsLoading(true);
      const data = await dispatch(fetchTaskUpdate({ id: task.id, values }));
      if (data.error) {
        dispatch(
          showSnackbar({ message: "Failed to update task", success: false }),
        );
      } else {
        dispatch(
          showSnackbar({ message: "Task created succesfully", success: true }),
        );
      }
      setIsLoading(false);
    }
  };

  return (
    <div className={clsx(styles.root)}>
      <Dialog open={open} onClose={handleClose} PaperProps={{ elevation: 8 }}>
        <DialogTitle>Edit task</DialogTitle>
        <DialogContent>
          <DialogContentText>{task?.title}</DialogContentText>
          <form onSubmit={form.handleSubmit(onSubmit)} id="task-form">
            <TextField
              required
              margin="dense"
              name="title"
              label="title"
              type="text"
              fullWidth
              variant="standard"
              {...form.register("title", { required: "Enter title" })}
            />
            <Controller
              name="content"
              control={form.control}
              defaultValue={task?.content || ""}
              render={({ field }) => (
                <SimpleMdeReact
                  value={field.value}
                  onChange={field.onChange}
                  options={options}
                />
              )}
            />
            <Controller
              name="done"
              control={form.control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox checked={field.value} onChange={field.onChange} />
                  }
                  label="Done?"
                />
              )}
            />
            <Controller
              name="archived"
              control={form.control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox checked={field.value} onChange={field.onChange} />
                  }
                  label="Archived?"
                />
              )}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="task-form" loading={isLoading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
