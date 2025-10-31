import React from "react";
import Items from "./Items";


// Reuse Task and TaskStatus from a central type definition if available
type TaskStatus = "pending" | "ongoing" | "completed";

interface Task {
  id: number;
  task: string;
  taskStatus: TaskStatus;
}

interface ToDoListProps {
  toDoList: Task[];
  deleteTask: (id: number) => void;
  updateTaskStatus: (id: number, newStatus: TaskStatus) => void;
}

export default function List({
  toDoList,
  deleteTask,
  updateTaskStatus,
}: ToDoListProps): JSX.Element {
  return (
    <ol>
      {toDoList.map((item) => (
        <Items
          key={item.id}
          item={item}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
        />
      ))}
    </ol>
  );
}
