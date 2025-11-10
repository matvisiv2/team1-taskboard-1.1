import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { useState } from "react";
import { SortableColumn } from "./SortableColumn";
import { TaskCard } from "./TaskCard";

const initialData = {
  columns: {
    todo: {
      id: "todo",
      title: "To Do",
      tasks: [
        { id: "t1", title: "Створити макет" },
        { id: "t2", title: "Підготувати API" },
        { id: "t3", title: "Створити макет" },
      ],
    },
    inProgress: {
      id: "inProgress",
      title: "In Progress",
      tasks: [{ id: "t17", title: "Реалізувати drag&drop" }],
    },
    done: {
      id: "done",
      title: "Done",
      tasks: [{ id: "t18", title: "Ініціалізувати проєкт" }],
    },
  },
  columnOrder: ["todo", "inProgress", "done"],
};

export const TestComponent = () => {
  const [data, setData] = useState(initialData);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const findContainer = (id) => {
    if (data.columns[id]) return id;
    return Object.keys(data.columns).find((colId) =>
      data.columns[colId].tasks.find((task) => task.id === id),
    );
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const containerId = findContainer(active.id);
    const task = data.columns[containerId]?.tasks.find(
      (t) => t.id === active.id,
    );
    setActiveTask(task || null);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const sourceColId = findContainer(active.id);
    const destColId = findContainer(over.id);
    if (!sourceColId || !destColId || sourceColId === destColId) return;

    const sourceCol = data.columns[sourceColId];
    const destCol = data.columns[destColId];

    const activeTaskIndex = sourceCol.tasks.findIndex(
      (t) => t.id === active.id,
    );
    if (activeTaskIndex === -1) return;
    const overTaskIndex = destCol.tasks.findIndex((t) => t.id === over.id);

    const newSourceTasks = [...sourceCol.tasks];
    const [moved] = newSourceTasks.splice(activeTaskIndex, 1);
    if (!moved) return;
    const newDestTasks = [...destCol.tasks];
    const insertIndex =
      overTaskIndex >= 0 ? overTaskIndex : newDestTasks.length;
    newDestTasks.splice(insertIndex, 0, moved);

    setData({
      ...data,
      columns: {
        ...data.columns,
        [sourceColId]: { ...sourceCol, tasks: newSourceTasks },
        [destColId]: { ...destCol, tasks: newDestTasks },
      },
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) {
      setActiveTask(null);
      return;
    }

    // --------- Перестановка колонок ----------
    if (
      data.columnOrder.includes(active.id) &&
      data.columnOrder.includes(over.id)
    ) {
      const oldIndex = data.columnOrder.indexOf(active.id);
      const newIndex = data.columnOrder.indexOf(over.id);
      if (oldIndex !== newIndex) {
        setData({
          ...data,
          columnOrder: arrayMove(data.columnOrder, oldIndex, newIndex),
        });
      }
      setActiveTask(null);
      return;
    }

    // --------- Перестановка тасків ----------
    const sourceColId = findContainer(active.id);
    const destColId = findContainer(over.id);
    if (!sourceColId || !destColId) return;

    if (sourceColId === destColId) {
      const col = data.columns[sourceColId];
      const oldIndex = col.tasks.findIndex((t) => t.id === active.id);
      const newIndex = col.tasks.findIndex((t) => t.id === over.id);
      if (oldIndex !== newIndex) {
        const newTasks = arrayMove(col.tasks, oldIndex, newIndex);
        setData({
          ...data,
          columns: { ...data.columns, [col.id]: { ...col, tasks: newTasks } },
        });
      }
    }

    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={data.columnOrder} strategy={rectSortingStrategy}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            overflowY: "hidden",
            p: 2,
          }}
        >
          {data.columnOrder.map((colId) => (
            <SortableColumn
              key={colId}
              id={colId}
              column={data.columns[colId]}
            />
          ))}
        </Box>
      </SortableContext>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
