import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Paper, Typography, Box } from "@mui/material";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

export const SortableColumn = ({ id, column }) => {
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
  const tasks = column.tasks || [];

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef}>
      <Paper
        style={style}
        sx={{
          minWidth: 280,
          maxWidth: 280,
          height: "fit-content",
          maxHeight: "100%",
          p: 2,
          background: "#fafafa",
          borderRadius: 2,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          cursor: "default",
        }}
      >
        {/* ===== ШАПКА КОЛОНКИ (drag handle) ===== */}
        <Box
          {...attributes}
          {...listeners}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "grab",
            mb: 2,
            userSelect: "none",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {column.title}
          </Typography>
        </Box>

        {/* ===== СПИСОК ТАСКІВ ===== */}
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <Box
            sx={{
              overflowY: "auto",
              pr: 1,
              minHeight: 0,
              flexGrow: 1,
            }}
          >
            {tasks.filter(Boolean).map((task) => (
              <SortableItem key={task.id} id={task.id} task={task} />
            ))}
          </Box>
        </SortableContext>
      </Paper>
    </div>
  );
};
