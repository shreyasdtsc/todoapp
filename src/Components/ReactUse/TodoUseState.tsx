import React, { useState } from "react";

import Header from "../UI/Header";
import Input from "../UI/Input";
import List from "../UI/List";

let nextId = 0;

// Define the task status type as a union of string literals
type TaskStatus = "pending" | "ongoing" | "completed";

// Define the shape of a Task object
interface Task {
  id: number;
  task: string;
  taskStatus: TaskStatus;
}

// Define the shape for the task counts
interface TaskCounts {
  pending: number;
  ongoing: number;
  completed: number;
}

export default function TodoUseState() {
  const [input, setInput] = useState<string>("");
  const [toDoList, setToDoList] = useState<Task[]>([]);

  const add = () => {
    if (input.trim().length > 0) {
      const newTask: Task = {
        id: ++nextId,
        task: input,
        taskStatus: "pending",
      };

      setToDoList([...toDoList, newTask]);
      setInput(""); // clear input field
    }
  };

  const pending = toDoList.filter(
    (task) => task.taskStatus === "pending"
  ).length;
  const ongoing = toDoList.filter(
    (task) => task.taskStatus === "ongoing"
  ).length;
  const completed = toDoList.filter(
    (task) => task.taskStatus === "completed"
  ).length;

  const taskCounts: TaskCounts = { pending, ongoing, completed };

  const updateTask = (id: number, newStatus: TaskStatus) => {
    setToDoList((prevlist) =>
      prevlist.map((task) =>
        task.id === id ? { ...task, taskStatus: newStatus } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setToDoList((prevList) => prevList.filter((task) => task.id !== id));
  };

  return (
    <>
      <Header toDoList={toDoList} counts={taskCounts} />
      <Input input={input} setInput={setInput} addTask={add} />
      <List
        toDoList={toDoList}
        updateTaskStatus={updateTask}
        deleteTask={deleteTask}
      />
    </>
  );
}
