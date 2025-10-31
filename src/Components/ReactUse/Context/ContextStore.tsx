import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// 1. Define Task types
export type TaskStatus = "pending" | "ongoing" | "completed";

export interface Task {
  id: number;
  task: string;
  taskStatus: TaskStatus;
}

export interface TaskCounts {
  pending: number;
  ongoing: number;
  completed: number;
}

// 2. Define the shape of the context
interface ToDoContextType {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  toDoList: Task[];
  add: () => void;
  updateTask: (id: number, newStatus: TaskStatus) => void;
  deleteTask: (id: number) => void;
  taskCounts: TaskCounts;
}

// 3. Create context with default undefined (we’ll check for it in useToDo)
const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

// 4. Custom hook to use the context
export const useToDo = (): ToDoContextType => {
  const context = useContext(ToDoContext);
  if (!context) {
    throw new Error("useToDo must be used within a ToDoProvider");
  }
  return context;
};

// 5. Provider component
interface ToDoProviderProps {
  children: ReactNode;
}

let nextId = 0;

export const ToDoProvider = ({ children }: ToDoProviderProps): JSX.Element => {
  const [input, setInput] = useState<string>("");
  const [toDoList, setToDoList] = useState<Task[]>([]);

  const add = () => {
    const trimmed = input.trim();
    if (trimmed.length > 0) {
      const newTask: Task = {
        id: ++nextId,
        task: trimmed,
        taskStatus: "pending",
      };

      setToDoList([...toDoList, newTask]);
      setInput("");
    }
  };

  const taskCounts: TaskCounts = toDoList.reduce(
    (counts, task) => {
      counts[task.taskStatus]++;
      return counts;
    },
    { pending: 0, ongoing: 0, completed: 0 }
  );

  const updateTask = (id: number, newStatus: TaskStatus) => {
    setToDoList((prevList) =>
      prevList.map((task) =>
        task.id === id ? { ...task, taskStatus: newStatus } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setToDoList((prevList) => prevList.filter((task) => task.id !== id));
  };

  return (
    <ToDoContext.Provider
      value={{
        input,
        setInput,
        toDoList,
        add,
        updateTask,
        deleteTask,
        taskCounts,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};
