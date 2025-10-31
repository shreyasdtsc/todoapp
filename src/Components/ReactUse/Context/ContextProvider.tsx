import React from "react";
import { useToDo } from "./ContextStore";

import ToDoHeader from "../../UI/Header";
import ToDoInput from "../../UI/Input";
import ToDoList from "../../UI/List";

const ToDoConsumerComponents: React.FC = () => {
  const { input, setInput, toDoList, add, updateTask, deleteTask, taskCounts } =
    useToDo();

  return (
    <>
      <ToDoHeader toDoList={toDoList} counts={taskCounts} />
      <ToDoInput input={input} setInput={setInput} addTask={add} />
      <ToDoList
        toDoList={toDoList}
        updateTaskStatus={updateTask}
        deleteTask={deleteTask}
      />
    </>
  );
};

export default ToDoConsumerComponents;
