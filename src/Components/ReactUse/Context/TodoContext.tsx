import React from "react";
import { ToDoProvider } from "./ContextStore";
import ToDoConsumerComponents from "./ContextProvider";

const TodoContext: React.FC = () => {
  return (
    <ToDoProvider>
      <ToDoConsumerComponents />
    </ToDoProvider>
  );
};

export default TodoContext;
