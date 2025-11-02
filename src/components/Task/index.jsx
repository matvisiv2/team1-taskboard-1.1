import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import clsx from "clsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTaskChangeStatus } from "../../redux/slices/columns";
import { showSnackbar } from "../../redux/slices/snackbar";
import { showTaskEditForm } from "../../redux/slices/taskEditForm";
import { fetchTaskRemove } from "../../redux/slices/columns";
import styles from "./Task.module.scss";

export const Task = ({ task }) => {
  const [removing, setRemoving] = useState(false);
  const dispatch = useDispatch();

  const handleChangeTaskStatus = async () => {
    const data = await dispatch(
      fetchTaskChangeStatus({ id: task.id, values: { done: !task.done } }),
    );
    if (data.error) {
      dispatch(
        showSnackbar({
          message: "Failed to change task status",
          success: false,
        }),
      );
    } else {
      dispatch(showSnackbar({ message: "Task status changed", success: true }));
    }
  };

  const removeTask = async () => {
    setRemoving(true);
    const data = await dispatch(fetchTaskRemove(task.id));

    if (data.error) {
      dispatch(
        showSnackbar({
          message: "Failed to remove task",
          success: false,
        }),
      );
    } else {
      dispatch(
        showSnackbar({
          message: "Task removed successfully",
          success: true,
        }),
      );
    }
    setRemoving(false);
  };

  return (
    <ListItem
      className={clsx(styles.root)}
      secondaryAction={
        <>
          <IconButton
            edge="end"
            aria-label="comments"
            className={styles["edit-element"]}
            onClick={() => dispatch(showTaskEditForm(task))}
          >
            <ModeEditOutlineIcon fontSize="small" />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="comments"
            className={clsx({ [styles["edit-element"]]: !removing })}
            onClick={removeTask}
            loading={removing}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      }
      disablePadding
    >
      <ListItemIcon
        className={clsx(styles["checkbox-item"], {
          [styles["change-status"]]: !task.done,
        })}
        fontSize="small"
      >
        <Checkbox
          edge="start"
          checked={task.done}
          tabIndex={-1}
          disableRipple
          slotProps={{
            "aria-labelledby": `checkbox-list-label-${task.id}`,
          }}
          onClick={handleChangeTaskStatus}
        />
      </ListItemIcon>
      <ListItemText
        id={`checkbox-list-label-${task.id}`}
        sx={{ width: "200px" }}
        primary={task.title}
      />
    </ListItem>
  );
};
