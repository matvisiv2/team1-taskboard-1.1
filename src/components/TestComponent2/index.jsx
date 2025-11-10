import clsx from "clsx";
import styles from "./TestComponent2.module.scss";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { useState } from "react";
import { TestColumn } from "../TestColumn";
import { arrayMove } from "@dnd-kit/sortable";

export const TestComponent2 = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Admin panel" },
    { id: 2, title: "Profile page" },
    { id: 3, title: "Testing JEST" },
  ]);

  const getTaskPos = (id) => tasks.findIndex((task) => task.id == id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) {
      return;
    }

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <div className={clsx(styles.root)}>
      <div style={{ width: "350px" }}>
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <TestColumn
            column={{ id: 1, title: "Under My Tasks" }}
            tasks={tasks}
          />
        </DndContext>
      </div>
    </div>
  );
};
