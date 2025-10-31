import React from "react";

// Reuse shared types if you've defined them elsewhere
type TaskStatus = "pending" | "ongoing" | "completed";

interface Task {
  id: number;
  task: string;
  taskStatus: TaskStatus;
}

interface ToDoItemProps {
  item: Task;
  deleteTask: (id: number) => void;
  updateTaskStatus: (id: number, newStatus: TaskStatus) => void;
}

export default function Items({
  item,
  deleteTask,
  updateTaskStatus,
}: ToDoItemProps): JSX.Element {
  return (
    <li>
      {item.task} - <strong>{item.taskStatus}</strong>{" "}
      <select
        value={item.taskStatus}
        onChange={(e) =>
          updateTaskStatus(item.id, e.target.value as TaskStatus)
        }
      >
        <option value="pending">Pending</option>
        <option value="ongoing">On Going</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={() => deleteTask(item.id)}>Delete</button>
    </li>
  );
}
