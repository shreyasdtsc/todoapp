import React, { useState, useEffect } from "react";

import Header from "../UI/Header.tsx";
import Input from "../UI/Input.tsx";
import List from "../UI/List.tsx";

let nextId = 0;

type TaskStatus = "pending" | "ongoing" | "completed";

interface Task {
  id: number;
  task: string;
  taskStatus: TaskStatus;
}

interface TaskCounts {
  countPending: number;
  countOngoing: number;
  countCompleted: number;
}

export default function TodoUseEffect() {
  const [countPending, setCountPending] = useState<number>(0);
  const [countOngoing, setCountOngoing] = useState<number>(0);
  const [countCompleted, setCountCompleted] = useState<number>(0);

  const taskCounts: TaskCounts = { countPending, countOngoing, countCompleted };

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

  useEffect(() => {
    const pending = toDoList.filter(
      (task) => task.taskStatus === "pending"
    ).length;
    const ongoing = toDoList.filter(
      (task) => task.taskStatus === "ongoing"
    ).length;
    const completed = toDoList.filter(
      (task) => task.taskStatus === "completed"
    ).length;

    setCountPending(pending);
    setCountOngoing(ongoing);
    setCountCompleted(completed);
  }, [toDoList]);

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
