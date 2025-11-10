import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import clsx from "clsx";
import { TaskCreateForm } from "../Forms";
import { GlobalSkeleton } from "../GlobalSkeleton";
import { TestTask } from "../TestTask";
import { ColumnTitle } from "../ColumnTitle";
import styles from "./TestColumn.module.scss";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export const TestColumn = ({
  column,
  tasks,
  isFullPost,
  isLoading,
  isEditable,
}) => {
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
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks?.map((task) => (
              <TestTask key={`task-${task.id}`} task={task} />
            ))}
          </SortableContext>
          <Divider />
          <TaskCreateForm columnId={column.id} />
        </List>
      </div>
    </div>
  );
};
