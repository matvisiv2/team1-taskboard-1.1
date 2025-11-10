import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Column } from "../../components/Column";
import { TaskEditForm } from "../../components/Forms";
import { ColumnCreateForm } from "../../components/Forms/ColumnCreateForm";
import {
  fetchColumnsWithTasks,
  moveTaskToAnotherColumn,
  moveTaskInSameColumn,
  changeColumnsOrder,
  fetchColumnChangeOrderIndex,
  fetchTaskUpdate,
} from "../../redux/slices/columns";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { TaskCard } from "./../../components/TestComponent/TaskCard";
import { GlobalSkeleton } from "./../../components";
import { parseColumnIndex, parseTaskId } from "./../../utils/reordering";
import { showSnackbar } from "../../redux/slices/snackbar";

export const FullBoard = () => {
  const { id } = useParams();
  const [updateColumnsTrigger, setUpdateColumnsTrigger] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchColumnsWithTasks(id));
  }, [updateColumnsTrigger]);

  const { columns } = useSelector((state) => state.columns);
  const isColumnsLoading = columns.status === "loading";

  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const changeColumnOrderOnServer = async (activeColumn, newOrderIndex) => {
    const data = await dispatch(
      fetchColumnChangeOrderIndex({
        id: columns.items[activeColumn].id,
        values: { orderIndex: newOrderIndex },
      }),
    );

    if (data.error) {
      dispatch(
        showSnackbar({
          message: "Failed to reorder lists",
          success: false,
        }),
      );
    } else {
      dispatch(
        showSnackbar({
          message: "List order index changed successfully",
          success: true,
        }),
      );

      if (data.payload?.updateOrderIndexes) {
        setUpdateColumnsTrigger(!updateColumnsTrigger);
      }
    }
  };

  const moveTaskToAnotherColumnOnServer = async (
    activeId,
    overId,
    newOrderIndex,
  ) => {
    const taskId = parseTaskId(activeId);
    const columnId = columns.items[parseColumnIndex(overId)].id;

    const data = await dispatch(
      fetchTaskUpdate({
        id: taskId,
        values: { columnId: columnId, orderIndex: newOrderIndex },
      }),
    );

    if (data.error) {
      dispatch(
        showSnackbar({
          message: "Failed to reorder tasks",
          success: false,
        }),
      );
    } else {
      dispatch(
        showSnackbar({
          message: "Task order index changed successfully",
          success: true,
        }),
      );

      if (data.payload?.updateOrderIndexes) {
        setUpdateColumnsTrigger(!updateColumnsTrigger);
      }
    }
  };

  const changeTaskOrderOnServer = async (activeTaskId, newOrderIndex) => {
    const data = await dispatch(
      fetchTaskUpdate({
        id: activeTaskId,
        values: { orderIndex: newOrderIndex },
      }),
    );

    if (data.error) {
      dispatch(
        showSnackbar({
          message: "Failed to reorder tasks",
          success: false,
        }),
      );
    } else {
      dispatch(
        showSnackbar({
          message: "Task order index changed successfully",
          success: true,
        }),
      );

      if (data.payload?.updateOrderIndexes) {
        setUpdateColumnsTrigger(!updateColumnsTrigger);
      }
    }
  };

  const handleDragStart = (event) => {
    const { active } = event;
    if (active.id[0] === "c") return;
    const columnIndex = parseColumnIndex(active.id);
    const task = columns.items[columnIndex]?.tasks.find(
      (task) => task.id == parseTaskId(active.id),
    );
    setActiveTask(task || null);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) {
      return;
    }

    const sourceColumnIndex = parseColumnIndex(active.id);
    const destColumnIndex = parseColumnIndex(over.id);

    if (
      sourceColumnIndex == undefined ||
      sourceColumnIndex == null ||
      destColumnIndex == undefined ||
      destColumnIndex == null
    )
      return;
    if (sourceColumnIndex === destColumnIndex) return;

    const isActiveTask = active?.id[0] === "t";
    if (isActiveTask) {
      // dispatch(moveTaskToAnotherColumn({ active: active.id, over: over.id }));
      // moveTaskToAnotherColumnOnServer(active.id, over.id);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) {
      setActiveTask(null);
      return;
    }

    // change column order
    const isColumn = active.id[0] === "c";
    if (isColumn) {
      const activeColumn = Number(active.id.slice(1));
      const overColumn = Number(over.id.slice(1));

      if (activeColumn !== overColumn) {
        const baseOrder = Number(columns.items[overColumn].orderIndex);
        const secondOrder = Number(
          activeColumn > overColumn
            ? columns.items[overColumn - 1]?.orderIndex ?? 0
            : columns.items[overColumn + 1]?.orderIndex ?? baseOrder + 1,
        );
        const newOrderIndex = (baseOrder + secondOrder) / 2;

        dispatch(
          changeColumnsOrder({
            activeCol: activeColumn,
            overCol: overColumn,
            newOrderIndex,
          }),
        );

        changeColumnOrderOnServer(activeColumn, newOrderIndex);
      }

      setActiveTask(null);
      return;
    }

    const isTask = active.id[0] === "t";
    if (isTask) {
      // change task order
      const sourceColumnIndex = parseColumnIndex(active.id);
      const destColumnIndex = parseColumnIndex(over.id);
      if (
        sourceColumnIndex == undefined ||
        sourceColumnIndex == null ||
        destColumnIndex == undefined ||
        destColumnIndex == null
      ) {
        return;
      }

      const activeTaskId = parseTaskId(active.id);
      const overTaskId = parseTaskId(over.id);

      if (sourceColumnIndex === destColumnIndex) {
        // Insert into the same column
        const tasks = columns.items[sourceColumnIndex]?.tasks || [];

        const activeTaskIndex = tasks.findIndex(
          (task) => task.id == activeTaskId,
        );
        const overTaskIndex = tasks.findIndex((task) => task.id == overTaskId);
        if (activeTaskIndex < 0 || overTaskIndex < 0) {
          // setActiveTask(null);
          return;
        }

        if (activeTaskIndex !== overTaskIndex) {
          const baseOrder = Number(tasks[overTaskIndex].orderIndex);
          const secondOrder = Number(
            activeTaskIndex > overTaskIndex
              ? tasks[overTaskIndex - 1]?.orderIndex ?? 0
              : tasks[overTaskIndex + 1]?.orderIndex ?? baseOrder + 1,
          );
          const newOrderIndex = (baseOrder + secondOrder) / 2;

          dispatch(
            moveTaskInSameColumn({
              sourceColumnIndex,
              activeTaskIndex,
              overTaskIndex,
              newOrderIndex,
            }),
          );

          changeTaskOrderOnServer(activeTaskId, newOrderIndex);
        }
        // First logic - move synchronize with front and server
      } else {
        // Insert into another column
        const sourceTasks = columns.items[sourceColumnIndex]?.tasks || [];
        const destTasks = columns.items[destColumnIndex]?.tasks || [];

        const activeTaskIndex = sourceTasks.findIndex(
          (task) => task.id == activeTaskId,
        );
        let overTaskIndex = destTasks.findIndex(
          (task) => task.id == overTaskId,
        );
        if (activeTaskIndex < 0) {
          // setActiveTask(null);
          return;
        }
        if (overTaskIndex < 0) overTaskIndex = 0;

        const baseOrder = Number(destTasks[overTaskIndex]?.orderIndex);
        const secondOrder = Number(
          destTasks[overTaskIndex - 1]
            ? destTasks[overTaskIndex - 1].orderIndex ?? 0
            : 0,
        );
        const newOrderIndex = (baseOrder + secondOrder) / 2;

        dispatch(
          moveTaskToAnotherColumn({
            active: active.id,
            over: over.id,
          }),
        );

        moveTaskToAnotherColumnOnServer(active.id, over.id, newOrderIndex);
      }
      // Second logic: to server after move on frontend
      // } else {
      //   // Insert into another column
      //   const destTasks = columns.items[destColumnIndex]?.tasks || [];

      //   let overTaskIndex = destTasks.findIndex(
      //     (task) => task.id == overTaskId,
      //   );

      //   if (overTaskIndex < 0) overTaskIndex = 0;

      //   const baseOrder = Number(destTasks[overTaskIndex]?.orderIndex);
      //   const secondOrder = Number(
      //     destTasks[overTaskIndex - 1]
      //       ? destTasks[overTaskIndex - 1].orderIndex ?? 0
      //       : 0,
      //   );
      //   const newOrderIndex = (baseOrder + secondOrder) / 2;

      //   moveTaskToAnotherColumnOnServer(over.id, over.id, newOrderIndex);
      // }
    }
    setActiveTask(null);
  };

  return (
    <Grid
      container
      direction="row"
      spacing={4}
      wrap="nowrap"
      sx={{
        flexWrap: "nowrap",
        padding: "2px 2px 0 2px",
        overflowY: "hidden",
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          // items={columns.items.map((column) => column.id)}
          items={[...columns.items.keys().map((key) => `c${key}`)]}
          strategy={rectSortingStrategy}
        >
          {isColumnsLoading ? (
            <GlobalSkeleton />
          ) : (
            columns.items.map((column, key) => (
              <Column key={`column-${key}`} id={`c${key}`} column={column} />
            ))
          )}
        </SortableContext>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
      <ColumnCreateForm boardId={id} />
      <TaskEditForm />
    </Grid>
  );
};
