import EditSquareIcon from "@mui/icons-material/EditSquare";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch } from "react-redux";
import { fetchTaskChangeStatus } from "../../redux/slices/columns";
import { showSnackbar } from "../../redux/slices/snackbar";
import clsx from "clsx";
import styles from "./Task.module.scss";

export const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleChangeTaskStatus = async () => {
    const data = await dispatch(
      fetchTaskChangeStatus({ id: task.id, values: { done: !task.done } }),
    );
    if (data.error) {
      dispatch(
        showSnackbar({ message: "Failed to change task status", success: false }),
      );
    } else {
      dispatch(showSnackbar({ message: "Task status changed", success: true }));
    }
  };

  const removeTask = () => {
    // TODO: remove task
    // dispatch(fetchTaskRemove(task.id));
  };

  return (
    <ListItem
      className={clsx(styles.root)}
      secondaryAction={
        <IconButton edge="end" aria-label="comments">
          <EditSquareIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemIcon>
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
