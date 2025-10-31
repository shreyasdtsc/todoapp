import React, { useState, useMemo } from "react";

import Header from "../UI/Header";
import Input from "../UI/Input";
import List from "../UI/List";

let nextId = 0;

type TaskStatus = "pending" | "ongoing" | "completed";

interface Task {
  id: number;
  task: string;
  taskStatus: TaskStatus;
}

interface TaskCounts {
  pending: number;
  ongoing: number;
  completed: number;
}

export default function ToDoUseMemo() {
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

  const taskCounts: TaskCounts = useMemo(() => {
    const counts: TaskCounts = {
      pending: 0,
      ongoing: 0,
      completed: 0,
    };

    for (const task of toDoList) {
      if (task.taskStatus in counts) {
        counts[task.taskStatus]++;
      }
    }

    return counts;
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
      <Header toDoList={toDoList}/>
      <Input input={input} setInput={setInput} addTask={add} />
      <List
        toDoList={toDoList}
        updateTaskStatus={updateTask}
        deleteTask={deleteTask}
      />
    </>
  );
}
