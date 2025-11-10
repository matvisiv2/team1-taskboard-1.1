import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import clsx from "clsx";
import { TaskCreateForm } from "../Forms";
import { Task } from "../Task";
import { ColumnTitle } from "./../ColumnTitle";
import styles from "./Column.module.scss";

export const Column = ({ id, column }) => {
  const {
    setNodeRef,
    transform,
    transition,
    isDragging,
    attributes,
    listeners,
  } = useSortable({ id });

  // protection from undefined
  if (!column) return null;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className={clsx(styles.root, { [styles.rootFull]: true })}>
        <div className={styles.wrapper}>
          <List
            sx={{
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <ListItemButton {...attributes} {...listeners} component="div">
              <ColumnTitle column={column} />
            </ListItemButton>
            <Divider />
            <SortableContext
              items={[...column?.tasks?.map((task) => `t${task.id}${id}`)]}
              strategy={verticalListSortingStrategy}
            >
              <div className={styles.tasks}>
                {column?.tasks?.map((task) => (
                  <Task
                    key={`task-${task.id}`}
                    id={`t${task.id}${id}`}
                    task={task}
                  />
                ))}
              </div>
            </SortableContext>
            {/* <Divider /> */}
            <TaskCreateForm columnId={column.id} />
          </List>
        </div>
      </div>
    </div>
  );
};
