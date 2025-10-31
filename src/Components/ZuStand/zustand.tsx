import React from "react";
import Header from "../UI/Header";
import Input from "../UI/Input";
import List from "../UI/List";
import useToDoStore from "./zustandStore";

import type { Task, TaskCounts } from "./zustandStore";

export default function ToDOZuStand(): JSX.Element {
  const toDoList = useToDoStore((state) => state.toDoList) as Task[];
  const counts = useToDoStore((state) => state.taskCounts) as TaskCounts;
  const input = useToDoStore((state) => state.input) as string;
  const setInput = useToDoStore((state) => state.setInput) as React.Dispatch<
    React.SetStateAction<string>
  >;
  const addTask = useToDoStore((state) => state.addTask) as () => void;
  const updateTaskStatus = useToDoStore((state) => state.updateTaskStatus) as (
    id: number,
    status: string
  ) => void;
  const deleteTask = useToDoStore((state) => state.deleteTask) as (
    id: number
  ) => void;

  return (
    <div>
      <Header toDoList={toDoList} counts={counts} />
      <Input input={input} setInput={setInput} addTask={addTask} />
      <List
        toDoList={toDoList}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
      />
    </div>
  );
}
