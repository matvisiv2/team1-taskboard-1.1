import { Paper } from "@mui/material";

export const TaskCard = ({ task }) => (
  <Paper
    sx={{
      p: 1,
      mb: 1,
      borderRadius: 2,
      backgroundColor: "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      cursor: "grab",
    }}
  >
    {task.title}
  </Paper>
);