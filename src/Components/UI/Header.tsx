import React, { useMemo } from "react";

// Define task status type
type TaskStatus = "pending" | "ongoing" | "completed";

// Define the shape of a single task
interface Task {
  id: number;
  task: string;
  taskStatus: TaskStatus;
}

// Define props expected by ToDoHeader
interface ToDoHeaderProps {
  toDoList: Task[];
  counts?: {
    pending: number;
    ongoing: number;
    completed: number;
  };
}

export default function Header({ toDoList }: ToDoHeaderProps): JSX.Element {
  const { pending, ongoing, completed } = useMemo(() => {
    return toDoList.reduce(
      (acc, task) => {
        acc[task.taskStatus]++;
        return acc;
      },
      { pending: 0, ongoing: 0, completed: 0 }
    );
  }, [toDoList]);

  return (
    <div>
      <h1>ToDo List : {toDoList.length}</h1>
      <span>Pending : {pending}</span> <span> | onGoing : {ongoing}</span> |{" "}
      <span>Completed : {completed}</span>
    </div>
  );
}
