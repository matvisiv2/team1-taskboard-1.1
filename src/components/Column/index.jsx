import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import clsx from "clsx";
import { TaskCreateForm } from "../Forms";
import { GlobalSkeleton } from "../GlobalSkeleton";
import { Task } from "../Task";
import { ColumnTitle } from "./../ColumnTitle";
import styles from "./Column.module.scss";

export const Column = ({ column, isFullPost, isLoading, isEditable }) => {
  if (isLoading) {
    return <GlobalSkeleton />;
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      <div className={styles.wrapper}>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",

            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <ListItemButton component="div">
            <ColumnTitle column={column} />
          </ListItemButton>
          <Divider />
          {column.tasks?.map((task) => (
            <Task key={`task-${task.id}`} task={task} />
          ))}
          <Divider />
          <TaskCreateForm columnId={column.id} />
        </List>
      </div>
    </div>
  );
};
